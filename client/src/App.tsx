import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import SymptomChecker from "@/pages/SymptomChecker";
import FindClinics from "@/pages/FindClinics";
import HealthResources from "@/pages/HealthResources";
import About from "@/pages/About";
import FAQ from "@/pages/FAQ";
import NotFound from "@/pages/not-found";
import ChatBot from "@/components/ChatBot";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/symptom-checker" component={SymptomChecker} />
      <Route path="/find-clinics" component={FindClinics} />
      <Route path="/health-resources" component={HealthResources} />
      <Route path="/about" component={About} />
      <Route path="/faq" component={FAQ} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <ChatBot />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
