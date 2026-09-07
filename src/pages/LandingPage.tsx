import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import ChallengeStepsSection from "../components/landing/ChallengeStepsSection";
import ChallengeSection from "../components/landing/ChallengeSection";
import DesignToCodeSection from "../components/landing/DesignToCodeSection";
import ResponsiveSection from "../components/landing/ResponsiveSection";
import EvaluationSection from "../components/landing/EvaluationSection";
import AiFeedbackSection from "../components/landing/AiFeedbackSection";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="bg-[#F7F5EE] min-h-screen text-[#233E31] selection:bg-[#2D4A3E] selection:text-[#F7F5EE]">
      <Navbar />
      <main>
        {/* 1. Hero */}
        <HeroSection />
        
        {/* 2. Challenge Yourself (01 Practice, 02 Build, 03 Test, 04 Improve) */}
        <ChallengeStepsSection />
        
        {/* 3. Real designs. Real challenges. (3-card catalog) */}
        <ChallengeSection />
        
        {/* 4. From design to code. (Side-by-side Spec Guide & Code editor) */}
        <DesignToCodeSection />
        
        {/* 5. It should look good everywhere. (Responsive browser mock) */}
        <ResponsiveSection />
        
        {/* 6. How close did you get? (4 Circular score rings & big 78%) */}
        <EvaluationSection />
        
        {/* 7. Detailed feedback. Real improvement. (AI Bamboo Auditor) */}
        <AiFeedbackSection />
      </main>
      
      {/* 8. Minimal Editorial Footer */}
      <Footer />
    </div>
  );
}
