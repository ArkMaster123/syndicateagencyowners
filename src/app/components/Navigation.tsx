'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Gamepad2 } from 'lucide-react';
import Link from 'next/link';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <motion.nav 
      style={{ opacity: headerOpacity }}
      className="fixed top-0 w-full z-50 glass-effect border-b border-white/10 backdrop-blur-xl"
    >
      <div className="container">
        <div className="flex justify-between items-center h-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl shadow-lg shadow-violet-500/50"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl blur opacity-50 -z-10"></div>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">Agency Syndicate</span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white/70 hover:text-violet-400 transition-colors font-medium">Features</a>
            <a href="#community" className="text-white/70 hover:text-violet-400 transition-colors font-medium">Community</a>
            <a href="#testimonials" className="text-white/70 hover:text-violet-400 transition-colors font-medium">Testimonials</a>
            <Link href="/community-map" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:shadow-lg hover:shadow-violet-500/50 rounded-lg transition-all transform hover:scale-105 font-semibold">
              <Gamepad2 size={18} />
              <span>Community Map</span>
            </Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden pb-6 space-y-4">
            <a href="#features" className="block text-white/70 hover:text-violet-400 transition-colors">Features</a>
            <a href="#community" className="block text-white/70 hover:text-violet-400 transition-colors">Community</a>
            <a href="#testimonials" className="block text-white/70 hover:text-violet-400 transition-colors">Testimonials</a>
            <a href="#join" className="block text-white/70 hover:text-violet-400 transition-colors">Join</a>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
