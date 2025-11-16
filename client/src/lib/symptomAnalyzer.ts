import { type Department } from "@/components/DepartmentResult";

const departmentDatabase: Record<string, Department> = {
  cardiology: {
    name: "Cardiology",
    icon: "heart",
    explanation: "Semptomlarınıza göre bir kardiyolog görmelisiniz.",
    description: "Kardiyologlar kalp ve kan damarlarıyla ilgili durumların teşhis ve tedavisinde uzmanlaşmıştır. Göğüs ağrısı, düzensiz kalp atışı, yüksek tansiyon ve diğer kardiyovasküler endişelerde yardımcı olabilirler."
  },
  dermatology: {
    name: "Dermatology",
    icon: "activity",
    explanation: "Semptomlarınıza göre bir dermatolog görmelisiniz.",
    description: "Dermatologlar cilt, saç ve tırnak durumlarının tedavisinde uzmanlaşmıştır. Döküntüler, akne, egzama, sedef hastalığı ve cilt kanseri taraması konularında yardımcı olabilirler."
  },
  gastroenterology: {
    name: "Gastroenterology",
    icon: "stethoscope",
    explanation: "Semptomlarınıza göre bir gastroenterolog görmelisiniz.",
    description: "Gastroenterologlar sindirim sistemi bozukluklarında uzmanlaşmıştır. Mide ağrısı, asit reflü, IBS ve diğer gastrointestinal sorunlarda yardımcı olabilirler."
  },
  neurology: {
    name: "Neurology",
    icon: "brain",
    explanation: "Semptomlarınıza göre bir nörolog görmelisiniz.",
    description: "Nörologlar sinir sistemi bozukluklarında uzmanlaşmıştır. Baş ağrıları, nöbetler, inmeler ve nörolojik durumlar konusunda yardımcı olabilirler."
  },
  psychiatry: {
    name: "Psychiatry",
    icon: "users",
    explanation: "Semptomlarınıza göre bir psikiyatr görmelisiniz.",
    description: "Psikiyatrlar ruh sağlığı durumlarında uzmanlaşmıştır. Depresyon, anksiyete, stres ve diğer psikiyatrik bozukluklar konusunda yardımcı olabilirler."
  },
  general: {
    name: "General Medicine",
    icon: "info",
    explanation: "Semptomlarınıza göre bir genel pratisyen hekimle başlamalısınız.",
    description: "Genel pratisyen hekimler kapsamlı sağlık hizmeti sunar ve geniş bir yelpazede yaygın tıbbi durumları teşhis edip tedavi edebilirler. Ayrıca gerektiğinde sizi uzmanlara yönlendirebilirler."
  }
};

const iconMap: Record<string, string> = {
  "Cardiology": "heart",
  "Dermatology": "activity",
  "Gastroenterology": "stethoscope",
  "Neurology": "brain",
  "Psychiatry": "users",
  "General Medicine": "info",
};

// AI-powered symptom analysis using Gemini
export async function analyzeSymptomsWithAI(symptoms: string): Promise<Department> {
  try {
    const response = await fetch("/api/analyze-symptoms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symptoms }),
    });

    if (!response.ok) {
      throw new Error("Failed to analyze symptoms");
    }

    const data = await response.json();
    
    // Map AI response to Department format
    const departmentName = data.department as string;
    const icon = iconMap[departmentName] || "info";
    const existingDept = departmentDatabase[departmentName.toLowerCase().replace(" ", "")] || departmentDatabase.general;
    
    return {
      name: departmentName,
      icon: icon,
      explanation: data.explanation,
      description: existingDept.description,
    };
  } catch (error) {
    console.error("AI analysis failed, falling back to keyword matching:", error);
    // Fallback to keyword-based analysis if AI fails
    return analyzeSymptomsKeywordBased(symptoms);
  }
}

// Fallback keyword-based analysis
function analyzeSymptomsKeywordBased(symptoms: string): Department {
  const lowerSymptoms = symptoms.toLowerCase();
  
  const symptomKeywords: Record<string, string[]> = {
    cardiology: [
      "chest", "heart", "cardiac", "palpitation", "angina", "heartbeat",
      "cardiovascular", "pulse", "coronary", "shortness of breath",
      "breathless", "breathing difficulty"
    ],
    dermatology: [
      "skin", "rash", "itch", "acne", "eczema", "psoriasis", "mole",
      "dermatitis", "hives", "spot", "pimple", "lesion", "blister"
    ],
    gastroenterology: [
      "stomach", "nausea", "vomit", "diarrhea", "constipation", "bowel",
      "abdomen", "digestive", "intestine", "liver", "reflux", "heartburn",
      "indigestion", "bloating", "cramp"
    ],
    neurology: [
      "headache", "migraine", "dizzy", "vertigo", "seizure", "numbness",
      "tremor", "paralysis", "stroke", "concussion", "nerve", "brain",
      "memory", "confusion"
    ],
    psychiatry: [
      "stress", "anxiety", "depression", "panic", "mood", "sleep",
      "insomnia", "mental", "worried", "sad", "fear", "phobia",
      "obsessive", "compulsive", "trauma", "ptsd"
    ]
  };
  
  // Count matches for each department
  const matches: Record<string, number> = {};
  
  for (const [department, keywords] of Object.entries(symptomKeywords)) {
    matches[department] = keywords.filter(keyword => 
      lowerSymptoms.includes(keyword)
    ).length;
  }
  
  // Find department with most matches
  const bestMatch = Object.entries(matches).reduce((best, current) => 
    current[1] > best[1] ? current : best
  );
  
  // If no matches or very low confidence, return general medicine
  if (bestMatch[1] === 0) {
    return departmentDatabase.general;
  }
  
  return departmentDatabase[bestMatch[0]];
}
