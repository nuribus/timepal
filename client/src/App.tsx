import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import ThemeToggle from "@/components/ThemeToggle";
import WhyTimerModal from "@/components/WhyTimerModal";
import logoImage from "@assets/time_logo_header_1763495512877.png";
import { useEffect, useState } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import { FileText, X } from "lucide-react";

function Navigation() {
  const [isWhyTimerOpen, setIsWhyTimerOpen] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-border px-2 sm:px-4 flex items-center justify-between bg-background/20 backdrop-blur-sm">
        <div className="flex items-center gap-2 sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/">
              <img 
                src={logoImage} 
                alt="TimePal" 
                className="h-8 sm:h-12 cursor-pointer hover-elevate px-1 sm:px-2 py-1 rounded-md"
                data-testid="logo-home"
              />
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          {!isWhyTimerOpen ? (
            <button
              onClick={() => setIsWhyTimerOpen(true)}
              data-testid="button-why-timer"
              className="w-9 h-9 rounded-md hover-elevate active-elevate-2 flex items-center justify-center"
            >
              <FileText className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setIsWhyTimerOpen(false)}
              data-testid="button-close-why-timer-header"
              className="w-9 h-9 rounded-md bg-background border border-border hover-elevate active-elevate-2 flex items-center justify-center shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <ThemeToggle />
        </div>
      </header>
      
      <WhyTimerModal isOpen={isWhyTimerOpen} onClose={() => setIsWhyTimerOpen(false)} />
    </>
  );
}

function Router() {
  // Track page views when routes change - Google Analytics
  useAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize Google Analytics when app loads
  useEffect(() => {
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <div className="flex-1">
            <Router />
          </div>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
