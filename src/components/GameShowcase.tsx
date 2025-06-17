
import { Button } from "@/components/ui/button";
import GameCard from "./GameCard";

const GameShowcase = () => {
  const games = [
    {
      title: "Whispers of the Abandoned Manor",
      description: "Explore a haunted manor with a dark past and uncover its hidden secrets.",
      imageColor: "bg-gradient-to-br from-green-600 to-green-800"
    },
    {
      title: "The Secret of the Sunken Ship",
      description: "Dive into the depths of the ocean to solve the mystery of a lost treasure.",
      imageColor: "bg-gradient-to-br from-blue-600 to-blue-800"
    },
    {
      title: "The Riddle of the Raven's Quill",
      description: "Decipher a series of cryptic messages left by a mysterious poet.",
      imageColor: "bg-gradient-to-br from-gray-600 to-gray-800"
    }
  ];

  return (
    <section className="bg-slate-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">New Releases</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {games.map((game, index) => (
            <GameCard
              key={index}
              title={game.title}
              description={game.description}
              imageColor={game.imageColor}
            />
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            variant="outline" 
            className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3 text-lg"
          >
            View All Cases
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GameShowcase;
