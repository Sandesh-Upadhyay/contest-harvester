
export interface Contest {
  id: string;
  name: string;
  url: string;
  platform: 'codeforces' | 'codechef' | 'leetcode';
  startTime: Date;
  endTime: Date;
  duration: number; // in seconds
  status: 'upcoming' | 'ongoing' | 'completed';
  bookmarked?: boolean;
  solutionLink?: string;
}

export type Platform = 'codeforces' | 'codechef' | 'leetcode';

export interface PlatformFilters {
  codeforces: boolean;
  codechef: boolean;
  leetcode: boolean;
}

export interface ContestSolution {
  contestId: string;
  youtubeLink: string;
  addedAt: Date;
}
