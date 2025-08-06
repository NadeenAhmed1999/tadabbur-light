import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Target, Flame, TrendingUp } from 'lucide-react';

interface ReadingStatsProps {
  todayStats: {
    versesRead: number;
    timeSpent: number;
    goalProgress: number;
    sessionsCount: number;
  };
  weeklyStats: {
    daysRead: number;
    totalVerses: number;
    averageTime: number;
  };
  streak: number;
  dailyGoal: number;
}

const ReadingStats: React.FC<ReadingStatsProps> = ({ 
  todayStats, 
  weeklyStats, 
  streak, 
  dailyGoal 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Today's Progress */}
      <Card className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Today's Goal</span>
            </div>
            <Badge variant={todayStats.goalProgress >= 100 ? "default" : "secondary"}>
              {Math.round(todayStats.goalProgress)}%
            </Badge>
          </div>
          
          <div className="space-y-2">
            <Progress value={todayStats.goalProgress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{todayStats.versesRead} verses</span>
              <span>Goal: {dailyGoal}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Reading Streak */}
      <Card className="p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium">Reading Streak</span>
          </div>
          
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">{streak}</span>
            <span className="text-sm text-muted-foreground">
              day{streak !== 1 ? 's' : ''}
            </span>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Keep it up! Consistency builds connection
          </p>
        </div>
      </Card>

      {/* Time Spent Today */}
      <Card className="p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Time Today</span>
          </div>
          
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">
              {Math.round(todayStats.timeSpent)}
            </span>
            <span className="text-sm text-muted-foreground">min</span>
          </div>
          
          <p className="text-xs text-muted-foreground">
            {todayStats.sessionsCount} session{todayStats.sessionsCount !== 1 ? 's' : ''}
          </p>
        </div>
      </Card>

      {/* Weekly Progress */}
      <Card className="p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">This Week</span>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Days read:</span>
              <span className="font-medium">{weeklyStats.daysRead}/7</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total verses:</span>
              <span className="font-medium">{weeklyStats.totalVerses}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Avg. time:</span>
              <span className="font-medium">{Math.round(weeklyStats.averageTime)}m</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReadingStats;