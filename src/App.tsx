
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as UIToaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Layout from "./components/layout/Layout";
import Projects from "./pages/projects/Projects";
import ProjectCreate from "./pages/projects/ProjectCreate";
import ProjectDetail from "./pages/projects/ProjectDetail";
import Campaigns from "./pages/campaigns/Campaigns";
import CampaignCreate from "./pages/campaigns/CampaignCreate";
import CampaignDetail from "./pages/campaigns/CampaignDetail";
import Voice from "./pages/voice/Voice";
import VoiceCreate from "./pages/voice/VoiceCreate";
import VoiceDetail from "./pages/voice/VoiceDetail";
import Numbers from "./pages/numbers/Numbers";
import NumberCreate from "./pages/numbers/NumberCreate";
import NumberDetail from "./pages/numbers/NumberDetail";
import Statistics from "./pages/statistics/Statistics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UIToaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/projects" replace />} />
            
            {/* Projects Routes */}
            <Route path="projects">
              <Route index element={<Projects />} />
              <Route path="create" element={<ProjectCreate />} />
              <Route path=":id" element={<ProjectDetail />} />
            </Route>
            
            {/* Campaigns Routes */}
            <Route path="campaigns">
              <Route index element={<Campaigns />} />
              <Route path="create" element={<CampaignCreate />} />
              <Route path=":id" element={<CampaignDetail />} />
            </Route>
            
            {/* Voice Routes */}
            <Route path="voice">
              <Route index element={<Voice />} />
              <Route path="create" element={<VoiceCreate />} />
              <Route path=":id" element={<VoiceDetail />} />
            </Route>
            
            {/* Numbers Routes */}
            <Route path="numbers">
              <Route index element={<Numbers />} />
              <Route path="create" element={<NumberCreate />} />
              <Route path=":id" element={<NumberDetail />} />
            </Route>
            
            {/* Statistics Routes */}
            <Route path="statistics" element={<Statistics />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
