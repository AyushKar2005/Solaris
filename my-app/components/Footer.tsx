export default function Footer() {
  return (
    <footer className="relative bg-black/60 border-t border-white/10 overflow-hidden">
      
      {/* Ambient top glow */}
      <div
        className="
          absolute top-0 left-1/2 -translate-x-1/2
          w-[600px] h-[200px]
          bg-gradient-to-r from-red-500/20 via-orange-400/30 to-yellow-400/20
          blur-3xl
          pointer-events-none
        "
      />

      <div className="relative max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        
        {/* BRAND */}
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Solaris
          </h3>

          <p className="mt-4 text-sm text-gray-400 max-w-xs leading-relaxed">
            Powering a sustainable future with smart, efficient solar
            energy solutions for homes and businesses.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h4 className="font-semibold mb-4 text-white">
            Quick Links
          </h4>

          <ul className="space-y-3 text-sm text-gray-400">
            {[
              { label: "Features", href: "#features" },
              { label: "Savings Calculator", href: "#calculator" },
              { label: "Contact Us", href: "#contact" },
              { label: "Pricing", href: "#" },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="
                    relative inline-block
                    hover:text-white
                    transition
                    after:absolute after:left-0 after:-bottom-1
                    after:h-[1px] after:w-0
                    after:bg-gradient-to-r after:from-red-500 after:to-yellow-400
                    after:transition-all
                    hover:after:w-full
                  "
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="font-semibold mb-4 text-white">
            Contact
          </h4>

          <p className="text-sm text-gray-400 leading-relaxed">
            📍 Keonjhar, Odisha, India <br />
            📧 support@solaris.energy <br />
            ☎️ +91 9911107898
          </p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative text-center text-xs text-gray-500 py-5 border-t border-white/10">
        © {new Date().getFullYear()} Solaris Energy. All rights reserved.
      </div>
    </footer>
  );
}
