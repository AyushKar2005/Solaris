"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const testimonials = [
  {
    name: "Sunita Mahanti",
    role: "Home Owner · Keonjhar",
    rating: 5,
    avatar: "/avatars/avatar1.jpg", // female
    text: "ସୋଲାରିସ୍ ସୋଲାର୍ ଲଗାଇବା ପରେ ମୋର ବିଦ୍ୟୁତ୍ ବିଲ୍ ବହୁତ କମିଗଲା । ସମଗ୍ର ପ୍ରକ୍ରିୟା ଖୁବ୍ ସହଜ ଥିଲା ।",
  },
  {
    name: "Rajesh Kumar Sahu",
    role: "Business Owner · Keonjhar",
    rating: 4,
    avatar: "/avatars/avatar2.jpg", // male
    text: "ସୋଲାର୍ ସିଷ୍ଟମ୍ ଲଗାଇବା ପରେ ଆମ ଖର୍ଚ୍ଚ ହ୍ରାସ ପାଇଛି । ସେବା ଖୁବ୍ ଭରସାଯୋଗ୍ୟ ।",
  },
  {
    name: "Priyanka Pattnaik",
    role: "School Teacher · Keonjhar",
    rating: 5,
    avatar: "/avatars/avatar3.jpg", // female
    text: "ସୋଲାରିସ୍ ଟିମ୍ ଆମକୁ ସଠିକ୍ ପରାମର୍ଶ ଦେଲେ । ସୋଲାର୍ ନିଆଁ ନେଇ ଆମେ ଖୁବ୍ ସନ୍ତୁଷ୍ଟ ।",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true });

  // Auto-slide
  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-32 bg-black/60 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading (English) */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4"
        >
          What Our Customers Say
        </motion.h2>

        <p className="text-gray-400 mb-12">
          Real experiences from solar installations in Keonjhar
        </p>

        {/* Card */}
        <div className="relative flex justify-center">
          <AnimatePresence mode="wait">
            <TestimonialCard
              key={index}
              data={testimonials[index]}
            />
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-3 w-3 rounded-full transition ${
                i === index
                  ? "bg-gradient-to-r from-red-500 to-yellow-400 scale-125"
                  : "bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Trust Metrics (English) */}
        <TrustMetrics />
      </div>
    </section>
  );
}

/* ---------------- CARD ---------------- */

function TestimonialCard({ data }: any) {
  const ref = useRef<HTMLDivElement>(null);

  // Magnetic tilt
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;

    ref.current.style.transform = `
      rotateX(${(-y / 20).toFixed(2)}deg)
      rotateY(${(x / 20).toFixed(2)}deg)
      scale(1.03)
    `;
  };

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transform = "rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
      className="
        relative max-w-xl w-full
        p-8 rounded-2xl
        bg-white/10 backdrop-blur
        border border-white/10
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/40 via-orange-400/40 to-yellow-400/40 blur-xl opacity-60 pointer-events-none" />

      {/* Avatar */}
      <div className="relative flex justify-center mb-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-yellow-400 blur-md animate-pulse" />
          <img
            src={data.avatar}
            alt={data.name}
            className="relative h-20 w-20 rounded-full object-cover border-2 border-black"
          />
        </div>
      </div>

      {/* Stars */}
      <div className="flex justify-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: i < data.rating ? 1 : 0.7 }}
            transition={{ delay: i * 0.05 }}
            className={`text-xl ${
              i < data.rating ? "text-yellow-400" : "text-gray-500"
            }`}
          >
            ★
          </motion.span>
        ))}
      </div>

      {/* Quote (ODIA ONLY) */}
      <p className="relative text-gray-200 text-lg leading-relaxed font-odia">
        “{data.text}”
      </p>

      {/* Name & Role (English) */}
      <div className="relative mt-6">
        <p className="font-semibold text-yellow-400">
          {data.name}
        </p>
        <p className="text-sm text-gray-400">
          {data.role}
        </p>
      </div>
    </motion.div>
  );
}

/* ---------------- TRUST METRICS ---------------- */

function TrustMetrics() {
  const metrics = [
    { label: "Installations", value: 10000 },
    { label: "Cities Covered", value: 120 },
    { label: "Avg. Savings", value: 65, suffix: "%" },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mt-16">
      {metrics.map((m, i) => (
        <AnimatedMetric key={i} {...m} />
      ))}
    </div>
  );
}

function AnimatedMetric({ value, label, suffix = "" }: any) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = value / 40;

    const id = setInterval(() => {
      current += step;
      if (current >= value) {
        setCount(value);
        clearInterval(id);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(id);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl font-bold text-yellow-400">
        {count}
        {suffix}
      </p>
      <p className="text-gray-400 mt-2">{label}</p>
    </div>
  );
}
