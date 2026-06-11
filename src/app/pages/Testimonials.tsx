import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const testimonials = [

  {
    name: 'Meena Krishnan',
    role: 'Regular Customer',
    text: 'Ordered brownies three times now and they never disappoint. Fudgy, rich and perfectly baked — my whole family is obsessed!',
    initials: 'MK',
  },
  {
    name: 'Divya Ramesh',
    role: 'First-time Customer',
    text: 'Tried the cheesecake for the first time and am completely hooked. The crust was buttery, the filling was smooth and the taste was just perfect.',
    initials: 'DR',
  },
  {
    name: 'Karthik Venkat',
    role: 'Anniversary Order',
    text: 'Surprised my wife with a custom anniversary cake and she was in tears — happy tears! The decoration was exactly as requested and the flavour was incredible.',
    initials: 'KV',
  },
  {
    name: 'Shalini Mohan',
    role: 'Regular Customer',
    text: 'The red velvet cake is absolutely divine. Moist, fluffy and the cream cheese frosting is spot on. Nothing compares to a home-baked cake made with real care.',
    initials: 'SM',
  },
  {
    name: 'Arjun Das',
    role: 'Birthday Order',
    text: 'Placed my order just two days before the birthday and they delivered perfectly on time. The cake looked amazing and tasted even better. Will order again for sure.',
    initials: 'AD',
  },
];

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-[#f5f0eb] font-lato">
      <Navbar />

      {/* Header */}
      <section className="bg-[#2c1209] py-10 sm:py-14 px-4 sm:px-6 text-center">
        <p className="text-[#d4a843] text-[11px] font-bold tracking-[0.25em] uppercase mb-3 font-lato">
          ✦ What People Say ✦
        </p>
        <h1
          className="text-white font-bold"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 5vw, 52px)' }}
        >
          Happy Customers
        </h1>
        <p
          className="text-[#d4a843] mt-2"
          style={{ fontFamily: "'Dancing Script', cursive", fontSize: 'clamp(20px, 3vw, 32px)' }}
        >
          Real stories, real love
        </p>
      </section>

      {/* Stats strip */}
      <section className="bg-white border-b border-[#e8e0d8] py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
          {[
            { value: '100+', label: 'Orders' },
            { value: '100%', label: 'Made with Love' },
            { value: '4.5 ★', label: 'Rating' },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-[#2c1209] font-bold" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px, 4vw, 40px)' }}>
                {s.value}
              </p>
              <p className="text-[#a0622a] text-[10px] sm:text-sm font-lato mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#ede5d8] hover:shadow-md transition flex flex-col"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#a0622a">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-[#5a3e2b] text-sm leading-relaxed italic font-lato flex-1 mb-4">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#2c1209] flex items-center justify-center flex-shrink-0">
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
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
