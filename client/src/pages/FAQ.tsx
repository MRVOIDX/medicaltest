import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
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
                {t.faq.title}
              </h1>
              <p 
                className="text-base sm:text-lg text-muted-foreground"
                data-testid="text-page-subtitle"
              >
                {t.faq.subtitle}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                {t.faq.questions.map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border rounded-md px-4 sm:px-6"
                    data-testid={`accordion-item-${index}`}
                  >
                    <AccordionTrigger 
                      className="text-left hover:no-underline"
                      data-testid={`accordion-trigger-${index}`}
                    >
                      <span className="font-semibold">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent 
                      className="text-muted-foreground"
                      data-testid={`accordion-content-${index}`}
                    >
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
