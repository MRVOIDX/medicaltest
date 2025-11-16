import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Search, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SymptomInputProps {
  onAnalyze: (symptoms: string) => void;
  isAnalyzing?: boolean;
}

export default function SymptomInput({ onAnalyze, isAnalyzing = false }: SymptomInputProps) {
  const [symptoms, setSymptoms] = useState("");
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symptoms.trim()) {
      onAnalyze(symptoms);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto" data-testid="section-symptom-input">
      <div className="text-center mb-8">
        <p className="text-lg text-muted-foreground" data-testid="text-subtitle">
          {t.symptomInput.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder={t.symptomInput.placeholder}
          className="min-h-[120px] resize-none text-base"
          data-testid="input-symptoms"
        />
        
        <Button 
          type="submit" 
          size="lg"
          className="w-full sm:w-auto sm:px-8"
          disabled={!symptoms.trim() || isAnalyzing}
          data-testid="button-find-department"
        >
          {isAnalyzing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Search className="mr-2 h-4 w-4" />
          )}
          {isAnalyzing ? t.symptomInput.analyzing : t.symptomInput.analyze}
        </Button>
      </form>
    </div>
  );
}
