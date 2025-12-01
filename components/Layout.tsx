import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Terminal, Github, Linkedin, LogIn, LogOut, Settings } from 'lucide-react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-300">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                <div className="p-2 bg-brand-500/10 rounded-lg group-hover:bg-brand-500/20 transition-colors">
                   <Terminal className="h-6 w-6 text-brand-400" />
                </div>
                <span className="font-bold text-xl text-slate-100 tracking-tight">Samiullah<span className="text-brand-500">.dev</span></span>
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link to="/" className={`${isActive('/') ? 'text-brand-400' : 'text-slate-300 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>Blog</Link>
                <Link to="/about" className={`${isActive('/about') ? 'text-brand-400' : 'text-slate-300 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>About</Link>
                {user?.isAuthenticated && (
                    <>
                        <Link to="/admin" className={`${isActive('/admin') ? 'text-brand-400' : 'text-slate-300 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>Dashboard</Link>
                        <Link to="/settings" className={`${isActive('/settings') ? 'text-brand-400' : 'text-slate-300 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>Settings</Link>
                    </>
                )}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
               <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
               </a>
               <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
               </a>
               {user?.isAuthenticated ? (
                 <button onClick={onLogout} className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition-colors ml-4">
                   <LogOut className="h-4 w-4" /> Sign Out
                 </button>
               ) : (
                 <Link to="/login" className="flex items-center gap-2 text-sm text-slate-400 hover:text-brand-400 transition-colors ml-4">
                   <LogIn className="h-4 w-4" /> Admin
                 </Link>
               )}
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-slate-900 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Blog</Link>
              <Link to="/about" className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</Link>
               {user?.isAuthenticated && (
                  <>
                      <Link to="/admin" className="text-brand-400 hover:text-brand-300 block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
                      <Link to="/settings" className="text-brand-400 hover:text-brand-300 block px-3 py-2 rounded-md text-base font-medium">Settings</Link>
                  </>
                )}
               {user?.isAuthenticated ? (
                 <button onClick={onLogout} className="text-red-400 hover:text-red-300 block px-3 py-2 rounded-md text-base font-medium w-full text-left">Sign Out</button>
               ) : (
                 <Link to="/login" className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Admin Login</Link>
               )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-slate-600" />
                <span className="text-slate-500 text-sm">© {new Date().getFullYear()} Samiullah. All rights reserved.</span>
              </div>
              <div className="flex gap-6">
                <span className="text-slate-600 text-sm">Playwright</span>
                <span className="text-slate-600 text-sm">TypeScript</span>
                <span className="text-slate-600 text-sm">Automation</span>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;