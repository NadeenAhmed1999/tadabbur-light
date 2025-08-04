import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Heart, Search, Moon, Sun } from 'lucide-react';

interface Ayah {
  number: number;
  arabic: string;
  english: string;
  meaning?: string;
  tafsir?: string;
  story?: string;
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
      tafsir: "The Basmala is a declaration of reliance on Allah before beginning any good deed."
    },
    {
      number: 2,
      arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      english: "All praise belongs to Allah, Lord of all the worlds.",
      meaning: "Recognition that all praise and gratitude belongs to Allah, who is the sustainer of everything that exists.",
      tafsir: "This verse establishes Allah as the Creator and Sustainer of all creation, worthy of all praise."
    },
    {
      number: 3,
      arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
      english: "The Gracious, the Merciful.",
      meaning: "Two beautiful names of Allah emphasizing His infinite mercy and compassion.",
      tafsir: "Rahman refers to Allah's general mercy for all creation, while Raheem refers to His special mercy for believers."
    }
  ]
};

const QuranReader: React.FC = () => {
  const [selectedAyah, setSelectedAyah] = useState<number | null>(null);
  const [displayMode, setDisplayMode] = useState<'side-by-side' | 'arabic-first' | 'english-first'>('side-by-side');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleAyahClick = (ayahNumber: number) => {
    setSelectedAyah(selectedAyah === ayahNumber ? null : ayahNumber);
  };

  return (
    <div className="min-h-screen bg-gradient-sacred">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold text-foreground">Tadabbur</h1>
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
                  <div className="mt-6 p-4 bg-accent/20 rounded-lg space-y-3 animate-accordion-down">
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
                        <h4 className="text-sm font-semibold text-primary mb-2">Tafsir</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {ayah.tafsir}
                        </p>
                      </div>
                    )}

                    <Button variant="sacred" size="sm" className="mt-3">
                      Continue Reflecting
                    </Button>
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
    </div>
  );
};

export default QuranReader;