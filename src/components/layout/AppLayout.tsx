import React, { useState, useRef, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Menu, X, BrainCircuit, Search, ChevronRight, 
  Github, Twitter, Mail, ExternalLink, Zap
} from 'lucide-react';
import { curriculum } from '../../data/curriculum';
import { CookieConsent } from '../CookieConsent';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const location = useLocation();

  // Close sidebar on route change on mobile
  React.useEffect(() => {
    setSidebarOpen(false);
    mainRef.current?.scrollTo(0, 0);
    document.getElementById("main-scroll")?.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle clicking outside of search
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const allTopics = curriculum.flatMap(c => c.subtopics);
  const filteredTopics = allTopics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Header */}
      <header className="shrink-0 h-16 w-full bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between">
        <div className="flex flex-1 items-center">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4 md:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <Link to="/" className="flex items-center gap-2 mr-6 text-slate-900 tracking-tight">
            <img src="/logo.svg" alt="ML Academy" className="h-9 w-auto hidden sm:block" />
            <img src="/favicon.svg" alt="ML Academy" className="h-8 w-8 sm:hidden" />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-full max-w-lg lg:max-w-xs hidden md:flex items-center relative" ref={searchRef}>
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
             <input 
               type="text" 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               onFocus={() => setIsSearchFocused(true)}
               placeholder="Search topics..." 
               className="w-full h-9 pl-9 pr-4 rounded-md border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all font-medium placeholder:text-slate-400"
             />
             {isSearchFocused && searchQuery.length > 0 && (
               <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-md shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto">
                  {filteredTopics.length > 0 ? (
                    filteredTopics.map((topic) => (
                      <Link 
                        key={topic.id} 
                        to={`/learn/${topic.id}`}
                        onClick={() => {
                          setSearchQuery('');
                          setIsSearchFocused(false);
                        }}
                        className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors border-b last:border-0 border-slate-100"
                      >
                        {topic.title}
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-slate-500 text-center">No topics found.</div>
                  )}
               </div>
             )}
          </div>
          
          <nav className="flex items-center gap-3">
            <Link to="/curriculum" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors hidden md:block">
              Curriculum
            </Link>
            <Link to="/blog" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors hidden md:block">
              Blog
            </Link>
            <Link to="/cheatsheet" className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors shadow-sm">
              <span>Free PDF</span>
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 w-[260px] bg-white border-r border-slate-200 pt-16 transition-transform duration-300 ease-in-out overflow-y-auto flex flex-col shrink-0",
            "md:static md:translate-x-0 md:pt-0 md:flex",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex-1 p-3 overflow-y-auto">
             {curriculum.map((category) => (
               <div key={category.id} className="mb-6">
                 <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 px-3">
                   {category.title}
                 </h4>
                 <div className="flex flex-col gap-0.5">
                   {category.subtopics.map((topic) => {
                     const isSelected = location.pathname === `/learn/${topic.id}`;
                     return (
                       <Link
                         key={topic.id}
                         to={`/learn/${topic.id}`}
                         className={cn(
                           "px-3 py-2 rounded-md text-sm transition-colors flex items-center",
                           isSelected 
                             ? "bg-blue-50 text-blue-600 font-semibold" 
                             : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
                         )}
                       >
                         {topic.title}
                       </Link>
                     );
                   })}
                 </div>
               </div>
             ))}
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-20 bg-slate-900/20 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main id="main-scroll" ref={mainRef} className="flex-1 overflow-y-auto bg-slate-50 flex flex-col relative">
          <div className="flex-1">
            <Outlet key={location.pathname} />
          </div>
          
          {/* Footer Component */}
          <footer className="shrink-0 border-t border-slate-200 mt-20 bg-white px-8 py-8 text-slate-500">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-medium">
              <div className="flex items-center gap-2">
                 <img src="/favicon.svg" alt="ML Academy" className="h-6 w-6" />
                 <span className="font-extrabold text-blue-600">ML.ACADEMY</span>
                 <span className="ml-2">© {new Date().getFullYear()}</span>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                 <Link to="/about" className="hover:text-slate-900 transition-colors">About Us</Link>
                 <Link to="/curriculum" className="hover:text-slate-900 transition-colors">Curriculum</Link>
                 <Link to="/blog" className="hover:text-slate-900 transition-colors">Blog</Link>
                 <Link to="/cheatsheet" className="hover:text-slate-900 transition-colors">Free Cheatsheet</Link>
                 <Link to="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
                 <Link to="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
                 <Link to="/disclaimer" className="hover:text-slate-900 transition-colors">Disclaimer</Link>
              </div>
              <div className="flex gap-4">
                 <span className="cursor-pointer hover:text-blue-600 transition-colors"><Twitter className="h-4 w-4"/></span>
                 <span className="cursor-pointer hover:text-blue-600 transition-colors"><Github className="h-4 w-4"/></span>
                 <span className="cursor-pointer hover:text-blue-600 transition-colors"><Mail className="h-4 w-4"/></span>
              </div>
            </div>
          </footer>
        </main>
      </div>
      <CookieConsent />
    </div>
  );
}
