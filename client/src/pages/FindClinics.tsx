import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClinicCard from "@/components/ClinicCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { type Clinic } from "@shared/clinicData";

export default function FindClinics() {
  const { t } = useLanguage();
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("all");

  const { data: cities } = useQuery<string[]>({
    queryKey: ['/api/cities'],
  });

  const { data: clinics, isLoading: clinicsLoading } = useQuery<Clinic[]>({
    queryKey: ['/api/clinics', selectedDepartment, selectedCity],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (selectedDepartment && selectedDepartment.trim()) {
        queryParams.append('department', selectedDepartment);
      }
      if (selectedCity && selectedCity !== 'all') {
        queryParams.append('city', selectedCity);
      }
      const url = `/api/clinics${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch clinics');
      return response.json();
    },
  });

  const filteredClinics = clinics || [];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 via-background to-background py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-4xl text-center mb-8 sm:mb-12">
              <h1 
                className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 sm:mb-6"
                data-testid="text-page-title"
              >
                {t.findClinicsPage.title}
              </h1>
              <p 
                className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8"
                data-testid="text-page-subtitle"
              >
                {t.findClinicsPage.subtitle}
              </p>
              
              <div className="grid gap-4 md:grid-cols-2 mb-8">
                <div>
                  <label className="text-sm font-medium mb-2 block text-left">
                    {t.findClinicsPage.filterByDepartment}
                  </label>
                  <Input
                    type="text"
                    placeholder={t.departmentSearch.placeholder}
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    data-testid="input-department-filter"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block text-left">
                    {t.findClinicsPage.filterByCity}
                  </label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger data-testid="select-city">
                      <SelectValue placeholder={t.findClinicsPage.allCities} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t.findClinicsPage.allCities}</SelectItem>
                      {cities?.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-6xl">
              <div className="mb-4 sm:mb-6">
                <p className="text-sm text-muted-foreground" data-testid="text-results-count">
                  {t.findClinicsPage.showingResults.replace('{count}', filteredClinics.length.toString())}
                </p>
              </div>
              
              {clinicsLoading ? (
                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <Skeleton className="h-6 w-3/4 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-5/6 mb-4" />
                        <Skeleton className="h-10 w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredClinics.length > 0 ? (
                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredClinics.map((clinic) => (
                    <ClinicCard key={clinic.id} clinic={clinic} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 sm:p-12 text-center">
                    <p className="text-base sm:text-lg text-muted-foreground" data-testid="text-no-results">
                      {t.clinicList.noResults}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
