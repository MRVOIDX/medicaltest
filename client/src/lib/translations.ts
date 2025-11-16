export type Language = 'en' | 'tr' | 'ar';

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

export const translations = {
  en: {
    header: {
      title: 'MediGuide — Find the Right Doctor',
      nav: {
        home: 'Home',
        symptomChecker: 'Symptom Checker',
        findClinics: 'Find Clinics',
        healthResources: 'Health Resources',
        about: 'About',
        faq: 'FAQ',
      },
    },
    home: {
      hero: {
        title: 'Your AI-Powered Medical Guide',
        subtitle: 'Get instant recommendations on which medical department to visit based on your symptoms. Smart, fast, and available in multiple languages.',
        cta: 'Start Symptom Analysis',
        learnMore: 'Learn How It Works',
      },
      features: [
        {
          title: 'AI-Powered Analysis',
          description: 'Advanced artificial intelligence analyzes your symptoms and recommends the most appropriate medical department.',
          icon: 'brain',
        },
        {
          title: 'Multi-Language Support',
          description: 'Access our service in English, Turkish, and Arabic with full RTL support for Arabic speakers.',
          icon: 'globe',
        },
        {
          title: 'Find Nearby Clinics',
          description: 'Discover qualified clinics in your area for the recommended medical specialty with ratings and contact information.',
          icon: 'map-pin',
        },
        {
          title: '24/7 Medical Chatbot',
          description: 'Get answers to your health questions anytime with our intelligent medical chatbot assistant.',
          icon: 'bot',
        },
      ],
      howItWorks: {
        title: 'How It Works',
        subtitle: 'Get the right medical guidance in three simple steps',
        steps: [
          {
            title: 'Describe Your Symptoms',
            description: 'Tell us what you\'re experiencing in your own words. Be as detailed as possible for accurate results.',
          },
          {
            title: 'AI Analysis',
            description: 'Our advanced AI analyzes your symptoms and matches them with the appropriate medical department.',
          },
          {
            title: 'Get Recommendations',
            description: 'Receive department recommendations with confidence scores and find nearby qualified clinics.',
          },
        ],
      },
      symptomsSection: {
        title: 'Try Our Symptom Checker',
        subtitle: 'Start your journey to better health by analyzing your symptoms now',
      },
    },
    symptomInput: {
      title: 'Describe Your Symptoms',
      subtitle: 'Tell us what you\'re experiencing, and we\'ll help you find the right medical department.',
      placeholder: 'Example: I have a headache and fever for 2 days...',
      analyze: 'Analyze Symptoms',
      analyzing: 'Analyzing...',
    },
    departmentResult: {
      recommendation: 'Recommended Department',
      confidence: 'Confidence',
      reasoning: 'Why this department?',
      learnMore: 'Learn More',
      importantNote: 'Important',
      disclaimer: 'This recommendation is based on AI analysis and should not replace professional medical advice. Please consult a healthcare provider for proper diagnosis.',
    },
    departmentInfo: {
      about: 'About',
      commonConditions: 'Common Conditions',
      whenToVisit: 'When to Visit',
      close: 'Close',
    },
    clinicList: {
      title: 'Clinics',
      nearby: 'Nearby Clinics',
      noResults: 'No clinics found in this area.',
      distance: 'away',
      viewOnMap: 'View on Map',
      call: 'Call',
    },
    footer: {
      disclaimer: 'Medical Disclaimer',
      disclaimerText: 'This tool provides general information only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified health provider.',
      emergency: 'In case of emergency, call 911 immediately.',
    },
    errors: {
      analysisFailed: 'Analysis Failed',
      analysisFailedDescription: 'Unable to analyze symptoms. Please try again.',
    },
    chatbot: {
      title: 'MediBot',
      subtitle: 'Your Medical Assistant',
      placeholder: 'Ask me about diseases, symptoms, or health...',
      send: 'Send',
      close: 'Close',
      minimize: 'Minimize',
      typing: 'MediBot is typing...',
      welcomeMessage: 'Hi! I\'m MediBot. I can help you understand diseases, symptoms, and general health information. How can I assist you today?',
      errorMessage: 'Sorry, I encountered an error. Please try again.',
    },
    departmentSearch: {
      title: 'Search Medical Departments',
      placeholder: 'Search for a department...',
      noResults: 'No department found',
    },
    emergency: {
      title: 'Emergency Numbers',
      subtitle: 'Turkey Emergency Services',
      ambulance: 'General Emergency / Ambulance',
      fire: 'Fire Department',
      police: 'Police',
      gendarmerie: 'Gendarmerie',
      findHospital: 'Find Nearest Hospital',
    },
    healthTips: {
      title: 'Health Tips',
      tips: [
        'Drink at least 2 liters of water every day.',
        'Never skip breakfast, start your day with energy.',
        'Walk at least 30 minutes a day.',
        'Get enough sleep (7-8 hours).',
        'Stay away from cigarettes and alcohol.',
      ],
    },
    printResult: {
      button: 'Print or Save as PDF',
      title: 'Medical Recommendation',
    },
    about: {
      title: 'About MediGuide',
      subtitle: 'Your trusted AI-powered medical guidance platform',
      mission: {
        title: 'Our Mission',
        description: 'To make quality healthcare accessible to everyone by providing intelligent symptom analysis and connecting patients with the right medical specialists.',
      },
      values: {
        title: 'Our Values',
        items: [
          { title: 'Accuracy', description: 'We use advanced AI to provide the most accurate department recommendations.' },
          { title: 'Accessibility', description: 'Available 24/7 in multiple languages to serve diverse communities.' },
          { title: 'Privacy', description: 'Your health information is never stored or shared.' },
          { title: 'Transparency', description: 'Clear explanations for every recommendation we provide.' },
        ],
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about MediGuide',
      questions: [
        {
          question: 'Is MediGuide free to use?',
          answer: 'Yes, MediGuide is completely free to use. We believe everyone should have access to quality medical guidance.',
        },
        {
          question: 'How accurate is the AI symptom checker?',
          answer: 'Our AI is trained on vast medical databases and provides highly accurate department recommendations. However, it should not replace professional medical advice.',
        },
        {
          question: 'Is my health information stored?',
          answer: 'No, we do not store any personal health information. All symptom analysis is done in real-time and not saved.',
        },
        {
          question: 'Which languages are supported?',
          answer: 'MediGuide currently supports English, Turkish, and Arabic with full RTL support for Arabic.',
        },
        {
          question: 'Can I use MediGuide for emergencies?',
          answer: 'No, MediGuide is not for emergencies. In case of emergency, please call 112 (Turkey) or your local emergency number immediately.',
        },
        {
          question: 'How do I find clinics near me?',
          answer: 'After receiving your department recommendation, you can browse clinics by department and filter by city in the Find Clinics page.',
        },
      ],
    },
    healthResources: {
      title: 'Health Resources',
      subtitle: 'Essential health information and emergency contacts',
    },
    findClinicsPage: {
      title: 'Find Medical Clinics',
      subtitle: 'Search for qualified clinics by department and location',
      filterByDepartment: 'Filter by Department',
      filterByCity: 'Filter by City',
      allDepartments: 'All Departments',
      allCities: 'All Cities',
      showingResults: 'Showing {count} clinics',
    },
  },
  tr: {
    header: {
      title: 'MediGuide — Doğru Doktoru Bulun',
      nav: {
        home: 'Ana Sayfa',
        symptomChecker: 'Semptom Kontrolü',
        findClinics: 'Klinik Bul',
        healthResources: 'Sağlık Kaynakları',
        about: 'Hakkında',
        faq: 'SSS',
      },
    },
    home: {
      hero: {
        title: 'Yapay Zeka Destekli Tıbbi Rehberiniz',
        subtitle: 'Semptomlarınıza göre hangi tıbbi bölüme başvurmanız gerektiği konusunda anında öneriler alın. Akıllı, hızlı ve çoklu dil desteğiyle.',
        cta: 'Semptom Analizine Başla',
        learnMore: 'Nasıl Çalışır?',
      },
      features: [
        {
          title: 'Yapay Zeka Destekli Analiz',
          description: 'Gelişmiş yapay zeka, semptomlarınızı analiz eder ve en uygun tıbbi bölümü önerir.',
          icon: 'brain',
        },
        {
          title: 'Çoklu Dil Desteği',
          description: 'Hizmetimize İngilizce, Türkçe ve Arapça dillerinde erişin. Arapça konuşanlar için tam RTL desteği.',
          icon: 'globe',
        },
        {
          title: 'Yakındaki Klinikleri Bulun',
          description: 'Önerilen tıbbi uzmanlık alanı için bölgenizdeki nitelikli klinikleri derecelendirme ve iletişim bilgileriyle keşfedin.',
          icon: 'map-pin',
        },
        {
          title: '7/24 Tıbbi Chatbot',
          description: 'Akıllı tıbbi chatbot asistanımızla sağlık sorularınıza istediğiniz zaman yanıt alın.',
          icon: 'bot',
        },
      ],
      howItWorks: {
        title: 'Nasıl Çalışır',
        subtitle: 'Üç basit adımda doğru tıbbi rehberlik alın',
        steps: [
          {
            title: 'Semptomlarınızı Açıklayın',
            description: 'Ne hissettiğinizi kendi kelimelerinizle anlatın. Doğru sonuçlar için mümkün olduğunca ayrıntılı olun.',
          },
          {
            title: 'Yapay Zeka Analizi',
            description: 'Gelişmiş yapay zekamız semptomlarınızı analiz eder ve uygun tıbbi bölümle eşleştirir.',
          },
          {
            title: 'Öneriler Alın',
            description: 'Güven puanlarıyla birlikte bölüm önerileri alın ve yakındaki nitelikli klinikleri bulun.',
          },
        ],
      },
      symptomsSection: {
        title: 'Semptom Kontrolörümüzü Deneyin',
        subtitle: 'Semptomlarınızı şimdi analiz ederek daha iyi bir sağlık yolculuğuna başlayın',
      },
    },
    symptomInput: {
      title: 'Semptomlarınızı Açıklayın',
      subtitle: 'Ne hissettiğinizi bize anlatın, size doğru tıbbi bölümü bulmada yardımcı olalım.',
      placeholder: 'Örnek: 2 gündür başım ağrıyor ve ateşim var...',
      analyze: 'Semptomları Analiz Et',
      analyzing: 'Analiz Ediliyor...',
    },
    departmentResult: {
      recommendation: 'Önerilen Bölüm',
      confidence: 'Güven Düzeyi',
      reasoning: 'Neden bu bölüm?',
      learnMore: 'Daha Fazla Bilgi',
      importantNote: 'Önemli',
      disclaimer: 'Bu öneri yapay zeka analizine dayanmaktadır ve profesyonel tıbbi tavsiyenin yerini tutmaz. Doğru teşhis için lütfen bir sağlık uzmanına başvurun.',
    },
    departmentInfo: {
      about: 'Hakkında',
      commonConditions: 'Yaygın Durumlar',
      whenToVisit: 'Ne Zaman Başvurulmalı',
      close: 'Kapat',
    },
    clinicList: {
      title: 'Klinikler',
      nearby: 'Yakındaki Klinikler',
      noResults: 'Bu bölgede klinik bulunamadı.',
      distance: 'uzaklıkta',
      viewOnMap: 'Haritada Göster',
      call: 'Ara',
    },
    footer: {
      disclaimer: 'Tıbbi Sorumluluk Reddi',
      disclaimerText: 'Bu araç yalnızca genel bilgi sağlar ve profesyonel tıbbi tavsiye, teşhis veya tedavinin yerini tutmaz. Her zaman doktorunuzun veya kalifiye sağlık uzmanınızın tavsiyesini alın.',
      emergency: 'Acil durumlarda hemen 112\'yi arayın.',
    },
    errors: {
      analysisFailed: 'Analiz Başarısız',
      analysisFailedDescription: 'Semptomlar analiz edilemedi. Lütfen tekrar deneyin.',
    },
    chatbot: {
      title: 'MediBot',
      subtitle: 'Tıbbi Asistanınız',
      placeholder: 'Hastalıklar, semptomlar veya sağlık hakkında sorun...',
      send: 'Gönder',
      close: 'Kapat',
      minimize: 'Küçült',
      typing: 'MediBot yazıyor...',
      welcomeMessage: 'Merhaba! Ben MediBot. Hastalıkları, semptomları ve genel sağlık bilgilerini anlamanıza yardımcı olabilirim. Bugün size nasıl yardımcı olabilirim?',
      errorMessage: 'Üzgünüm, bir hatayla karşılaştım. Lütfen tekrar deneyin.',
    },
    departmentSearch: {
      title: 'Tıbbi Bölüm Ara',
      placeholder: 'Bölüm adı yazın...',
      noResults: 'Bölüm bulunamadı',
    },
    emergency: {
      title: 'Acil Numaralar',
      subtitle: 'Türkiye Acil Servisler',
      ambulance: 'Genel Acil / Ambulans',
      fire: 'İtfaiye',
      police: 'Polis',
      gendarmerie: 'Jandarma',
      findHospital: 'En Yakın Hastaneyi Bul',
    },
    healthTips: {
      title: 'Sağlık İpuçları',
      tips: [
        'Her gün en az 2 litre su içmeyi unutmayın.',
        'Kahvaltıyı atlamayın, güne enerjiyle başlayın.',
        'Günde en az 30 dakika yürüyün.',
        'Yeterli uyku alın (7-8 saat).',
        'Sigara ve alkolden uzak durun.',
      ],
    },
    printResult: {
      button: 'Sonucu Yazdır veya PDF Olarak Kaydet',
      title: 'Tıbbi Öneri',
    },
    about: {
      title: 'MediGuide Hakkında',
      subtitle: 'Güvenilir yapay zeka destekli tıbbi rehberlik platformunuz',
      mission: {
        title: 'Misyonumuz',
        description: 'Akıllı semptom analizi sağlayarak ve hastaları doğru tıbbi uzmanlarla buluşturarak kaliteli sağlık hizmetlerini herkes için erişilebilir kılmak.',
      },
      values: {
        title: 'Değerlerimiz',
        items: [
          { title: 'Doğruluk', description: 'En doğru bölüm önerilerini sağlamak için gelişmiş yapay zeka kullanıyoruz.' },
          { title: 'Erişilebilirlik', description: 'Çeşitli topluluklara hizmet etmek için çoklu dilde 7/24 erişilebilir.' },
          { title: 'Gizlilik', description: 'Sağlık bilgileriniz asla saklanmaz veya paylaşılmaz.' },
          { title: 'Şeffaflık', description: 'Sağladığımız her öneri için açık açıklamalar.' },
        ],
      },
    },
    faq: {
      title: 'Sık Sorulan Sorular',
      subtitle: 'MediGuide hakkında sık sorulan soruların yanıtlarını bulun',
      questions: [
        {
          question: 'MediGuide kullanımı ücretsiz mi?',
          answer: 'Evet, MediGuide tamamen ücretsizdir. Herkesin kaliteli tıbbi rehberliğe erişimi olması gerektiğine inanıyoruz.',
        },
        {
          question: 'Yapay zeka semptom kontrolörü ne kadar doğru?',
          answer: 'Yapay zekamız geniş tıbbi veri tabanları üzerinde eğitilmiştir ve oldukça doğru bölüm önerileri sağlar. Ancak profesyonel tıbbi tavsiyenin yerini tutmaz.',
        },
        {
          question: 'Sağlık bilgilerim saklanıyor mu?',
          answer: 'Hayır, kişisel sağlık bilgilerini saklamıyoruz. Tüm semptom analizleri gerçek zamanlı olarak yapılır ve kaydedilmez.',
        },
        {
          question: 'Hangi diller destekleniyor?',
          answer: 'MediGuide şu anda İngilizce, Türkçe ve Arapça dillerini desteklemektedir. Arapça için tam RTL desteği mevcuttur.',
        },
        {
          question: 'Acil durumlar için MediGuide kullanabilir miyim?',
          answer: 'Hayır, MediGuide acil durumlar için değildir. Acil bir durumda lütfen hemen 112\'yi veya yerel acil servis numaranızı arayın.',
        },
        {
          question: 'Yakınımdaki klinikleri nasıl bulabilirim?',
          answer: 'Bölüm önerinizi aldıktan sonra, Klinik Bul sayfasında bölüme göre kliniklere göz atabilir ve şehre göre filtreleyebilirsiniz.',
        },
      ],
    },
    healthResources: {
      title: 'Sağlık Kaynakları',
      subtitle: 'Temel sağlık bilgileri ve acil iletişim numaraları',
    },
    findClinicsPage: {
      title: 'Tıbbi Klinik Bul',
      subtitle: 'Bölüm ve konuma göre nitelikli klinikleri arayın',
      filterByDepartment: 'Bölüme Göre Filtrele',
      filterByCity: 'Şehre Göre Filtrele',
      allDepartments: 'Tüm Bölümler',
      allCities: 'Tüm Şehirler',
      showingResults: '{count} klinik gösteriliyor',
    },
  },
  ar: {
    header: {
      title: 'MediGuide — ابحث عن الطبيب المناسب',
      nav: {
        home: 'الرئيسية',
        symptomChecker: 'فاحص الأعراض',
        findClinics: 'ابحث عن عيادات',
        healthResources: 'الموارد الصحية',
        about: 'حول',
        faq: 'الأسئلة الشائعة',
      },
    },
    home: {
      hero: {
        title: 'دليلك الطبي المدعوم بالذكاء الاصطناعي',
        subtitle: 'احصل على توصيات فورية حول القسم الطبي الذي يجب زيارته بناءً على أعراضك. ذكي وسريع ومتاح بلغات متعددة.',
        cta: 'ابدأ تحليل الأعراض',
        learnMore: 'كيف يعمل؟',
      },
      features: [
        {
          title: 'تحليل مدعوم بالذكاء الاصطناعي',
          description: 'يقوم الذكاء الاصطناعي المتقدم بتحليل أعراضك ويوصي بالقسم الطبي الأنسب.',
          icon: 'brain',
        },
        {
          title: 'دعم متعدد اللغات',
          description: 'استخدم خدمتنا باللغة الإنجليزية والتركية والعربية مع دعم كامل للغة العربية من اليمين إلى اليسار.',
          icon: 'globe',
        },
        {
          title: 'ابحث عن العيادات القريبة',
          description: 'اكتشف العيادات المؤهلة في منطقتك للتخصص الطبي الموصى به مع التقييمات ومعلومات الاتصال.',
          icon: 'map-pin',
        },
        {
          title: 'روبوت طبي على مدار الساعة',
          description: 'احصل على إجابات لأسئلتك الصحية في أي وقت مع مساعد الروبوت الطبي الذكي لدينا.',
          icon: 'bot',
        },
      ],
      howItWorks: {
        title: 'كيف يعمل',
        subtitle: 'احصل على الإرشادات الطبية الصحيحة في ثلاث خطوات بسيطة',
        steps: [
          {
            title: 'صف أعراضك',
            description: 'أخبرنا بما تشعر به بكلماتك الخاصة. كن مفصلاً قدر الإمكان للحصول على نتائج دقيقة.',
          },
          {
            title: 'تحليل بالذكاء الاصطناعي',
            description: 'يقوم الذكاء الاصطناعي المتقدم لدينا بتحليل أعراضك ومطابقتها مع القسم الطبي المناسب.',
          },
          {
            title: 'احصل على التوصيات',
            description: 'تلقى توصيات الأقسام مع درجات الثقة واعثر على العيادات المؤهلة القريبة.',
          },
        ],
      },
      symptomsSection: {
        title: 'جرب فاحص الأعراض لدينا',
        subtitle: 'ابدأ رحلتك نحو صحة أفضل من خلال تحليل أعراضك الآن',
      },
    },
    symptomInput: {
      title: 'صف أعراضك',
      subtitle: 'أخبرنا بما تشعر به، وسنساعدك في العثور على القسم الطبي المناسب.',
      placeholder: 'مثال: لدي صداع وحمى منذ يومين...',
      analyze: 'تحليل الأعراض',
      analyzing: 'جاري التحليل...',
    },
    departmentResult: {
      recommendation: 'القسم الموصى به',
      confidence: 'مستوى الثقة',
      reasoning: 'لماذا هذا القسم؟',
      learnMore: 'معرفة المزيد',
      importantNote: 'مهم',
      disclaimer: 'هذه التوصية تعتمد على التحليل بالذكاء الاصطناعي ولا تحل محل المشورة الطبية المهنية. يرجى استشارة مقدم الرعاية الصحية للحصول على التشخيص الصحيح.',
    },
    departmentInfo: {
      about: 'حول',
      commonConditions: 'الحالات الشائعة',
      whenToVisit: 'متى تزور',
      close: 'إغلاق',
    },
    clinicList: {
      title: 'العيادات',
      nearby: 'العيادات القريبة',
      noResults: 'لم يتم العثور على عيادات في هذه المنطقة.',
      distance: 'بعيدا',
      viewOnMap: 'عرض على الخريطة',
      call: 'اتصل',
    },
    footer: {
      disclaimer: 'إخلاء المسؤولية الطبية',
      disclaimerText: 'توفر هذه الأداة معلومات عامة فقط وليست بديلاً عن المشورة الطبية أو التشخيص أو العلاج المهني. استشر دائمًا طبيبك أو مقدم الرعاية الصحية المؤهل.',
      emergency: 'في حالة الطوارئ، اتصل بـ 911 على الفور.',
    },
    errors: {
      analysisFailed: 'فشل التحليل',
      analysisFailedDescription: 'تعذر تحليل الأعراض. يرجى المحاولة مرة أخرى.',
    },
    chatbot: {
      title: 'MediBot',
      subtitle: 'مساعدك الطبي',
      placeholder: 'اسألني عن الأمراض أو الأعراض أو الصحة...',
      send: 'إرسال',
      close: 'إغلاق',
      minimize: 'تصغير',
      typing: 'MediBot يكتب...',
      welcomeMessage: 'مرحباً! أنا MediBot. يمكنني مساعدتك في فهم الأمراض والأعراض والمعلومات الصحية العامة. كيف يمكنني مساعدتك اليوم؟',
      errorMessage: 'عذراً، واجهت خطأ. يرجى المحاولة مرة أخرى.',
    },
    departmentSearch: {
      title: 'بحث عن الأقسام الطبية',
      placeholder: 'ابحث عن قسم...',
      noResults: 'لم يتم العثور على قسم',
    },
    emergency: {
      title: 'أرقام الطوارئ',
      subtitle: 'خدمات الطوارئ التركية',
      ambulance: 'طوارئ عامة / إسعاف',
      fire: 'مطافئ الحريق',
      police: 'الشرطة',
      gendarmerie: 'الدرك',
      findHospital: 'ابحث عن أقرب مستشفى',
    },
    healthTips: {
      title: 'نصائح صحية',
      tips: [
        'اشرب 2 لتر من الماء على الأقل كل يوم.',
        'لا تتخطى وجبة الإفطار، ابدأ يومك بطاقة.',
        'امشِ 30 دقيقة على الأقل يومياً.',
        'احصل على نوم كافٍ (7-8 ساعات).',
        'ابتعد عن السجائر والكحول.',
      ],
    },
    printResult: {
      button: 'اطبع أو احفظ كملف PDF',
      title: 'التوصية الطبية',
    },
    about: {
      title: 'حول MediGuide',
      subtitle: 'منصة الإرشاد الطبي الموثوقة المدعومة بالذكاء الاصطناعي',
      mission: {
        title: 'مهمتنا',
        description: 'جعل الرعاية الصحية عالية الجودة متاحة للجميع من خلال توفير تحليل ذكي للأعراض وربط المرضى بالمتخصصين الطبيين المناسبين.',
      },
      values: {
        title: 'قيمنا',
        items: [
          { title: 'الدقة', description: 'نستخدم الذكاء الاصطناعي المتقدم لتقديم أدق توصيات الأقسام.' },
          { title: 'إمكانية الوصول', description: 'متاح على مدار الساعة طوال أيام الأسبوع بعدة لغات لخدمة المجتمعات المتنوعة.' },
          { title: 'الخصوصية', description: 'لا يتم تخزين معلوماتك الصحية أو مشاركتها أبداً.' },
          { title: 'الشفافية', description: 'توضيحات واضحة لكل توصية نقدمها.' },
        ],
      },
    },
    faq: {
      title: 'الأسئلة الشائعة',
      subtitle: 'ابحث عن إجابات للأسئلة الشائعة حول MediGuide',
      questions: [
        {
          question: 'هل استخدام MediGuide مجاني؟',
          answer: 'نعم، MediGuide مجاني تماماً للاستخدام. نحن نؤمن بأن الجميع يجب أن يحصلوا على إرشاد طبي عالي الجودة.',
        },
        {
          question: 'ما مدى دقة فاحص الأعراض بالذكاء الاصطناعي؟',
          answer: 'تم تدريب الذكاء الاصطناعي لدينا على قواعد بيانات طبية ضخمة ويقدم توصيات دقيقة للغاية للأقسام. ومع ذلك، لا ينبغي أن يحل محل المشورة الطبية المهنية.',
        },
        {
          question: 'هل يتم تخزين معلوماتي الصحية؟',
          answer: 'لا، نحن لا نخزن أي معلومات صحية شخصية. يتم إجراء جميع تحليلات الأعراض في الوقت الفعلي ولا يتم حفظها.',
        },
        {
          question: 'ما اللغات المدعومة؟',
          answer: 'يدعم MediGuide حالياً اللغة الإنجليزية والتركية والعربية مع دعم كامل للغة العربية من اليمين إلى اليسار.',
        },
        {
          question: 'هل يمكنني استخدام MediGuide في حالات الطوارئ؟',
          answer: 'لا، MediGuide ليس للحالات الطارئة. في حالة الطوارئ، يرجى الاتصال بـ 112 (تركيا) أو رقم الطوارئ المحلي الخاص بك على الفور.',
        },
        {
          question: 'كيف أجد العيادات القريبة مني؟',
          answer: 'بعد تلقي توصية القسم الخاص بك، يمكنك تصفح العيادات حسب القسم والتصفية حسب المدينة في صفحة البحث عن العيادات.',
        },
      ],
    },
    healthResources: {
      title: 'الموارد الصحية',
      subtitle: 'معلومات صحية أساسية وجهات اتصال الطوارئ',
    },
    findClinicsPage: {
      title: 'ابحث عن العيادات الطبية',
      subtitle: 'ابحث عن عيادات مؤهلة حسب القسم والموقع',
      filterByDepartment: 'تصفية حسب القسم',
      filterByCity: 'تصفية حسب المدينة',
      allDepartments: 'جميع الأقسام',
      allCities: 'جميع المدن',
      showingResults: 'عرض {count} عيادة',
    },
  },
};
