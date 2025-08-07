import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, MapPin } from 'lucide-react';
import { allSurahs, type SurahInfo } from '@/data/surahs';

interface SurahNavigationProps {
  onSurahSelect: (surahNumber: number) => void;
  selectedSurah?: number;
}

const SurahNavigation: React.FC<SurahNavigationProps> = ({ onSurahSelect, selectedSurah }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Surahs</h2>
        <Badge variant="secondary" className="ml-auto">
          114 Chapters
        </Badge>
      </div>

      <div className="grid gap-3">
        {allSurahs.map((surah) => (
          <Card 
            key={surah.number}
            className={`p-4 cursor-pointer transition-gentle hover:shadow-elevated ${
              selectedSurah === surah.number ? 'ring-2 ring-primary bg-accent/20' : ''
            }`}
            onClick={() => onSurahSelect(surah.number)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  {surah.number}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">{surah.name}</h3>
                    <span className="text-lg font-arabic text-primary">{surah.arabicName}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">{surah.meaning}</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{surah.revelation}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{surah.ayahCount} verses</span>
                  </div>
                </div>
              </div>
              
              {selectedSurah === surah.number && (
                <Badge variant="default" className="bg-primary/10 text-primary border-primary/20">
                  Reading
                </Badge>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gradient-dawn rounded-lg text-center">
        <p className="text-sm text-muted-foreground italic">
          "This is the Book about which there is no doubt, a guidance for those conscious of Allah" - 2:2
        </p>
      </div>
    </div>
  );
};

export default SurahNavigation;