export function Stats() {
  const stats = [
    { value: "500+", label: "Active Members" },
    { value: "2.5B+", label: "Combined Revenue" },
    { value: "48%", label: "Average Growth" },
    { value: "10,000+", label: "Resources Shared" },
  ]

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl italic text-foreground sm:text-5xl">Agency Community Hub</h2>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl border border-foreground/20 bg-foreground/20 p-8 text-center backdrop-blur-md"
            >
              <div className="mb-2 font-serif text-4xl italic text-foreground sm:text-5xl">{stat.value}</div>
              <div className="text-sm text-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
