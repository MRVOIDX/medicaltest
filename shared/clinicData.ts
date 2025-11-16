// Turkish clinic database with real locations
export interface Clinic {
  id: string;
  name: string;
  department: string;
  address: string;
  city: string;
  district: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating?: number;
  workingHours?: string;
}

export const turkishClinics: Clinic[] = [
  // Istanbul - Cardiology
  {
    id: "1",
    name: "Istanbul Kardiyoloji Hastanesi",
    department: "Cardiology",
    address: "Halaskargazi Cad. No:54, Şişli",
    city: "Istanbul",
    district: "Şişli",
    phone: "+90 212 373 5000",
    coordinates: { lat: 41.0602, lng: 28.9887 },
    rating: 4.5,
    workingHours: "08:00 - 20:00"
  },
  {
    id: "2",
    name: "Acıbadem Maslak Hastanesi - Kardiyoloji",
    department: "Cardiology",
    address: "Büyükdere Cad. No:40, Maslak",
    city: "Istanbul",
    district: "Sarıyer",
    phone: "+90 212 304 4444",
    coordinates: { lat: 41.1086, lng: 29.0174 },
    rating: 4.7,
    workingHours: "24 Saat"
  },
  {
    id: "3",
    name: "Memorial Şişli Hastanesi - Kardiyoloji",
    department: "Cardiology",
    address: "Piyalepaşa Bulvarı, Şişli",
    city: "Istanbul",
    district: "Şişli",
    phone: "+90 212 314 6666",
    coordinates: { lat: 41.0614, lng: 28.9862 },
    rating: 4.6,
    workingHours: "24 Saat"
  },
  
  // Istanbul - Dermatology
  {
    id: "4",
    name: "Dermatoloji ve Estetik Merkezi",
    department: "Dermatology",
    address: "Bağdat Cad. No:165, Kadıköy",
    city: "Istanbul",
    district: "Kadıköy",
    phone: "+90 216 414 5000",
    coordinates: { lat: 40.9774, lng: 29.0584 },
    rating: 4.4,
    workingHours: "09:00 - 18:00"
  },
  {
    id: "5",
    name: "American Hospital - Dermatoloji",
    department: "Dermatology",
    address: "Güzelbahçe Sok. No:20, Nişantaşı",
    city: "Istanbul",
    district: "Şişli",
    phone: "+90 212 444 3777",
    coordinates: { lat: 41.0461, lng: 28.9948 },
    rating: 4.8,
    workingHours: "08:00 - 19:00"
  },

  // Istanbul - Gastroenterology
  {
    id: "6",
    name: "Liv Hospital - Gastroenteroloji",
    department: "Gastroenterology",
    address: "Cevizli Mah. Tugay Yolu Cad., Maltepe",
    city: "Istanbul",
    district: "Maltepe",
    phone: "+90 216 444 0 546",
    coordinates: { lat: 40.9285, lng: 29.1454 },
    rating: 4.5,
    workingHours: "24 Saat"
  },
  {
    id: "7",
    name: "Medipol Mega Hastanesi - Gastroenteroloji",
    department: "Gastroenterology",
    address: "TEM Avrupa Otoyolu Bağcılar Çıkışı",
    city: "Istanbul",
    district: "Bağcılar",
    phone: "+90 212 460 7777",
    coordinates: { lat: 41.0391, lng: 28.8503 },
    rating: 4.6,
    workingHours: "24 Saat"
  },

  // Istanbul - Neurology
  {
    id: "8",
    name: "Beyin ve Sinir Cerrahisi Hastanesi",
    department: "Neurology",
    address: "Valikonağı Cad. No:53, Nişantaşı",
    city: "Istanbul",
    district: "Şişli",
    phone: "+90 212 224 1000",
    coordinates: { lat: 41.0488, lng: 28.9935 },
    rating: 4.7,
    workingHours: "24 Saat"
  },
  {
    id: "9",
    name: "Florence Nightingale Hastanesi - Nöroloji",
    department: "Neurology",
    address: "Abide-i Hürriyet Cad., Şişli",
    city: "Istanbul",
    district: "Şişli",
    phone: "+90 212 224 4950",
    coordinates: { lat: 41.0583, lng: 28.9826 },
    rating: 4.5,
    workingHours: "24 Saat"
  },

  // Istanbul - Psychiatry
  {
    id: "10",
    name: "Ruh Sağlığı ve Psikiyatri Merkezi",
    department: "Psychiatry",
    address: "Teşvikiye Cad. No:82, Şişli",
    city: "Istanbul",
    district: "Şişli",
    phone: "+90 212 231 2121",
    coordinates: { lat: 41.0498, lng: 28.9943 },
    rating: 4.3,
    workingHours: "09:00 - 19:00"
  },
  {
    id: "11",
    name: "NPİSTANBUL Beyin Hastanesi - Psikiyatri",
    department: "Psychiatry",
    address: "Çamlıca Mah. Işıklar Cad., Üsküdar",
    city: "Istanbul",
    district: "Üsküdar",
    phone: "+90 216 632 6060",
    coordinates: { lat: 41.0232, lng: 29.0547 },
    rating: 4.6,
    workingHours: "24 Saat"
  },

  // Istanbul - General Medicine
  {
    id: "12",
    name: "Şişli Hamidiye Etfal Eğitim ve Araştırma Hastanesi",
    department: "General Medicine",
    address: "Halaskargazi Cad., Şişli",
    city: "Istanbul",
    district: "Şişli",
    phone: "+90 212 373 5000",
    coordinates: { lat: 41.0595, lng: 28.9881 },
    rating: 4.2,
    workingHours: "24 Saat"
  },

  // Ankara - Cardiology
  {
    id: "13",
    name: "Ankara Kardiyoloji Merkezi",
    department: "Cardiology",
    address: "Atatürk Bulvarı No:141, Çankaya",
    city: "Ankara",
    district: "Çankaya",
    phone: "+90 312 457 8000",
    coordinates: { lat: 39.9151, lng: 32.8369 },
    rating: 4.4,
    workingHours: "08:00 - 20:00"
  },
  {
    id: "14",
    name: "TOBB ETÜ Hastanesi - Kardiyoloji",
    department: "Cardiology",
    address: "Söğütözü Mahallesi, Çankaya",
    city: "Ankara",
    district: "Çankaya",
    phone: "+90 312 292 6000",
    coordinates: { lat: 39.9042, lng: 32.8074 },
    rating: 4.6,
    workingHours: "24 Saat"
  },

  // Ankara - Dermatology
  {
    id: "15",
    name: "Ankara Dermatoloji Kliniği",
    department: "Dermatology",
    address: "Tunalı Hilmi Cad. No:67, Çankaya",
    city: "Ankara",
    district: "Çankaya",
    phone: "+90 312 468 3000",
    coordinates: { lat: 39.9115, lng: 32.8537 },
    rating: 4.3,
    workingHours: "09:00 - 18:00"
  },

  // Ankara - Gastroenterology
  {
    id: "16",
    name: "Ankara Üniversitesi Tıp Fakültesi - Gastroenteroloji",
    department: "Gastroenterology",
    address: "Cebeci Kampüsü, Dikimevi",
    city: "Ankara",
    district: "Mamak",
    phone: "+90 312 595 6000",
    coordinates: { lat: 39.9448, lng: 32.8821 },
    rating: 4.5,
    workingHours: "24 Saat"
  },

  // Ankara - Neurology
  {
    id: "17",
    name: "Gazi Üniversitesi Hastanesi - Nöroloji",
    department: "Neurology",
    address: "Beşevler, Çankaya",
    city: "Ankara",
    district: "Çankaya",
    phone: "+90 312 202 5000",
    coordinates: { lat: 39.9299, lng: 32.8543 },
    rating: 4.4,
    workingHours: "24 Saat"
  },

  // Ankara - Psychiatry
  {
    id: "18",
    name: "Ankara Ruh Sağlığı Merkezi",
    department: "Psychiatry",
    address: "Kızılay Meydanı, Çankaya",
    city: "Ankara",
    district: "Çankaya",
    phone: "+90 312 418 2000",
    coordinates: { lat: 39.9208, lng: 32.8541 },
    rating: 4.2,
    workingHours: "09:00 - 19:00"
  },

  // Ankara - General Medicine
  {
    id: "19",
    name: "Hacettepe Üniversitesi Hastaneleri",
    department: "General Medicine",
    address: "Sıhhiye, Altındağ",
    city: "Ankara",
    district: "Altındağ",
    phone: "+90 312 305 1000",
    coordinates: { lat: 39.9334, lng: 32.8597 },
    rating: 4.7,
    workingHours: "24 Saat"
  },

  // Izmir - Cardiology
  {
    id: "20",
    name: "Ege Üniversitesi Hastanesi - Kardiyoloji",
    department: "Cardiology",
    address: "Bornova",
    city: "Izmir",
    district: "Bornova",
    phone: "+90 232 390 0000",
    coordinates: { lat: 38.4622, lng: 27.2165 },
    rating: 4.5,
    workingHours: "24 Saat"
  },
  {
    id: "21",
    name: "Kent Hastanesi İzmir - Kardiyoloji",
    department: "Cardiology",
    address: "Çiğli",
    city: "Izmir",
    district: "Çiğli",
    phone: "+90 232 386 8686",
    coordinates: { lat: 38.4989, lng: 27.0528 },
    rating: 4.6,
    workingHours: "24 Saat"
  },

  // Izmir - Dermatology
  {
    id: "22",
    name: "İzmir Dermatoloji Merkezi",
    department: "Dermatology",
    address: "Alsancak, Konak",
    city: "Izmir",
    district: "Konak",
    phone: "+90 232 421 4000",
    coordinates: { lat: 38.4369, lng: 27.1467 },
    rating: 4.4,
    workingHours: "09:00 - 18:00"
  },

  // Izmir - Gastroenterology
  {
    id: "23",
    name: "Dokuz Eylül Üniversitesi Hastanesi - Gastroenteroloji",
    department: "Gastroenterology",
    address: "İnciraltı, Balçova",
    city: "Izmir",
    district: "Balçova",
    phone: "+90 232 412 1212",
    coordinates: { lat: 38.3704, lng: 27.0525 },
    rating: 4.5,
    workingHours: "24 Saat"
  },

  // Izmir - Neurology
  {
    id: "24",
    name: "İzmir Katip Çelebi Üniversitesi Atatürk EAH - Nöroloji",
    department: "Neurology",
    address: "Karabağlar",
    city: "Izmir",
    district: "Karabağlar",
    phone: "+90 232 243 4343",
    coordinates: { lat: 38.3913, lng: 27.0837 },
    rating: 4.3,
    workingHours: "24 Saat"
  },

  // Izmir - Psychiatry
  {
    id: "25",
    name: "Özel Ege Psikiyatri Merkezi",
    department: "Psychiatry",
    address: "Bornova",
    city: "Izmir",
    district: "Bornova",
    phone: "+90 232 339 5050",
    coordinates: { lat: 38.4637, lng: 27.2138 },
    rating: 4.4,
    workingHours: "09:00 - 19:00"
  },

  // Izmir - General Medicine
  {
    id: "26",
    name: "Bayraklı Devlet Hastanesi",
    department: "General Medicine",
    address: "Bayraklı",
    city: "Izmir",
    district: "Bayraklı",
    phone: "+90 232 330 7000",
    coordinates: { lat: 38.4622, lng: 27.1620 },
    rating: 4.1,
    workingHours: "24 Saat"
  }
];

export const turkishCities = [
  "Istanbul",
  "Ankara",
  "Izmir",
  "Bursa",
  "Antalya"
];
