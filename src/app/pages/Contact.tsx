import { Phone, Mail, Instagram, Clock, MapPin, Heart } from 'lucide-react';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import { useCartStore } from '../store/cartStore';
import Footer from '../components/Footer';

export default function Contact() {
  const navigate = useNavigate();
  const cartCount = useCartStore((s) => s.totalItems());

  const handleOrderClick = () => {
    navigate(cartCount > 0 ? '/order' : '/menu');
  };

  return (
    <div className="min-h-screen bg-[#f5f0eb] font-lato">
      <Navbar />

      {/* Header */}
      <section className="bg-[#2c1209] py-10 sm:py-14 px-4 sm:px-6 text-center">
        <p className="text-[#d4a843] text-[11px] font-bold tracking-[0.25em] uppercase mb-3 font-lato">
          ✦ Get in Touch ✦
        </p>
        <h1
          className="text-white font-bold"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 52px)' }}
        >
          Contact Us
        </h1>
        <p
          className="text-[#d4a843] mt-2"
          style={{ fontFamily: "'Dancing Script', cursive", fontSize: 'clamp(22px, 3vw, 32px)' }}
        >
          We would love to hear from you
        </p>
      </section>

      {/* Contact cards + info */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 grid md:grid-cols-2 gap-8 sm:gap-12">

        {/* Left — contact details */}
        <div>
          <p className="text-[#a0622a] text-[11px] font-bold tracking-[0.2em] uppercase mb-3 font-lato">
            Reach Out
          </p>
          <h2
            className="text-[#2c1209] font-bold leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3.5vw, 36px)' }}
          >
            Let's Bake Something{' '}
            <span style={{ fontFamily: "'Dancing Script', cursive", color: '#a0622a' }}>
              Special Together
            </span>
          </h2>
          <p className="text-[#5a3e2b] text-[15px] leading-relaxed mb-10 font-lato">
            Have a question about an order, a custom cake request or just want to say hello?
            We are always happy to chat. Reach us through any of the channels below and we
            will get back to you as soon as possible.
          </p>

          <div className="space-y-6">
            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-[#2c1209] flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-[#d4a843]" />
              </div>
              <div>
                <p className="text-[#2c1209] font-bold text-sm font-lato">Phone / WhatsApp</p>
                <a
                  href="tel:+917010633745"
                  className="text-[#5a3e2b] text-[15px] hover:text-[#a0622a] transition font-lato"
                >
                  +91 70106 33745
                </a>
                <p className="text-[#9a8070] text-xs font-lato mt-0.5">Available 9 AM – 8 PM daily</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-[#2c1209] flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#d4a843]" />
              </div>
              <div>
                <p className="text-[#2c1209] font-bold text-sm font-lato">Email</p>
                <a
                  href="mailto:shreedelights.service@gmail.com"
                  className="text-[#5a3e2b] text-[15px] hover:text-[#a0622a] transition font-lato"
                >
                  shreedelights.service@gmail.com
                </a>
                <p className="text-[#9a8070] text-xs font-lato mt-0.5">We reply within 1 hour</p>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-[#2c1209] flex items-center justify-center flex-shrink-0">
                <Instagram className="w-5 h-5 text-[#d4a843]" />
              </div>
              <div>
                <p className="text-[#2c1209] font-bold text-sm font-lato">Instagram</p>
                <a
                  href="https://instagram.com/_shree_delights_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5a3e2b] text-[15px] hover:text-[#a0622a] transition font-lato"
                >
                  @_shree_delights_
                </a>
                <p className="text-[#9a8070] text-xs font-lato mt-0.5">Follow us for daily bakes</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-[#2c1209] flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-[#d4a843]" />
              </div>
              <div>
                <p className="text-[#2c1209] font-bold text-sm font-lato">Order Hours</p>
                <p className="text-[#5a3e2b] text-[15px] font-lato">Available any day: 8 AM – 8 PM</p>
               
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-[#2c1209] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#d4a843]" />
              </div>
              <div>
                <p className="text-[#2c1209] font-bold text-sm font-lato">Location</p>
                <p className="text-[#5a3e2b] text-[15px] font-lato">Gobichettipalayam, Erode, Tamil Nadu</p>
                <p className="text-[#9a8070] text-xs font-lato mt-0.5">Home kitchen — delivery available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — quick order card */}
        <div className="flex flex-col gap-6">
          {/* Order CTA card */}
          <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-sm border border-[#ede5d8]">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-[#a0622a] fill-[#a0622a]" />
              <h3
                className="text-[#2c1209] font-bold text-xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Ready to Order?
              </h3>
            </div>
            <p className="text-[#5a3e2b] text-sm leading-relaxed font-lato mb-6">
              Skip the back-and-forth — place your order directly through our order page.
              Fill in your details, choose your items and we will confirm within 1 hour.
            </p>
            <button
              onClick={() => handleOrderClick()}
              className="w-full bg-[#2c1209] hover:bg-[#1a0a04] text-white py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase transition font-lato"
            >
              {cartCount > 0 ? 'View My Order' : 'Browse Menu to Order'}
            </button>
          </div>

          {/* FAQ card */}
          <div className="bg-[#fdf8f3] rounded-2xl p-5 sm:p-8 border border-[#ede5d8]">
            <h3
              className="text-[#2c1209] font-bold text-lg mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Frequently Asked
            </h3>
            <div className="space-y-5">
              {[
                {
                  q: 'How far in advance should I order?',
                  a: 'At least 2–3 days for standard cakes. Custom or wedding cakes need 5–7 days notice.',
                },
                {
                  q: 'Do you deliver?',
                  a: 'We deliver within Tamil Nadu. Free delivery on orders above ₹500',
                },
                {
                  q: 'Can I customize the design?',
                  a: 'Absolutely! Share your reference and we will do our best to bring your vision to it.',
                },
                {
                  q: 'Do you cater to dietary needs?',
                  a: 'We can accommodate eggless orders. Please mention your requirements when ordering.',
                },
              ].map((faq, i) => (
                <div key={i} className="border-b border-[#e8ddd0] pb-4 last:border-0 last:pb-0">
                  <p className="text-[#2c1209] font-bold text-sm font-lato mb-1">{faq.q}</p>
                  <p className="text-[#5a3e2b] text-sm font-lato leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
