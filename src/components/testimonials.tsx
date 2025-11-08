import Image from "next/image"

export function Testimonials() {
  const testimonials = [
    {
      name: "James Mitchell",
      role: "CEO, Growth Labs Agency",
      image: "/professional-man.jpg",
      quote:
        "Joined 6 months ago, closed $150K in new deals through connections made here. The level of transparency and knowledge sharing is unmatched.",
    },
    {
      name: "Sarah Chen",
      role: "Founder, AI Marketing Co",
      image: "/professional-woman-diverse.png",
      quote:
        "The AI discussions here literally saved us months of R&D. Implementing what others shared has increased our service margins by 40%.",
    },
    {
      name: "Marcus Rodriguez",
      role: "Director, SEO Dynamics",
      image: "/professional-latino-man.png",
      quote:
        "Found my technical co-founder and two major partnership opportunities. The ROI on this community is insane. Best investment I made this year.",
    },
  ]

  return (
    <section id="testimonials" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-serif text-4xl italic text-foreground sm:text-5xl md:text-6xl">
            Results from Our Members
          </h2>
          <p className="text-foreground/80">Join founders closing deals and scaling together</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-2xl border border-foreground/20 bg-foreground/20 p-8 backdrop-blur-md">
              <div className="mb-6 flex items-center gap-4">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-foreground/20 object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-foreground/70">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
