"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"

export function Hero() {
  const [email, setEmail] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="flex min-h-[100dvh] flex-col items-center justify-center px-4 py-20">
      <div
        className={`mx-auto max-w-4xl rounded-2xl border border-foreground/10 bg-foreground/20 p-12 shadow-2xl backdrop-blur-md transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center">
          {/* Navigation */}
          <nav className="mb-16 flex items-center justify-center gap-8 text-sm">
            <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#community" className="text-foreground/80 hover:text-foreground transition-colors">
              Community
            </a>
            <a href="/community-map" className="text-foreground/80 hover:text-foreground transition-colors">
              Community Map
            </a>
            <a href="#testimonials" className="text-foreground/80 hover:text-foreground transition-colors">
              Testimonials
            </a>
          </nav>

          {/* Main Heading */}
          <h1 className="mb-6 font-serif text-6xl italic tracking-tight text-foreground sm:text-7xl md:text-8xl">
            Agency Syndicate
          </h1>

          {/* Subheading */}
          <p className="mb-4 text-3xl font-light text-foreground sm:text-4xl md:text-5xl">Scale Your Agency</p>
          <p className="mb-8 text-3xl font-light text-foreground sm:text-4xl md:text-5xl">With Elite Founders</p>

          {/* Description */}
          <p className="mx-auto mb-12 max-w-2xl text-base text-foreground/90 sm:text-lg leading-relaxed">
            Connect with 500+ progressive agency owners. Share strategies, close deals, and scale together. The
            community where serious founders collaborate.
          </p>

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="min-w-[200px] bg-foreground text-background hover:bg-foreground/90 font-medium"
            >
              Join Free Community
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-w-[200px] border-foreground/20 bg-foreground/20 text-foreground backdrop-blur-md hover:bg-foreground/30"
              onClick={() => window.location.href = '/community-map'}
            >
              Enter Community Map
            </Button>
          </div>

          {/* Email Signup */}
          <div className="mx-auto max-w-md">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-foreground/20 bg-foreground/20 text-foreground placeholder:text-foreground/50 backdrop-blur-md"
              />
              <Button className="bg-foreground text-background hover:bg-foreground/90">Join</Button>
            </div>
          </div>

          {/* Badge */}
          <div className="mt-8 inline-block rounded-full border border-foreground/20 bg-foreground/20 px-6 py-2 backdrop-blur-md">
            <p className="text-sm text-foreground/90">Trusted by 500+ Agency Owners</p>
          </div>
        </div>
      </div>
    </section>
  )
}
