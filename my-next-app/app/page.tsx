import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import EnergyCalculator from "@/components/EnergyCalculator";
import SolarAI from "@/components/SolarAI";
import InstallMap from "@/components/IntsallMap";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <EnergyCalculator />
      <SolarAI />
      <InstallMap />
      <Stats />
      <CTA />
      <Footer />
    </>
  );
}
