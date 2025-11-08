import { Button } from "@/components/ui/button"

export function FinalCTA() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <div className="rounded-3xl border border-foreground/20 bg-foreground/20 p-8 backdrop-blur-md md:p-12 lg:p-16">
          <div className="mb-8 inline-block rounded-full border border-foreground/30 bg-foreground/30 px-4 py-1">
            <p className="text-sm font-medium text-foreground">Join Today</p>
          </div>

          <h2 className="mb-6 font-serif text-4xl italic text-foreground sm:text-5xl md:text-6xl">
            Ready to Scale Faster?
          </h2>

          <p className="mb-12 text-lg text-foreground/90 leading-relaxed">
            Join 500+ agency owners building the future of digital marketing and AI. It's completely free, no commitment
            required.
          </p>

          <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
            >
              Schedule a Call
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-foreground/70">
            <span className="flex items-center">
              <span className="mr-2">✓</span> Completely free
            </span>
            <span>•</span>
            <span className="flex items-center">
              <span className="mr-2">✓</span> No joining fee
            </span>
            <span>•</span>
            <span className="flex items-center">
              <span className="mr-2">✓</span> Cancel anytime
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
