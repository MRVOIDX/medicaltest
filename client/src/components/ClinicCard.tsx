import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Star, ExternalLink } from "lucide-react";
import type { Clinic } from "@shared/clinicData";

interface ClinicCardProps {
  clinic: Clinic;
}

export default function ClinicCard({ clinic }: ClinicCardProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${clinic.coordinates.lat},${clinic.coordinates.lng}`;
  
  const handleOpenMap = () => {
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <Card className="hover-elevate" data-testid={`card-clinic-${clinic.id}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg" data-testid="text-clinic-name">
              {clinic.name}
            </CardTitle>
            <CardDescription className="mt-1 flex items-center gap-1" data-testid="text-clinic-location">
              <MapPin className="h-3 w-3" />
              {clinic.district}, {clinic.city}
            </CardDescription>
          </div>
          {clinic.rating && (
            <div className="flex items-center gap-1 text-sm font-medium" data-testid="text-clinic-rating">
              <Star className="h-4 w-4 fill-primary text-primary" />
              {clinic.rating}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{clinic.address}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4 flex-shrink-0" />
            <a href={`tel:${clinic.phone}`} className="hover:text-foreground">
              {clinic.phone}
            </a>
          </div>
          
          {clinic.workingHours && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span>{clinic.workingHours}</span>
            </div>
          )}
        </div>

        <Button 
          onClick={handleOpenMap}
          variant="outline"
          className="w-full"
          data-testid="button-open-map"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Haritada Göster
        </Button>
      </CardContent>
    </Card>
  );
}
