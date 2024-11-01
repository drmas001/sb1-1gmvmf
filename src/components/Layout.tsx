import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Wrench, Star, Layout as LayoutIcon } from 'lucide-react';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Wrench className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">RepairGuide</h1>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link 
                to="/categories"
                className={`flex items-center space-x-1 ${
                  location.pathname.startsWith('/categories') 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <LayoutIcon className="h-6 w-6" />
                <span className="hidden sm:inline">Categories</span>
              </Link>
              <Link 
                to="/favorites"
                className={`flex items-center space-x-1 ${
                  location.pathname === '/favorites' 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Star className="h-6 w-6" />
                <span className="hidden sm:inline">Favorites</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;