
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { PlatformFilters } from '@/types/contest';

interface ContestFiltersProps {
  platformFilters: PlatformFilters;
  setPlatformFilters: (filters: PlatformFilters) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export function ContestFilters({ 
  platformFilters, 
  setPlatformFilters, 
  statusFilter, 
  setStatusFilter 
}: ContestFiltersProps) {
  
  const handlePlatformChange = (platform: keyof PlatformFilters) => {
    setPlatformFilters({
      ...platformFilters,
      [platform]: !platformFilters[platform]
    });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-3">Platforms</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="codeforces" 
                  checked={platformFilters.codeforces}
                  onCheckedChange={() => handlePlatformChange('codeforces')}
                />
                <Label htmlFor="codeforces" className="font-normal cursor-pointer">
                  Codeforces
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="codechef" 
                  checked={platformFilters.codechef}
                  onCheckedChange={() => handlePlatformChange('codechef')}
                />
                <Label htmlFor="codechef" className="font-normal cursor-pointer">
                  CodeChef
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="leetcode" 
                  checked={platformFilters.leetcode}
                  onCheckedChange={() => handlePlatformChange('leetcode')}
                />
                <Label htmlFor="leetcode" className="font-normal cursor-pointer">
                  LeetCode
                </Label>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Status</h3>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Contests</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
