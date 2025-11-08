'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'James Mitchell',
    role: 'CEO, Growth Labs Agency',
    image: 'https://replicate.delivery/xezq/xAjQUcuaVrKxMNLHfb4ffpJ1wtYy6LwxyCserIQMZxG1NOcWB/out-1.webp',
    content: 'Joined 6 months ago, closed $150K in new deals through connections made here. The level of transparency and knowledge sharing is unmatched.',
    rating: 5
  },
  {
    name: 'Sarah Chen',
    role: 'Founder, AI Marketing Co',
    image: 'https://replicate.delivery/xezq/7Sf3lj2JuxRmDy4pujFVZcJT90hGwpXyuuVneke54Dl7GHOrA/out-0.webp',
    content: 'The AI discussions here literally saved us months of R&D. Implementing what others shared has increased our service margins by 40%.',
    rating: 5
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Director, SEO Dynamics',
    image: 'https://replicate.delivery/xezq/Pe1XeVQXCOhSFkUB564u5ReuTSv79F4OOth0jg1qBtP6GHOrA/out-2.webp',
    content: 'Found my technical co-founder and two major partnership opportunities. The ROI on this community is insane. Best investment I made this year.',
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding-md relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)", y: 40 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Results from Our Members</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/70 text-max-width-lg mx-auto leading-relaxed">Join founders closing deals and scaling together</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, filter: "blur(10px)", y: 40 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ delay: index * 0.12, duration: 0.7 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="glass-effect rounded-2xl p-8 hover:bg-white/10 transition-all border border-white/10 group shadow-lg hover:shadow-2xl hover:shadow-violet-500/10"
            >
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full mr-4 object-cover border-2 border-violet-500/30"
                />
                <div>
                  <div className="font-bold text-lg">{testimonial.name}</div>
                  <div className="text-sm text-white/60">{testimonial.role}</div>
                </div>
              </div>
              
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              
              <p className="text-white/90 leading-relaxed italic text-base">&ldquo;{testimonial.content}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
