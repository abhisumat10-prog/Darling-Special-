
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import HowItWorks from "../components/landing/HowItWorks";
import EvaluationFeatures from "../components/landing/EvaluationFeatures";
import FinalCTA from "../components/landing/FinalCTA";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <HowItWorks />
        <EvaluationFeatures />
        <FinalCTA />
      </main>
    </div>
  );
}
