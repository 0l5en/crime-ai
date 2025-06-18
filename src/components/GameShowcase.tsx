
import { Button } from "@/components/ui/button";
import GameCard from "./GameCard";
import { useCrimeCases } from "@/hooks/useCrimeCases";

const GameShowcase = () => {
  const { data: crimeCases, isLoading, error } = useCrimeCases();

  // Fallback games for when API is not available
  const fallbackGames = [
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

  // Generate gradient colors for crime cases
  const getImageColor = (index: number) => {
    const colors = [
      "bg-gradient-to-br from-red-600 to-red-800",
      "bg-gradient-to-br from-blue-600 to-blue-800",
      "bg-gradient-to-br from-green-600 to-green-800",
      "bg-gradient-to-br from-purple-600 to-purple-800",
      "bg-gradient-to-br from-orange-600 to-orange-800",
      "bg-gradient-to-br from-teal-600 to-teal-800",
    ];
    return colors[index % colors.length];
  };

  // Use API data if available, otherwise use fallback
  const games = crimeCases?.items?.length 
    ? crimeCases.items.map((crimeCase, index) => ({
        title: crimeCase.title,
        description: crimeCase.description,
        imageColor: getImageColor(index)
      }))
    : fallbackGames;

  return (
    <section className="bg-slate-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold">
            {crimeCases?.items?.length ? 'Latest Crime Cases' : 'New Releases'}
          </h2>
          {isLoading && (
            <div className="text-gray-400">Loading cases...</div>
          )}
          {error && (
            <div className="text-red-400 text-sm">
              Using demo cases (API unavailable)
            </div>
          )}
        </div>
        
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
