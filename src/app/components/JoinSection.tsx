'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function JoinSection() {
  return (
    <section id="join" className="section-padding-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 to-indigo-900/20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>

      <div className="container text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)", y: 50 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1 }}
          className="glass-effect rounded-3xl p-16 border border-white/20 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)", scale: 0.9 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block mb-4 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-500/30"
          >
            <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">Join Today</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            <span className="text-gradient">Ready to Scale Faster?</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/70 mb-8 text-max-width-md mx-auto leading-relaxed"
          >
            Join 500+ agency owners building the future of digital marketing and AI. It's completely free, no commitment required.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 hover:shadow-2xl hover:shadow-violet-500/50 transition-all"
            >
              <MessageCircle size={20} />
              <span>Join Free Community</span>
              <ArrowRight size={20} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass-effect rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/30"
            >
              Schedule a Call
            </motion.button>
          </div>
          
          <div className="text-base text-white/50 flex items-center justify-center gap-4 flex-wrap">
            <span>✓ Completely free</span>
            <span className="text-white/30">•</span>
            <span>✓ No joining fee</span>
            <span className="text-white/30">•</span>
            <span>✓ Cancel anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
