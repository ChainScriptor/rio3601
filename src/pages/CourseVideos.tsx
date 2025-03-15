import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CoursesList } from "@/components/courses/courses-list";
import { CoursePlayer } from "@/components/courses/course-player";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseAdmin } from "@/components/courses/course-admin";

const CourseVideos = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(courseId ? "course" : "all-courses");
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    switch (value) {
      case "all-courses":
        navigate("/course-videos");
        break;
      case "admin":
        navigate("/course-videos/admin");
        break;
      case "home":
        navigate("/");
        break;
      default:
        // For course content, keep the current view
        break;
    }
  };
  
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="w-full md:w-auto">
                  <TabsTrigger value="all-courses">All Courses</TabsTrigger>
                  <TabsTrigger value="admin">Admin Panel</TabsTrigger>
                  <TabsTrigger value="home">Back to Home</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all-courses">
                  {!courseId && <CoursesList />}
                </TabsContent>
                
                <TabsContent value="admin">
                  {window.location.pathname === "/course-videos/admin" && <CourseAdmin />}
                </TabsContent>
                
                <TabsContent value="course">
                  {courseId && <CoursePlayer courseId={courseId} />}
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Render the course player outside of tabs if we have a courseId */}
            {courseId && activeTab !== "admin" && activeTab !== "home" && (
              <CoursePlayer courseId={courseId} />
            )}
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default CourseVideos;
