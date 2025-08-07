import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, X, ArrowRight } from 'lucide-react';
import { allSurahs, type SurahInfo } from '@/data/surahs';

interface Ayah {
  surahNumber: number;
  surahName: string;
  number: number;
  arabic: string;
  english: string;
  meaning?: string;
}

interface SearchResult {
  type: 'surah' | 'ayah';
  surah?: SurahInfo;
  ayah?: Ayah;
  matchedText?: string;
}

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (surahNumber: number, ayahNumber?: number) => void;
}

// Sample Ayah data

const sampleAyahs: Ayah[] = [
  {
    surahNumber: 1, surahName: "Al-Fatihah", number: 1,
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    english: "In the name of Allah, the Gracious, the Merciful.",
    meaning: "The opening invocation seeking Allah's blessing"
  },
  {
    surahNumber: 1, surahName: "Al-Fatihah", number: 2,
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    english: "All praise belongs to Allah, Lord of all the worlds.",
    meaning: "Acknowledgment of Allah as the Creator and Sustainer"
  },
  {
    surahNumber: 1, surahName: "Al-Fatihah", number: 3,
    arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
    english: "The Gracious, the Merciful.",
    meaning: "Allah's attributes of comprehensive and specific mercy"
  },
  {
    surahNumber: 2, surahName: "Al-Baqarah", number: 2,
    arabic: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
    english: "This is the Book about which there is no doubt, a guidance for those conscious of Allah.",
    meaning: "The Quran's certainty and guidance for the God-conscious"
  },
  {
    surahNumber: 2, surahName: "Al-Baqarah", number: 255,
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
    english: "Allah - there is no deity except Him, the Ever-Living, the Self-Sustaining.",
    meaning: "The famous Ayatul Kursi declaring Allah's unique sovereignty"
  }
];

const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, onClose, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    // Search Surahs
    allSurahs.forEach(surah => {
      if (
        surah.name.toLowerCase().includes(query) ||
        surah.arabicName.includes(query) ||
        surah.number.toString() === query
      ) {
        results.push({ type: 'surah', surah });
      }
    });

    // Search Ayahs
    sampleAyahs.forEach(ayah => {
      if (
        ayah.english.toLowerCase().includes(query) ||
        ayah.arabic.includes(query) ||
        ayah.meaning?.toLowerCase().includes(query) ||
        `${ayah.surahNumber}:${ayah.number}` === query
      ) {
        const matchedText = ayah.english.toLowerCase().includes(query) 
          ? ayah.english 
          : ayah.meaning?.toLowerCase().includes(query) 
            ? ayah.meaning 
            : ayah.arabic;
        results.push({ type: 'ayah', ayah, matchedText });
      }
    });

    return results.slice(0, 10); // Limit results
  }, [searchQuery]);

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'surah' && result.surah) {
      onNavigate(result.surah.number);
    } else if (result.type === 'ayah' && result.ayah) {
      onNavigate(result.ayah.surahNumber, result.ayah.number);
    }
    onClose();
    setSearchQuery('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Search Quran
          </DialogTitle>
          <DialogDescription>
            Search by surah name, verse reference (e.g., "2:255"), or content
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Type to search surahs, verses, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {searchQuery && (
            <div className="max-h-96 overflow-y-auto space-y-2">
              {searchResults.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No results found for "{searchQuery}"</p>
                  <p className="text-sm">Try searching for surah names, verse references, or keywords</p>
                </div>
              ) : (
                searchResults.map((result, index) => (
                  <Card
                    key={index}
                    className="p-3 cursor-pointer hover:shadow-elevated transition-gentle"
                    onClick={() => handleResultClick(result)}
                  >
                    {result.type === 'surah' && result.surah && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                            {result.surah.number}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{result.surah.name}</span>
                              <span className="font-arabic text-primary">{result.surah.arabicName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{result.surah.revelation}</span>
                              <span>•</span>
                              <span>{result.surah.ayahCount} verses</span>
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}

                    {result.type === 'ayah' && result.ayah && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-primary">
                            {result.ayah.surahName} {result.ayah.surahNumber}:{result.ayah.number}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-arabic text-primary leading-relaxed">
                            {result.ayah.arabic}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {result.ayah.english}
                        </p>
                        {result.ayah.meaning && (
                          <div className="pt-2 border-t border-accent/30">
                            <p className="text-xs text-muted-foreground italic">
                              {result.ayah.meaning}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                ))
              )}
            </div>
          )}

          {!searchQuery && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="mb-2">Quick search tips:</p>
              <div className="text-sm space-y-1">
                <p>• Type surah names: "Fatihah", "Baqarah"</p>
                <p>• Use verse references: "2:255", "1:1"</p>
                <p>• Search content: "mercy", "guidance"</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;