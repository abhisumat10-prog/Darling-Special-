import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import ChallengeSection from "../components/landing/ChallengeSection";
import DesignToCodeSection from "../components/landing/DesignToCodeSection";
import ResponsiveSection from "../components/landing/ResponsiveSection";
import EvaluationSection from "../components/landing/EvaluationSection";
import AiFeedbackSection from "../components/landing/AiFeedbackSection";
import FinalCTA from "../components/landing/FinalCTA";

export default function LandingPage() {
  return (
    <div className="bg-[#080909] min-h-screen selection:bg-[#ccff00] selection:text-black">
      <Navbar />
      <main>
        <HeroSection />
        <ChallengeSection />
        <DesignToCodeSection />
        <ResponsiveSection />
        <EvaluationSection />
        <AiFeedbackSection />
        <FinalCTA />
      </main>
    </div>
  );
}
