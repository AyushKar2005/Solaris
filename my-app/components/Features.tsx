"use client";

const features = [
  {
    title: "High Efficiency",
    desc: "Advanced panels with maximum energy output",
  },
  {
    title: "Smart Storage",
    desc: "Battery systems optimized for your usage",
  },
  {
    title: "Eco Friendly",
    desc: "Reduce carbon footprint sustainably",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-28">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="
              relative group rounded-2xl p-8
              bg-white/5 backdrop-blur
              border border-white/10
              transition-all duration-300
              hover:bg-white/10
            "
          >
            {/* Glow border on hover */}
            <div
              className="
                pointer-events-none absolute inset-0 rounded-2xl
                opacity-0 group-hover:opacity-100
                transition duration-300
                bg-gradient-to-br from-red-500/40 via-orange-400/40 to-yellow-400/40
                blur-xl
              "
            />

            <h3 className="relative text-xl font-semibold text-yellow-400">
              {f.title}
            </h3>

            <p className="relative mt-3 text-gray-400">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
