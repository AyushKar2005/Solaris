"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz8rHvFboQC9aCSq6GTdV_hg5dod71hSK0Qvi56G2bAH2EVF7Ls9v0AKe_ST4pNGVM_/exec";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;

    try {
      // 1️⃣ Fetch IP-based location (NO permission prompt)
      const locRes = await fetch("https://ipapi.co/json/");
      const location = await locRes.json();

      // 2️⃣ Prepare payload
      const payload = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        message: form.message.value,

        city: location.city,
        region: location.region,
        country: location.country_name,
        ip: location.ip,
      };

      // 3️⃣ Send to Google Apps Script
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-black/50 relative">
      <div className="max-w-xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-yellow-400 mb-4"
        >
          Let’s Talk Solar
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 mb-10"
        >
          Get expert guidance tailored to your energy needs
        </motion.p>

        {/* Glass Card */}
        <div className="relative rounded-2xl p-8 bg-white/10 backdrop-blur border border-white/10 overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-orange-400/20 to-yellow-400/20 blur-2xl opacity-60 pointer-events-none" />

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="relative space-y-6"
              >
                <FloatingInput name="name" label="Name" type="text" />
                <FloatingInput name="email" label="Email" type="email" />
                <FloatingInput name="phone" label="Phone" type="tel" />
                <FloatingTextarea name="message" label="Message" />

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  disabled={loading}
                  className="
                    w-full py-4 rounded-full font-semibold
                    bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400
                    text-black
                    shadow-[0_0_30px_rgba(255,180,0,0.35)]
                    hover:shadow-[0_0_45px_rgba(255,180,0,0.5)]
                    transition
                    disabled:opacity-60
                  "
                >
                  {loading ? "Sending..." : "Send Message"}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative text-center py-10"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-4xl mb-4"
                >
                  🌞
                </motion.div>

                <h3 className="text-2xl font-semibold text-yellow-400 mb-2">
                  Message Sent!
                </h3>

                <p className="text-gray-400">
                  Our solar experts will reach out shortly.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FLOATING INPUTS ---------------- */

function FloatingInput({
  name,
  label,
  type,
}: {
  name: string;
  label: string;
  type: string;
}) {
  return (
    <div className="relative">
      <input
        name={name}
        type={type}
        required
        className="
          peer w-full px-4 pt-6 pb-3 rounded
          bg-black/40 text-white
          border border-white/20
          focus:outline-none
          focus:border-yellow-400
          focus:shadow-[0_0_20px_rgba(255,180,0,0.3)]
          transition
        "
      />
      <label
        className="
          absolute left-4 top-4 text-sm text-gray-400
          peer-focus:text-yellow-400
          peer-focus:-translate-y-3 peer-focus:scale-90
          peer-valid:-translate-y-3 peer-valid:scale-90
          transition
          pointer-events-none
        "
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  return (
    <div className="relative">
      <textarea
        name={name}
        rows={4}
        required
        className="
          peer w-full px-4 pt-6 pb-3 rounded
          bg-black/40 text-white
          border border-white/20
          focus:outline-none
          focus:border-yellow-400
          focus:shadow-[0_0_20px_rgba(255,180,0,0.3)]
          transition
          resize-none
        "
      />
      <label
        className="
          absolute left-4 top-4 text-sm text-gray-400
          peer-focus:text-yellow-400
          peer-focus:-translate-y-3 peer-focus:scale-90
          peer-valid:-translate-y-3 peer-valid:scale-90
          transition
          pointer-events-none
        "
      >
        {label}
      </label>
    </div>
  );
}
