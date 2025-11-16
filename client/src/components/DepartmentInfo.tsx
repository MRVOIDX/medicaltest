import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Department } from "./DepartmentResult";
import { Heart, Brain, Stethoscope, Activity, Users, Info } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const iconMap: Record<string, LucideIcon> = {
  heart: Heart,
  brain: Brain,
  stethoscope: Stethoscope,
  activity: Activity,
  users: Users,
  info: Info,
};

interface DepartmentInfoProps {
  department: Department | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const departmentDetails: Record<string, { conditions: string[]; whenToVisit: string }> = {
  Cardiology: {
    conditions: [
      "Göğüs ağrısı veya rahatsızlık",
      "Düzensiz kalp atışı veya çarpıntı",
      "Yüksek tansiyon",
      "Kalp krizi veya inme önleme",
      "Kalp yetmezliği yönetimi",
      "Koroner arter hastalığı"
    ],
    whenToVisit: "Sürekli göğüs ağrısı, normal aktiviteler sırasında nefes darlığı, düzensiz kalp atışı yaşıyorsanız veya yüksek kolesterol veya ailede kalp hastalığı öyküsü gibi risk faktörleriniz varsa bir kardiyolog ziyaret edin."
  },
  Dermatology: {
    conditions: [
      "Cilt döküntüleri ve tahriş",
      "Akne ve cilt enfeksiyonları",
      "Egzama ve sedef hastalığı",
      "Benler ve cilt kanseri taraması",
      "Saç ve tırnak bozuklukları",
      "Kozmetik cilt sorunları"
    ],
    whenToVisit: "Kalıcı cilt sorunları, değişen benler, şiddetli akne, alışılmadık döküntüler veya reçetesiz ilaçlarla düzelmeyen herhangi bir cilt durumu için bir dermatolog görün."
  },
  Gastroenterology: {
    conditions: [
      "Kronik mide ağrısı",
      "Asit reflü ve mide yanması",
      "İrritabl bağırsak sendromu (IBS)",
      "İnflamatuar bağırsak hastalığı",
      "Karaciğer ve pankreas bozuklukları",
      "Sindirim sorunları"
    ],
    whenToVisit: "Sürekli mide ağrısı, kronik ishal veya kabızlık, dışkıda kan, yutma güçlüğü veya açıklanamayan kilo kaybı için bir gastroenterolog danışın."
  },
  Neurology: {
    conditions: [
      "Kronik baş ağrıları ve migren",
      "Nöbetler ve epilepsi",
      "İnme ve beyin bozuklukları",
      "Multipl skleroz",
      "Parkinson hastalığı",
      "Hafıza sorunları ve demans"
    ],
    whenToVisit: "Şiddetli veya sık baş ağrıları, uyuşma veya güçsüzlük, nöbetler, koordinasyon sorunları, hafıza sorunları veya sürekli baş dönmesi için bir nörolog görün."
  },
  Psychiatry: {
    conditions: [
      "Depresyon ve anksiyete bozuklukları",
      "Bipolar bozukluk",
      "Şizofreni ve psikotik bozukluklar",
      "Travma sonrası stres bozukluğu (TSSB)",
      "Dikkat eksikliği bozuklukları (ADD/ADHD)",
      "Madde kötüye kullanımı ve bağımlılık"
    ],
    whenToVisit: "Sürekli üzüntü, anksiyete, panik ataklar, ruh hali dalgalanmaları, konsantrasyon zorluğu veya kendine zarar verme düşünceleri yaşıyorsanız bir psikiyatra danışın."
  },
  "General Medicine": {
    conditions: [
      "Rutin kontroller ve koruyucu bakım",
      "Yaygın hastalıklar (soğuk algınlığı, grip)",
      "Kronik hastalık yönetimi",
      "Genel sağlık endişeleri",
      "Aşılar ve sağlık taramaları",
      "Uzmanlara yönlendirmeler"
    ],
    whenToVisit: "Rutin sağlık kontrolleri, yaygın hastalıklar, koruyucu bakım veya hangi uzmana gideceğinizden emin değilseniz bir genel pratisyen hekime başvurun."
  }
};

export default function DepartmentInfo({ department, open, onOpenChange }: DepartmentInfoProps) {
  const { t } = useLanguage();
  
  if (!department) return null;

  const IconComponent = iconMap[department.icon] || Stethoscope;
  const details = departmentDetails[department.name] || departmentDetails["General Medicine"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" data-testid="dialog-department-info">
        <DialogHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <IconComponent className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl text-center" data-testid="text-info-title">
            {department.name}
          </DialogTitle>
          <DialogDescription className="text-center text-base" data-testid="text-info-description">
            {department.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <div>
            <h3 className="font-semibold text-lg mb-3">{t.departmentInfo.commonConditions}</h3>
            <ul className="space-y-2">
              {details.conditions.map((condition, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">{condition}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">{t.departmentInfo.whenToVisit}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {details.whenToVisit}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
