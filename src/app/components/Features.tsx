'use client';

import { motion } from 'framer-motion';
import { Zap, TrendingUp, Target, Users, Globe, Shield } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Strategies',
    description: 'Learn cutting-edge AI implementation from founders using GPT, Claude, and custom models to scale agencies.',
    color: 'from-violet-500/20 to-violet-600/5',
    borderColor: 'border-violet-500/30'
  },
  {
    icon: TrendingUp,
    title: 'SEO Mastery Hub',
    description: 'Share and discover proven SEO tactics, algorithm updates, and case studies from top-performing agencies.',
    color: 'from-indigo-500/20 to-indigo-600/5',
    borderColor: 'border-indigo-500/30'
  },
  {
    icon: Target,
    title: 'Growth Accelerators',
    description: 'Access exclusive blueprints for scaling to 7-figures, client acquisition funnels, and revenue optimization.',
    color: 'from-cyan-500/20 to-cyan-600/5',
    borderColor: 'border-cyan-500/30'
  },
  {
    icon: Users,
    title: 'Founder Network',
    description: 'Build relationships with like-minded agency owners, form strategic partnerships, and collaborate on ventures.',
    color: 'from-emerald-500/20 to-emerald-600/5',
    borderColor: 'border-emerald-500/30'
  },
  {
    icon: Globe,
    title: 'Resource Library',
    description: 'Access templates, tools, case studies, and playbooks shared by top performers in digital marketing.',
    color: 'from-orange-500/20 to-orange-600/5',
    borderColor: 'border-orange-500/30'
  },
  {
    icon: Shield,
    title: 'Deal Flow',
    description: 'Access partnership opportunities, referral networks, and client leads shared exclusively within syndicate.',
    color: 'from-pink-500/20 to-pink-600/5',
    borderColor: 'border-pink-500/30'
  }
];

export default function Features() {
  return (
    <section id="features" className="section-padding-md relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)", y: 40 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Everything You Need to Succeed</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/70 text-max-width-lg mx-auto leading-relaxed">
            Comprehensive tools and community support designed for ambitious agency owners
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, filter: "blur(10px)", y: 40 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`group relative rounded-2xl p-8 transition-all cursor-pointer overflow-hidden border ${feature.borderColor} shadow-lg hover:shadow-2xl hover:shadow-violet-500/20`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              <div className="absolute inset-0 glass-effect"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-violet-500/30 transition-all">
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-indigo-400 transition-all">{feature.title}</h3>
                <p className="text-white/70 group-hover:text-white/90 transition-colors leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
