
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-900 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
            <div className="w-4 h-4 bg-slate-900 rounded-sm"></div>
          </div>
          <span className="text-xl font-semibold">Mystery Solvers</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="hover:text-gray-300 transition-colors">Games</a>
          <a href="#" className="hover:text-gray-300 transition-colors">How to Play</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Community</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Aboutzzzzzzzz</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900">
            Play Now
          </Button>
          <Button className="bg-white text-slate-900 hover:bg-gray-200">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
