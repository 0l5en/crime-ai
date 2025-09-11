
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import GameShowcase from "@/components/GameShowcase";
import GameFeatures from "@/components/GameFeatures";

const Index = () => {
  return (
    <div className="min-vh-100 bg-dark">
      <Header />
      <Hero />
      <GameShowcase />
      <GameFeatures />
    </div>
  );
};

export default Index;
