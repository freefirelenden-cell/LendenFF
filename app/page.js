import Hero from "./components/Hero";
import TrustBadges from "./components/TrustBadges";
// import DesireSection from "./components/DesireSection";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import HomeSection from "./components/HomeSection";

export default function Home() {
  return (
   <>
    <Hero/>
    <TrustBadges />
    {/* <DesireSection/> */}
    <HomeSection/>
    <FAQ/>
    <FinalCTA/>
   </>
  );
}
