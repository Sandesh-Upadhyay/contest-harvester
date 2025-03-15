
import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ContestFilters } from '@/components/contests/ContestFilters';
import { ContestList } from '@/components/contests/ContestList';
import { PlatformFilters } from '@/types/contest';
import { useBookmarks } from '@/hooks/use-bookmarks';

const Bookmarks = () => {
  const { bookmarkedContests } = useBookmarks();
  const [platformFilters, setPlatformFilters] = useState<PlatformFilters>({
    codeforces: true,
    codechef: true,
    leetcode: true,
  });
  
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Bookmarked Contests</h1>
          <p className="text-muted-foreground mt-1">
            View your saved contests here.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          <aside>
            <ContestFilters 
              platformFilters={platformFilters}
              setPlatformFilters={setPlatformFilters}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </aside>
          
          <div>
            {bookmarkedContests.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/10">
                <h3 className="text-xl font-medium mb-2">No bookmarked contests</h3>
                <p className="text-muted-foreground">
                  Bookmark contests to keep track of them here.
                </p>
              </div>
            ) : (
              <ContestList 
                platformFilters={platformFilters}
                statusFilter={statusFilter}
                bookmarksOnly
                bookmarkedContests={bookmarkedContests}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bookmarks;
