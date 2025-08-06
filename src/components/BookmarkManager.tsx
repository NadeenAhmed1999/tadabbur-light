import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bookmark, Heart, Trash2, BookOpen } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface BookmarkedVerse {
  id: string;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  arabic: string;
  english: string;
  meaning?: string;
  dateBookmarked: string;
  notes?: string;
}

interface BookmarkManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToVerse: (surahNumber: number, ayahNumber: number) => void;
}

const BookmarkManager: React.FC<BookmarkManagerProps> = ({ 
  isOpen, 
  onClose, 
  onNavigateToVerse 
}) => {
  const [bookmarks, setBookmarks] = useState<BookmarkedVerse[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      loadBookmarks();
    }
  }, [isOpen]);

  const loadBookmarks = () => {
    const saved = localStorage.getItem('miftah-bookmarks');
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading bookmarks:', error);
        setBookmarks([]);
      }
    }
  };

  const removeBookmark = (bookmarkId: string) => {
    const updated = bookmarks.filter(b => b.id !== bookmarkId);
    setBookmarks(updated);
    localStorage.setItem('miftah-bookmarks', JSON.stringify(updated));
    
    toast({
      title: "Bookmark removed",
      description: "The verse has been removed from your bookmarks.",
    });
  };

  const handleVerseClick = (bookmark: BookmarkedVerse) => {
    onNavigateToVerse(bookmark.surahNumber, bookmark.ayahNumber);
    onClose();
  };

  const clearAllBookmarks = () => {
    setBookmarks([]);
    localStorage.removeItem('miftah-bookmarks');
    
    toast({
      title: "All bookmarks cleared",
      description: "Your bookmark collection has been cleared.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-primary" />
            My Bookmarks
          </DialogTitle>
          <DialogDescription>
            Your saved verses for reflection and study
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {bookmarks.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No bookmarks yet</h3>
              <p className="text-muted-foreground mb-4">
                Start bookmarking verses that speak to your heart for easy access later.
              </p>
              <p className="text-sm text-muted-foreground">
                Tap the bookmark icon next to any verse to save it here.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {bookmarks.length} bookmarked verse{bookmarks.length !== 1 ? 's' : ''}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllBookmarks}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>

              <div className="max-h-96 overflow-y-auto space-y-3">
                {bookmarks.map((bookmark) => (
                  <Card
                    key={bookmark.id}
                    className="p-4 cursor-pointer hover:shadow-elevated transition-gentle"
                    onClick={() => handleVerseClick(bookmark)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-primary">
                            {bookmark.surahName} {bookmark.surahNumber}:{bookmark.ayahNumber}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {new Date(bookmark.dateBookmarked).toLocaleDateString()}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeBookmark(bookmark.id);
                            }}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-arabic text-primary leading-relaxed">
                          {bookmark.arabic}
                        </p>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {bookmark.english}
                      </p>

                      {bookmark.meaning && (
                        <div className="pt-2 border-t border-accent/30">
                          <p className="text-xs text-muted-foreground italic">
                            {bookmark.meaning}
                          </p>
                        </div>
                      )}

                      {bookmark.notes && (
                        <div className="bg-accent/20 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">Note:</span> {bookmark.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookmarkManager;

// Utility functions for bookmark management
export const addBookmark = (
  surahNumber: number,
  surahName: string,
  ayahNumber: number,
  arabic: string,
  english: string,
  meaning?: string,
  notes?: string
): void => {
  const bookmark: BookmarkedVerse = {
    id: `${surahNumber}-${ayahNumber}-${Date.now()}`,
    surahNumber,
    surahName,
    ayahNumber,
    arabic,
    english,
    meaning,
    dateBookmarked: new Date().toISOString(),
    notes
  };

  const existing = localStorage.getItem('miftah-bookmarks');
  const bookmarks = existing ? JSON.parse(existing) : [];
  
  // Check if already bookmarked
  const alreadyExists = bookmarks.some(
    (b: BookmarkedVerse) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber
  );
  
  if (!alreadyExists) {
    bookmarks.push(bookmark);
    localStorage.setItem('miftah-bookmarks', JSON.stringify(bookmarks));
  }
};

export const removeBookmark = (surahNumber: number, ayahNumber: number): void => {
  const existing = localStorage.getItem('miftah-bookmarks');
  if (existing) {
    const bookmarks = JSON.parse(existing);
    const filtered = bookmarks.filter(
      (b: BookmarkedVerse) => !(b.surahNumber === surahNumber && b.ayahNumber === ayahNumber)
    );
    localStorage.setItem('miftah-bookmarks', JSON.stringify(filtered));
  }
};

export const isBookmarked = (surahNumber: number, ayahNumber: number): boolean => {
  const existing = localStorage.getItem('miftah-bookmarks');
  if (existing) {
    const bookmarks = JSON.parse(existing);
    return bookmarks.some(
      (b: BookmarkedVerse) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber
    );
  }
  return false;
};