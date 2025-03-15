
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CoursesList } from "@/components/courses/courses-list";
import { CoursePlayer } from "@/components/courses/course-player";

const CourseVideos = () => {
  const { courseId } = useParams();
  
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4">
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
