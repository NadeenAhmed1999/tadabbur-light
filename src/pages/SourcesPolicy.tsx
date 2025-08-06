import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, Shield, Users, CheckCircle, AlertTriangle, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SourcesPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-sacred">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Sources & Review Policy</h1>
                <p className="text-muted-foreground">Our commitment to accuracy and authenticity</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <BookOpen className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-3">Our Sacred Responsibility</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    At Miftah, we recognize the immense responsibility of presenting the words of Allah (SWT) 
                    and Islamic scholarship. Every piece of content in our app undergoes rigorous verification 
                    to ensure accuracy, authenticity, and alignment with orthodox Islamic teachings.
                  </p>
                  <div className="mt-4 p-4 bg-gradient-dawn rounded-lg">
                    <p className="text-sm font-arabic text-center text-primary mb-2">
                      وَمَنْ أَحْسَنُ قَوْلًا مِّمَّن دَعَا إِلَى اللَّهِ وَعَمِلَ صَالِحًا
                    </p>
                    <p className="text-xs text-center text-muted-foreground italic">
                      "And who is better in speech than one who invites to Allah and does righteousness"
                    </p>
                    <p className="text-xs text-center text-muted-foreground mt-1">- Qur'an 41:33</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Primary Sources */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Primary Sources
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-primary mb-3">Arabic Text</h3>
                <div className="grid gap-3">
                  <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Tanzil.net</p>
                      <p className="text-xs text-muted-foreground">
                        Authoritative Qur'anic text database maintained by Islamic scholars
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Quran.com</p>
                      <p className="text-xs text-muted-foreground">
                        Cross-referenced for verification and consistency
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-3">English Translations</h3>
                <div className="grid gap-3">
                  <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Saheeh International</p>
                      <p className="text-xs text-muted-foreground">
                        Modern English translation by AbdulQasim Publishing House
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Muhsin Khan</p>
                      <p className="text-xs text-muted-foreground">
                        Translation by Dr. Muhammad Muhsin Khan, Islamic University Medina
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">M.A.S. Abdel Haleem</p>
                      <p className="text-xs text-muted-foreground">
                        Oxford World's Classics translation by Professor Abdel Haleem
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-3">Tafsir (Commentary)</h3>
                <div className="grid gap-3">
                  <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Tafsir Ibn Kathir (Abridged)</p>
                      <p className="text-xs text-muted-foreground">
                        Classical commentary by Imam Ibn Kathir, summarized for accessibility
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Tafsir al-Jalalayn</p>
                      <p className="text-xs text-muted-foreground">
                        Concise classical commentary by Jalal ad-Din al-Mahalli and as-Suyuti
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-3">Historical Context & Stories</h3>
                <div className="grid gap-3">
                  <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Asbab al-Nuzul by al-Wahidi</p>
                      <p className="text-xs text-muted-foreground">
                        Classical work on the circumstances of revelation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Stories of the Qur'an by Ibn Kathir</p>
                      <p className="text-xs text-muted-foreground">
                        Historical narratives compiled by Imam Ibn Kathir
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-accent/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Authentic Hadith Collections</p>
                      <p className="text-xs text-muted-foreground">
                        Sahih Bukhari, Sahih Muslim, and other authentic hadith compilations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Review Process */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Scholarly Review Process
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 border-l-4 border-primary bg-primary/5">
                <h3 className="font-semibold mb-2">Content Workflow</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Initial content sourcing from authenticated repositories</li>
                  <li>Simplification and adaptation for modern readability</li>
                  <li>Review by qualified Islamic scholar with ijazah credentials</li>
                  <li>Cross-referencing with multiple classical sources</li>
                  <li>Content labeling according to authenticity grades</li>
                  <li>Final verification before publication</li>
                  <li>Ongoing monitoring for user feedback and corrections</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Our Review Team</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  All content is reviewed by Islamic scholars who hold traditional ijazah (authorization) 
                  in Qur'anic sciences, hadith, and Islamic jurisprudence. Our reviewers have studied 
                  at renowned Islamic institutions and maintain connection with the traditional 
                  chains of Islamic scholarship.
                </p>
                <div className="bg-accent/20 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    While we strive for the highest accuracy, we humbly acknowledge that perfect 
                    understanding belongs to Allah alone. We encourage readers to consult with 
                    local scholars for personal guidance and clarification.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Content Labeling */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Content Authenticity Labels
            </h2>
            
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <Badge className="bg-green-100 text-green-800 border-green-200 mt-1">Authentic</Badge>
                <div>
                  <p className="text-sm font-medium">Sahih Content</p>
                  <p className="text-xs text-muted-foreground">
                    Verified through multiple authentic sources with strong chains of narration
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 mt-1">Scholarly Opinion</Badge>
                <div>
                  <p className="text-sm font-medium">Classical Commentary</p>
                  <p className="text-xs text-muted-foreground">
                    Interpretations from recognized classical scholars, clearly attributed
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 mt-1">Weak</Badge>
                <div>
                  <p className="text-sm font-medium">Da'if Narrations</p>
                  <p className="text-xs text-muted-foreground">
                    Narrations with weak chains, included for historical context with clear labeling
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-orange-100 text-orange-800 border-orange-200 mt-1">Disputed</Badge>
                <div>
                  <p className="text-sm font-medium">Conflicting Sources</p>
                  <p className="text-xs text-muted-foreground">
                    Content where classical scholars held different opinions, all views presented
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* User Feedback */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Community Feedback & Corrections
            </h2>
            
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                We welcome and encourage feedback from the Muslim community. If you notice any 
                inaccuracies, have concerns about content authenticity, or wish to suggest 
                improvements, please use our built-in reporting system or contact us directly.
              </p>
              
              <div className="grid gap-4">
                <div>
                  <h3 className="font-semibold mb-2">How to Report Issues</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Use the "Report Content" button on any verse</li>
                    <li>• Specify the type of concern (translation, tafsir, story, etc.)</li>
                    <li>• Provide detailed description with references if available</li>
                    <li>• Our scholars typically respond within 3-5 business days</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-gradient-dawn rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-primary text-sm mb-1">Important Notice</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        This app is a tool for reflection and learning, not a substitute for 
                        qualified Islamic guidance. For religious rulings, personal matters, 
                        or complex questions, please consult with knowledgeable local scholars.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Footer */}
          <Card className="p-6 bg-accent/10">
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                May Allah accept our efforts and guide us to present His words with the honor, 
                accuracy, and reverence they deserve. Any errors are from us, and all good is from Allah.
              </p>
              <div className="flex items-center justify-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Miftah Team</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Last updated: January 2024
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SourcesPolicy;