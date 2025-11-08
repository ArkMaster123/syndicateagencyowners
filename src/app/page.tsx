import { Background } from "@/components/background"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Features } from "@/components/features"
import { CommunityHub } from "@/components/community-hub"
import { Testimonials } from "@/components/testimonials"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="p-inset min-h-screen w-full">
      <div className="relative w-full">
        <Background src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alt-g7Cv2QzqL3k6ey3igjNYkM32d8Fld7.mp4" placeholder="/alt-placeholder.png" />
        <div className="relative z-10">
          <Hero />
          <Stats />
          <Features />
          <CommunityHub />
          <Testimonials />
          <FinalCTA />
          <Footer />
        </div>
      </div>
    </main>
  )
}