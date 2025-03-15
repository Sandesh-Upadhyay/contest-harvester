
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { updateContestSolution, fetchAllContests } from '@/services/contestService';
import { Contest } from '@/types/contest';

export function SolutionForm() {
  const { toast } = useToast();
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContestId, setSelectedContestId] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadContests = async () => {
      setLoading(true);
      try {
        const allContests = await fetchAllContests();
        // Only completed contests without solutions
        const completedContests = allContests.filter(
          contest => contest.status === 'completed' && !contest.solutionLink
        );
        setContests(completedContests);
      } catch (error) {
        console.error('Failed to fetch contests:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load contests. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadContests();
  }, [toast]);

  const isValidYoutubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedContestId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a contest.",
      });
      return;
    }
    
    if (!youtubeLink || !isValidYoutubeUrl(youtubeLink)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid YouTube URL.",
      });
      return;
    }
    
    setSubmitting(true);
    
    try {
      const updatedContest = await updateContestSolution(selectedContestId, youtubeLink);
      
      toast({
        title: "Success",
        description: `Solution link added to "${updatedContest.name}"`,
      });
      
      // Remove the contest from the list
      setContests(contests.filter(c => c.id !== selectedContestId));
      
      // Reset form
      setSelectedContestId("");
      setYoutubeLink("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add solution link. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add Solution Link</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contest">Contest</Label>
            <Select
              value={selectedContestId}
              onValueChange={setSelectedContestId}
              disabled={loading || contests.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a contest" />
              </SelectTrigger>
              <SelectContent>
                {contests.map(contest => (
                  <SelectItem key={contest.id} value={contest.id}>
                    {contest.name} ({contest.platform})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {loading && <p className="text-sm text-muted-foreground">Loading contests...</p>}
            {!loading && contests.length === 0 && (
              <p className="text-sm text-muted-foreground">No contests available to add solutions.</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="youtubeLink">YouTube Link</Label>
            <Input
              id="youtubeLink"
              placeholder="https://youtube.com/watch?v=..."
              value={youtubeLink}
              onChange={e => setYoutubeLink(e.target.value)}
              disabled={submitting}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={loading || submitting || contests.length === 0 || !selectedContestId || !youtubeLink}
          >
            {submitting ? "Adding..." : "Add Solution Link"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
