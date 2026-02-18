"use client";
import { useState } from "react";

export default function SolarAI() {
  const [area, setArea] = useState(100);

  const result =
    area < 80 ? "3kW System" : area < 150 ? "5kW System" : "10kW+ System";

  return (
    <section className="py-24 bg-black/30">
      <div className="max-w-xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold">AI Solar Recommendation</h2>
        <input
          type="number"
          value={area}
          onChange={(e) => setArea(+e.target.value)}
          className="w-full mt-6 p-3 rounded bg-white/10"
          placeholder="Roof area (sq m)"
        />
        <p className="mt-6 text-primary font-semibold">{result}</p>
      </div>
    </section>
  );
}
