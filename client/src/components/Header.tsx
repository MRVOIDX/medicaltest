import { useState } from "react";
import { HeartPulse, Menu } from "lucide-react";
import { Link, useLocation } from "wouter";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const { t } = useLanguage();
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/', label: t.header.nav.home },
    { path: '/symptom-checker', label: t.header.nav.symptomChecker },
    { path: '/find-clinics', label: t.header.nav.findClinics },
    { path: '/health-resources', label: t.header.nav.healthResources },
    { path: '/about', label: t.header.nav.about },
    { path: '/faq', label: t.header.nav.faq },
  ];

  const handleNavigation = (path: string) => {
    setLocation(path);
    setMobileMenuOpen(false);
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" data-testid="header-main">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/">
            <a className="flex items-center gap-2 sm:gap-3 hover-elevate rounded-md px-2 py-1 -ml-2" data-testid="link-logo">
              <HeartPulse className="h-6 w-6 sm:h-7 sm:w-7 text-primary" data-testid="icon-logo" />
              <h1 className="text-lg sm:text-xl font-bold tracking-tight" data-testid="text-title">
                MediGuide
              </h1>
              <span className="text-xl sm:text-2xl hidden sm:block" role="img" aria-label="Turkish flag" data-testid="icon-flag">
                🇹🇷
              </span>
            </a>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1" data-testid="nav-main">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={location === item.path ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setLocation(item.path)}
                data-testid={`link-nav-${item.path.substring(1) || 'home'}`}
              >
                {item.label}
              </Button>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <HeartPulse className="h-5 w-5 text-primary" />
                    MediGuide
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <Button
                        key={item.path}
                        variant={location === item.path ? "secondary" : "ghost"}
                        className="justify-start"
                        onClick={() => handleNavigation(item.path)}
                        data-testid={`link-mobile-nav-${item.path.substring(1) || 'home'}`}
                      >
                        {item.label}
                      </Button>
                    ))}
                  </nav>
                  <div className="flex items-center gap-2 pt-4 border-t">
                    <ThemeToggle />
                    <LanguageToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
