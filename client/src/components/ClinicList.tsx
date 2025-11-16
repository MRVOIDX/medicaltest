import { useQuery } from "@tanstack/react-query";
import ClinicCard from "./ClinicCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Loader2 } from "lucide-react";
import type { Clinic } from "@shared/clinicData";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ClinicListProps {
  department: string;
}

export default function ClinicList({ department }: ClinicListProps) {
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const { t } = useLanguage();

  // Fetch cities
  const { data: cities = [] } = useQuery<string[]>({
    queryKey: ["/api/cities"],
  });

  // Fetch clinics
  const queryParams = new URLSearchParams();
  if (department) queryParams.append("department", department);
  if (selectedCity !== "all") queryParams.append("city", selectedCity);
  
  const { data: clinics = [], isLoading } = useQuery<Clinic[]>({
    queryKey: [`/api/clinics?${queryParams.toString()}`],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (clinics.length === 0) {
    return (
      <div className="text-center py-12">
        <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">{t.clinicList.title}</h3>
        <p className="text-muted-foreground">
          {t.clinicList.noResults}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="section-clinic-list">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold" data-testid="text-clinic-title">
            {t.clinicList.nearby}
          </h2>
          <p className="text-muted-foreground mt-1">
            {clinics.length} {t.clinicList.title.toLowerCase()}
          </p>
        </div>

        <div className="w-full sm:w-64">
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger data-testid="select-city">
              <SelectValue placeholder={t.clinicList.title} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.clinicList.nearby}</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clinics.map((clinic) => (
          <ClinicCard key={clinic.id} clinic={clinic} />
        ))}
      </div>
    </div>
  );
}
