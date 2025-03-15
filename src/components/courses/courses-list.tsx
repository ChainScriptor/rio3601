
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Book, 
  Play, 
  Check, 
  Clock, 
  Star, 
  Users 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

// Mock data for courses
const COURSES = [
  {
    id: "blockchain-basics",
    title: "Blockchain Basics",
    description: "Learn the foundations of blockchain technology and cryptocurrency.",
    totalLessons: 12,
    completedLessons: 5,
    thumbnail: "/placeholder.svg",
    level: "Beginner",
    duration: "4h 30m",
    rating: 4.8,
    students: 1243,
    isFree: true
  },
  {
    id: "advanced-smart-contracts",
    title: "Advanced Smart Contracts",
    description: "Master the art of writing secure and efficient smart contracts.",
    totalLessons: 18,
    completedLessons: 2,
    thumbnail: "/placeholder.svg",
    level: "Advanced",
    duration: "8h 15m",
    rating: 4.9,
    students: 876,
    isFree: false
  },
  {
    id: "web3-development",
    title: "Web3 Development",
    description: "Build decentralized applications using modern web technologies.",
    totalLessons: 15,
    completedLessons: 0,
    thumbnail: "/placeholder.svg",
    level: "Intermediate",
    duration: "6h 45m",
    rating: 4.7,
    students: 658,
    isFree: false
  }
];

export function CoursesList() {
  const [filter, setFilter] = useState("all");
  
  const filteredCourses = filter === "all" 
    ? COURSES 
    : filter === "free" 
      ? COURSES.filter(course => course.isFree) 
      : COURSES.filter(course => !course.isFree);
  
  return (
    <div className="py-8">
      <h1 className="text-2xl font-pixel mb-6">Course Videos</h1>
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-2">
          <Button 
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className="font-mono"
          >
            All Courses
          </Button>
          <Button 
            variant={filter === "free" ? "default" : "outline"}
            onClick={() => setFilter("free")}
            className="font-mono"
          >
            Free Courses
          </Button>
          <Button 
            variant={filter === "premium" ? "default" : "outline"}
            onClick={() => setFilter("premium")}
            className="font-mono"
          >
            Premium Courses
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Link 
            key={course.id} 
            to={`/course-videos/${course.id}`}
            className="group"
          >
            <div className="border-2 border-border bg-card pixel-corners overflow-hidden transition-all duration-300 hover:shadow-pixel-md hover:-translate-y-1">
              <div className="relative aspect-video bg-muted">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-full object-cover pixel-img-rendering"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center">
                    <Play className="h-6 w-6" />
                  </div>
                </div>
                {course.isFree && (
                  <div className="absolute top-2 right-2 bg-pixel-green text-foreground px-3 py-1 text-xs font-pixel">
                    FREE
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 font-mono">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Book className="w-3 h-3" />
                    <span>{course.totalLessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-pixel-yellow" />
                    <span>{course.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-muted-foreground">
                    <Users className="inline w-3 h-3 mr-1" />
                    {course.students} students
                  </span>
                  <span className={`font-medium ${course.level === "Beginner" ? "text-pixel-green" : course.level === "Intermediate" ? "text-pixel-blue" : "text-pixel-purple"}`}>
                    {course.level}
                  </span>
                </div>
                
                {course.completedLessons > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Your progress</span>
                      <span>{Math.round((course.completedLessons / course.totalLessons) * 100)}%</span>
                    </div>
                    <Progress value={(course.completedLessons / course.totalLessons) * 100} className="h-2 bg-secondary" />
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
