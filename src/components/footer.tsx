import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-foreground/20 bg-foreground/10 p-8 backdrop-blur-sm md:p-12">
          <div className="grid gap-8 md:grid-cols-4">
            {/* Brand */}
            <div>
              <h3 className="mb-4 font-serif text-2xl italic text-foreground">Agency Syndicate</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Building future of digital marketing and AI together.
              </p>
            </div>

            {/* Community Links */}
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Community</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                    Forum
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                    Members
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                    Templates
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 border-t border-foreground/20 pt-8 text-center">
            <p className="text-sm text-foreground/70">© 2025 Agency Owners Syndicate. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
