
import { useEffect, useState } from 'react';
import { Contest, PlatformFilters } from '@/types/contest';
import { ContestCard } from './ContestCard';
import { fetchAllContests } from '@/services/contestService';
import { Skeleton } from "@/components/ui/skeleton";

interface ContestListProps {
  platformFilters: PlatformFilters;
  statusFilter: string;
  bookmarksOnly?: boolean;
  bookmarkedContests?: string[];
}

export function ContestList({ 
  platformFilters, 
  statusFilter, 
  bookmarksOnly = false,
  bookmarkedContests = [] 
}: ContestListProps) {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContests = async () => {
      setLoading(true);
      try {
        const allContests = await fetchAllContests();
        setContests(allContests);
      } catch (error) {
        console.error('Failed to fetch contests:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContests();
  }, []);

  const filteredContests = contests.filter(contest => {
    // Platform filter
    const platformMatch = platformFilters[contest.platform];
    
    // Status filter
    const statusMatch = statusFilter === 'all' || contest.status === statusFilter;
    
    // Bookmarks filter
    const bookmarkMatch = !bookmarksOnly || bookmarkedContests.includes(contest.id);
    
    return platformMatch && statusMatch && (bookmarksOnly ? bookmarkMatch : true);
  });

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6).fill(0).map((_, index) => (
          <Skeleton key={index} className="h-[250px]" />
        ))}
      </div>
    );
  }

  if (filteredContests.length === 0) {
    return (
      <div className="w-full p-8 text-center">
        <p className="text-muted-foreground">No contests found with the current filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredContests.map(contest => (
        <ContestCard key={contest.id} contest={contest} />
      ))}
    </div>
  );
}
