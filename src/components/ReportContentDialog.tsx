import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ReportContentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  ayahNumber: number;
  surahName: string;
}

const ReportContentDialog: React.FC<ReportContentDialogProps> = ({ 
  isOpen, 
  onClose, 
  ayahNumber, 
  surahName 
}) => {
  const [reportType, setReportType] = useState<string>('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!reportType || !description.trim()) {
      toast({
        title: "Please complete all fields",
        description: "Both report type and description are required.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Report submitted",
      description: "Thank you for helping us maintain accuracy. Our scholars will review this content.",
    });
    
    setIsSubmitting(false);
    setReportType('');
    setDescription('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Report Content Issue
          </DialogTitle>
          <DialogDescription>
            Help us maintain accuracy for {surahName}, Verse {ayahNumber}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Issue Type</Label>
            <RadioGroup value={reportType} onValueChange={setReportType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="translation" id="translation" />
                <Label htmlFor="translation" className="text-sm">Translation accuracy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tafsir" id="tafsir" />
                <Label htmlFor="tafsir" className="text-sm">Tafsir interpretation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="story" id="story" />
                <Label htmlFor="story" className="text-sm">Historical context/story</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="authenticity" id="authenticity" />
                <Label htmlFor="authenticity" className="text-sm">Source authenticity concern</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="text-sm">Other issue</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Please provide specific details about the issue you've identified. Include references if available."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="bg-accent/20 rounded-lg p-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your report will be reviewed by qualified Islamic scholars. We take all feedback seriously 
              and will investigate thoroughly. Reports typically receive a response within 3-5 business days.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !reportType || !description.trim()}
            className="flex-1"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Report
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportContentDialog;