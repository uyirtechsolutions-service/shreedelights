import { Heart, Star, Clock, Leaf, Award, Users } from 'lucide-react';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const values = [
  {
    icon: <Heart className="w-7 h-7" />,
    title: 'Baked with Love',
    desc: 'Every single item that leaves our kitchen is made with genuine care. We pour our heart into each recipe, treating every order as if it were for our own family.',
  },
  {
    icon: <Leaf className="w-7 h-7" />,
    title: 'Only the Finest Ingredients',
    desc: 'We source fresh, natural ingredients and refuse to use preservatives or artificial flavours. What you taste is real — butter, eggs, flour and passion.',
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: 'Made Fresh, Every Time',
    desc: 'Nothing is pre-made or stored. Every order is baked fresh on the day, ensuring you always receive something that is soft, moist and absolutely delicious.',
  },
  {
    icon: <Award className="w-7 h-7" />,
    title: 'Crafted to Perfection',
    desc: 'We take pride in the details. From the swirl of the frosting to the finish of a fondant design, every element is crafted with care and attention.',
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: 'Built on Trust',
    desc: 'Our customers come back again and again because they trust us. That trust is something we never take for granted — it drives everything we do.',
  },
  {
    icon: <Star className="w-7 h-7" />,
    title: 'Creating Memories',
    desc: 'A birthday, a wedding, an anniversary — these are moments that last a lifetime. We are honoured to be part of them through our bakes.',
  },
];

