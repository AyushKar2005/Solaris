export default function Stats() {
  return (
    <section className="py-20 text-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {["12k+ Homes", "30 Years", "99% Efficiency", "24/7 Support"].map(
          (s, i) => (
            <div key={i} className="text-2xl font-bold text-primary">
              {s}
            </div>
          )
        )}
      </div>
    </section>
  );
}
