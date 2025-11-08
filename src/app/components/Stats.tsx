'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Rocket, Brain } from 'lucide-react';

const stats = [
  { value: 500, label: 'Active Members', suffix: '+', icon: Users },
  { value: 2.5, label: 'Combined Revenue', suffix: 'B+', icon: TrendingUp },
  { value: 48, label: 'Average Growth', suffix: '%', icon: Rocket },
  { value: 10000, label: 'Resources Shared', suffix: '+', icon: Brain }
];

export default function Stats() {
  const [counters, setCounters] = useState([0, 0, 0, 0]);

  useEffect(() => {
    setTimeout(() => setCounters([500, 2.5, 48, 10000]), 300);
  }, []);

  return (
    <section className="section-padding-sm relative">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ delay: index * 0.12, duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative glass-effect rounded-2xl p-8 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="text-violet-400" size={36} />
                </div>
                <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 mb-2">
                  {counters[index].toLocaleString()}{stat.suffix}
                </div>
                <div className="text-white/70 font-semibold">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
