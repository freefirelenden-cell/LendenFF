"use client";

import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Hero from "./components/Hero";
import HomeSection from "./components/HomeSection";
import TrustBadges from "./components/TrustBadges";

export default function HomePage() {

  return (
    <div>
      <Hero />
      <TrustBadges />
      <HomeSection />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
