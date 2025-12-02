// ✅ ADD THESE 2 LINES ONLY
import { homeMetadata } from './metadata';
export const metadata = homeMetadata;

// ✅ YOUR EXISTING CODE (NO CHANGES)
import Hero from "./components/Hero";
import TrustBadges from "./components/TrustBadges";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import HomeSection from "./components/HomeSection";

export default function Home() {
  return (
   <>
    <Hero/>
    <HomeSection/>
    <FAQ/>
    <FinalCTA/>
   </>
  );
}