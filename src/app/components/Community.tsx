'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Users, Star } from 'lucide-react';
import Image from 'next/image';

export default function Community() {
  return (
    <section id="community" className="relative pt-24 pb-32">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, filter: "blur(12px)", x: -60 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            transition={{ duration: 0.9 }}
            className="text-max-width-sm"
          >
            <div className="inline-block mb-6 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30">
              <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Community Hub</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">Discord Native</span>
              <br />
              <span className="text-white">Community</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/70 mb-8 leading-relaxed">
              Real-time collaboration with 500+ agency owners. Share wins, debug challenges, and scale together in organized channels built for growth.
            </p>
            
            <div className="space-y-5 mb-8">
              {[
                { icon: MessageCircle, label: 'Real-Time Conversations', desc: '2,500+ weekly messages' },
                { icon: Users, label: 'Weekly Mastermind Calls', desc: 'Live strategy sessions' },
                { icon: Star, label: 'Exclusive Resources', desc: '50+ specialized channels' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-violet-500/30 transition-all">
                    <item.icon size={24} className="text-violet-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1">{item.label}</div>
                    <div className="text-white/60">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, filter: "blur(12px)", x: 60 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
              <div className="rounded-xl overflow-hidden shadow-2xl shadow-indigo-500/20 border border-white/10">
                <Image 
                  src="/images/discord-community.webp"
                  alt="Discord Community"
                  width={600}
                  height={400}
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
