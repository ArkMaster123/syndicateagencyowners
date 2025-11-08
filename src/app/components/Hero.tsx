'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, BarChart3, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40 pb-24">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-black to-indigo-900/30"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl opacity-30"></div>
      
      <motion.div 
        initial={{ opacity: 0, filter: "blur(12px)", y: 50 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 container text-center"
      >
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)", scale: 0.95 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-block mb-6 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500/20 to-indigo-500/20 border border-violet-500/30"
        >
          <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 flex items-center gap-2">
            <Sparkles size={16} /> Trusted by 500+ Agency Owners
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, filter: "blur(12px)", y: 40 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="text-gradient">Scale Your Agency</span>
          <br />
          <span className="text-white">With Elite Founders</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/70 mb-8 text-max-width-md mx-auto leading-relaxed"
        >
          Connect with 500+ progressive agency owners. Share strategies, close deals, and scale together. The community where serious founders collaborate.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl font-bold text-lg flex items-center justify-center space-x-4 hover:shadow-2xl hover:shadow-violet-500/50 transition-all"
          >
            <MessageCircle size={20} />
            <span>Join Free Community</span>
            <ArrowRight size={20} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 glass-effect rounded-xl font-bold text-lg flex items-center justify-center space-x-4 hover:bg-white/20 transition-all border border-white/20"
          >
            <BarChart3 size={20} />
            <span>Watch Demo</span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)", y: 50 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 mx-auto max-w-4xl"
        >
            <div className="rounded-xl overflow-hidden shadow-2xl shadow-violet-500/20 border border-white/10">
              <Image 
                src="/images/hero-community-hub.webp"
                alt="Agency Community Hub"
                width={800}
                height={450}
                className="w-full animate-float"
              />
            </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
