import { Phone, Flame, Shield, Users, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EmergencyInfo() {
  const { t } = useLanguage();

  const emergencyNumbers = [
    { number: '112', label: t.emergency.ambulance, icon: Phone, color: 'text-red-600' },
    { number: '110', label: t.emergency.fire, icon: Flame, color: 'text-orange-600' },
    { number: '155', label: t.emergency.police, icon: Shield, color: 'text-blue-600' },
    { number: '156', label: t.emergency.gendarmerie, icon: Users, color: 'text-green-700' },
  ];

  return (
    <Card data-testid="card-emergency-info" className="bg-destructive/5 border-destructive/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <Phone className="h-5 w-5" />
          {t.emergency.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{t.emergency.subtitle}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {emergencyNumbers.map(({ number, label, icon: Icon, color }) => (
            <a
              key={number}
              href={`tel:${number}`}
              className="flex items-center justify-between p-3 rounded-md bg-background hover-elevate active-elevate-2"
              data-testid={`link-emergency-${number}`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${color}`} />
                <span className="text-sm font-medium">{label}</span>
              </div>
              <span className={`font-bold text-lg ${color}`}>{number}</span>
            </a>
          ))}
        </div>
        <Button
          variant="outline"
          className="w-full gap-2"
          asChild
          data-testid="button-find-hospital"
        >
          <a
            href="https://www.google.com/maps/search/hastane+yakınımda"
            target="_blank"
            rel="noreferrer"
          >
            <MapPin className="h-4 w-4" />
            {t.emergency.findHospital}
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
