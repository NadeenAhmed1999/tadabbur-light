import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Book, Users, CheckCircle, AlertTriangle } from 'lucide-react';

interface SourceInfo {
  arabic: {
    source: string;
    authority: string;
  };
  translation: {
    source: string;
    translator: string;
  };
  tafsir?: {
    source: string;
    scholar: string;
    authenticity: 'authentic' | 'scholarly-opinion';
  };
  story?: {
    source: string;
    authenticity: 'authentic' | 'weak' | 'disputed';
    narrator?: string;
  };
}

interface SourceInfoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  ayahNumber: number;
  sourceInfo: SourceInfo;
}

const SourceInfoDrawer: React.FC<SourceInfoDrawerProps> = ({ 
  isOpen, 
  onClose, 
  ayahNumber, 
  sourceInfo 
}) => {
  const getAuthenticityIcon = (authenticity: string) => {
    switch (authenticity) {
      case 'authentic':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'weak':
      case 'disputed':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Book className="h-4 w-4 text-primary" />;
    }
  };

  const getAuthenticityBadge = (authenticity: string) => {
    const variants = {
      authentic: "bg-green-100 text-green-800 border-green-200",
      weak: "bg-yellow-100 text-yellow-800 border-yellow-200", 
      disputed: "bg-orange-100 text-orange-800 border-orange-200",
      "scholarly-opinion": "bg-blue-100 text-blue-800 border-blue-200"
    };
    
    return (
      <Badge className={`${variants[authenticity as keyof typeof variants]} text-xs`}>
        {authenticity.replace('-', ' ')}
      </Badge>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2">
            <Book className="h-5 w-5 text-primary" />
            Sources for Verse {ayahNumber}
          </SheetTitle>
          <SheetDescription>
            All content is carefully sourced from authentic Islamic texts and reviewed by qualified scholars.
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Arabic Text Source */}
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Book className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">Arabic Text</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Source: {sourceInfo.arabic.source}
                </p>
                <p className="text-xs text-muted-foreground">
                  Authority: {sourceInfo.arabic.authority}
                </p>
              </div>
            </div>
          </Card>

          {/* Translation Source */}
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">English Translation</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Translation: {sourceInfo.translation.source}
                </p>
                <p className="text-xs text-muted-foreground">
                  Translator: {sourceInfo.translation.translator}
                </p>
              </div>
            </div>
          </Card>

          {/* Tafsir Source */}
          {sourceInfo.tafsir && (
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  {getAuthenticityIcon(sourceInfo.tafsir.authenticity)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm">Tafsir</h4>
                    {getAuthenticityBadge(sourceInfo.tafsir.authenticity)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Source: {sourceInfo.tafsir.source}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Scholar: {sourceInfo.tafsir.scholar}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Story Source */}
          {sourceInfo.story && (
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  {getAuthenticityIcon(sourceInfo.story.authenticity)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm">Historical Context</h4>
                    {getAuthenticityBadge(sourceInfo.story.authenticity)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Source: {sourceInfo.story.source}
                  </p>
                  {sourceInfo.story.narrator && (
                    <p className="text-xs text-muted-foreground">
                      Narrator: {sourceInfo.story.narrator}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Quality Assurance Note */}
          <Card className="p-4 bg-accent/20 border-accent/30">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1 text-primary">Verified Content</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All content has been reviewed by qualified Islamic scholars and cross-referenced 
                  with multiple authentic sources to ensure accuracy and authenticity.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SourceInfoDrawer;