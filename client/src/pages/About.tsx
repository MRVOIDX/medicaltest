import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Globe, Eye, Sparkles } from "lucide-react";

const iconMap = {
  Accuracy: Sparkles,
  Accessibility: Globe,
  Privacy: Shield,
  Transparency: Eye,
  الدقة: Sparkles,
  'إمكانية الوصول': Globe,
  الخصوصية: Shield,
  الشفافية: Eye,
  Doğruluk: Sparkles,
  Erişilebilirlik: Globe,
  Gizlilik: Shield,
  Şeffaflık: Eye,
};

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 
                className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 sm:mb-6"
                data-testid="text-page-title"
              >
                {t.about.title}
              </h1>
              <p 
                className="text-base sm:text-lg text-muted-foreground"
                data-testid="text-page-subtitle"
              >
                {t.about.subtitle}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-4xl space-y-12 sm:space-y-16">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6" data-testid="text-mission-title">
                  {t.about.mission.title}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-mission-description">
                  {t.about.mission.description}
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center" data-testid="text-values-title">
                  {t.about.values.title}
                </h2>
                <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                  {t.about.values.items.map((value, index) => {
                    const Icon = iconMap[value.title as keyof typeof iconMap] || Sparkles;
                    return (
                      <Card key={index} className="hover-elevate" data-testid={`card-value-${index}`}>
                        <CardHeader>
                          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle data-testid={`text-value-title-${index}`}>
                            {value.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground" data-testid={`text-value-description-${index}`}>
                            {value.description}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
