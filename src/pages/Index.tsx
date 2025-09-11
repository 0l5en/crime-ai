
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GameShowcase from "@/components/GameShowcase";
import GameFeatures from "@/components/GameFeatures";
import GameReviews from "@/components/GameReviews";

const Index = () => {
  return (
    <div className="min-vh-100 bg-dark">
      <Header />
      <Hero />
      <GameShowcase />
      <GameFeatures />
      <GameReviews />
    </div>
  );
};

export default Index;
