import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Target, 
  Clock, 
  Calendar, 
  TrendingUp, 
  Award,
  ChevronRight,
  Star,
  Flame
} from 'lucide-react';
import ReadingProgressManager, { ReadingProgress } from '@/utils/ReadingProgressManager';

interface ProgressComponentProps {
  onNavigateToSurah?: (surahNumber: number) => void;
  onSetGoal?: (goal: number) => void;
}

const ProgressComponent: React.FC<ProgressComponentProps> = ({ 
  onNavigateToSurah,
  onSetGoal 
}) => {
  const progressManager = ReadingProgressManager.getInstance();
  const progress = progressManager.getProgress();
  const todayStats = progressManager.getTodayStats();
  const weeklyStats = progressManager.getWeeklyStats();

  // Calculate overall Quran progress (114 surahs total)
  const totalSurahs = 114;
  const completionPercentage = (progress.completedSurahs.length / totalSurahs) * 100;
  
  // Calculate total verses (approximately 6,236 verses in the Quran)
  const totalVerses = 6236;
  const currentPosition = ((progress.lastSurah - 1) / totalSurahs) * 100;

  // Estimate reading pace (verses per week)
  const averageVersesPerWeek = weeklyStats.totalVerses || 0;
  const estimatedWeeksToComplete = averageVersesPerWeek > 0 
    ? Math.ceil((totalVerses - (progress.lastSurah * 10)) / averageVersesPerWeek) 
    : 0;

  const getMotivationalMessage = () => {
    if (progress.streak >= 30) return "Mashallah! Your consistency is inspiring 🌟";
    if (progress.streak >= 14) return "Excellent dedication! Keep it up 💪";
    if (progress.streak >= 7) return "Great weekly habit! 📖";
    if (progress.streak >= 3) return "Building momentum! 🚀";
    return "Every step counts in your journey 🌱";
  };

  const getNextMilestone = () => {
    const milestones = [7, 14, 30, 60, 100, 365];
    return milestones.find(m => m > progress.streak) || 500;
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress Header */}
      <Card className="p-6 bg-gradient-dawn">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-primary">Your Quran Journey</h2>
              <p className="text-muted-foreground">{getMotivationalMessage()}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{progress.streak}</div>
              <div className="text-sm text-muted-foreground">day streak</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{progress.completedSurahs.length}</div>
              <div className="text-sm text-muted-foreground">Surahs Completed</div>
              <div className="text-xs text-muted-foreground">of {totalSurahs}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{Math.round(progress.totalReadingTime / 60)}h</div>
              <div className="text-sm text-muted-foreground">Total Time</div>
              <div className="text-xs text-muted-foreground">{progress.totalReadingTime}min total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{progress.lastSurah}:{progress.lastAyah}</div>
              <div className="text-sm text-muted-foreground">Current Position</div>
              <div className="text-xs text-muted-foreground">Last read verse</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Progress Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Completion */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Overall Progress</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Surahs Completed</span>
                <span className="font-medium">{Math.round(completionPercentage)}%</span>
              </div>
              <Progress value={completionPercentage} className="h-3" />
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current Reading</span>
                <span className="font-medium">{Math.round(currentPosition)}%</span>
              </div>
              <Progress value={currentPosition} className="h-2 opacity-60" />
            </div>

            {estimatedWeeksToComplete > 0 && (
              <div className="mt-4 p-3 bg-accent/20 rounded-lg">
                <div className="text-sm text-muted-foreground">
                  At your current pace: <span className="font-medium text-foreground">
                    ~{estimatedWeeksToComplete} weeks to complete
                  </span>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Streak & Goals */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-semibold">Consistency</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-primary">{progress.streak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">{getNextMilestone()}</div>
                  <div className="text-xs text-muted-foreground">Next Milestone</div>
                </div>
              </div>

              <Progress 
                value={(progress.streak / getNextMilestone()) * 100} 
                className="h-2" 
              />

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{progress.streak} days</span>
                <span>{getNextMilestone() - progress.streak} to go</span>
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Daily Goal</span>
                <Badge variant="secondary">{progress.dailyGoal} verses</Badge>
              </div>
              {onSetGoal && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full mt-2"
                  onClick={() => onSetGoal(progress.dailyGoal)}
                >
                  Adjust Goal
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Progress */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Recent Activity</h3>
            </div>
            <Button variant="ghost" size="sm">
              View All History
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-accent/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Today</span>
              </div>
              <div className="text-lg font-bold">{todayStats.versesRead}</div>
              <div className="text-xs text-muted-foreground">
                verses • {Math.round(todayStats.timeSpent)}min
              </div>
              <Progress value={todayStats.goalProgress} className="h-1 mt-2" />
            </div>

            <div className="p-4 bg-accent/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">This Week</span>
              </div>
              <div className="text-lg font-bold">{weeklyStats.totalVerses}</div>
              <div className="text-xs text-muted-foreground">
                verses • {weeklyStats.daysRead}/7 days
              </div>
              <Progress value={(weeklyStats.daysRead / 7) * 100} className="h-1 mt-2" />
            </div>

            <div className="p-4 bg-accent/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Average Time</span>
              </div>
              <div className="text-lg font-bold">{Math.round(weeklyStats.averageTime)}</div>
              <div className="text-xs text-muted-foreground">
                minutes per session
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Current Reading */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Continue Reading</h3>
          </div>

          <div className="flex items-center justify-between p-4 bg-accent/20 rounded-lg">
            <div>
              <div className="font-medium">Last read: Verse {progress.lastAyah}</div>
              <div className="text-sm text-muted-foreground">
                Continue your journey from where you left off
              </div>
            </div>
            {onNavigateToSurah && (
              <Button 
                variant="default"
                onClick={() => onNavigateToSurah(progress.lastSurah)}
              >
                Continue Reading
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Achievements */}
      {(progress.streak >= 7 || progress.completedSurahs.length > 0) && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Achievements</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {progress.streak >= 7 && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                  <div className="text-2xl">🌱</div>
                  <div className="text-xs font-medium">Weekly Reader</div>
                </div>
              )}
              {progress.streak >= 30 && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                  <div className="text-2xl">🌟</div>
                  <div className="text-xs font-medium">Monthly Master</div>
                </div>
              )}
              {progress.completedSurahs.length >= 5 && (
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-center">
                  <div className="text-2xl">📖</div>
                  <div className="text-xs font-medium">Chapter Champion</div>
                </div>
              )}
              {progress.totalReadingTime >= 300 && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                  <div className="text-2xl">⏰</div>
                  <div className="text-xs font-medium">Time Devotee</div>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProgressComponent;