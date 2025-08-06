import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Heart, Search, Moon, Sun, ArrowLeft, Info, Flag } from 'lucide-react';
import SourceInfoDrawer from './SourceInfoDrawer';
import ReportContentDialog from './ReportContentDialog';
import OnboardingDialog from './OnboardingDialog';

interface Ayah {
  number: number;
  arabic: string;
  english: string;
  meaning?: string;
  tafsir?: string;
  story?: string;
  sourceInfo?: {
    arabic: { source: string; authority: string; };
    translation: { source: string; translator: string; };
    tafsir?: { source: string; scholar: string; authenticity: 'authentic' | 'scholarly-opinion'; };
    story?: { source: string; authenticity: 'authentic' | 'weak' | 'disputed'; narrator?: string; };
  };
}

interface Surah {
  number: number;
  name: string;
  arabicName: string;
  revelation: 'Meccan' | 'Medinan';
  ayahs: Ayah[];
}

// Sample data for demonstration
const sampleSurah: Surah = {
  number: 1,
  name: "Al-Fatihah",
  arabicName: "الفاتحة",
  revelation: "Meccan",
  ayahs: [
    {
      number: 1,
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      english: "In the name of Allah, the Gracious, the Merciful.",
      meaning: "This is the opening verse that begins most chapters of the Qur'an, invoking Allah's mercy and grace.",
      tafsir: "The Basmala is a declaration of reliance on Allah before beginning any good deed.",
      sourceInfo: {
        arabic: { source: "Tanzil.net", authority: "Uthmanic Script Standard" },
        translation: { source: "Saheeh International", translator: "AbdulQasim Publishing House" },
        tafsir: { source: "Tafsir Ibn Kathir (Abridged)", scholar: "Imam Ibn Kathir", authenticity: "authentic" }
      }
    },
    {
      number: 2,
      arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      english: "All praise belongs to Allah, Lord of all the worlds.",
      meaning: "Recognition that all praise and gratitude belongs to Allah, who is the sustainer of everything that exists.",
      tafsir: "This verse establishes Allah as the Creator and Sustainer of all creation, worthy of all praise.",
      sourceInfo: {
        arabic: { source: "Tanzil.net", authority: "Uthmanic Script Standard" },
        translation: { source: "Saheeh International", translator: "AbdulQasim Publishing House" },
        tafsir: { source: "Tafsir Ibn Kathir (Abridged)", scholar: "Imam Ibn Kathir", authenticity: "authentic" }
      }
    },
    {
      number: 3,
      arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
      english: "The Gracious, the Merciful.",
      meaning: "Two beautiful names of Allah emphasizing His infinite mercy and compassion.",
      tafsir: "Rahman refers to Allah's general mercy for all creation, while Raheem refers to His special mercy for believers.",
      sourceInfo: {
        arabic: { source: "Tanzil.net", authority: "Uthmanic Script Standard" },
        translation: { source: "Saheeh International", translator: "AbdulQasim Publishing House" },
        tafsir: { source: "Tafsir Ibn Kathir (Abridged)", scholar: "Imam Ibn Kathir", authenticity: "authentic" }
      }
    }
  ]
};

interface QuranReaderProps {
  onBack?: () => void;
}

const QuranReader: React.FC<QuranReaderProps> = ({ onBack }) => {
  const [selectedAyah, setSelectedAyah] = useState<number | null>(null);
  const [displayMode, setDisplayMode] = useState<'side-by-side' | 'arabic-first' | 'english-first'>('side-by-side');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSourceInfo, setShowSourceInfo] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedAyahForInfo, setSelectedAyahForInfo] = useState<number | null>(null);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('miftah-onboarding-completed');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleAyahClick = (ayahNumber: number) => {
    setSelectedAyah(selectedAyah === ayahNumber ? null : ayahNumber);
  };

  const handleSourceInfo = (ayahNumber: number) => {
    setSelectedAyahForInfo(ayahNumber);
    setShowSourceInfo(true);
  };

  const handleReport = (ayahNumber: number) => {
    setSelectedAyahForInfo(ayahNumber);
    setShowReportDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-sacred">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button variant="ghost" size="icon" onClick={onBack}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold text-foreground">Miftah</h1>
              </div>
              <Badge variant="secondary" className="font-arabic">
                {sampleSurah.arabicName}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {sampleSurah.name} • {sampleSurah.revelation}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Display Mode Toggle */}
        <div className="mb-8 flex gap-2">
          <Button
            variant={displayMode === 'side-by-side' ? 'default' : 'peaceful'}
            size="sm"
            onClick={() => setDisplayMode('side-by-side')}
          >
            Side by Side
          </Button>
          <Button
            variant={displayMode === 'arabic-first' ? 'default' : 'peaceful'}
            size="sm"
            onClick={() => setDisplayMode('arabic-first')}
          >
            Arabic First
          </Button>
          <Button
            variant={displayMode === 'english-first' ? 'default' : 'peaceful'}
            size="sm"
            onClick={() => setDisplayMode('english-first')}
          >
            English First
          </Button>
        </div>

        {/* Ayahs */}
        <div className="space-y-6">
          {sampleSurah.ayahs.map((ayah) => (
            <Card key={ayah.number} className="p-6 shadow-gentle hover:shadow-elevated transition-gentle">
              <div className="space-y-4">
                {displayMode === 'side-by-side' && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div 
                      className="cursor-pointer group order-2 md:order-1"
                      onClick={() => handleAyahClick(ayah.number)}
                    >
                      <p className="text-lg leading-relaxed font-english text-foreground group-hover:text-foreground/80 transition-colors">
                        {ayah.english}
                      </p>
                    </div>
                    <div 
                      className="text-right cursor-pointer group order-1 md:order-2"
                      onClick={() => handleAyahClick(ayah.number)}
                    >
                      <p className="text-2xl leading-relaxed font-arabic text-primary group-hover:text-primary/80 transition-colors">
                        {ayah.arabic}
                      </p>
                      <span className="inline-block mt-2 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                        {ayah.number}
                      </span>
                    </div>
                  </div>
                )}

                {displayMode === 'arabic-first' && (
                  <div className="space-y-4">
                    <div 
                      className="text-right cursor-pointer group"
                      onClick={() => handleAyahClick(ayah.number)}
                    >
                      <p className="text-2xl leading-relaxed font-arabic text-primary group-hover:text-primary/80 transition-colors">
                        {ayah.arabic}
                      </p>
                      <span className="inline-block mt-2 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                        {ayah.number}
                      </span>
                    </div>
                    <div 
                      className="cursor-pointer group"
                      onClick={() => handleAyahClick(ayah.number)}
                    >
                      <p className="text-lg leading-relaxed font-english text-foreground group-hover:text-foreground/80 transition-colors">
                        {ayah.english}
                      </p>
                    </div>
                  </div>
                )}

                {displayMode === 'english-first' && (
                  <div className="space-y-4">
                    <div 
                      className="cursor-pointer group"
                      onClick={() => handleAyahClick(ayah.number)}
                    >
                      <p className="text-lg leading-relaxed font-english text-foreground group-hover:text-foreground/80 transition-colors">
                        {ayah.english}
                      </p>
                    </div>
                    <div 
                      className="text-right cursor-pointer group"
                      onClick={() => handleAyahClick(ayah.number)}
                    >
                      <p className="text-2xl leading-relaxed font-arabic text-primary group-hover:text-primary/80 transition-colors">
                        {ayah.arabic}
                      </p>
                      <span className="inline-block mt-2 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                        {ayah.number}
                      </span>
                    </div>
                  </div>
                )}

                {/* Expanded meaning and tafsir */}
                {selectedAyah === ayah.number && (
                  <div className="mt-6 p-4 bg-accent/20 rounded-lg space-y-4 animate-accordion-down">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        Tap the verse to explore its meaning, tafsir, and historical context
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSourceInfo(ayah.number)}
                          className="text-xs"
                        >
                          <Info className="h-3 w-3 mr-1" />
                          Sources
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReport(ayah.number)}
                          className="text-xs"
                        >
                          <Flag className="h-3 w-3 mr-1" />
                          Report
                        </Button>
                      </div>
                    </div>

                    {ayah.meaning && (
                      <div>
                        <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                          <Heart className="h-4 w-4" />
                          Meaning
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {ayah.meaning}
                        </p>
                      </div>
                    )}
                    
                    {ayah.tafsir && (
                      <div>
                        <h4 className="text-sm font-semibold text-primary mb-2">
                          Tafsir
                          <Badge className="ml-2 bg-green-100 text-green-800 border-green-200 text-xs">
                            Authentic
                          </Badge>
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {ayah.tafsir}
                        </p>
                      </div>
                    )}

                    <div className="pt-2 border-t border-accent/30">
                      <Button variant="sacred" size="sm">
                        Continue Reflecting
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Footer with peaceful message */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground italic">
            "And We have certainly made the Qur'an easy for remembrance, so is there any who will remember?" - 54:17
          </p>
        </div>
      </main>

      {/* Dialogs and Drawers */}
      {selectedAyahForInfo && (
        <SourceInfoDrawer
          isOpen={showSourceInfo}
          onClose={() => setShowSourceInfo(false)}
          ayahNumber={selectedAyahForInfo}
          sourceInfo={sampleSurah.ayahs.find(a => a.number === selectedAyahForInfo)?.sourceInfo || {
            arabic: { source: "Tanzil.net", authority: "Uthmanic Script Standard" },
            translation: { source: "Saheeh International", translator: "AbdulQasim Publishing House" }
          }}
        />
      )}

      {selectedAyahForInfo && (
        <ReportContentDialog
          isOpen={showReportDialog}
          onClose={() => setShowReportDialog(false)}
          ayahNumber={selectedAyahForInfo}
          surahName={sampleSurah.name}
        />
      )}

      <OnboardingDialog
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </div>
  );
};

export default QuranReader;