import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Stethoscope, Activity, Users, Info } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export interface Department {
  name: string;
  icon: string;
  explanation: string;
  description: string;
}

const iconMap: Record<string, LucideIcon> = {
  heart: Heart,
  brain: Brain,
  stethoscope: Stethoscope,
  activity: Activity,
  users: Users,
  info: Info,
};

interface DepartmentResultProps {
  department: Department;
  onLearnMore: () => void;
}

export default function DepartmentResult({ department, onLearnMore }: DepartmentResultProps) {
  const IconComponent = iconMap[department.icon] || Stethoscope;
  const { t } = useLanguage();

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="card-result">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <IconComponent className="h-8 w-8 text-primary" data-testid="icon-department" />
        </div>
        <div>
          <CardTitle className="text-2xl" data-testid="text-department-name">
            {department.name}
          </CardTitle>
          <CardDescription className="mt-2 text-base" data-testid="text-explanation">
            {department.explanation}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed" data-testid="text-description">
          {department.description}
        </p>
        <Button 
          variant="outline" 
          className="w-full sm:w-auto"
          onClick={onLearnMore}
          data-testid="button-learn-more"
        >
          <Info className="mr-2 h-4 w-4" />
          {t.departmentResult.learnMore}
        </Button>
      </CardContent>
    </Card>
  );
}
