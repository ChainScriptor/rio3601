
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  Pause, 
  Volume2, 
  Volume1, 
  VolumeX, 
  Maximize, 
  Minimize,
  SkipBack,
  SkipForward,
  Clock,
  Eye,
  LucideIcon,
  Check,
  Lock,
  ChevronDown
} from "lucide-react";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock data for course content
const COURSES = {
  "blockchain-basics": {
    title: "Blockchain Basics",
    description: "Learn the foundations of blockchain technology and cryptocurrency.",
    modules: [
      {
        id: "intro",
        title: "Introduction to Blockchain",
        lessons: [
          {
            id: "what-is-blockchain",
            title: "What is Blockchain?",
            duration: "10:25",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            isCompleted: true,
            isFree: true
          },
          {
            id: "history-of-blockchain",
            title: "History of Blockchain",
            duration: "15:30",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            isCompleted: true,
            isFree: true
          },
          {
            id: "blockchain-vs-traditional",
            title: "Blockchain vs Traditional Databases",
            duration: "12:45",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            isCompleted: false,
            isFree: false
          }
        ]
      },
      {
        id: "crypto",
        title: "Cryptocurrency Fundamentals",
        lessons: [
          {
            id: "bitcoin-intro",
            title: "Introduction to Bitcoin",
            duration: "18:20",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            isCompleted: true,
            isFree: true
          },
          {
            id: "ethereum-intro",
            title: "Introduction to Ethereum",
            duration: "20:15",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            isCompleted: true,
            isFree: false
          },
          {
            id: "altcoins",
            title: "Understanding Altcoins",
            duration: "16:40",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            isCompleted: false,
            isFree: false
          },
          {
            id: "market-analysis",
            title: "Cryptocurrency Market Analysis",
            duration: "22:10",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            isCompleted: false,
            isFree: false
          }
        ]
      }
    ]
  },
  "advanced-smart-contracts": {
    title: "Advanced Smart Contracts",
    description: "Master the art of writing secure and efficient smart contracts.",
    modules: [
      {
        id: "solidity",
        title: "Advanced Solidity Concepts",
        lessons: [
          {
            id: "advanced-data-types",
            title: "Advanced Data Types in Solidity",
            duration: "14:30",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            isCompleted: true,
            isFree: true
          },
          {
            id: "memory-management",
            title: "Memory Management",
            duration: "19:45",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            isCompleted: true,
            isFree: false
          }
        ]
      }
    ]
  },
  "web3-development": {
    title: "Web3 Development",
    description: "Build decentralized applications using modern web technologies.",
    modules: [
      {
        id: "intro-web3",
        title: "Introduction to Web3",
        lessons: [
          {
            id: "what-is-web3",
            title: "What is Web3?",
            duration: "11:15",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            isCompleted: false,
            isFree: true
          }
        ]
      }
    ]
  }
};

type CoursePlayerProps = {
  courseId: string;
};

