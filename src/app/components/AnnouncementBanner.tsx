import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function AnnouncementBanner() {
  return (
    <>
      <div className="relative overflow-hidden bg-[#2c1209] py-2.5">
        <motion.div
          animate={{ x: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 text-lg"
        >
          
        </motion.div>
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap flex items-center gap-12 text-white"
          >
            {[...Array(4)].map((_, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-sm tracking-wide">
                <Sparkles className="w-4 h-4 text-yellow-200" />
                <span>
                  🎁 <strong>Special Offer:</strong> For every order you'll get a special gift from{" "}
                  <span className="italic font-semibold text-yellow-200">Shree Delights</span>! 🎂
                </span>
                <Sparkles className="w-4 h-4 text-yellow-200" />
              </span>
            ))}
          </motion.div>
        </div>
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 text-lg"
        >
          
        </motion.div>
      </div></>
  );
}

