import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SymptomInput from "@/components/SymptomInput";
import DepartmentResult from "@/components/DepartmentResult";
import DepartmentInfo from "@/components/DepartmentInfo";
import ClinicList from "@/components/ClinicList";
import { analyzeSymptomsWithAI } from "@/lib/symptomAnalyzer";
import { type Department } from "@/components/DepartmentResult";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export default function SymptomChecker() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<Department | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleAnalyze = async (symptoms: string) => {
    setIsAnalyzing(true);
    const startTime = Date.now();
    
    try {
      const department = await analyzeSymptomsWithAI(symptoms);
      
      const elapsed = Date.now() - startTime;
      const minDelay = 2000;
      if (elapsed < minDelay) {
        await new Promise(resolve => setTimeout(resolve, minDelay - elapsed));
      }
      
      setResult(department);
      
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } catch (error) {
      toast({
        title: t.errors.analysisFailed,
        description: t.errors.analysisFailedDescription,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePrint = () => {
    setShowInfo(false);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleLearnMore = () => {
    setShowInfo(true);
  };

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
                {t.symptomInput.title}
              </h1>
              <p 
                className="text-base sm:text-lg text-muted-foreground"
                data-testid="text-page-subtitle"
              >
                {t.symptomInput.subtitle}
              </p>
            </div>
            
            <div className="mx-auto max-w-2xl">
              <SymptomInput 
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
              />
            </div>
          </div>
        </section>

        {result && (
          <>
            <section id="result-section" className="py-12 sm:py-16 md:py-24 bg-card">
              <div className="container mx-auto px-4 sm:px-6">
                <div className="mx-auto max-w-4xl">
                  <div className="flex justify-end mb-4 print:hidden">
                    <Button 
                      variant="outline" 
                      onClick={handlePrint}
                      className="gap-2"
                      size="sm"
                      data-testid="button-print"
                    >
                      <Printer className="h-4 w-4" />
                      {t.printResult.button}
                    </Button>
                  </div>
                  <DepartmentResult 
                    department={result}
                    onLearnMore={handleLearnMore}
                  />
                </div>
              </div>
            </section>

            <DepartmentInfo 
              department={result}
              open={showInfo}
              onOpenChange={setShowInfo}
            />

            <section className="py-12 sm:py-16 md:py-24 print:hidden">
              <div className="container mx-auto px-4 sm:px-6">
                <div className="mx-auto max-w-4xl">
                  <ClinicList department={result.name} />
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
