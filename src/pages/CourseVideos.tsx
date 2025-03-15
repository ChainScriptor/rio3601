
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

const CourseVideos = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/course-videos">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        All Courses
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/course-videos/admin">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Admin Panel
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Back to Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            {!courseId ? (
              <CoursesList />
            ) : (
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
