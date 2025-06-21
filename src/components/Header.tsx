import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useKeycloak } from "@/contexts/KeycloakContext";

const Header = () => {
  const { authenticated, user, login, logout, hasRole } = useKeycloak();

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
            <div className="w-4 h-4 bg-slate-900 rounded-sm"></div>
          </div>
          <span className="text-xl font-semibold">Mystery Solvers</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {authenticated ? (
            <>
              {/* Admin button - only visible to admin users */}
              {hasRole('admin') && (
                <Link to="/admin">
                  <Button 
                    variant="outline" 
                    className="bg-transparent border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                  >
                    Admin
                  </Button>
                </Link>
              )}
              
              {user && (
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-sm font-medium">{user.name || user.email}</div>
                    <div className="text-xs text-gray-300">
                      {user.roles.join(', ') || 'No roles'}
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </div>
              )}
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900"
                onClick={() => login()}
              >
                Sign In
              </Button>
              <Button className="bg-white text-slate-900 hover:bg-gray-200">
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
