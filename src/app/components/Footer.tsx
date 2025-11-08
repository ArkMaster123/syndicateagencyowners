'use client';

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 border-t border-white/10 relative">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-12 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl"></div>
              <span className="text-xl font-bold">Agency Syndicate</span>
            </div>
            <p className="text-white/70">Building future of digital marketing and AI together.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 text-white">Community</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-violet-400 transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Forum</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Members</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 text-white">Resources</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-violet-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Templates</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 text-white">Legal</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-violet-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-violet-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8">
          <p className="text-white/50">© 2024 Agency Owners Syndicate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
