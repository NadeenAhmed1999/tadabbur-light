import React, { useState } from 'react';
import QuranReader from '@/components/QuranReader';
import SurahNavigation from '@/components/SurahNavigation';
import ProgressPage from '@/pages/Progress';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, Heart, Star, Users, Shield, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'reader' | 'navigation' | 'progress'>('home');
  const [selectedSurah, setSelectedSurah] = useState<number>(1);

  if (currentView === 'reader') {
    return <QuranReader onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'navigation') {
    return (
      <div className="min-h-screen bg-gradient-sacred">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentView('home')}
              className="mb-4"
            >
              ← Back to Home
            </Button>
          </div>
          <SurahNavigation 
            onSurahSelect={(surahNumber) => {
              setSelectedSurah(surahNumber);
              setCurrentView('reader');
            }}
            selectedSurah={selectedSurah}
          />
        </div>
      </div>
    );
  }

  if (currentView === 'progress') {
    return (
      <ProgressPage 
        onBack={() => setCurrentView('home')}
        onNavigateToSurah={(surahNumber) => {
          setSelectedSurah(surahNumber);
          setCurrentView('reader');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-sacred">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-foreground tracking-tight">
                Miftah
              </h1>
              <p className="text-xl font-arabic text-primary">
                مفتاح القرآن الكريم
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Reflect deeply on the Qur'an through Arabic and English with contextual meanings, 
                tafsir, and the stories behind each revelation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="default" 
                size="lg"
                onClick={() => setCurrentView('reader')}
                className="shadow-elevated"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Begin Reading
              </Button>
              <Button 
                variant="sacred" 
                size="lg"
                onClick={() => setCurrentView('navigation')}
              >
                <Star className="h-5 w-5 mr-2" />
                Explore Surahs
              </Button>
              <Button 
                variant="peaceful" 
                size="lg"
                onClick={() => setCurrentView('progress')}
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                View Progress
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 text-center shadow-gentle hover:shadow-elevated transition-gentle">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Arabic & English</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Read the Qur'an in beautiful Arabic script alongside clear English translations, 
              with customizable display modes for your preference.
            </p>
          </Card>

          <Card className="p-6 text-center shadow-gentle hover:shadow-elevated transition-gentle">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Meanings & Tafsir</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Tap any verse to discover its deeper meaning, context, and scholarly interpretation 
              from authentic classical sources.
            </p>
          </Card>

          <Card className="p-6 text-center shadow-gentle hover:shadow-elevated transition-gentle">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Stories & Context</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Learn the historical background and stories behind revelations to understand 
              the wisdom and guidance within each verse.
            </p>
          </Card>
        </div>
      </div>

      {/* Spiritual Quote */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Card className="p-8 text-center bg-gradient-dawn border-accent/20">
          <p className="text-lg font-arabic text-primary mb-2">
            وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ
          </p>
          <p className="text-muted-foreground italic">
            "And We have certainly made the Qur'an easy for remembrance, so is there any who will remember?"
          </p>
          <p className="text-sm text-muted-foreground mt-2">- Qur'an 54:17</p>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Miftah</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A peaceful space for reflection and understanding of the Holy Qur'an
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span>Built with reverence and respect</span>
              <span>•</span>
              <Link to="/sources-policy" className="hover:text-primary transition-colors flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Sources & Review Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
