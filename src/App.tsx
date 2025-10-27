
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CourseVideos from "./pages/CourseVideos";
import { CourseAdmin } from "./components/courses/course-admin";
import Airdrops from "./pages/Airdrops";
import CodeEditorPage from "./pages/CodeEditor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/course-videos" element={<CourseVideos />} />
          <Route path="/course-videos/:courseId" element={<CourseVideos />} />
          <Route path="/course-videos/admin" element={<CourseAdmin />} />
          <Route path="/airdrops" element={<Airdrops />} />
          <Route path="/code-editor" element={<CodeEditorPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
