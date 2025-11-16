import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { departmentDirectory } from "@/lib/departmentDirectory";

export default function DepartmentSearch() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDepartments = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    const term = searchTerm.toLowerCase();
    return departmentDirectory.filter((dept) => {
      if (language === 'tr') {
        return dept.trName.toLowerCase().includes(term);
      } else if (language === 'en') {
        return dept.enName.toLowerCase().includes(term);
      } else {
        return dept.arName.includes(searchTerm) || dept.enName.toLowerCase().includes(term);
      }
    });
  }, [searchTerm, language]);

  const getDepartmentName = (dept: typeof departmentDirectory[0]) => {
    if (language === 'tr') return dept.trName;
    if (language === 'en') return dept.enName;
    return dept.arName;
  };

  const getDepartmentDescription = (dept: typeof departmentDirectory[0]) => {
    if (language === 'tr') return dept.trDescription;
    if (language === 'en') return dept.enDescription;
    return dept.arDescription;
  };

  return (
    <Card data-testid="card-department-search">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          {t.departmentSearch.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="search"
          placeholder={t.departmentSearch.placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
          data-testid="input-department-search"
        />
        {searchTerm && (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {filteredDepartments.length > 0 ? (
              filteredDepartments.map((dept) => (
                <div
                  key={dept.slug}
                  className="p-3 rounded-md bg-muted/50 hover-elevate"
                  data-testid={`result-department-${dept.slug}`}
                >
                  <h4 className="font-semibold text-sm mb-1">
                    {getDepartmentName(dept)}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {getDepartmentDescription(dept)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4" data-testid="text-no-results">
                {t.departmentSearch.noResults}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
