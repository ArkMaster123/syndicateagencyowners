'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Users, TrendingUp, Globe, Zap, Shield, Star, MessageCircle, BarChart3, Target, Award, Clock, CheckCircle, Menu, X } from 'lucide-react';

const stats = [
  { value: 500, label: 'Active Members', suffix: '+' },
  { value: 2.5, label: 'Combined Revenue', suffix: 'B+' },
  { value: 48, label: 'Average Growth', suffix: '%' },
  { value: 10000, label: 'Resources Shared', suffix: '+' }
];

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Strategies',
    description: 'Learn cutting-edge AI implementation strategies from founders using GPT, Claude, and custom models to scale agencies.'
  },
  {
    icon: TrendingUp,
    title: 'SEO Mastery Hub',
    description: 'Share and discover proven SEO tactics, algorithm updates analysis, and case studies from top-performing agencies.'
  },
  {
    icon: Target,
    title: 'Growth Accelerators',
    description: 'Access exclusive blueprints for scaling to 7-figures, client acquisition funnels, and revenue optimization.'
  },
  {
    icon: Users,
    title: 'Founder Network',
    description: 'Build relationships with like-minded agency owners, form strategic partnerships, and collaborate on ventures.'
  },
  {
    icon: Globe,
    title: 'Resource Library',
    description: 'Access templates, tools, case studies, and playbooks shared by top performers in digital marketing.'
  },
  {
    icon: Shield,
    title: 'Deal Flow',
    description: 'Access partnership opportunities, referral networks, and client leads shared exclusively within the syndicate.'
  }
];

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

const countries = ['🇺🇸 USA', '🇬🇧 UK', '🇨🇦 Canada', '🇦🇺 Australia', '🇩🇪 Germany', '+ 50 more countries'];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [counters, setCounters] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounters([500, 2.5, 48, 10000]);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white scroll-smooth">
      {/* Navigation */}
      <motion.nav 
        style={{ opacity: headerOpacity }}
        className="fixed top-0 w-full z-50 glass-effect border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-lg"></div>
              <span className="text-xl font-bold">Agency Syndicate</span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="hover:text-violet-400 transition-colors">Features</a>
              <a href="#community" className="hover:text-violet-400 transition-colors">Community</a>
              <a href="#testimonials" className="hover:text-violet-400 transition-colors">Testimonials</a>
              <a href="#join" className="hover:text-violet-400 transition-colors">Join</a>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden glass-effect border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block hover:text-violet-400 transition-colors">Features</a>
              <a href="#community" className="block hover:text-violet-400 transition-colors">Community</a>
              <a href="#testimonials" className="block hover:text-violet-400 transition-colors">Testimonials</a>
              <a href="#join" className="block hover:text-violet-400 transition-colors">Join</a>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-black to-indigo-900/20"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-gradient">Agency Syndicate</span>
            <br />
            <span className="text-3xl md:text-5xl text-white/90">The Community for Progressive Agency Owners</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto"
          >
            Connect, collaborate, and scale your SEO, digital marketing, and AI-powered agency with founders who get it.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-violet-700 hover:to-indigo-700 transition-all animate-pulse-glow"
            >
              <MessageCircle size={20} />
              <span>Join Our Discord</span>
              <ArrowRight size={20} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass-effect rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-white/10 transition-all"
            >
              <BarChart3 size={20} />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="relative max-w-5xl mx-auto"
          >
            <img 
              src="https://replicate.delivery/xezq/TSx4U3lK8AorApnN18B5fANimQcN75xrfJjON0K5vxmSjDnVA/out-0.webp"
              alt="Agency Community Hub"
              className="rounded-2xl shadow-2xl w-full animate-float"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {counters[index].toLocaleString()}{stat.suffix}
                </div>
                <div className="text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">What You Get</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Built for Digital Leaders - Everything you need to grow, collaborate, and stay ahead.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-effect rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gradient">Discord Native Community</span>
              </h2>
              <p className="text-xl text-white/70 mb-6">
                Where Serious Founders Connect - Our Discord community is organized into specialized channels for every aspect of your business.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center">
                    <MessageCircle size={16} />
                  </div>
                  <span>Real-Time Conversations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                    <Users size={16} />
                  </div>
                  <span>Weekly Mastermind Calls</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <Star size={16} />
                  </div>
                  <span>Exclusive Resources</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 glass-effect rounded-lg">
                  <div className="text-2xl font-bold text-violet-400">2,500+</div>
                  <div className="text-sm text-white/70">conversations weekly</div>
                </div>
                <div className="text-center p-4 glass-effect rounded-lg">
                  <div className="text-2xl font-bold text-indigo-400">50+</div>
                  <div className="text-sm text-white/70">resource channels</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <img 
                src="https://replicate.delivery/xezq/9J5fH0N1xWyRU6ccfdotce3WbILUbSf2f0USlujCxVADbc4sC/out-0.webp"
                alt="Discord Community"
                className="rounded-2xl shadow-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">What Members Say</span>
            </h2>
            <p className="text-xl text-white/70">Trusted by Industry Leaders</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass-effect rounded-xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-white/70">{testimonial.role}</div>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-white/80 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section id="join" className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-2xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">100% Free Community</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Ready to Join 500+ Founders Changing the Game?
            </p>
            <p className="text-lg text-white/60 mb-8">
              Stop competing alone. Start collaborating with the smartest agency owners building the future of digital marketing and AI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-violet-700 hover:to-indigo-700 transition-all animate-pulse-glow"
              >
                <MessageCircle size={20} />
                <span>Join Free Community</span>
                <ArrowRight size={20} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass-effect rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                Schedule a Call
              </motion.button>
            </div>
            
            <div className="text-sm text-white/50">
              Completely free • No joining fee • Cancel anytime • No commitment required
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-lg"></div>
                <span className="text-xl font-bold">Agency Syndicate</span>
              </div>
              <p className="text-white/70">Building future of digital marketing and AI together.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-violet-400 transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Forum</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Members</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-violet-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Templates</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-violet-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-white/50 mb-4 md:mb-0">
                © 2024 Agency Owners Syndicate. All rights reserved.
              </p>
              
              <div className="flex items-center space-x-4">
                <span className="text-white/50">Trusted by agency owners from</span>
                <div className="flex space-x-2">
                  {countries.map((country, index) => (
                    <span key={index} className="text-sm">{country}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
