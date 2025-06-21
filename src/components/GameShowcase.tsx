
import { Button } from "@/components/ui/button";
import GameCard from "./GameCard";
import { useCrimeCases } from "@/hooks/useCrimeCases";

const GameShowcase = () => {
  const { data: crimeCases, isLoading, error } = useCrimeCases();

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

  return (
    <section className="bg-zinc-900 text-zinc-200 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold">Latest Crime Cases</h2>
          {isLoading && (
            <div className="text-zinc-400">Loading cases...</div>
          )}
        </div>
        
        {error && (
          <div className="text-center py-16">
            <div className="text-red-400 text-xl mb-4">
              Failed to load crime cases
            </div>
            <div className="text-zinc-400">
              {error.message}
            </div>
          </div>
        )}

        {!error && !isLoading && (!crimeCases?.items || crimeCases.items.length === 0) && (
          <div className="text-center py-16">
            <div className="text-zinc-400 text-xl">
              No crime cases available
            </div>
          </div>
        )}

        {!error && crimeCases?.items && crimeCases.items.length > 0 && (
          <>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {crimeCases.items.map((crimeCase, index) => (
                <GameCard
                  key={crimeCase.id}
                  title={crimeCase.title}
                  description={crimeCase.description}
                  imageColor={getImageColor(index)}
                  caseId={crimeCase.id}
                />
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                variant="outline" 
                className="bg-transparent border-zinc-200 text-zinc-200 hover:bg-zinc-200 hover:text-zinc-900 px-8 py-3 text-lg"
              >
                View All Cases
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default GameShowcase;
