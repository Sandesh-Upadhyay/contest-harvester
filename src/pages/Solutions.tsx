
import { Navbar } from '@/components/layout/Navbar';
import { SolutionForm } from '@/components/solutions/SolutionForm';

const Solutions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Contest Solutions</h1>
          <p className="text-muted-foreground mt-1">
            Add YouTube solution links to past contests.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <SolutionForm />
          
          <div className="mt-12 space-y-4">
            <h2 className="text-xl font-semibold">Solution Playlists</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a 
                href="https://www.youtube.com/playlist?list=YOUR_LEETCODE_PLAYLIST" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 border rounded-lg hover:bg-muted/10 transition-colors"
              >
                <div className="w-full h-32 bg-leetcode/10 rounded-md flex items-center justify-center mb-3">
                  <span className="text-leetcode font-semibold">LeetCode</span>
                </div>
                <span className="font-medium">LeetCode PCDs</span>
              </a>
              
              <a 
                href="https://www.youtube.com/playlist?list=YOUR_CODEFORCES_PLAYLIST" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 border rounded-lg hover:bg-muted/10 transition-colors"
              >
                <div className="w-full h-32 bg-codeforces/10 rounded-md flex items-center justify-center mb-3">
                  <span className="text-codeforces font-semibold">Codeforces</span>
                </div>
                <span className="font-medium">Codeforces PCDs</span>
              </a>
              
              <a 
                href="https://www.youtube.com/playlist?list=YOUR_CODECHEF_PLAYLIST" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 border rounded-lg hover:bg-muted/10 transition-colors"
              >
                <div className="w-full h-32 bg-codechef/10 rounded-md flex items-center justify-center mb-3">
                  <span className="text-codechef font-semibold">CodeChef</span>
                </div>
                <span className="font-medium">CodeChef PCDs</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Solutions;
