
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-amber-200 to-amber-100 rounded-2xl p-12 mb-8 relative overflow-hidden">
          {/* Detective silhouette placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-48 bg-slate-800 rounded-full opacity-60"></div>
          </div>
          
          {/* Rolling hills background placeholder */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-300 to-transparent opacity-50"></div>
          
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Unravel the Truth, One Clue at a Time
            </h1>
            <p className="text-xl text-slate-700 mb-8 max-w-3xl mx-auto">
              Dive into a world of mystery and intrigue with our interactive detective games. Solve complex cases, interrogate suspects, and uncover hidden secrets.
            </p>
            <Button className="bg-slate-900 text-white px-8 py-3 text-lg rounded-full hover:bg-slate-800 transition-colors">
              Explore Games
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
