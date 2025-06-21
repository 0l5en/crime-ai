
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center text-white px-6"
      style={{
        backgroundImage: `url('/lovable-uploads/bef17c67-6c7c-42bd-ad1a-2e9df5f98525.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-zinc-900 bg-opacity-60"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-200 mb-6 drop-shadow-lg whitespace-nowrap">
          Unravel the Truth, One Clue at a Time
        </h1>
        <p className="text-xl text-zinc-300 mb-8 max-w-3xl mx-auto drop-shadow-md">
          Dive into a world of mystery and intrigue with our interactive detective games. Solve complex cases, interrogate suspects, and uncover hidden secrets.
        </p>
        <Button className="bg-red-600 text-white px-8 py-3 text-lg rounded-full hover:bg-red-700 transition-colors shadow-lg">
          Explore Games
        </Button>
      </div>
    </section>
  );
};

export default Hero;
