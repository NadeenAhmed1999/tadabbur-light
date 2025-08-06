interface ReadingProgress {
  lastSurah: number;
  lastAyah: number;
  completedSurahs: number[];
  totalReadingTime: number; // in minutes
  dailyGoal: number; // verses per day
  streak: number; // consecutive days
  lastReadDate: string;
  sessionsToday: number;
}

interface ReadingSession {
  date: string;
  surahNumber: number;
  startAyah: number;
  endAyah: number;
  duration: number; // in minutes
  versesRead: number;
}

class ReadingProgressManager {
  private static instance: ReadingProgressManager;
  private progress: ReadingProgress;

  private constructor() {
    this.progress = this.loadProgress();
  }

  public static getInstance(): ReadingProgressManager {
    if (!ReadingProgressManager.instance) {
      ReadingProgressManager.instance = new ReadingProgressManager();
    }
    return ReadingProgressManager.instance;
  }

  private loadProgress(): ReadingProgress {
    const saved = localStorage.getItem('miftah-reading-progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Error loading reading progress:', error);
      }
    }
    
    return {
      lastSurah: 1,
      lastAyah: 1,
      completedSurahs: [],
      totalReadingTime: 0,
      dailyGoal: 10,
      streak: 0,
      lastReadDate: '',
      sessionsToday: 0
    };
  }

  private saveProgress(): void {
    localStorage.setItem('miftah-reading-progress', JSON.stringify(this.progress));
  }

  public updateProgress(surahNumber: number, ayahNumber: number): void {
    this.progress.lastSurah = surahNumber;
    this.progress.lastAyah = ayahNumber;
    
    const today = new Date().toDateString();
    const lastRead = new Date(this.progress.lastReadDate).toDateString();
    
    if (today !== lastRead) {
      // New day
      if (this.isConsecutiveDay(today, lastRead)) {
        this.progress.streak += 1;
      } else {
        this.progress.streak = 1;
      }
      this.progress.sessionsToday = 1;
    } else {
      this.progress.sessionsToday += 1;
    }
    
    this.progress.lastReadDate = new Date().toISOString();
    this.saveProgress();
  }

  private isConsecutiveDay(today: string, lastRead: string): boolean {
    const todayDate = new Date(today);
    const lastReadDate = new Date(lastRead);
    const diffTime = todayDate.getTime() - lastReadDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1;
  }

  public addReadingSession(session: Omit<ReadingSession, 'date'>): void {
    this.progress.totalReadingTime += session.duration;
    
    // Save detailed session
    const sessions = this.getReadingSessions();
    sessions.push({
      ...session,
      date: new Date().toISOString()
    });
    
    // Keep only last 30 days of sessions
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const filteredSessions = sessions.filter(s => 
      new Date(s.date) > thirtyDaysAgo
    );
    
    localStorage.setItem('miftah-reading-sessions', JSON.stringify(filteredSessions));
    this.saveProgress();
  }

  public markSurahCompleted(surahNumber: number): void {
    if (!this.progress.completedSurahs.includes(surahNumber)) {
      this.progress.completedSurahs.push(surahNumber);
      this.saveProgress();
    }
  }

  public getProgress(): ReadingProgress {
    return { ...this.progress };
  }

  public getReadingSessions(): ReadingSession[] {
    const saved = localStorage.getItem('miftah-reading-sessions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Error loading reading sessions:', error);
      }
    }
    return [];
  }

  public getTodayStats(): {
    versesRead: number;
    timeSpent: number;
    goalProgress: number;
    sessionsCount: number;
  } {
    const sessions = this.getReadingSessions();
    const today = new Date().toDateString();
    const todaySessions = sessions.filter(s => 
      new Date(s.date).toDateString() === today
    );

    const versesRead = todaySessions.reduce((sum, s) => sum + s.versesRead, 0);
    const timeSpent = todaySessions.reduce((sum, s) => sum + s.duration, 0);
    const goalProgress = Math.min(100, (versesRead / this.progress.dailyGoal) * 100);

    return {
      versesRead,
      timeSpent,
      goalProgress,
      sessionsCount: this.progress.sessionsToday
    };
  }

  public setDailyGoal(goal: number): void {
    this.progress.dailyGoal = goal;
    this.saveProgress();
  }

  public getWeeklyStats(): {
    daysRead: number;
    totalVerses: number;
    averageTime: number;
  } {
    const sessions = this.getReadingSessions();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const weekSessions = sessions.filter(s => 
      new Date(s.date) > weekAgo
    );

    const daysWithReading = new Set(
      weekSessions.map(s => new Date(s.date).toDateString())
    ).size;

    const totalVerses = weekSessions.reduce((sum, s) => sum + s.versesRead, 0);
    const totalTime = weekSessions.reduce((sum, s) => sum + s.duration, 0);
    const averageTime = daysWithReading > 0 ? totalTime / daysWithReading : 0;

    return {
      daysRead: daysWithReading,
      totalVerses,
      averageTime
    };
  }
}

export default ReadingProgressManager;
export type { ReadingProgress, ReadingSession };
