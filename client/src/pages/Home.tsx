import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Globe, MapPin, Bot, ArrowRight } from "lucide-react";

const iconMap = {
  brain: Brain,
  globe: Globe,
  'map-pin': MapPin,
  bot: Bot,
};

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-12 sm:py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 
                className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6"
                data-testid="text-hero-title"
              >
                {t.home.hero.title}
              </h1>
              <p 
                className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed"
                data-testid="text-hero-subtitle"
              >
                {t.home.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
                <Link href="/symptom-checker">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto gap-2"
                    data-testid="button-hero-cta"
                  >
                    {t.home.hero.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto"
                    data-testid="button-hero-learn-more"
                  >
                    {t.home.hero.learnMore}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {t.home.features.map((feature, index) => {
                const Icon = iconMap[feature.icon as keyof typeof iconMap];
                return (
                  <Card 
                    key={index} 
                    className="hover-elevate"
                    data-testid={`card-feature-${index}`}
                  >
                    <CardContent className="p-6">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 
                        className="mb-2 text-lg font-semibold"
                        data-testid={`text-feature-title-${index}`}
                      >
                        {feature.title}
                      </h3>
                      <p 
                        className="text-sm text-muted-foreground"
                        data-testid={`text-feature-description-${index}`}
                      >
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-card py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
              <h2 
                className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-3 sm:mb-4"
                data-testid="text-how-it-works-title"
              >
                {t.home.howItWorks.title}
              </h2>
              <p 
                className="text-base sm:text-lg text-muted-foreground"
                data-testid="text-how-it-works-subtitle"
              >
                {t.home.howItWorks.subtitle}
              </p>
            </div>
            
            <div className="mx-auto max-w-4xl">
              <div className="space-y-6 sm:space-y-8">
                {t.home.howItWorks.steps.map((step, index) => (
                  <div 
                    key={index} 
                    className="relative flex flex-col sm:flex-row gap-6 items-start"
                    data-testid={`container-step-${index}`}
                  >
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="text-xl font-semibold mb-2"
                        data-testid={`text-step-title-${index}`}
                      >
                        {step.title}
                      </h3>
                      <p 
                        className="text-muted-foreground"
                        data-testid={`text-step-description-${index}`}
                      >
                        {step.description}
                      </p>
                    </div>
                    {index < t.home.howItWorks.steps.length - 1 && (
                      <div className="hidden sm:block absolute left-6 top-12 h-8 w-0.5 bg-border" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-primary/5">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6" data-testid="text-cta-title">
              {t.home.symptomsSection.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto" data-testid="text-cta-subtitle">
              {t.home.symptomsSection.subtitle}
            </p>
            <Link href="/symptom-checker">
              <Button size="lg" className="gap-2 w-full sm:w-auto" data-testid="button-cta">
                {t.home.hero.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
