"use client";

import dynamic from "next/dynamic";

const LeafletMapClient = dynamic(
  () => import("./LeafletMapClient"),
  { ssr: false }
);

export default function InstallMap() {
  return (
    <section className="py-28">
      <h2 className="text-center text-3xl font-bold mb-6">
        Installations Across India
      </h2>

      <div className="h-[400px] max-w-6xl mx-auto rounded-xl overflow-hidden">
        <LeafletMapClient />
      </div>
    </section>
  );
}
