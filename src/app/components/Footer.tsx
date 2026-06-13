import { Link } from 'react-router';
import { Mail, Instagram, MessageCircle } from 'lucide-react';
import logo from '../assets/shree-delights-logo.png';

export default function Footer() {
  return (
    <footer className="bg-[#1a0a04] text-white py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto text-center">
        <img
          src={logo}
          alt="Shree Delights"
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-full mx-auto mb-3"
        />
        <p className="text-[#c9b08a] text-sm mb-2 font-lato">
          Homemade cakes and treats, baked fresh with love
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 text-[#9a8070] text-xs sm:text-sm font-lato mt-5">
          <a href="https://wa.me/917010633745" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#d4a843] transition">
            <MessageCircle className="w-4 h-4" />
            <span>+91 7010633745</span>
          </a>
          <a href="mailto:shreedelights.service@gmail.com" className="flex items-center gap-2 hover:text-[#d4a843] transition">
            <Mail className="w-4 h-4" />
            <span>shreedelights.service@gmail.com</span>
          </a>
          <a href="https://instagram.com/_shree_delights_" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#d4a843] transition">
            <Instagram className="w-4 h-4" />
            <span>_shree_delights_</span>
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-4 text-[#9a8070] text-xs font-lato">
          <Link to="/"             className="hover:text-[#d4a843] transition">Home</Link>
          <Link to="/menu"         className="hover:text-[#d4a843] transition">Menu</Link>
          <Link to="/about"        className="hover:text-[#d4a843] transition">About</Link>
          <Link to="/testimonials" className="hover:text-[#d4a843] transition">Testimonials</Link>
          <Link to="/contact"      className="hover:text-[#d4a843] transition">Contact</Link>
          <Link to="/order"        className="hover:text-[#d4a843] transition">Order</Link>
        </div>
        <p className="text-[#6b5344] text-xs mt-4 sm:mt-5 font-lato">
          &copy; 2026 Shree Delights. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
