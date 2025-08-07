import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Target } from 'lucide-react';
import ProgressComponent from '@/components/Progress';
import ReadingProgressManager from '@/utils/ReadingProgressManager';
import { useToast } from '@/hooks/use-toast';

interface ProgressPageProps {
  onBack?: () => void;
  onNavigateToSurah?: (surahNumber: number) => void;
}

const ProgressPage: React.FC<ProgressPageProps> = ({ onBack, onNavigateToSurah }) => {
  const [showGoalDialog, setShowGoalDialog] = useState(false);
  const [newGoal, setNewGoal] = useState('');
  const progressManager = ReadingProgressManager.getInstance();
  const { toast } = useToast();

  const handleSetGoal = (currentGoal: number) => {
    setNewGoal(currentGoal.toString());
    setShowGoalDialog(true);
  };

  const handleSaveGoal = () => {
    const goal = parseInt(newGoal);
    if (goal && goal > 0 && goal <= 100) {
      progressManager.setDailyGoal(goal);
      setShowGoalDialog(false);
      toast({
        title: "Goal Updated",
        description: `Your daily goal has been set to ${goal} verses.`,
      });
    } else {
      toast({
        title: "Invalid Goal",
        description: "Please enter a goal between 1 and 100 verses.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-sacred">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-semibold text-foreground">Reading Progress</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <ProgressComponent 
          onNavigateToSurah={onNavigateToSurah}
          onSetGoal={handleSetGoal}
        />
      </main>

      {/* Goal Setting Dialog */}
      <Dialog open={showGoalDialog} onOpenChange={setShowGoalDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Set Daily Goal
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="goal">Verses per day</Label>
              <Input
                id="goal"
                type="number"
                min="1"
                max="100"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Enter number of verses"
              />
              <p className="text-xs text-muted-foreground">
                Recommended: 5-20 verses per day for consistent progress
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="peaceful" 
                size="sm" 
                onClick={() => setNewGoal('5')}
              >
                5 verses
              </Button>
              <Button 
                variant="peaceful" 
                size="sm" 
                onClick={() => setNewGoal('10')}
              >
                10 verses
              </Button>
              <Button 
                variant="peaceful" 
                size="sm" 
                onClick={() => setNewGoal('20')}
              >
                20 verses
              </Button>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="ghost" onClick={() => setShowGoalDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveGoal}>
                Save Goal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProgressPage;