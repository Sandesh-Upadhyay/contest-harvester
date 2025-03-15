
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  CalendarDays, 
  BookmarkIcon, 
  Sun, 
  Moon, 
  Menu, 
  X,
  Youtube
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/hooks/use-theme";

export function Navbar() {
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  const navItems = [
    { title: "Contests", icon: <CalendarDays className="h-4 w-4 mr-2" />, href: "/" },
    { title: "Bookmarks", icon: <BookmarkIcon className="h-4 w-4 mr-2" />, href: "/bookmarks" },
    { title: "Solutions", icon: <Youtube className="h-4 w-4 mr-2" />, href: "/solutions" }
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="mr-4 flex items-center">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Contest</span>
            <span className="text-primary">Harvester</span>
          </Link>
        </div>

        {isMobile ? (
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="mr-2"
            >
              {theme === 'dark' ? 
                <Sun className="h-5 w-5" /> : 
                <Moon className="h-5 w-5" />
              }
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        ) : (
          <nav className="flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item, index) => (
              <Link 
                key={index} 
                to={item.href}
                className="flex items-center text-sm font-medium transition-colors hover:text-primary"
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
            >
              {theme === 'dark' ? 
                <Sun className="h-5 w-5" /> : 
                <Moon className="h-5 w-5" />
              }
            </Button>
          </nav>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="container py-4 flex flex-col space-y-3 border-t">
          {navItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.href}
              className="flex items-center text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