export function CoursePlayer({ courseId }: CoursePlayerProps) {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeLesson, setActiveLesson] = useState<{moduleId: string, lessonId: string} | null>(null);
  const [activeTab, setActiveTab] = useState("content");
  
  const course = COURSES[courseId as keyof typeof COURSES];
  
  if (!course) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-pixel mb-4">Course Not Found</h1>
        <Button onClick={() => navigate("/course-videos")}>Back to Courses</Button>
      </div>
    );
  }
  
  // Find the first incomplete lesson or use the first lesson
  useEffect(() => {
    if (!activeLesson) {
      for (const module of course.modules) {
        for (const lesson of module.lessons) {
          if (!lesson.isCompleted) {
            setActiveLesson({ moduleId: module.id, lessonId: lesson.id });
            return;
          }
        }
      }
      // If all lessons are completed, set the first one
      if (course.modules.length > 0 && course.modules[0].lessons.length > 0) {
        setActiveLesson({ 
          moduleId: course.modules[0].id, 
          lessonId: course.modules[0].lessons[0].id 
        });
      }
    }
  }, [course, activeLesson]);
  
  // Get the current lesson
  const getCurrentLesson = () => {
    if (!activeLesson) return null;
    
    const module = course.modules.find(m => m.id === activeLesson.moduleId);
    if (!module) return null;
    
    return module.lessons.find(l => l.id === activeLesson.lessonId);
  };
  
  const currentLesson = getCurrentLesson();
  
  // Video control functions
  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration);
  };
  
  const handleVolumeChange = (value: number) => {
    if (!videoRef.current) return;
    
    setVolume(value);
    videoRef.current.volume = value;
    setIsMuted(value === 0);
  };
  
  const toggleMute = () => {
    if (!videoRef.current) return;
    
    if (isMuted) {
      videoRef.current.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  };
  
  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    
    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const handleLessonSelect = (moduleId: string, lessonId: string) => {
    setActiveLesson({ moduleId, lessonId });
    // Reset video state for new lesson
    setIsPlaying(false);
    setCurrentTime(0);
  };
  
  // Calculate course progress
  const getTotalLessons = () => {
    return course.modules.reduce((total, module) => total + module.lessons.length, 0);
  };
  
  const getCompletedLessons = () => {
    return course.modules.reduce((total, module) => {
      return total + module.lessons.filter(lesson => lesson.isCompleted).length;
    }, 0);
  };
  
  const progressPercentage = (getCompletedLessons() / getTotalLessons()) * 100;
  
  // Navigation between lessons
  const getNextLesson = () => {
    if (!activeLesson) return null;
    
    let foundCurrentModule = false;
    let foundCurrentLesson = false;
    
    for (const module of course.modules) {
      if (foundCurrentLesson) {
        if (module.lessons.length > 0) {
          return { moduleId: module.id, lessonId: module.lessons[0].id };
        }
      }
      
      if (module.id === activeLesson.moduleId) {
        foundCurrentModule = true;
        
        for (let i = 0; i < module.lessons.length; i++) {
          if (foundCurrentLesson && i < module.lessons.length) {
            return { moduleId: module.id, lessonId: module.lessons[i].id };
          }
          
          if (module.lessons[i].id === activeLesson.lessonId) {
            foundCurrentLesson = true;
            if (i + 1 < module.lessons.length) {
              return { moduleId: module.id, lessonId: module.lessons[i + 1].id };
            }
          }
        }
      }
    }
    
    return null;
  };
  
  const getPreviousLesson = () => {
    if (!activeLesson) return null;
    
    let previousModule = null;
    let previousLesson = null;
    
    for (const module of course.modules) {
      if (module.id === activeLesson.moduleId) {
        for (let i = 0; i < module.lessons.length; i++) {
          if (module.lessons[i].id === activeLesson.lessonId) {
            if (i > 0) {
              return { moduleId: module.id, lessonId: module.lessons[i - 1].id };
            } else if (previousModule) {
              const prevModuleLessons = course.modules.find(m => m.id === previousModule)?.lessons;
              if (prevModuleLessons && prevModuleLessons.length > 0) {
                return { 
                  moduleId: previousModule, 
                  lessonId: prevModuleLessons[prevModuleLessons.length - 1].id 
                };
              }
            }
          }
        }
      }
      
      previousModule = module.id;
    }
    
    return null;
  };
  
  const nextLesson = getNextLesson();
  const previousLesson = getPreviousLesson();
  
  const handleNextLesson = () => {
    if (nextLesson) {
      handleLessonSelect(nextLesson.moduleId, nextLesson.lessonId);
    }
  };
  
  const handlePreviousLesson = () => {
    if (previousLesson) {
      handleLessonSelect(previousLesson.moduleId, previousLesson.lessonId);
    }
  };
  
  return (
    <div className="py-8">
      <Button
        variant="outline"
        onClick={() => navigate("/course-videos")}
        className="mb-4"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Back to Courses
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          {/* Video Player */}
          <div className="bg-black pixel-corners overflow-hidden relative mb-4">
            {currentLesson ? (
              currentLesson.isFree || getCompletedLessons() > 0 ? (
                <>
                  <video
                    ref={videoRef}
                    src={currentLesson.videoUrl}
                    className="w-full aspect-video"
                    onTimeUpdate={handleTimeUpdate}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onClick={togglePlay}
                  />
                  
                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 flex flex-wrap items-center gap-2">
                    <button onClick={togglePlay} className="text-white">
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </button>
                    
                    <div className="flex-1 flex items-center">
                      <span className="text-white text-xs mr-2 hidden sm:inline">
                        {formatTime(currentTime)}
                      </span>
                      <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        className="flex-1 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
                      />
                      <span className="text-white text-xs ml-2 hidden sm:inline">
                        {formatTime(duration)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button onClick={toggleMute} className="text-white">
                        {isMuted ? (
                          <VolumeX className="h-5 w-5" />
                        ) : volume < 0.5 ? (
                          <Volume1 className="h-5 w-5" />
                        ) : (
                          <Volume2 className="h-5 w-5" />
                        )}
                      </button>
                      
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                        className="w-20 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer hidden sm:block"
                      />
                      
                      <button onClick={toggleFullscreen} className="text-white ml-2">
                        {isFullscreen ? (
                          <Minimize className="h-5 w-5" />
                        ) : (
                          <Maximize className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full aspect-video bg-black flex flex-col items-center justify-center text-white">
                  <Lock className="h-16 w-16 mb-4 opacity-50" />
                  <h3 className="text-xl font-medium mb-2">Premium Content</h3>
                  <p className="text-gray-400 mb-4">This lesson is part of a premium course</p>
                  <Button>Upgrade to Access</Button>
                </div>
              )
            ) : (
              <div className="w-full aspect-video bg-black flex items-center justify-center text-white">
                Loading lesson...
              </div>
            )}
          </div>
          
          {/* Lesson Title and Navigation */}
          {currentLesson && (
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold font-mono">{currentLesson.title}</h1>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {currentLesson.duration}
                </div>
              </div>
              
              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  onClick={handlePreviousLesson}
                  disabled={!previousLesson}
                  className="font-mono"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous Lesson
                </Button>
                
                <Button
                  onClick={handleNextLesson}
                  disabled={!nextLesson}
                  className="font-mono"
                >
                  Next Lesson
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Course Info Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="content" className="font-mono">Overview</TabsTrigger>
              <TabsTrigger value="notes" className="font-mono">Notes</TabsTrigger>
              <TabsTrigger value="resources" className="font-mono">Resources</TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="mt-4">
              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-bold mb-2 font-mono">About this course</h3>
                <p className="mb-4 text-muted-foreground">{course.description}</p>
                
                <h3 className="text-lg font-bold mb-2 font-mono">What you'll learn</h3>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pixel-green mr-2 shrink-0 mt-0.5" />
                    <span>Understand the core concepts of blockchain technology</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pixel-green mr-2 shrink-0 mt-0.5" />
                    <span>Learn about different cryptocurrencies and their use cases</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pixel-green mr-2 shrink-0 mt-0.5" />
                    <span>Explore the potential applications of blockchain beyond finance</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pixel-green mr-2 shrink-0 mt-0.5" />
                    <span>Get hands-on experience with basic cryptocurrency transactions</span>
                  </li>
                </ul>
                
                <h3 className="text-lg font-bold mb-2 font-mono">Requirements</h3>
                <ul className="space-y-1 mb-4 list-disc pl-5">
                  <li>Basic understanding of computer science concepts</li>
                  <li>No prior blockchain knowledge required</li>
                  <li>Curiosity and willingness to learn</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="notes" className="mt-4">
              <div className="bg-muted p-4 rounded-md">
                <h3 className="text-lg font-bold mb-2 font-mono">Your Notes</h3>
                <p className="text-muted-foreground">You haven't added any notes for this lesson yet.</p>
                <Button variant="outline" className="mt-4">
                  Add Note
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="resources" className="mt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-bold mb-2 font-mono">Downloadable Resources</h3>
                <div className="space-y-2">
                  <div className="flex items-center p-3 border border-border rounded-md hover:bg-muted transition-colors">
                    <div className="bg-muted p-2 rounded mr-3">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13 2V9H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Blockchain_Basics_Slides.pdf</h4>
                      <p className="text-xs text-muted-foreground">PDF Document • 2.4 MB</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Button>
                  </div>
                  
                  <div className="flex items-center p-3 border border-border rounded-md hover:bg-muted transition-colors">
                    <div className="bg-muted p-2 rounded mr-3">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Blockchain_Terminology.txt</h4>
                      <p className="text-xs text-muted-foreground">Text File • 156 KB</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Course Sidebar */}
        <div className="lg:col-span-4">
          <div className="border-2 border-border bg-card p-4 pixel-corners sticky top-24">
            <div className="mb-4">
              <h2 className="text-lg font-bold font-mono mb-2">{course.title}</h2>
              <div className="flex items-center mb-3">
                <Progress value={progressPercentage} className="h-2 flex-1 mr-2" />
                <span className="text-sm text-muted-foreground">
                  {getCompletedLessons()}/{getTotalLessons()} completed
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              {course.modules.map((module) => (
                <Collapsible key={module.id} defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-muted hover:bg-muted/80 transition-colors font-medium text-sm">
                    <span>{module.title}</span>
                    <ChevronDown className="h-4 w-4 transition-transform ui-open:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-1 pb-2">
                    <div className="space-y-1">
                      {module.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => handleLessonSelect(module.id, lesson.id)}
                          className={cn(
                            "flex items-center justify-between w-full p-2 text-sm text-left rounded hover:bg-muted/50 transition-colors",
                            activeLesson?.moduleId === module.id && activeLesson?.lessonId === lesson.id 
                              ? "bg-secondary font-medium" 
                              : ""
                          )}
                        >
                          <div className="flex items-center">
                            <div className="w-5 h-5 mr-3 flex-shrink-0">
                              {lesson.isCompleted ? (
                                <div className="w-5 h-5 rounded-full bg-pixel-green flex items-center justify-center">
                                  <Check className="h-3 w-3 text-white" />
                                </div>
                              ) : lesson.isFree ? (
                                <Play className="h-4 w-4" />
                              ) : (
                                <Lock className="h-4 w-4" />
                              )}
                            </div>
                            <span className={`${lesson.isCompleted ? 'line-through opacity-70' : ''}`}>
                              {lesson.title}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                        </button>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
