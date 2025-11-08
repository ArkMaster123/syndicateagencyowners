import { Sparkles, TrendingUp, Rocket, Users, Library, Handshake } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Strategies",
      description:
        "Learn cutting-edge AI implementation from founders using GPT, Claude, and custom models to scale agencies.",
    },
    {
      icon: TrendingUp,
      title: "SEO Mastery Hub",
      description:
        "Share and discover proven SEO tactics, algorithm updates, and case studies from top-performing agencies.",
    },
    {
      icon: Rocket,
      title: "Growth Accelerators",
      description:
        "Access exclusive blueprints for scaling to 7-figures, client acquisition funnels, and revenue optimization.",
    },
    {
      icon: Users,
      title: "Founder Network",
      description:
        "Build relationships with like-minded agency owners, form strategic partnerships, and collaborate on ventures.",
    },
    {
      icon: Library,
      title: "Resource Library",
      description:
        "Access templates, tools, case studies, and playbooks shared by top performers in digital marketing.",
    },
    {
      icon: Handshake,
      title: "Deal Flow",
      description:
        "Access partnership opportunities, referral networks, and client leads shared exclusively within syndicate.",
    },
  ]

  return (
    <section id="features" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-serif text-4xl italic text-foreground sm:text-5xl md:text-6xl">
            Everything You Need to Succeed
          </h2>
          <p className="mx-auto max-w-2xl text-foreground/80 leading-relaxed">
            Comprehensive tools and community support designed for ambitious agency owners
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl border border-foreground/20 bg-foreground/20 p-8 backdrop-blur-md transition-all hover:bg-foreground/30"
            >
              <div className="mb-4 inline-flex rounded-xl bg-foreground/30 p-3">
                <feature.icon className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
