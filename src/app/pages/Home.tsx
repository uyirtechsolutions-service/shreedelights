import { Cake, Leaf, Truck, UtensilsCrossed, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import SpecialtiesMenu from '../components/SpecialtiesMenu';
import Footer from '../components/Footer';
import TruckBorderButton from '../components/TruckBorderButton';
// import homeImg from "../assets/sd-home.png";
import homeVideo from "../assets/sd-cake-video.mp4";

const features = [
  { icon: <UtensilsCrossed className="w-6 h-6" />, title: 'Freshly Baked',       desc: 'Baked fresh every day with premium ingredients.' },
  { icon: <Leaf            className="w-6 h-6" />, title: 'Quality Ingredients', desc: 'We use the finest and natural ingredients.' },
  { icon: <Cake            className="w-6 h-6" />, title: 'Custom Creations',    desc: 'Unique cakes for your special moments.' },
  { icon: <Truck           className="w-6 h-6" />, title: 'Fast Delivery',       desc: 'Quick and reliable delivery right to your door.' },
];

const testimonials = [
  { name: 'Anand Kumar',    role: 'Wedding Customer',   initials: 'AK', text: 'Ordered a custom wedding cake and it completely exceeded our expectations. The attention to detail and the flavour were both outstanding. Highly recommended!' },
  { name: 'Meena Krishnan', role: 'Regular Customer',   initials: 'MK', text: 'Ordered brownies three times now and they never disappoint. Fudgy, rich and perfectly baked — my whole family is obsessed!' },
  { name: 'Divya Ramesh',   role: 'First-time Customer',initials: 'DR', text: 'Tried the cheesecake for the first time and am completely hooked. The crust was buttery, the filling was smooth and the taste was just perfect.' },
];

export default function Home() {
  // const navigate = useNavigate();

  const scrollToMenu = () => {
    document.getElementById('specialties')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f5f0eb] font-lato">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden min-h-[360px] sm:min-h-[480px] md:min-h-[580px]">
        {/* Background video */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            src={homeVideo}
            // poster={homeImg}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center filter contrast-110 saturate-110 brightness-95 opacity-50 sm:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f5f0eb] via-[#f5f0eb]/60 to-transparent md:via-[#f5f0eb]/35" />
        </div>

        {/* Text content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6 sm:py-12 md:py-16 flex flex-col justify-center min-h-[360px] sm:min-h-[520px] md:min-h-[580px]">
          <div className="max-w-full sm:max-w-md bg-transparent backdrop-blur-none rounded-none p-0 shadow-none border border-transparent">
            {/* Animated tagline */}
            <motion.p 
              className="text-[#3d1f0a] text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase flex items-center gap-2 mb-4 font-lato"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Freshly Baked, Made with Love
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#a0622a" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </motion.p>

            {/* Animated main heading */}
            <motion.h1
              className="text-[#2c1209] font-bold leading-[1.05] mb-0"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(38px, 7vw, 72px)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Home-Made
            </motion.h1>
            <motion.div 
              className="flex items-baseline gap-2 sm:gap-3 mb-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1
                className="text-[#2c1209] font-bold leading-[1.05]"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(38px, 7vw, 72px)' }}
              >
                Bakes
              </h1>
              <span
                className="text-[#a0622a] flex items-center gap-1"
                style={{ fontFamily: '"Tangerine", cursive', fontWeight: 700, fontSize: 'clamp(36px, 6vw, 54px)', lineHeight: 1 }}
              >
                for you
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a0622a" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </span>
            </motion.div>

            {/* Animated description */}
            <motion.p 
              className="text-[#422c1f] text-sm sm:text-base leading-relaxed mb-6 sm:mb-9 font-semibold font-lato max-w-[85vw] sm:max-w-[300px] md:max-w-[340px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              We create delicious cakes, pastries and baked goods using the finest
              ingredients: because every bite should be memorable and we're FSSAI certified.
            </motion.p>

            {/* Animated buttons */}
            <motion.div 
              className="flex items-center gap-3 sm:gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <button
                onClick={scrollToMenu}
                className="cursor-pointer bg-[#2c1209] hover:bg-[#1a0a04] text-white text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase px-6 sm:px-8 py-3 sm:py-3.5 transition font-lato"
              >
                Shop Now
              </button>
              <TruckBorderButton onClick={scrollToMenu} label="Free Delivery" />
            </motion.div>
            {/* Animated fine print */}
            <motion.p 
              className="mt-2 text-[#4d3525] text-[11px] sm:text-sm leading-relaxed font-semibold font-lato max-w-[320px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              * Free delivery on orders above ₹500 across Tamil Nadu
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Features bar ─────────────────────────────────────────────────── */}
      <section className="bg-white py-6 sm:py-8 px-4 sm:px-6 border-t border-b border-[#e8e0d8]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3">
              <span className="text-[#a0622a] flex-shrink-0">{f.icon}</span>
              <div>
                <p className="font-bold text-[#2c1209] text-xs sm:text-sm tracking-wide font-lato whitespace-nowrap">{f.title}</p>
                <p className="text-[#6b5344] text-xs leading-relaxed font-lato mt-0.5 hidden sm:block">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────────────────────── */}
      <div id="specialties" className="scroll-mt-24 md:scroll-mt-28">
        <SpecialtiesMenu />
      </div>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section id="testimonials" className="bg-white py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[#a0622a] text-[11px] font-bold tracking-[0.2em] uppercase mb-2 font-lato">
              ✦ What Our Customers Say ✦
            </p>
            <h2
              className="text-[#2c1209] font-bold"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 40px)' }}
            >
              Happy Customers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[#fdf8f3] rounded-2xl p-5 sm:p-6 shadow-sm border border-[#ede5d8]">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#a0622a">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-[#5a3e2b] text-sm leading-relaxed mb-4 font-lato italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#2c1209] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold font-lato">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-[#2c1209] font-bold text-sm font-lato">{t.name}</p>
                    <p className="text-[#a0622a] text-xs font-lato">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ───────────────────────────────────────────────────── */}
      <section id="contact" className="bg-[#2c1209] py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            <div className="bg-white/10 rounded-full p-3 sm:p-4 flex-shrink-0">
              <Cake className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h3
                className="text-xl sm:text-2xl text-white font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Craving Something Sweet?
              </h3>
              <p className="text-[#d4b896] text-sm font-lato mt-1">
                Explore our full range of baked goods made fresh for you.
              </p>
            </div>
          </div>
          <button
            onClick={scrollToMenu}
            className="border border-white text-white hover:bg-white hover:text-[#2c1209] px-6 sm:px-8 py-3 text-[11px] font-bold tracking-[0.18em] uppercase transition whitespace-nowrap font-lato flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Shop All Products
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
