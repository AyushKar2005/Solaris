"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EnergyCalculator() {
  const [bill, setBill] = useState("");
  const [step, setStep] = useState(0); // controls step reveal
  const [displayValue, setDisplayValue] = useState(0);
  const [finalValue, setFinalValue] = useState(0);
  const [started, setStarted] = useState(false);

  const SAVINGS_RATE = 0.7;

  const calculate = () => {
    const value = Number(bill);
    if (!value || value <= 0) return;

    setFinalValue(Math.round(value * SAVINGS_RATE));
    setStarted(true);
    setStep(0);
    setDisplayValue(0);
  };

  /* Step-by-step progression */
  useEffect(() => {
    if (!started) return;

    const timers = [
      setTimeout(() => setStep(1), 600),   // Step 1
      setTimeout(() => setStep(2), 1400),  // Step 2
      setTimeout(() => setStep(3), 2200),  // Step 3
      setTimeout(() => animateResult(), 3000), // Final number
    ];

    return () => timers.forEach(clearTimeout);
  }, [started]);

  /* Count-up animation */
  const animateResult = () => {
    let current = 0;
    const increment = Math.max(1, finalValue / 45);

    const interval = setInterval(() => {
      current += increment;
      if (current >= finalValue) {
        setDisplayValue(finalValue);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, 30);
  };

  return (
    <section id="calculator" className="py-32 bg-black/60">
      <div className="max-w-xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-4">
          Solar Savings Calculator
        </h2>

        <p className="text-center text-gray-400 mb-10">
          Transparent, step-by-step estimation
        </p>

        {/* Card */}
        <div className="relative rounded-2xl p-8 bg-white/10 backdrop-blur border border-white/10">
          {/* Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/30 via-orange-400/30 to-yellow-400/30 blur-xl opacity-60 pointer-events-none" />

          {/* Input */}
          <label className="block text-sm text-gray-400 mb-2">
            Monthly electricity bill (₹)
          </label>

          <input
            type="number"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            placeholder="e.g. 7800"
            className="
              w-full p-4 rounded
              bg-black/40 text-white
              border border-white/20
              focus:outline-none
              focus:border-yellow-400
              focus:shadow-[0_0_20px_rgba(255,180,0,0.35)]
              transition
            "
          />

          <button
            onClick={calculate}
            className="
              w-full mt-6 py-4 rounded font-semibold
              bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400
              text-black
              hover:scale-[1.02]
              transition
            "
          >
            Calculate Savings
          </button>

          {/* Step-by-step explanation */}
          <div className="mt-8 space-y-3 text-sm text-gray-300">
            <AnimatePresence>
              {step >= 1 && (
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                >
                  1️⃣ Your monthly bill ={" "}
                  <span className="text-yellow-400">₹{bill}</span>
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {step >= 2 && (
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                >
                  2️⃣ Estimated solar offset ≈{" "}
                  <span className="text-yellow-400">70%</span>
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {step >= 3 && (
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                >
                  3️⃣ Monthly savings = ₹{bill} × 0.70
                </motion.p>
              )}
            </AnimatePresence>

            {step >= 1 && (
              <p className="italic text-gray-400">
                * Based on average residential solar installations in India
              </p>
            )}
          </div>

          {/* Final result */}
          <AnimatePresence>
            {displayValue > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 text-center"
              >
                <p className="text-gray-400 mb-2">
                  Estimated monthly savings
                </p>

                <p className="text-4xl font-bold text-yellow-400">
                  ₹{displayValue}
                </p>

                {displayValue === finalValue && (
                  <p className="mt-2 text-sm text-green-400">
                    That’s real money saved every month 🌞
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
