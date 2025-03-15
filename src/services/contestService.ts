
import { Contest, Platform } from "@/types/contest";

// Mock data - In a real application, this would come from an API
const MOCK_CONTESTS: Contest[] = [
  // Codeforces contests
  {
    id: 'cf-1',
    name: 'Codeforces Round #845 (Div. 2)',
    url: 'https://codeforces.com/contests/1234',
    platform: 'codeforces',
    startTime: new Date(Date.now() + 86400000), // tomorrow
    endTime: new Date(Date.now() + 86400000 + 7200000), // +2 hours
    duration: 7200, // 2 hours
    status: 'upcoming',
  },
  {
    id: 'cf-2',
    name: 'Codeforces Round #844 (Div. 1 + Div. 2)',
    url: 'https://codeforces.com/contests/1233',
    platform: 'codeforces',
    startTime: new Date(Date.now() - 500000), // ongoing
    endTime: new Date(Date.now() + 6000000),
    duration: 7200,
    status: 'ongoing',
  },
  {
    id: 'cf-3',
    name: 'Codeforces Round #843 (Div. 2)',
    url: 'https://codeforces.com/contests/1232',
    platform: 'codeforces',
    startTime: new Date(Date.now() - 864000000), // 10 days ago
    endTime: new Date(Date.now() - 864000000 + 7200000),
    duration: 7200,
    status: 'completed',
    solutionLink: 'https://www.youtube.com/watch?v=example-cf',
  },
  
  // CodeChef contests
  {
    id: 'cc-1',
    name: 'CodeChef Starters 50',
    url: 'https://www.codechef.com/START50',
    platform: 'codechef',
    startTime: new Date(Date.now() + 172800000), // 2 days from now
    endTime: new Date(Date.now() + 172800000 + 10800000), // +3 hours
    duration: 10800, // 3 hours
    status: 'upcoming',
  },
  {
    id: 'cc-2',
    name: 'CodeChef May Long Challenge',
    url: 'https://www.codechef.com/MAY23',
    platform: 'codechef',
    startTime: new Date(Date.now() - 864000000 * 2), // 20 days ago
    endTime: new Date(Date.now() - 864000000), // 10 days ago
    duration: 864000, // 10 days
    status: 'completed',
  },
  
  // LeetCode contests
  {
    id: 'lc-1',
    name: 'Weekly Contest 300',
    url: 'https://leetcode.com/contest/weekly-contest-300',
    platform: 'leetcode',
    startTime: new Date(Date.now() + 259200000), // 3 days from now
    endTime: new Date(Date.now() + 259200000 + 5400000), // +1.5 hours
    duration: 5400, // 1.5 hours
    status: 'upcoming',
  },
  {
    id: 'lc-2',
    name: 'Biweekly Contest 150',
    url: 'https://leetcode.com/contest/biweekly-contest-150',
    platform: 'leetcode',
    startTime: new Date(Date.now() - 604800000), // 7 days ago
    endTime: new Date(Date.now() - 604800000 + 5400000),
    duration: 5400,
    status: 'completed',
    solutionLink: 'https://www.youtube.com/watch?v=example-lc',
  },
];

/**
 * Fetches all contests from the API or mock data
 */
export const fetchAllContests = async (): Promise<Contest[]> => {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CONTESTS);
    }, 500);
  });
};

/**
 * Fetches contests filtered by platform
 */
export const fetchContestsByPlatform = async (platforms: Platform[]): Promise<Contest[]> => {
  const allContests = await fetchAllContests();
  return allContests.filter(contest => platforms.includes(contest.platform));
};

/**
 * Updates a contest with solution link
 */
export const updateContestSolution = async (contestId: string, youtubeLink: string): Promise<Contest> => {
  // In a real application, this would update the database
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const contest = MOCK_CONTESTS.find(c => c.id === contestId);
      if (!contest) {
        reject(new Error('Contest not found'));
        return;
      }
      
      contest.solutionLink = youtubeLink;
      resolve(contest);
    }, 500);
  });
};
