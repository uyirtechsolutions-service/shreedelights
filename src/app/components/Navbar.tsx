import { useState, useRef, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useCartStore } from '../store/cartStore';
import { menuItems } from '../data/menuItems';
import AnnouncementBanner from './AnnouncementBanner';

const navLinks: { label: string; action: 'scroll' | 'route'; target: string }[] = [
  { label: 'Home',         action: 'route', target: '/'             },
  { label: 'Menu',         action: 'route', target: '/menu'         },
  { label: 'About',        action: 'route', target: '/about'        },
  { label: 'Testimonials', action: 'route', target: '/testimonials' },
  { label: 'Contact',      action: 'route', target: '/contact'      },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const cartCount = useCartStore((s) => s.totalItems());

  const [drawerOpen, setDrawerOpen]   = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [query, setQuery]             = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
    else setQuery('');
  }, [searchOpen]);

  // Close search on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSearchOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = query.trim().length >= 2
    ? menuItems.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  const handleClick = (action: 'scroll' | 'route', target: string) => {
    setDrawerOpen(false);
    if (action === 'route') { navigate(target); return; }
    if (pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }), 120);
    } else {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToItem = (category: string) => {
    setSearchOpen(false);
    setQuery('');
    navigate(`/menu?q=${encodeURIComponent(query)}`);
  };

  const handleSearchSubmit = () => {
    if (query.trim().length >= 2) {
      setSearchOpen(false);
      navigate(`/menu?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <>
      <nav className="bg-[#f5f0eb] border-b border-[#e0d6cc] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3">

          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none flex-shrink-0">
            <span className="text-[#2c1209] text-xl font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
              Shree Delights
            </span>
            <span className="text-[8px] tracking-[0.25em] text-[#a0622a] uppercase font-bold text-center">Home Bakes</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map(({ label, action, target }) => (
              <button key={label} onClick={() => handleClick(action, target)}
                className={`cursor-pointer text-sm font-lato transition-colors whitespace-nowrap ${
                  action === 'route' && pathname === target
                    ? 'text-[#a0622a] border-b border-[#a0622a] pb-0.5'
                    : 'text-[#3d2010] hover:text-[#a0622a]'
                }`}
              >{label}</button>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <button onClick={() => setSearchOpen(true)}
              className="text-[#3d2010] hover:text-[#a0622a] transition-colors p-2 rounded-full"
              aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/order" className="relative text-[#3d2010] hover:text-[#a0622a] transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#2c1209] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="md:hidden text-[#3d2010] hover:text-[#a0622a] transition-colors p-2 rounded-full"
              onClick={() => setDrawerOpen(true)} aria-label="Open menu">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Announcement banner — below navbar, above content */}
      <AnnouncementBanner />

      {/* ── Search overlay ──────────────────────────────────────────────── */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col" onClick={() => setSearchOpen(false)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#1a0a04]/60 backdrop-blur-sm" />

          {/* Search panel */}
          <div
            className="relative z-10 max-w-2xl w-full mx-auto mt-20 sm:mt-28 px-4"
            onClick={e => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center bg-white border-2 border-[#2c1209] rounded-xl px-4 py-3 shadow-2xl gap-3">
              <Search className="w-5 h-5 text-[#a0622a] flex-shrink-0" />
              <input
                ref={searchRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearchSubmit()}
                placeholder="Search cakes, brownies, cupcakes…"
                className="flex-1 outline-none text-[#2c1209] text-base font-lato placeholder-[#b8a898] bg-transparent"
              />
              {query.trim().length >= 2 && (
                <button
                  onClick={handleSearchSubmit}
                  className="bg-[#2c1209] hover:bg-[#1a0a04] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg transition font-lato flex-shrink-0"
                >
                  Go
                </button>
              )}
              <button onClick={() => setSearchOpen(false)} className="text-[#9a8070] hover:text-[#2c1209] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results */}
            {query.trim().length >= 2 && (
              <div className="mt-2 bg-white rounded-xl shadow-2xl border border-[#e0d6cc] overflow-hidden">
                {results.length === 0 ? (
                  <div className="px-5 py-6 text-center text-[#9a8070] font-lato text-sm">
                    No results for "<span className="text-[#2c1209] font-semibold">{query}</span>"
                  </div>
                ) : (
                  <>
                    <p className="px-4 pt-3 pb-1 text-[10px] text-[#a0622a] font-bold tracking-widest uppercase font-lato">
                      {results.length} result{results.length !== 1 ? 's' : ''} found
                    </p>
                    <ul>
                      {results.map(item => (
                        <li key={item.id}>
                          <button
                            onClick={() => goToItem(item.category)}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#fdf8f3] transition-colors text-left"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-[#2c1209] font-bold text-sm font-lato truncate">{item.name}</p>
                              <p className="text-[#9a8070] text-xs font-lato truncate">{item.description}</p>
                            </div>
                            <div className="flex flex-col items-end gap-1 flex-shrink-0">
                              <span className="text-[10px] bg-[#f5f0eb] text-[#a0622a] font-bold px-2 py-0.5 rounded-full capitalize font-lato">
                                {item.category}
                              </span>
                              <span className="text-[#2c1209] font-bold text-xs font-lato">
                                from ₹{item.variants[0].unitPrice}
                              </span>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-[#f0e8de] px-4 py-3">
                      <button
                        onClick={() => { navigate('/menu'); setSearchOpen(false); setQuery(''); }}
                        className="text-xs text-[#a0622a] font-bold font-lato hover:text-[#2c1209] transition-colors"
                      >
                        View all products →
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Quick shortcuts when empty */}
            {query.trim().length < 2 && (
              <div className="mt-2 bg-white rounded-xl shadow-2xl border border-[#e0d6cc] px-4 py-4">
                <p className="text-[10px] text-[#a0622a] font-bold tracking-widest uppercase font-lato mb-3">
                  Quick Browse
                </p>
                <div className="flex flex-wrap gap-2">
                  {['brownies','cakes','cupcakes','teacakes'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        navigate(`/menu?tab=${cat}`);
                        setSearchOpen(false);
                      }}
                      className="px-3 py-1.5 bg-[#f5f0eb] hover:bg-[#2c1209] hover:text-white text-[#2c1209] text-xs font-bold tracking-wide uppercase rounded-full transition font-lato capitalize"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Mobile drawer overlay ───────────────────────────────────────── */}
      {drawerOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 md:hidden" onClick={() => setDrawerOpen(false)} />
      )}

      {/* ── Mobile drawer ───────────────────────────────────────────────── */}
      <div className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-[#f5f0eb] z-50 shadow-2xl transition-transform duration-300 md:hidden flex flex-col ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e0d6cc]">
          <span className="text-[#2c1209] text-lg font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Shree Delights
          </span>
          <button onClick={() => setDrawerOpen(false)} className="text-[#3d2010] hover:text-[#a0622a] transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer search */}
        <div className="px-5 pt-4 pb-2">
          <button
            onClick={() => { setDrawerOpen(false); setSearchOpen(true); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 bg-white border border-[#e0d6cc] rounded-lg text-[#9a8070] text-sm font-lato hover:border-[#a0622a] transition-colors"
          >
            <Search className="w-4 h-4" />
            Search items…
          </button>
        </div>

        <div className="flex flex-col px-5 py-3 gap-1 flex-1 overflow-y-auto">
          {navLinks.map(({ label, action, target }) => (
            <button key={label} onClick={() => handleClick(action, target)}
              className={`text-left px-4 py-3 rounded-lg text-base font-lato transition-colors ${
                action === 'route' && pathname === target
                  ? 'bg-[#2c1209] text-white font-bold'
                  : 'text-[#3d2010] hover:bg-[#e8ddd0] hover:text-[#a0622a]'
              }`}
            >{label}</button>
          ))}
        </div>

        <div className="px-5 py-4 border-t border-[#e0d6cc]">
          <Link to="/order" onClick={() => setDrawerOpen(false)}
            className="w-full bg-[#2c1209] hover:bg-[#1a0a04] text-white py-3 text-[11px] font-bold tracking-[0.18em] uppercase transition font-lato flex items-center justify-center gap-2 rounded-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            Order Now {cartCount > 0 ? `(${cartCount})` : ''}
          </Link>
        </div>
      </div>
    </>
  );
}
