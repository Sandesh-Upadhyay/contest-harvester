
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Contest } from '@/types/contest';
import { useToast } from '@/components/ui/use-toast';

interface BookmarksContextProps {
  bookmarkedContests: string[];
  toggleBookmark: (contest: Contest) => void;
  isBookmarked: (id: string) => boolean;
}

const BookmarksContext = createContext<BookmarksContextProps>({
  bookmarkedContests: [],
  toggleBookmark: () => {},
  isBookmarked: () => false,
});

export const BookmarksProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarkedContests, setBookmarkedContests] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load bookmarks from localStorage on initial load
    const savedBookmarks = localStorage.getItem('bookmarkedContests');
    if (savedBookmarks) {
      setBookmarkedContests(JSON.parse(savedBookmarks));
    }
  }, []);

  useEffect(() => {
    // Save bookmarks to localStorage whenever they change
    localStorage.setItem('bookmarkedContests', JSON.stringify(bookmarkedContests));
  }, [bookmarkedContests]);

  const toggleBookmark = (contest: Contest) => {
    setBookmarkedContests(prevBookmarks => {
      const isCurrentlyBookmarked = prevBookmarks.includes(contest.id);
      
      if (isCurrentlyBookmarked) {
        toast({
          description: `Removed "${contest.name}" from bookmarks`,
        });
        return prevBookmarks.filter(id => id !== contest.id);
      } else {
        toast({
          description: `Added "${contest.name}" to bookmarks`,
        });
        return [...prevBookmarks, contest.id];
      }
    });
  };

  const isBookmarked = (id: string) => {
    return bookmarkedContests.includes(id);
  };

  return (
    <BookmarksContext.Provider value={{ bookmarkedContests, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarksContext);
