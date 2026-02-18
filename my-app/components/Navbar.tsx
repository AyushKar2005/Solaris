"use client";
import { motion } from "framer-motion";

const links = [
  { name: "Features", href: "#features" },
  { name: "Savings", href: "#calculator" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="
        fixed top-0 w-full z-50
        bg-black/60 backdrop-blur
        border-b border-white/10
        shadow-[0_0_30px_rgba(255,180,0,0.15)]
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-xl font-bold text-yellow-400">
          Solaris
        </span>

        <div className="flex gap-8 text-sm">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="
                relative group
                text-gray-300 hover:text-yellow-400
                transition-colors
              "
            >
              {link.name}

              {/* underline animation */}
              <span
                className="
                  absolute left-0 -bottom-1 h-[2px] w-full
                  scale-x-0 group-hover:scale-x-100
                  origin-left transition-transform duration-300
                  bg-gradient-to-r from-red-500 to-yellow-400
                "
              />
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
