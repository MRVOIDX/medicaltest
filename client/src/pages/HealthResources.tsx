import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmergencyInfo from "@/components/EmergencyInfo";
import HealthTips from "@/components/HealthTips";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HealthResources() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
              <h1 
                className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 sm:mb-6"
                data-testid="text-page-title"
              >
                {t.healthResources.title}
              </h1>
              <p 
                className="text-base sm:text-lg text-muted-foreground"
                data-testid="text-page-subtitle"
              >
                {t.healthResources.subtitle}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-4xl space-y-12 sm:space-y-16">
              <EmergencyInfo />
              <HealthTips />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
