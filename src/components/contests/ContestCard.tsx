
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, BookmarkIcon, ExternalLink, Youtube } from "lucide-react";
import { Contest } from "@/types/contest";
import { formatDistanceToNow, format } from 'date-fns';
import { cn } from "@/lib/utils";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ContestCardProps {
  contest: Contest;
}

export function ContestCard({ contest }: ContestCardProps) {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const [isHovering, setIsHovering] = useState(false);
  
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'codeforces':
        return 'bg-codeforces';
      case 'codechef':
        return 'bg-codechef';
      case 'leetcode':
        return 'bg-leetcode';
      default:
        return 'bg-primary';
    }
  };

  const getStatusBadge = () => {
    switch (contest.status) {
      case 'upcoming':
        return <Badge variant="outline" className="border-green-500 text-green-500">Upcoming</Badge>;
      case 'ongoing':
        return <Badge variant="outline" className="border-orange-500 text-orange-500">Ongoing</Badge>;
      case 'completed':
        return <Badge variant="outline" className="border-gray-500 text-gray-500">Completed</Badge>;
      default:
        return null;
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const getTimeInfo = () => {
    if (contest.status === 'upcoming') {
      return `Starts ${formatDistanceToNow(contest.startTime, { addSuffix: true })}`;
    } else if (contest.status === 'ongoing') {
      return `Ends ${formatDistanceToNow(contest.endTime, { addSuffix: true })}`;
    } else {
      return `Ended ${formatDistanceToNow(contest.endTime, { addSuffix: true })}`;
    }
  };

  return (
    <Card 
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "transition-all duration-200",
        isHovering ? "shadow-md" : "shadow-sm"
      )}
    >
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <Badge className={cn("capitalize", getPlatformColor(contest.platform))}>
              {contest.platform}
            </Badge>
            {getStatusBadge()}
          </div>
          <CardTitle className="text-lg">{contest.name}</CardTitle>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => toggleBookmark(contest)}
                className={isBookmarked(contest.id) ? "text-yellow-400" : ""}
              >
                <BookmarkIcon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isBookmarked(contest.id) ? "Remove bookmark" : "Add bookmark"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{format(contest.startTime, 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{format(contest.startTime, 'HH:mm')} - {format(contest.endTime, 'HH:mm')}</span>
          </div>
        </div>
        
        <div className="mt-2 flex items-center text-sm">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>Duration: {formatDuration(contest.duration)}</span>
        </div>
        
        <div className="mt-2 text-sm text-muted-foreground">
          {getTimeInfo()}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <a href={contest.url} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ExternalLink className="h-4 w-4 mr-1" />
            Visit
          </Button>
        </a>
        
        {contest.status === 'completed' && (
          contest.solutionLink ? (
            <a href={contest.solutionLink} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Youtube className="h-4 w-4 mr-1" />
                Solution
              </Button>
            </a>
          ) : (
            <Button variant="outline" size="sm" className="flex items-center gap-1" disabled>
              <Youtube className="h-4 w-4 mr-1" />
              No Solution
            </Button>
          )
        )}
      </CardFooter>
    </Card>
  );
}
