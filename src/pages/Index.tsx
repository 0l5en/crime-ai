
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GameShowcase from "@/components/GameShowcase";
import GameFeatures from "@/components/GameFeatures";
import GameReviews from "@/components/GameReviews";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
      <Header />
      <Hero />
      <GameShowcase />
      <GameFeatures />
      <GameReviews />
      <Footer />
    </div>
  );
};

export default Index;
