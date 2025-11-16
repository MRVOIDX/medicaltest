import { useState, useEffect } from "react";
import { Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HealthTips() {
  const { t } = useLanguage();
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % t.healthTips.tips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [t.healthTips.tips.length]);

  return (
    <Card data-testid="card-health-tips" className="bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Lightbulb className="h-5 w-5" />
          {t.healthTips.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {t.healthTips.tips.map((tip, index) => (
            <div
              key={index}
              className={`p-3 rounded-md transition-all duration-500 ${
                index === currentTipIndex
                  ? 'bg-primary/10 border border-primary/30'
                  : 'opacity-50'
              }`}
              data-testid={`tip-${index}`}
            >
              <p className="text-sm">{tip}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
