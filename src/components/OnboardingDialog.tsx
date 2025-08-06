import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, BookOpen, Users, CheckCircle, ArrowRight } from 'lucide-react';

interface OnboardingDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingDialog: React.FC<OnboardingDialogProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Welcome to Miftah",
      description: "Your trusted companion for Qur'anic reflection",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Miftah (مفتاح) means "key" - we provide the key to unlock deeper understanding 
            of the Holy Qur'an through authentic sources and scholarly guidance.
          </p>
          <div className="bg-gradient-dawn rounded-lg p-4">
            <p className="text-sm font-arabic text-center text-primary mb-2">
              وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ
            </p>
            <p className="text-xs text-center text-muted-foreground italic">
              "And We have certainly made the Qur'an easy for remembrance"
            </p>
          </div>
        </div>
      )
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Accuracy First",
      description: "How we ensure authentic content",
      content: (
        <div className="space-y-4">
          <div className="grid gap-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Trusted Sources</p>
                <p className="text-xs text-muted-foreground">
                  Arabic from Tanzil.net, translations from Saheeh International and Muhsin Khan
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Scholarly Review</p>
                <p className="text-xs text-muted-foreground">
                  All tafsir content reviewed by qualified Islamic scholars
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Clear Labeling</p>
                <p className="text-xs text-muted-foreground">
                  All stories and hadith clearly marked as authentic, weak, or disputed
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Community Standards",
      description: "Maintaining quality together",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            You can help maintain accuracy by reporting any content concerns. 
            Every report is reviewed by our scholarly team.
          </p>
          <Card className="p-3 bg-accent/20">
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <p className="text-xs font-medium text-primary">Our Commitment</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We prioritize accuracy over speed, ensuring every piece of content 
                  meets Islamic scholarly standards before publication.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
      localStorage.setItem('miftah-onboarding-completed', 'true');
    }
  };

  const handleSkip = () => {
    onClose();
    localStorage.setItem('miftah-onboarding-completed', 'true');
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            {currentStepData.icon}
          </div>
          <DialogTitle className="text-center">{currentStepData.title}</DialogTitle>
          <DialogDescription className="text-center">
            {currentStepData.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          {currentStepData.content}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mb-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="flex-1"
          >
            Skip
          </Button>
          <Button
            onClick={handleNext}
            className="flex-1"
          >
            {currentStep === steps.length - 1 ? (
              "Begin Reading"
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingDialog;