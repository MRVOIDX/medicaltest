import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="w-full border-t bg-muted/30 py-6 sm:py-8" data-testid="footer-main">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground text-center">
          <AlertCircle className="h-4 w-4 flex-shrink-0" data-testid="icon-warning" />
          <p data-testid="text-disclaimer">
            {t.footer.disclaimerText}
          </p>
        </div>
      </div>
    </footer>
  );
}
