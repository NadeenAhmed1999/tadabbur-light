import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Heart, Search, Moon, Sun, ArrowLeft, Info, Flag, Bookmark, BookmarkCheck, BarChart3 } from 'lucide-react';
import SourceInfoDrawer from './SourceInfoDrawer';
import ReportContentDialog from './ReportContentDialog';
import OnboardingDialog from './OnboardingDialog';
import SearchDialog from './SearchDialog';
import BookmarkManager, { addBookmark, removeBookmark, isBookmarked } from './BookmarkManager';
import ReadingStats from './ReadingStats';
import ReadingProgressManager from '@/utils/ReadingProgressManager';
import { useToast } from '@/components/ui/use-toast';

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

// Enhanced sample data with more verses
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
      meaning: "This is the opening verse that begins most chapters of the Qur'an, invoking Allah's mercy and grace before any endeavor.",
      tafsir: "The Basmala is a declaration of reliance on Allah before beginning any good deed. It reminds us that all actions should begin with seeking Allah's blessing and guidance.",
      story: "The Prophet ﷺ said: 'Every important matter that does not begin with Bismillah is deficient.' This shows the importance of beginning with Allah's name.",
      sourceInfo: {
        arabic: { source: "Tanzil.net", authority: "Uthmanic Script Standard" },
        translation: { source: "Saheeh International", translator: "AbdulQasim Publishing House" },
        tafsir: { source: "Tafsir Ibn Kathir (Abridged)", scholar: "Imam Ibn Kathir", authenticity: "authentic" },
        story: { source: "Sahih Hadith Collections", authenticity: "authentic", narrator: "Abu Hurayrah (RA)" }
      }
    },
    {
      number: 2,
      arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      english: "All praise belongs to Allah, Lord of all the worlds.",
      meaning: "Recognition that all praise and gratitude belongs to Allah, who is the Creator, Sustainer, and Master of everything that exists in all realms.",
      tafsir: "This verse establishes Allah as the Creator and Sustainer of all creation, worthy of all praise. 'Al-Alameen' refers to all that exists - humans, jinn, angels, and all of creation.",
      story: "Ibn Abbas (RA) explained that 'Al-Alameen' encompasses all created beings. Each species forms a world (alam) of its own, all under Allah's dominion.",
      sourceInfo: {
        arabic: { source: "Tanzil.net", authority: "Uthmanic Script Standard" },
        translation: { source: "Saheeh International", translator: "AbdulQasim Publishing House" },
        tafsir: { source: "Tafsir Ibn Kathir (Abridged)", scholar: "Imam Ibn Kathir", authenticity: "authentic" },
        story: { source: "Tafsir Ibn Abbas", authenticity: "authentic", narrator: "Abdullah ibn Abbas (RA)" }
      }
    },
    {
      number: 3,
      arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
      english: "The Gracious, the Merciful.",
      meaning: "Two beautiful names of Allah emphasizing His infinite mercy and compassion - one general for all creation, one specific for believers.",
      tafsir: "Ar-Rahman refers to Allah's general mercy that encompasses all creation in this world. Ar-Raheem refers to His special mercy reserved for believers in the Hereafter.",
      story: "The early Muslims debated these names until the Quran itself clarified: 'Say: Call upon Allah or call upon Ar-Rahman - whichever you call, to Him belong the most beautiful names.'",
      sourceInfo: {
        arabic: { source: "Tanzil.net", authority: "Uthmanic Script Standard" },
        translation: { source: "Saheeh International", translator: "AbdulQasim Publishing House" },
        tafsir: { source: "Tafsir al-Jalalayn", scholar: "Jalal ad-Din al-Mahalli", authenticity: "authentic" },
        story: { source: "Asbab al-Nuzul", authenticity: "authentic", narrator: "Multiple companions" }
      }
    },
    {
      number: 4,
      arabic: "مَالِكِ يَوْمِ الدِّينِ",
      english: "Master of the Day of Judgment.",
      meaning: "Allah is the absolute sovereign of the Day of Judgment when all will be held accountable for their deeds.",
      tafsir: "This verse reminds us of accountability and the Hereafter. 'Yawm ad-Deen' specifically refers to the Day of Recompense when justice will be perfectly established.",
      story: "When this verse is recited, the angels tremble with awe, recognizing the magnitude of that Day when Allah's justice will be manifest to all creation.",
      sourceInfo: {
        arabic: { source: "Tanzil.net", authority: "Uthmanic Script Standard" },
        translation: { source: "Saheeh International", translator: "AbdulQasim Publishing House" },
        tafsir: { source: "Tafsir Ibn Kathir (Abridged)", scholar: "Imam Ibn Kathir", authenticity: "authentic" },
        story: { source: "Classical Tafsir Literature", authenticity: "disputed", narrator: "Various scholars" }
      }
    },
    {
      number: 5,
      arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      english: "You alone we worship, and You alone we ask for help.",
      meaning: "A declaration of pure monotheism - worshipping Allah alone and seeking help from Him alone in all matters.",
      tafsir: "This is the essence of Islam: singling out Allah for worship (Tawhid al-Uluhiyyah) and seeking aid only from Him. The plural form 'we' represents all believers united in this declaration.",
      story: "The Prophet ﷺ said this verse is 'the greatest verse in the Quran' because it combines both worship and supplication, representing the complete relationship between servant and Lord.",
      sourceInfo: {
        arabic: { source: "Tanzil.net", authority: "Uthmanic Script Standard" },
        translation: { source: "Saheeh International", translator: "AbdulQasim Publishing House" },
        tafsir: { source: "Tafsir Ibn Kathir (Abridged)", scholar: "Imam Ibn Kathir", authenticity: "authentic" },
        story: { source: "Sahih Hadith Collections", authenticity: "authentic", narrator: "Prophet Muhammad ﷺ" }
      }
    },
    {
      number: 6,
      arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      english: "Guide us to the straight path.",
      meaning: "A heartfelt supplication asking Allah for guidance to the correct way of life that leads to His pleasure and paradise.",
      tafsir: "As-Sirat al-Mustaqeem is the path of those who follow Allah's guidance. It's the middle path that avoids extremes and leads to success in both worlds.",
      story: "Ibn Abbas (RA) said: 'This is Islam.' The straight path encompasses following the Quran, the Sunnah, and the way of the righteous predecessors.",
      sourceInfo: {
        arabic: { source: "Tanzil.net", authority: "Uthmanic Script Standard" },
        translation: { source: "Saheeh International", translator: "AbdulQasim Publishing House" },
        tafsir: { source: "Tafsir al-Jalalayn", scholar: "Jalal ad-Din as-Suyuti", authenticity: "authentic" },
        story: { source: "Tafsir Ibn Abbas", authenticity: "authentic", narrator: "Abdullah ibn Abbas (RA)" }
      }
    },
    {
      number: 7,
      arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      english: "The path of those You have blessed, not of those who have incurred anger, nor of those who have gone astray.",
      meaning: "The path of the prophets, truthful ones, martyrs, and righteous people - not the path of those who knew the truth but rejected it, nor those who went astray through ignorance.",
      tafsir: "Those Allah blessed include all the prophets and righteous people. 'Those who incurred anger' traditionally refers to those who knew the truth but rejected it, while 'those who went astray' refers to those who were misguided.",
      story: "The Prophet ﷺ explained that we should say 'Ameen' after this verse, and that whoever says it simultaneously with the angels will have their past sins forgiven.",
      sourceInfo: {
        arabic: { source: "Tanzil.net", authority: "Uthmanic Script Standard" },
        translation: { source: "Saheeh International", translator: "AbdulQasim Publishing House" },
        tafsir: { source: "Tafsir Ibn Kathir (Abridged)", scholar: "Imam Ibn Kathir", authenticity: "authentic" },
        story: { source: "Sahih Bukhari & Muslim", authenticity: "authentic", narrator: "Abu Hurayrah (RA)" }
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
  const [showSearch, setShowSearch] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [selectedAyahForInfo, setSelectedAyahForInfo] = useState<number | null>(null);
  const [bookmarkedVerses, setBookmarkedVerses] = useState<Set<number>>(new Set());
  const [readingSession, setReadingSession] = useState<{ startTime: Date; versesRead: number }>({
    startTime: new Date(),
    versesRead: 0
  });
  
  const progressManager = ReadingProgressManager.getInstance();
  const { toast } = useToast();

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('miftah-onboarding-completed');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }

    // Load bookmarked verses
    updateBookmarkStatus();
    
    // Track page view
    progressManager.updateProgress(sampleSurah.number, 1);
  }, []);

  const updateBookmarkStatus = () => {
    const bookmarked = new Set<number>();
    sampleSurah.ayahs.forEach(ayah => {
      if (isBookmarked(sampleSurah.number, ayah.number)) {
        bookmarked.add(ayah.number);
      }
    });
    setBookmarkedVerses(bookmarked);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleAyahClick = useCallback((ayahNumber: number) => {
    setSelectedAyah(selectedAyah === ayahNumber ? null : ayahNumber);
    
    // Track verse reading
    if (selectedAyah !== ayahNumber) {
      setReadingSession(prev => ({
        ...prev,
        versesRead: prev.versesRead + 1
      }));
      progressManager.updateProgress(sampleSurah.number, ayahNumber);
    }
  }, [selectedAyah, progressManager]);

  const handleSourceInfo = (ayahNumber: number) => {
    setSelectedAyahForInfo(ayahNumber);
    setShowSourceInfo(true);
  };

  const handleReport = (ayahNumber: number) => {
    setSelectedAyahForInfo(ayahNumber);
    setShowReportDialog(true);
  };

  const handleBookmarkToggle = (ayahNumber: number) => {
    const ayah = sampleSurah.ayahs.find(a => a.number === ayahNumber);
    if (!ayah) return;

    if (bookmarkedVerses.has(ayahNumber)) {
      removeBookmark(sampleSurah.number, ayahNumber);
      setBookmarkedVerses(prev => {
        const updated = new Set(prev);
        updated.delete(ayahNumber);
        return updated;
      });
      toast({
        title: "Bookmark removed",
        description: `Verse ${ayahNumber} removed from bookmarks.`,
      });
    } else {
      addBookmark(
        sampleSurah.number,
        sampleSurah.name,
        ayahNumber,
        ayah.arabic,
        ayah.english,
        ayah.meaning
      );
      setBookmarkedVerses(prev => new Set([...prev, ayahNumber]));
      toast({
        title: "Verse bookmarked",
        description: `Verse ${ayahNumber} saved to your bookmarks.`,
      });
    }
  };

  const handleNavigateToVerse = (surahNumber: number, ayahNumber: number) => {
    // For now, just scroll to verse since we're in the same surah
    if (surahNumber === sampleSurah.number) {
      setSelectedAyah(ayahNumber);
      // In a real app, you'd scroll to the verse element
    }
  };

  // End reading session when component unmounts
  useEffect(() => {
    return () => {
      const duration = (Date.now() - readingSession.startTime.getTime()) / (1000 * 60); // minutes
      if (readingSession.versesRead > 0) {
        progressManager.addReadingSession({
          surahNumber: sampleSurah.number,
          startAyah: 1,
          endAyah: readingSession.versesRead,
          duration: Math.max(1, Math.round(duration)),
          versesRead: readingSession.versesRead
        });
      }
    };
  }, [readingSession, progressManager]);

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
              <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)}>
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setShowBookmarks(true)}>
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setShowStats(true)}>
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Reading Stats */}
      {showStats && (
        <div className="max-w-4xl mx-auto px-6 pb-6">
          <ReadingStats
            todayStats={progressManager.getTodayStats()}
            weeklyStats={progressManager.getWeeklyStats()}
            streak={progressManager.getProgress().streak}
            dailyGoal={progressManager.getProgress().dailyGoal}
          />
        </div>
      )}

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
            <Card key={ayah.number} className="p-6 shadow-gentle hover:shadow-elevated transition-gentle group">
              <div className="space-y-4">
                {/* Bookmark indicator */}
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleBookmarkToggle(ayah.number)}
                    className={`h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity ${
                      bookmarkedVerses.has(ayah.number) ? 'opacity-100' : ''
                    }`}
                  >
                    {bookmarkedVerses.has(ayah.number) ? (
                      <BookmarkCheck className="h-4 w-4 text-primary" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {displayMode === 'side-by-side' && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div 
                      className="cursor-pointer group/text order-2 md:order-1"
                      onClick={() => handleAyahClick(ayah.number)}
                    >
                      <p className="text-lg leading-relaxed font-english text-foreground group-hover/text:text-foreground/80 transition-colors">
                        {ayah.english}
                      </p>
                    </div>
                    <div 
                      className="text-right cursor-pointer group/text order-1 md:order-2"
                      onClick={() => handleAyahClick(ayah.number)}
                    >
                      <p className="text-2xl md:text-3xl leading-relaxed font-arabic text-primary group-hover/text:text-primary/80 transition-colors">
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
                      className="text-right cursor-pointer group/text"
                      onClick={() => handleAyahClick(ayah.number)}
                    >
                      <p className="text-2xl md:text-3xl leading-relaxed font-arabic text-primary group-hover/text:text-primary/80 transition-colors">
                        {ayah.arabic}
                      </p>
                      <span className="inline-block mt-2 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                        {ayah.number}
                      </span>
                    </div>
                    <div 
                      className="cursor-pointer group/text"
                      onClick={() => handleAyahClick(ayah.number)}
                    >
                      <p className="text-lg leading-relaxed font-english text-foreground group-hover/text:text-foreground/80 transition-colors">
                        {ayah.english}
                      </p>
                    </div>
                  </div>
                )}

                {displayMode === 'english-first' && (
                  <div className="space-y-4">
                    <div 
                      className="cursor-pointer group/text"
                      onClick={() => handleAyahClick(ayah.number)}
                    >
                      <p className="text-lg leading-relaxed font-english text-foreground group-hover/text:text-foreground/80 transition-colors">
                        {ayah.english}
                      </p>
                    </div>
                    <div 
                      className="text-right cursor-pointer group/text"
                      onClick={() => handleAyahClick(ayah.number)}
                    >
                      <p className="text-2xl md:text-3xl leading-relaxed font-arabic text-primary group-hover/text:text-primary/80 transition-colors">
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
                        Explore the deeper meaning, commentary, and historical context
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
                            {ayah.sourceInfo?.tafsir?.authenticity === 'authentic' ? 'Authentic' : 'Scholarly Opinion'}
                          </Badge>
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {ayah.tafsir}
                        </p>
                      </div>
                    )}

                    {ayah.story && (
                      <div>
                        <h4 className="text-sm font-semibold text-primary mb-2">
                          Historical Context
                          <Badge className={`ml-2 text-xs ${
                            ayah.sourceInfo?.story?.authenticity === 'authentic' 
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : ayah.sourceInfo?.story?.authenticity === 'weak'
                              ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                              : 'bg-orange-100 text-orange-800 border-orange-200'
                          }`}>
                            {ayah.sourceInfo?.story?.authenticity || 'Scholarly Opinion'}
                          </Badge>
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {ayah.story}
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
      <SearchDialog
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        onNavigate={handleNavigateToVerse}
      />

      <BookmarkManager
        isOpen={showBookmarks}
        onClose={() => setShowBookmarks(false)}
        onNavigateToVerse={handleNavigateToVerse}
      />

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