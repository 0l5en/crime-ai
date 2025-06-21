
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center text-white px-6"
      style={{
        backgroundImage: `url('/lovable-uploads/0c23fbde-804a-442a-9f4a-042a61984786.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Unravel the Truth, One Clue at a Time
        </h1>
        <p className="text-xl text-white mb-8 max-w-3xl mx-auto drop-shadow-md">
          Dive into a world of mystery and intrigue with our interactive detective games. Solve complex cases, interrogate suspects, and uncover hidden secrets.
        </p>
        <Button className="bg-white text-slate-900 px-8 py-3 text-lg rounded-full hover:bg-gray-100 transition-colors shadow-lg">
          Explore Games
        </Button>
      </div>
    </section>
  );
};

export default Hero;
