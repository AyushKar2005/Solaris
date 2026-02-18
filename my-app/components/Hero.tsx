"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const yText = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yGlow = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen pt-28 flex items-center overflow-hidden"
    >
      {/* Ambient background layers (STATIC, NO CURSOR FOLLOW) */}
      <motion.div style={{ y: yGlow }} className="absolute inset-0">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-yellow-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-red-500/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        
        {/* LEFT CONTENT — UNCHANGED */}
        <motion.div
          style={{ y: yText }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-sm tracking-widest text-yellow-400 mb-4">
            CLEAN • SMART • SUSTAINABLE
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Powering the Future <br />
            <span className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              With Solar Energy
            </span>
          </h1>

          <p className="mt-6 text-gray-400 max-w-md text-lg">
            Reduce electricity bills, increase energy independence,
            and move towards a cleaner tomorrow.
          </p>

          <div className="mt-10 flex gap-8 items-center">
            <MagneticButton />

            <div className="flex gap-6 text-sm text-gray-400">
              <div>
                <p className="text-yellow-400 font-bold text-lg">10k+</p>
                <p>Installations</p>
              </div>
              <div>
                <p className="text-yellow-400 font-bold text-lg">65%</p>
                <p>Avg Savings</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE — SOLAR PANEL INSTALLATION */}
        <SolarInstallVisual />
      </div>
    </section>
  );
}

/* ---------------- RIGHT SIDE VISUAL ---------------- */

function SolarInstallVisual() {
  const [step, setStep] = useState(0); // 0–4
  const [done, setDone] = useState(false);

  const startInstall = () => {
    setDone(false);
    setStep(1);
  };

  const reset = () => {
    setStep(0);
    setDone(false);
  };

  useEffect(() => {
    if (step === 0 || step === 4) return;

    const t = setTimeout(() => {
      setStep((s) => s + 1);
      if (step === 3) setDone(true);
    }, 900);

    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="relative h-[320px] md:h-[420px] flex items-center justify-center">
      {/* Roof */}
      <div className="absolute bottom-14 w-[260px] h-[14px] bg-neutral-800 rounded-sm" />

      {/* Mount bars */}
      <AnimatePresence>
        {step >= 1 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-[78px] w-[230px] h-[6px] bg-neutral-700"
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-[88px] w-[230px] h-[6px] bg-neutral-700"
            />
          </>
        )}
      </AnimatePresence>

      {/* Solar panel */}
      <motion.div
        initial={{ y: 160, rotateX: 50, opacity: 0 }}
        animate={{
          y: step >= 2 ? 0 : 160,
          rotateX: step >= 2 ? 0 : 50,
          opacity: step >= 2 ? 1 : 0,
        }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="
          absolute bottom-[98px]
          w-[230px] h-[120px]
          bg-gradient-to-br from-slate-900 to-slate-800
          border border-white/10
          rounded-md
          shadow-xl
        "
      >
        <div className="absolute inset-2 grid grid-cols-6 grid-rows-3 gap-[2px]">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="bg-black/40 rounded-sm" />
          ))}
        </div>
      </motion.div>

      {/* Lock glow */}
      {done && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
            absolute bottom-[90px]
            w-[280px] h-[160px]
            bg-gradient-to-br from-yellow-400/30 to-orange-500/30
            blur-3xl
          "
        />
      )}

      {/* Steps */}
      <div className="absolute top-4 right-4 text-xs text-gray-400 space-y-1">
        {["Mounting", "Placing Panel", "Aligning", "Installed"].map(
          (label, i) => (
            <p
              key={i}
              className={step > i ? "text-yellow-400" : ""}
            >
              {step > i ? "✔" : "•"} {label}
            </p>
          )
        )}
      </div>

      {/* CTA */}
      <div className="absolute bottom-0 flex gap-4">
        <motion.button
          onClick={startInstall}
          whileTap={{ scale: 0.95 }}
          className="
            px-6 py-3 rounded-full font-semibold
            bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400
            text-black
          "
        >
          📞 {done ? "Installed" : "Call for Installation"}
        </motion.button>

        {done && (
          <motion.button
            onClick={reset}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-4 py-3 rounded-full border border-white/20 text-white"
          >
            ↺ Reset
          </motion.button>
        )}
      </div>
    </div>
  );
}

/* ---------------- MAGNETIC CTA ---------------- */

function MagneticButton() {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `
      translate(${(e.clientX - r.left - r.width / 2) * 0.2}px,
                ${(e.clientY - r.top - r.height / 2) * 0.2}px)
      scale(1.05)
    `;
  };

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0,0) scale(1)";
  };

  return (
    <a
      ref={ref}
      href="#calculator"
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="
        inline-block px-8 py-4 rounded-full font-semibold
        bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400
        text-black
        transition-transform
      "
    >
      Calculate Savings
    </a>
  );
}