const milestones = [
  { year: '2018', title: 'Where It All Began', desc: 'Started baking from our home kitchen for friends and family — a small hobby that quickly became a calling.' },
  { year: '2019', title: 'First Custom Orders', desc: 'Word spread and custom cake orders started flowing in. Every cake told a story and we loved telling them.' },
  { year: '2021', title: 'Growing Our Family', desc: 'Expanded our menu to include brownies, cupcakes, cookies and more. Our little bakery was finding its identity.' },
  { year: '2023', title: 'Hundreds of Happy Customers', desc: 'Crossed 100+ orders — each one a celebration, a memory, a moment of joy shared over something homemade.' },
  { year: '2026', title: 'Still Baking, Still Loving It', desc: 'Today we continue doing what we love — baking from the heart, one order at a time, right here in our home kitchen.' },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f0eb] font-lato">
      <Navbar />

      {/* ── Hero banner ──────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden min-h-[320px] sm:min-h-[380px] md:min-h-[420px]">
        <img
          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
          alt="Freshly baked goods"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#1a0a04]/65" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-14 sm:py-20 min-h-[320px] sm:min-h-[380px] md:min-h-[420px]">
          <p className="text-[#d4a843] text-[11px] font-bold tracking-[0.25em] uppercase mb-3 font-lato">✦ Our Story ✦</p>
          <h1 className="text-white font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 6vw, 64px)' }}>
            A Bakery Born from Passion
          </h1>
          <p className="text-[#d4a843]" style={{ fontFamily: "'Dancing Script', cursive", fontSize: 'clamp(18px, 3.5vw, 38px)' }}>
            Made with Love, Served with Pride
          </p>
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 grid md:grid-cols-2 gap-8 sm:gap-14 items-center">
        <div>
          <p className="text-[#a0622a] text-[11px] font-bold tracking-[0.2em] uppercase mb-3 font-lato">Who We Are</p>
          <h2 className="text-[#2c1209] font-bold leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 42px)' }}>
            Home-Made Bakes,{' '}
            <span style={{ fontFamily: "'Dancing Script', cursive", color: '#a0622a' }}>Straight from the Heart</span>
          </h2>
          <p className="text-[#5a3e2b] text-[14px] sm:text-[15px] leading-[1.85] mb-4 font-lato">
            Shree Delights started as a simple love story between a family and their kitchen. What began as baking for birthdays and festivals among close ones soon turned into something much bigger.
          </p>
          <p className="text-[#5a3e2b] text-[14px] sm:text-[15px] leading-[1.85] mb-4 font-lato">
            We are not a factory. We are a home kitchen run by people who genuinely love baking. Every morning begins with fresh ingredients and every evening ends with something we are proud to put our name on.
          </p>
          <p className="text-[#5a3e2b] text-[14px] sm:text-[15px] leading-[1.85] font-lato">
            When you order from Shree Delights, you are not just getting a cake — you are getting a piece of someone's time, care and dedication.
          </p>
        </div>
        <div className="relative mt-6 md:mt-0 pb-6 sm:pb-8 md:pb-0">
          <img
            src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700"
            alt="Baker decorating a cake with care"
            className="rounded-2xl w-full h-[220px] sm:h-[340px] md:h-[420px] object-cover shadow-xl"
          />
          <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-[#2c1209] text-white rounded-2xl px-4 sm:px-6 py-4 sm:py-5 shadow-xl max-w-[160px] sm:max-w-[200px]">
            <p className="text-[#d4a843] text-2xl sm:text-3xl font-bold font-lato">100+</p>
            <p className="text-xs sm:text-sm font-lato text-white/80 leading-tight mt-1">Happy orders delivered with love</p>
          </div>
        </div>
      </section>

      {/* ── What drives us ───────────────────────────────────────────────── */}
      <section className="bg-white py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[#a0622a] text-[11px] font-bold tracking-[0.2em] uppercase mb-2 font-lato">✦ Our Philosophy ✦</p>
            <h2 className="text-[#2c1209] font-bold" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 40px)' }}>
              Why Every Bite Matters to Us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-[#fdf8f3] rounded-2xl p-5 sm:p-7 border border-[#ede5d8] hover:shadow-md transition">
                <div className="w-11 h-11 rounded-full bg-[#2c1209]/10 flex items-center justify-center mb-4 text-[#a0622a]">{v.icon}</div>
                <h3 className="text-[#2c1209] font-bold mb-2 text-base sm:text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>{v.title}</h3>
                <p className="text-[#5a3e2b] text-sm leading-relaxed font-lato">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Passion section ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 grid md:grid-cols-2 gap-8 sm:gap-14 items-center">
        <div className="relative order-2 md:order-1 mt-4 md:mt-0">
          <img
            src="https://images.unsplash.com/photo-1556471013-0001958d2f12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700"
            alt="Brownies fresh from the oven"
            className="rounded-2xl w-full h-[200px] sm:h-[300px] md:h-[380px] object-cover shadow-xl"
          />
          <div className="absolute top-4 right-4 bg-white rounded-full w-16 h-16 sm:w-20 sm:h-20 flex flex-col items-center justify-center shadow-lg border border-[#e8ddd0]">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#a0622a] fill-[#a0622a]" />
            <span className="text-[8px] sm:text-[9px] text-[#2c1209] font-bold text-center leading-tight mt-1 font-lato tracking-wide">MADE<br />WITH LOVE</span>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <p className="text-[#a0622a] text-[11px] font-bold tracking-[0.2em] uppercase mb-3 font-lato">The Heart of Our Kitchen</p>
          <h2 className="text-[#2c1209] font-bold leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 42px)' }}>
            Passion Is Our Secret Ingredient
          </h2>
          <p className="text-[#5a3e2b] text-[14px] sm:text-[15px] leading-[1.85] mb-4 font-lato">
            You can taste the difference when something is made with passion. It is in the way the brownie holds its fudgy centre, the way the cake layers sit perfectly, the way the frosting melts just right.
          </p>
          <p className="text-[#5a3e2b] text-[14px] sm:text-[15px] leading-[1.85] font-lato">
            Whether it is a simple box of brownies or a five-tier wedding cake, every order gets the same level of love and attention. Because to us, no order is small — every bake is a chance to make someone smile.
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#2c1209] py-10 sm:py-16 px-4 sm:px-6 text-center">
        <p className="text-[#d4a843] text-[11px] font-bold tracking-[0.25em] uppercase mb-4 font-lato">
          ✦ Ready to Experience It? ✦
        </p>
        <h2
          className="text-white font-bold mb-3"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 4vw, 40px)' }}
        >
          Taste the Difference Passion Makes
        </h2>
        <p className="text-[#d4b896] text-sm font-lato mb-8 max-w-xl mx-auto">
          Every order is a little piece of our heart. Browse our menu and let us bake
          something special just for you.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate('/menu')}
            className="bg-[#d4a843] hover:bg-[#b8902e] text-[#1a0a04] px-8 py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase transition font-lato"
          >
            Browse Our Menu
          </button>
          <button
            onClick={() => navigate('/order')}
            className="border border-white text-white hover:bg-white hover:text-[#2c1209] px-8 py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase transition font-lato"
          >
            Place an Order
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
