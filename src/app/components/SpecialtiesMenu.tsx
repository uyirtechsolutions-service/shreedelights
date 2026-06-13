import { useState, useEffect } from 'react';
import { ShoppingCart, Check, X } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';
import { menuItems } from '../data/menuItems';
import { useCartStore } from '../store/cartStore';

type Tab = 'brownies' | 'cupcakes' | 'teacakes' | 'cakes' ;

const VALID_TABS: Tab[] = ['brownies', 'cupcakes', 'teacakes', 'cakes'];

const tabs: { key: Tab; label: string }[] = [
  { key: 'brownies', label: 'Brownies'  },
  { key: 'cupcakes', label: 'Cup Cakes' },
  { key: 'teacakes', label: 'Tea Cakes' },
  { key: 'cakes',    label: 'Cakes'     }
];

interface Props {
  searchQuery?: string;
  defaultTab?: string;
}

export default function SpecialtiesMenu({ searchQuery, defaultTab }: Props) {
  const [searchParams] = useSearchParams();
  
  // Read tab from URL param directly so it reacts to URL changes
  const tabFromUrl = searchParams.get('tab') ?? defaultTab ?? '';
  const resolvedTab: Tab = VALID_TABS.includes(tabFromUrl as Tab)
    ? (tabFromUrl as Tab)
    : 'brownies';

  const [activeTab, setActiveTab] = useState<Tab>(resolvedTab);

  // Sync whenever the URL ?tab= param changes
  useEffect(() => {
    const t = searchParams.get('tab') ?? '';
    if (VALID_TABS.includes(t as Tab)) {
      setActiveTab(t as Tab);
    }
  }, [searchParams]);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({});
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const { addItem, totalItems } = useCartStore();
  const navigate = useNavigate();

  const isSearchMode = !!searchQuery && searchQuery.trim().length >= 1;

  const filtered = isSearchMode
    ? menuItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : menuItems.filter(item => item.category === activeTab);

  const cartCount = totalItems();

  const getVariantIndex = (itemId: string, fallback = 0) =>
    selectedVariants[itemId] ?? fallback;

  const handleAdd = (itemId: string) => {
    const item = menuItems.find((m) => m.id === itemId);
    if (!item) return;
    const vIdx = getVariantIndex(itemId);
    const variant = item.variants[vIdx];
    const cartId = `${itemId}-${vIdx}`;
    addItem({
      id: cartId,
      name: item.name,
      variant: variant.label,
      category: item.category,
      description: item.description,
      unitPrice: variant.unitPrice,
      priceLabel: `₹${variant.unitPrice} / ${variant.label}`,
      image: item.image,
    });
    setJustAdded(cartId);
    setTimeout(() => setJustAdded(null), 1200);
  };

  return (
    <section className="bg-[#f5f0eb] py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-6 sm:mb-8">
          {isSearchMode ? (
            <div>
              <p className="text-[#a0622a] text-[11px] font-bold tracking-[0.2em] uppercase mb-2 font-lato">
                Search Results
              </p>
              <h2
                className="text-[#2c1209] font-bold"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 4vw, 36px)' }}
              >
                {filtered.length > 0
                  ? <>{filtered.length} result{filtered.length !== 1 ? 's' : ''} for "<span className="text-[#a0622a]">{searchQuery}</span>"</>
                  : <>No results for "<span className="text-[#a0622a]">{searchQuery}</span>"</>
                }
              </h2>
              {filtered.length === 0 && (
                <p className="text-[#9a8070] text-sm font-lato mt-2">
                  Try searching for something else or browse our categories below.
                </p>
              )}
              <button
                onClick={() => navigate('/menu')}
                className="mt-3 inline-flex items-center gap-1 text-xs text-[#a0622a] font-bold font-lato hover:text-[#2c1209] transition-colors"
              >
                <X className="w-3 h-3" /> Clear search — show all
              </button>
            </div>
          ) : (
            <h2
              className="text-[#2c1209] font-bold"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 4vw, 40px)' }}
            >
              Made Fresh for You
            </h2>
          )}
        </div>

        {/* Tabs — hidden in search mode */}
        {!isSearchMode && (
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-10 justify-center">
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-3 sm:px-6 py-2 text-[9px] sm:text-[11px] font-bold tracking-[0.15em] uppercase transition font-lato border whitespace-nowrap ${
                  activeTab === key
                    ? 'bg-[#2c1209] text-white border-[#2c1209]'
                    : 'bg-transparent text-[#2c1209] border-[#2c1209] hover:bg-[#2c1209] hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {filtered.map((item) => {
            const vIdx = getVariantIndex(item.id);
            const variant = item.variants[vIdx];
            const cartId = `${item.id}-${vIdx}`;

            return (
              <div
                key={item.id}
                className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col h-full"
              >
                <div className="overflow-hidden w-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-24 sm:h-32 md:h-44 object-cover object-center hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1">
                  <h3
                    className="text-[#2c1209] text-xs sm:text-sm md:text-base font-bold mb-2 sm:mb-3 text-center line-clamp-2"
                   
                  >
                    {item.name}
                  </h3>

                  {/* Variant toggle (desktop) and select (mobile) */}
                  <div className="hidden sm:flex flex-wrap gap-1 justify-center mb-2 sm:mb-3 md:mb-4">
                    {item.variants.map((v, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedVariants((prev) => ({ ...prev, [item.id]: i }))}
                        className={`px-2 sm:px-3 py-1 text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-wide uppercase border transition font-lato rounded-sm min-h-[24px] sm:min-h-[28px] ${
                          vIdx === i
                            ? 'bg-[#2c1209] text-white border-[#2c1209]'
                            : 'bg-white text-[#2c1209] border-[#2c1209]/40 hover:border-[#2c1209]'
                        }`}
                        aria-pressed={vIdx === i}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>

                  {/* Mobile: variant select for compact choice like 1/2kg, 1kg, 1pc */}
                  <div className="block sm:hidden mb-2 sm:mb-3">
                    <label className="sr-only">Choose size</label>
                    <select
                      value={vIdx}
                      onChange={(e) => setSelectedVariants((prev) => ({ ...prev, [item.id]: Number(e.target.value) }))}
                      className="w-auto mx-auto sm:w-full border border-[#d9cfc4] rounded-md py-1 px-2 text-xs font-lato text-[#2c1209] bg-white focus:outline-none focus:border-[#a0622a] block"
                    >
                      {item.variants.map((v, i) => (
                        <option key={i} value={i}>{v.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price */}
                  <p className="text-[#a0622a] font-bold text-[10px] sm:text-xs md:text-sm text-center mb-2 sm:mb-3 md:mb-4 font-lato">
                    ₹{variant.unitPrice}
                    <span className="text-[#9a8070] font-normal text-[8px] sm:text-[9px] md:text-xs ml-1">/ {variant.label}</span>
                  </p>

                  {/* Add to cart */}
                  <button
                    onClick={() => handleAdd(item.id)}
                    className={`mt-auto mx-auto sm:w-full border py-1 sm:py-1.5 md:py-2 px-3 sm:px-0 text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-[0.1em] uppercase transition font-lato cursor-pointer block mb-1 sm:mb-0 ${
                      justAdded === cartId
                        ? 'bg-green-600 border-green-600 text-white'
                        : 'border-[#2c1209] text-[#2c1209] hover:bg-[#2c1209] hover:text-white'
                    }`}
                    style={{ minWidth: 0 }}
                    aria-label={`Add ${item.name} ${variant.label} to cart`}
                  >
                    {justAdded === cartId ? (
                      <span className="flex items-center justify-center gap-1">
                        <Check className="w-3 h-3" /> Added
                      </span>
                    ) : (
                      'Add to Cart'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View cart CTA */}
        {cartCount > 0 && (
          <div className="mt-10 text-center">
            <button
              onClick={() => navigate('/order')}
              className="bg-[#2c1209] hover:bg-[#1a0a04] text-white px-10 py-3 text-[11px] font-bold tracking-[0.18em] uppercase transition font-lato inline-flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              View Cart ({cartCount} item{cartCount !== 1 ? 's' : ''})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
