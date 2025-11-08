import { Button } from "@/components/ui/button"
import { MessageCircle, Video, FolderOpen } from "lucide-react"

export function CommunityHub() {
  return (
    <section id="community" className="px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-foreground/20 bg-foreground/20 p-8 backdrop-blur-md md:p-12 lg:p-16">
          <div className="mb-8 inline-block rounded-full border border-foreground/30 bg-foreground/30 px-4 py-1">
            <p className="text-sm font-medium text-foreground">Community Hub</p>
          </div>

          <h2 className="mb-6 font-serif text-4xl italic text-foreground sm:text-5xl md:text-6xl">
            Discord Native Community
          </h2>

          <p className="mb-12 max-w-3xl text-lg text-foreground/90 leading-relaxed">
            Real-time collaboration with 500+ agency owners. Share wins, debug challenges, and scale together in
            organized channels built for growth.
          </p>

          <div className="mb-12 grid gap-6 sm:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center">
                <MessageCircle className="mr-2 h-5 w-5 text-foreground/80" />
              </div>
              <div className="mb-1 text-2xl font-semibold text-foreground">2,500+</div>
              <div className="text-sm text-foreground/70">weekly messages</div>
            </div>
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center">
                <Video className="mr-2 h-5 w-5 text-foreground/80" />
              </div>
              <div className="mb-1 text-2xl font-semibold text-foreground">Weekly</div>
              <div className="text-sm text-foreground/70">Mastermind Calls</div>
            </div>
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center">
                <FolderOpen className="mr-2 h-5 w-5 text-foreground/80" />
              </div>
              <div className="mb-1 text-2xl font-semibold text-foreground">50+</div>
              <div className="text-sm text-foreground/70">specialized channels</div>
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 font-medium">
              Discord Community
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
