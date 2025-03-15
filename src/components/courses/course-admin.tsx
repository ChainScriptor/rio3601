
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Upload, 
  Plus, 
  Edit, 
  Trash2, 
  MoreVertical,
  ChevronLeft,
  Eye
} from "lucide-react";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

// Mock course data (same as in course-player.tsx)
const COURSES = {
  "blockchain-basics": {
    id: "blockchain-basics",
    title: "Blockchain Basics",
    description: "Learn the foundations of blockchain technology and cryptocurrency.",
    thumbnail: "/placeholder.svg",
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
          }
        ]
      }
    ]
  },
  "advanced-smart-contracts": {
    id: "advanced-smart-contracts",
    title: "Advanced Smart Contracts",
    description: "Master the art of writing secure and efficient smart contracts.",
    thumbnail: "/placeholder.svg",
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
          }
        ]
      }
    ]
  },
  "web3-development": {
    id: "web3-development",
    title: "Web3 Development",
    description: "Build decentralized applications using modern web technologies.",
    thumbnail: "/placeholder.svg",
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

export function CourseAdmin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("courses");
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  
  const coursesArray = Object.values(COURSES);
  
  // Mock upload progress handler
  const handleFileChange = (courseId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Mock upload progress simulation
      setUploadProgress({
        ...uploadProgress,
        [courseId]: 0
      });
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[courseId] || 0;
          if (currentProgress >= 100) {
            clearInterval(interval);
            return prev;
          }
          
          return {
            ...prev,
            [courseId]: Math.min(currentProgress + 10, 100)
          };
        });
      }, 500);
    }
  };
  
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button
            variant="outline"
            onClick={() => navigate("/course-videos")}
            className="mr-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
          <h1 className="text-2xl font-pixel inline-block">Course Admin</h1>
        </div>
        
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Course
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="courses" className="flex-1">Courses</TabsTrigger>
          <TabsTrigger value="modules" className="flex-1">Modules</TabsTrigger>
          <TabsTrigger value="lessons" className="flex-1">Lessons</TabsTrigger>
        </TabsList>
        
        {/* Courses Tab */}
        <TabsContent value="courses" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesArray.map((course) => (
              <div 
                key={course.id} 
                className="border-2 border-border bg-card p-0 pixel-corners overflow-hidden"
              >
                <div className="relative aspect-video bg-muted">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="h-8 w-8 bg-black/50 hover:bg-black/70">
                          <MoreVertical className="h-4 w-4 text-white" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/course-videos/${course.id}`)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Course
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Course
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Course
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                  
                  <div className="text-xs text-muted-foreground mb-4">
                    <div className="flex justify-between mb-1">
                      <span>Modules: {course.modules.length}</span>
                      
                      <span>
                        Lessons: {course.modules.reduce((count, module) => count + module.lessons.length, 0)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    
                    <div className="relative">
                      <Input
                        type="file"
                        id={`upload-${course.id}`}
                        className="hidden"
                        accept="video/*"
                        onChange={(e) => handleFileChange(course.id, e)}
                      />
                      <Label
                        htmlFor={`upload-${course.id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Add Video
                      </Label>
                      
                      {uploadProgress[course.id] !== undefined && uploadProgress[course.id] < 100 && (
                        <div className="absolute left-0 right-0 -bottom-6">
                          <Progress value={uploadProgress[course.id]} className="h-1" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add New Course Card */}
            <div className="border-2 border-dashed border-border bg-background p-0 pixel-corners flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:bg-muted/50 transition-colors">
              <Plus className="h-8 w-8 mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Add New Course</p>
            </div>
          </div>
        </TabsContent>
        
        {/* Modules Tab */}
        <TabsContent value="modules" className="mt-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 px-4 font-mono text-sm">Module Name</th>
                  <th className="text-left py-3 px-4 font-mono text-sm">Course</th>
                  <th className="text-left py-3 px-4 font-mono text-sm">Lessons</th>
                  <th className="text-left py-3 px-4 font-mono text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coursesArray.flatMap(course =>
                  course.modules.map(module => (
                    <tr key={`${course.id}-${module.id}`} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4">{module.title}</td>
                      <td className="py-3 px-4">{course.title}</td>
                      <td className="py-3 px-4">{module.lessons.length}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <Button className="mt-4">
            <Plus className="h-4 w-4 mr-2" />
            New Module
          </Button>
        </TabsContent>
        
        {/* Lessons Tab */}
        <TabsContent value="lessons" className="mt-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 px-4 font-mono text-sm">Lesson Title</th>
                  <th className="text-left py-3 px-4 font-mono text-sm">Module</th>
                  <th className="text-left py-3 px-4 font-mono text-sm">Course</th>
                  <th className="text-left py-3 px-4 font-mono text-sm">Duration</th>
                  <th className="text-left py-3 px-4 font-mono text-sm">Free</th>
                  <th className="text-left py-3 px-4 font-mono text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coursesArray.flatMap(course =>
                  course.modules.flatMap(module =>
                    module.lessons.map(lesson => (
                      <tr key={`${course.id}-${module.id}-${lesson.id}`} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4">{lesson.title}</td>
                        <td className="py-3 px-4">{module.title}</td>
                        <td className="py-3 px-4">{course.title}</td>
                        <td className="py-3 px-4">{lesson.duration}</td>
                        <td className="py-3 px-4">
                          {lesson.isFree ? (
                            <span className="text-pixel-green">Yes</span>
                          ) : (
                            <span className="text-muted-foreground">No</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
          </div>
          
          <Button className="mt-4">
            <Plus className="h-4 w-4 mr-2" />
            New Lesson
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
