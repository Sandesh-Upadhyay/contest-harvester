
import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ContestFilters } from '@/components/contests/ContestFilters';
import { ContestList } from '@/components/contests/ContestList';
import { PlatformFilters } from '@/types/contest';

const Index = () => {
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
          <h1 className="text-3xl font-bold tracking-tight">Contests</h1>
          <p className="text-muted-foreground mt-1">
            Track upcoming and past competitive programming contests from major platforms.
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
            <ContestList 
              platformFilters={platformFilters}
              statusFilter={statusFilter}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
