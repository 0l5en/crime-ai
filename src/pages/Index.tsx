
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GameShowcase from "@/components/GameShowcase";
import GameFeatures from "@/components/GameFeatures";
import GameReviews from "@/components/GameReviews";
import Footer from "@/components/Footer";

const Index = () => {
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
