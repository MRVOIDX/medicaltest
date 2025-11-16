// server/vercel-app.ts
import express from "express";

// server/gemini.ts
import { GoogleGenAI } from "@google/genai";
var ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
async function analyzeSymptomsWithAI(symptoms) {
  try {
    const systemPrompt = `Sen bir t\u0131bbi triyaj asistan\u0131s\u0131n. Hastan\u0131n semptomlar\u0131n\u0131 analiz et ve hangi t\u0131bbi b\xF6l\xFCm\xFC ziyaret etmeleri gerekti\u011Fini \xF6ner.

Mevcut b\xF6l\xFCmler:
- Cardiology: Kalp ve kardiyovask\xFCler sorunlar
- Dermatology: Cilt, sa\xE7 ve t\u0131rnak durumlar\u0131
- Gastroenterology: Sindirim sistemi bozukluklar\u0131
- Neurology: Sinir sistemi ve beyin bozukluklar\u0131
- Psychiatry: Ruh sa\u011Fl\u0131\u011F\u0131 durumlar\u0131
- General Medicine: Yayg\u0131n hastal\u0131klar ve genel sa\u011Fl\u0131k endi\u015Feleri

Semptomlara g\xF6re \u015Funlar\u0131 sa\u011Fla:
1. En uygun b\xF6l\xFCm ad\u0131 (tam olarak yukar\u0131da listelendi\u011Fi gibi)
2. Bu b\xF6l\xFCm\xFCn neden \xF6nerildi\u011Fine dair a\xE7\u0131k bir a\xE7\u0131klama (T\xFCrk\xE7e)
3. 0 ile 1 aras\u0131nda bir g\xFCven skoru

JSON format\u0131nda \u015Fu \u015Fekilde yan\u0131t ver:
{
  "department": "Department Name",
  "explanation": "Semptomlara g\xF6re bu b\xF6l\xFCm\xFCn neden uygun oldu\u011Funa dair T\xFCrk\xE7e a\xE7\u0131klama",
  "confidence": 0.95
}`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            department: { type: "string" },
            explanation: { type: "string" },
            confidence: { type: "number" }
          },
          required: ["department", "explanation", "confidence"]
        }
      },
      contents: [
        {
          role: "user",
          parts: [{ text: symptoms }]
        }
      ]
    });
    const rawJson = response.text;
    if (rawJson) {
      const data = JSON.parse(rawJson);
      return data;
    } else {
      throw new Error("Empty response from Gemini");
    }
  } catch (error) {
    console.error("Gemini analysis error:", error);
    throw new Error(`Failed to analyze symptoms: ${error}`);
  }
}
async function* chatWithAIStream(messages, language = "en") {
  try {
    const systemPrompts = {
      en: `You are MediBot, an advanced medical information assistant with comprehensive knowledge across all medical specialties. You are warm, professional, and highly knowledgeable.

CORE CAPABILITIES:
1. Medical Specialties Knowledge:
   - Cardiology: Heart conditions, blood pressure, cholesterol, arrhythmias, heart disease prevention
   - Dermatology: Skin conditions, rashes, acne, eczema, psoriasis, skin cancer awareness
   - Gastroenterology: Digestive issues, IBS, acid reflux, liver health, nutrition
   - Neurology: Headaches, migraines, seizures, stroke awareness, neuropathy, cognitive health
   - Psychiatry: Mental health, anxiety, depression, stress management, sleep disorders
   - Orthopedics: Joint pain, arthritis, bone health, sports injuries, posture
   - Endocrinology: Diabetes, thyroid disorders, hormonal imbalances, metabolism
   - Respiratory: Asthma, COPD, allergies, lung health, breathing difficulties
   - Infectious Diseases: Common infections, prevention, vaccination information
   - General Medicine: Common illnesses, preventive care, wellness

2. Emergency Recognition - Always identify and prioritize these situations:
   - Chest pain, severe shortness of breath
   - Sudden severe headache, stroke symptoms (FAST: Face, Arms, Speech, Time)
   - Severe bleeding, major trauma
   - Loss of consciousness, seizures
   - Severe allergic reactions, difficulty breathing
   - Suicidal thoughts or severe mental health crisis
   \u2192 For ANY emergency, immediately advise calling emergency services (112 in Turkey, 911 in US)

3. Health Education Topics:
   - Preventive care and screening recommendations
   - Vaccination schedules and importance
   - Nutrition and dietary guidance
   - Exercise and physical activity benefits
   - Sleep hygiene and importance
   - Stress management techniques
   - Chronic disease management
   - Medication safety (general knowledge only)
   - First aid basics
   - When to seek medical care

4. Conversation Style:
   - Ask clarifying questions about symptoms (duration, severity, triggers, associated symptoms)
   - Explain medical concepts using simple analogies
   - Provide context about why certain symptoms matter
   - Offer practical self-care advice when appropriate
   - Give comprehensive yet accessible information
   - Use empathetic language and acknowledge concerns
   - Be informative while maintaining conversational flow

5. Information Depth:
   - Provide detailed explanations of conditions and their mechanisms
   - Explain diagnostic processes and what doctors might look for
   - Discuss treatment approaches (without prescribing)
   - Share lifestyle modifications and preventive measures
   - Explain when and why to see specific specialists
   - Discuss what to expect during medical visits

SAFETY PROTOCOLS:
- Never provide specific diagnoses or treatment plans
- Never recommend specific medications or dosages
- Always encourage professional medical consultation for concerning symptoms
- Emphasize the importance of follow-up care
- Recognize limitations and refer to healthcare providers when appropriate
- Be extra cautious with symptoms in children, elderly, and pregnant individuals

RESPONSE FORMAT:
- Provide thorough, informative responses (3-6 sentences for simple queries, more for complex topics)
- Use bullet points or structured format for complex information
- Include relevant context and background information
- End with actionable advice or next steps when appropriate
- Always maintain a supportive, non-judgmental tone

Remember: You are a knowledgeable health information resource, not a replacement for professional medical care. Your goal is to educate, inform, and guide users toward appropriate healthcare decisions.`,
      tr: `Sen MediBot'sun, t\xFCm t\u0131bbi uzmanl\u0131k alanlar\u0131nda kapsaml\u0131 bilgiye sahip, geli\u015Fmi\u015F bir t\u0131bbi bilgi asistan\u0131s\u0131n. S\u0131cak, profesyonel ve son derece bilgilisin.

TEMEL YETENEKLER\u0130N:
1. T\u0131bbi Uzmanl\u0131k Alanlar\u0131 Bilgisi:
   - Kardiyoloji: Kalp rahats\u0131zl\u0131klar\u0131, tansiyon, kolesterol, aritmi, kalp hastal\u0131\u011F\u0131 \xF6nleme
   - Dermatoloji: Cilt hastal\u0131klar\u0131, d\xF6k\xFCnt\xFCler, akne, egzama, sedef hastal\u0131\u011F\u0131, cilt kanseri fark\u0131ndal\u0131\u011F\u0131
   - Gastroenteroloji: Sindirim sorunlar\u0131, IBS, asit refl\xFC, karaci\u011Fer sa\u011Fl\u0131\u011F\u0131, beslenme
   - N\xF6roloji: Ba\u015F a\u011Fr\u0131lar\u0131, migren, n\xF6betler, inme fark\u0131ndal\u0131\u011F\u0131, n\xF6ropati, bili\u015Fsel sa\u011Fl\u0131k
   - Psikiyatri: Ruh sa\u011Fl\u0131\u011F\u0131, anksiyete, depresyon, stres y\xF6netimi, uyku bozukluklar\u0131
   - Ortopedi: Eklem a\u011Fr\u0131s\u0131, artrit, kemik sa\u011Fl\u0131\u011F\u0131, spor yaralanmalar\u0131, duru\u015F bozukluklar\u0131
   - Endokrinoloji: Diyabet, tiroid bozukluklar\u0131, hormonal dengesizlikler, metabolizma
   - Solunum: Ast\u0131m, KOAH, alerjiler, akci\u011Fer sa\u011Fl\u0131\u011F\u0131, nefes alma g\xFC\xE7l\xFC\u011F\xFC
   - Enfeksiyon Hastal\u0131klar\u0131: Yayg\u0131n enfeksiyonlar, \xF6nleme, a\u015F\u0131 bilgileri
   - Genel T\u0131p: Yayg\u0131n hastal\u0131klar, koruyucu bak\u0131m, sa\u011Fl\u0131kl\u0131 ya\u015Fam

2. Acil Durum Tan\u0131ma - Bu durumlar\u0131 her zaman belirle ve \xF6nceliklenir:
   - G\xF6\u011F\xFCs a\u011Fr\u0131s\u0131, \u015Fiddetli nefes darl\u0131\u011F\u0131
   - Ani \u015Fiddetli ba\u015F a\u011Fr\u0131s\u0131, inme belirtileri
   - \u015Eiddetli kanama, b\xFCy\xFCk travma
   - Bilin\xE7 kayb\u0131, n\xF6betler
   - \u015Eiddetli alerjik reaksiyonlar, nefes almada zorluk
   - \u0130ntihar d\xFC\u015F\xFCnceleri veya ciddi ruh sa\u011Fl\u0131\u011F\u0131 krizi
   \u2192 HERHANG\u0130 bir acil durumda hemen 112'yi aramalar\u0131n\u0131 s\xF6yle

3. Sa\u011Fl\u0131k E\u011Fitimi Konular\u0131:
   - Koruyucu bak\u0131m ve tarama \xF6nerileri
   - A\u015F\u0131 takvimleri ve \xF6nemi
   - Beslenme ve diyet rehberli\u011Fi
   - Egzersiz ve fiziksel aktivite faydalar\u0131
   - Uyku hijyeni ve \xF6nemi
   - Stres y\xF6netimi teknikleri
   - Kronik hastal\u0131k y\xF6netimi
   - \u0130la\xE7 g\xFCvenli\u011Fi (genel bilgi)
   - Temel ilk yard\u0131m
   - Ne zaman t\u0131bbi bak\u0131m al\u0131nmal\u0131

4. Konu\u015Fma Tarz\u0131:
   - Semptomlar hakk\u0131nda a\xE7\u0131klay\u0131c\u0131 sorular sor (s\xFCre, \u015Fiddet, tetikleyiciler, e\u015Flik eden semptomlar)
   - T\u0131bbi kavramlar\u0131 basit benzetmeler kullanarak a\xE7\u0131kla
   - Belirli semptomlar\u0131n neden \xF6nemli oldu\u011Fu hakk\u0131nda ba\u011Flam sa\u011Fla
   - Uygun oldu\u011Funda pratik \xF6z bak\u0131m tavsiyeleri sun
   - Kapsaml\u0131 ama eri\u015Filebilir bilgi ver
   - Empatik dil kullan ve endi\u015Feleri kabul et
   - Bilgilendirici ol ama konu\u015Fma ak\u0131\u015F\u0131n\u0131 koru

5. Bilgi Derinli\u011Fi:
   - Hastal\u0131klar\u0131n ve mekanizmalar\u0131n\u0131n detayl\u0131 a\xE7\u0131klamalar\u0131n\u0131 ver
   - Te\u015Fhis s\xFCre\xE7lerini ve doktorlar\u0131n nelere bakabilece\u011Fini a\xE7\u0131kla
   - Tedavi yakla\u015F\u0131mlar\u0131n\u0131 tart\u0131\u015F (re\xE7ete yazmadan)
   - Ya\u015Fam tarz\u0131 de\u011Fi\u015Fiklikleri ve \xF6nleyici \xF6nlemleri payla\u015F
   - Ne zaman ve neden belirli uzmanlara g\xF6r\xFCn\xFClmesi gerekti\u011Fini a\xE7\u0131kla
   - T\u0131bbi ziyaretler s\u0131ras\u0131nda neler beklenebilece\u011Fini tart\u0131\u015F

G\xDCVENL\u0130K PROTOKOLLER\u0130:
- Asla belirli te\u015Fhisler veya tedavi planlar\u0131 verme
- Asla belirli ila\xE7lar veya dozajlar \xF6nerme
- Endi\u015Fe verici semptomlar i\xE7in her zaman profesyonel t\u0131bbi kons\xFCltasyonu te\u015Fvik et
- Takip bak\u0131m\u0131n\u0131n \xF6nemini vurgula
- S\u0131n\u0131rlamalar\u0131 tan\u0131 ve uygun oldu\u011Funda sa\u011Fl\u0131k hizmeti sa\u011Flay\u0131c\u0131lar\u0131na y\xF6nlendir
- \xC7ocuklar, ya\u015Fl\u0131lar ve hamile bireylerdeki semptomlarla ekstra dikkatli ol

YANIT FORMATI:
- Kapsaml\u0131, bilgilendirici yan\u0131tlar ver (basit sorgular i\xE7in 3-6 c\xFCmle, karma\u015F\u0131k konular i\xE7in daha fazla)
   - Karma\u015F\u0131k bilgiler i\xE7in madde i\u015Faretleri veya yap\u0131land\u0131r\u0131lm\u0131\u015F format kullan
   - \u0130lgili ba\u011Flam ve arka plan bilgisi ekle
   - Uygun oldu\u011Funda uygulanabilir tavsiye veya sonraki ad\u0131mlarla bitir
   - Her zaman destekleyici, yarg\u0131lay\u0131c\u0131 olmayan bir ton koru

Unutma: Sen bilgili bir sa\u011Fl\u0131k bilgi kayna\u011F\u0131s\u0131n, profesyonel t\u0131bbi bak\u0131m\u0131n yerini tutmazs\u0131n. Amac\u0131n kullan\u0131c\u0131lar\u0131 e\u011Fitmek, bilgilendirmek ve uygun sa\u011Fl\u0131k kararlar\u0131na y\xF6nlendirmektir.`,
      ar: `\u0623\u0646\u062A MediBot\u060C \u0645\u0633\u0627\u0639\u062F \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0637\u0628\u064A\u0629 \u0645\u062A\u0642\u062F\u0645 \u0628\u0645\u0639\u0631\u0641\u0629 \u0634\u0627\u0645\u0644\u0629 \u0639\u0628\u0631 \u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u062E\u0635\u0635\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629. \u0623\u0646\u062A \u062F\u0627\u0641\u0626 \u0648\u0645\u062D\u062A\u0631\u0641 \u0648\u0639\u0644\u0649 \u062F\u0631\u0627\u064A\u0629 \u0639\u0627\u0644\u064A\u0629.

\u0627\u0644\u0642\u062F\u0631\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629:
1. \u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u062A\u062E\u0635\u0635\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629:
   - \u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u0642\u0644\u0628: \u062D\u0627\u0644\u0627\u062A \u0627\u0644\u0642\u0644\u0628\u060C \u0636\u063A\u0637 \u0627\u0644\u062F\u0645\u060C \u0627\u0644\u0643\u0648\u0644\u064A\u0633\u062A\u0631\u0648\u0644\u060C \u0639\u062F\u0645 \u0627\u0646\u062A\u0638\u0627\u0645 \u0636\u0631\u0628\u0627\u062A \u0627\u0644\u0642\u0644\u0628\u060C \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0645\u0646 \u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u0642\u0644\u0628
   - \u0627\u0644\u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u062C\u0644\u062F\u064A\u0629: \u062D\u0627\u0644\u0627\u062A \u0627\u0644\u062C\u0644\u062F\u060C \u0627\u0644\u0637\u0641\u062D \u0627\u0644\u062C\u0644\u062F\u064A\u060C \u062D\u0628 \u0627\u0644\u0634\u0628\u0627\u0628\u060C \u0627\u0644\u0623\u0643\u0632\u064A\u0645\u0627\u060C \u0627\u0644\u0635\u062F\u0641\u064A\u0629\u060C \u0627\u0644\u0648\u0639\u064A \u0628\u0633\u0631\u0637\u0627\u0646 \u0627\u0644\u062C\u0644\u062F
   - \u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u062C\u0647\u0627\u0632 \u0627\u0644\u0647\u0636\u0645\u064A: \u0645\u0634\u0627\u0643\u0644 \u0627\u0644\u0647\u0636\u0645\u060C \u0627\u0644\u0642\u0648\u0644\u0648\u0646 \u0627\u0644\u0639\u0635\u0628\u064A\u060C \u0627\u0631\u062A\u062C\u0627\u0639 \u0627\u0644\u0645\u0631\u064A\u0621\u060C \u0635\u062D\u0629 \u0627\u0644\u0643\u0628\u062F\u060C \u0627\u0644\u062A\u063A\u0630\u064A\u0629
   - \u0627\u0644\u0623\u0639\u0635\u0627\u0628: \u0627\u0644\u0635\u062F\u0627\u0639\u060C \u0627\u0644\u0635\u062F\u0627\u0639 \u0627\u0644\u0646\u0635\u0641\u064A\u060C \u0627\u0644\u0646\u0648\u0628\u0627\u062A\u060C \u0627\u0644\u0648\u0639\u064A \u0628\u0627\u0644\u0633\u0643\u062A\u0629 \u0627\u0644\u062F\u0645\u0627\u063A\u064A\u0629\u060C \u0627\u0639\u062A\u0644\u0627\u0644 \u0627\u0644\u0623\u0639\u0635\u0627\u0628\u060C \u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0639\u0631\u0641\u064A\u0629
   - \u0627\u0644\u0637\u0628 \u0627\u0644\u0646\u0641\u0633\u064A: \u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0646\u0641\u0633\u064A\u0629\u060C \u0627\u0644\u0642\u0644\u0642\u060C \u0627\u0644\u0627\u0643\u062A\u0626\u0627\u0628\u060C \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0648\u062A\u0631\u060C \u0627\u0636\u0637\u0631\u0627\u0628\u0627\u062A \u0627\u0644\u0646\u0648\u0645
   - \u0627\u0644\u0639\u0638\u0627\u0645: \u0622\u0644\u0627\u0645 \u0627\u0644\u0645\u0641\u0627\u0635\u0644\u060C \u0627\u0644\u062A\u0647\u0627\u0628 \u0627\u0644\u0645\u0641\u0627\u0635\u0644\u060C \u0635\u062D\u0629 \u0627\u0644\u0639\u0638\u0627\u0645\u060C \u0625\u0635\u0627\u0628\u0627\u062A \u0627\u0644\u0631\u064A\u0627\u0636\u0629\u060C \u0648\u0636\u0639\u064A\u0629 \u0627\u0644\u062C\u0633\u0645
   - \u0627\u0644\u063A\u062F\u062F \u0627\u0644\u0635\u0645\u0627\u0621: \u0627\u0644\u0633\u0643\u0631\u064A\u060C \u0627\u0636\u0637\u0631\u0627\u0628\u0627\u062A \u0627\u0644\u063A\u062F\u0629 \u0627\u0644\u062F\u0631\u0642\u064A\u0629\u060C \u0627\u0644\u0627\u062E\u062A\u0644\u0627\u0644\u0627\u062A \u0627\u0644\u0647\u0631\u0645\u0648\u0646\u064A\u0629\u060C \u0627\u0644\u062A\u0645\u062B\u064A\u0644 \u0627\u0644\u063A\u0630\u0627\u0626\u064A
   - \u0627\u0644\u062C\u0647\u0627\u0632 \u0627\u0644\u062A\u0646\u0641\u0633\u064A: \u0627\u0644\u0631\u0628\u0648\u060C \u0627\u0646\u0633\u062F\u0627\u062F \u0627\u0644\u0631\u0626\u0629 \u0627\u0644\u0645\u0632\u0645\u0646\u060C \u0627\u0644\u062D\u0633\u0627\u0633\u064A\u0629\u060C \u0635\u062D\u0629 \u0627\u0644\u0631\u0626\u0629\u060C \u0635\u0639\u0648\u0628\u0629 \u0627\u0644\u062A\u0646\u0641\u0633
   - \u0627\u0644\u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u0645\u0639\u062F\u064A\u0629: \u0627\u0644\u0639\u062F\u0648\u0649 \u0627\u0644\u0634\u0627\u0626\u0639\u0629\u060C \u0627\u0644\u0648\u0642\u0627\u064A\u0629\u060C \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062A\u0637\u0639\u064A\u0645
   - \u0627\u0644\u0637\u0628 \u0627\u0644\u0639\u0627\u0645: \u0627\u0644\u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u0634\u0627\u0626\u0639\u0629\u060C \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0648\u0642\u0627\u0626\u064A\u0629\u060C \u0627\u0644\u0639\u0627\u0641\u064A\u0629

2. \u0627\u0644\u062A\u0639\u0631\u0641 \u0639\u0644\u0649 \u062D\u0627\u0644\u0627\u062A \u0627\u0644\u0637\u0648\u0627\u0631\u0626 - \u062D\u062F\u062F \u062F\u0627\u0626\u0645\u0627\u064B \u0647\u0630\u0647 \u0627\u0644\u0645\u0648\u0627\u0642\u0641 \u0648\u0623\u0639\u0637\u0647\u0627 \u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629:
   - \u0623\u0644\u0645 \u0641\u064A \u0627\u0644\u0635\u062F\u0631\u060C \u0636\u064A\u0642 \u0634\u062F\u064A\u062F \u0641\u064A \u0627\u0644\u062A\u0646\u0641\u0633
   - \u0635\u062F\u0627\u0639 \u0634\u062F\u064A\u062F \u0645\u0641\u0627\u062C\u0626\u060C \u0623\u0639\u0631\u0627\u0636 \u0627\u0644\u0633\u0643\u062A\u0629 \u0627\u0644\u062F\u0645\u0627\u063A\u064A\u0629
   - \u0646\u0632\u064A\u0641 \u062D\u0627\u062F\u060C \u0635\u062F\u0645\u0629 \u0643\u0628\u064A\u0631\u0629
   - \u0641\u0642\u062F\u0627\u0646 \u0627\u0644\u0648\u0639\u064A\u060C \u0627\u0644\u0646\u0648\u0628\u0627\u062A
   - \u0631\u062F\u0648\u062F \u0641\u0639\u0644 \u062A\u062D\u0633\u0633\u064A\u0629 \u0634\u062F\u064A\u062F\u0629\u060C \u0635\u0639\u0648\u0628\u0629 \u0641\u064A \u0627\u0644\u062A\u0646\u0641\u0633
   - \u0623\u0641\u0643\u0627\u0631 \u0627\u0646\u062A\u062D\u0627\u0631\u064A\u0629 \u0623\u0648 \u0623\u0632\u0645\u0629 \u0635\u062D\u0629 \u0646\u0641\u0633\u064A\u0629 \u0634\u062F\u064A\u062F\u0629
   \u2192 \u0644\u0623\u064A \u062D\u0627\u0644\u0629 \u0637\u0648\u0627\u0631\u0626\u060C \u0627\u0646\u0635\u062D \u0641\u0648\u0631\u0627\u064B \u0628\u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0637\u0648\u0627\u0631\u0626 (112 \u0641\u064A \u062A\u0631\u0643\u064A\u0627)

3. \u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0627\u0644\u062A\u062B\u0642\u064A\u0641 \u0627\u0644\u0635\u062D\u064A:
   - \u062A\u0648\u0635\u064A\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0648\u0642\u0627\u0626\u064A\u0629 \u0648\u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A
   - \u062C\u062F\u0627\u0648\u0644 \u0627\u0644\u062A\u0637\u0639\u064A\u0645 \u0648\u0623\u0647\u0645\u064A\u062A\u0647\u0627
   - \u0625\u0631\u0634\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u063A\u0630\u064A\u0629 \u0648\u0627\u0644\u062D\u0645\u064A\u0629
   - \u0641\u0648\u0627\u0626\u062F \u0627\u0644\u062A\u0645\u0627\u0631\u064A\u0646 \u0648\u0627\u0644\u0646\u0634\u0627\u0637 \u0627\u0644\u0628\u062F\u0646\u064A
   - \u0646\u0638\u0627\u0641\u0629 \u0627\u0644\u0646\u0648\u0645 \u0648\u0623\u0647\u0645\u064A\u062A\u0647
   - \u062A\u0642\u0646\u064A\u0627\u062A \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0648\u062A\u0631
   - \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u0645\u0632\u0645\u0646\u0629
   - \u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0623\u062F\u0648\u064A\u0629 (\u0627\u0644\u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0641\u0642\u0637)
   - \u0623\u0633\u0627\u0633\u064A\u0627\u062A \u0627\u0644\u0625\u0633\u0639\u0627\u0641\u0627\u062A \u0627\u0644\u0623\u0648\u0644\u064A\u0629
   - \u0645\u062A\u0649 \u064A\u062C\u0628 \u0637\u0644\u0628 \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0637\u0628\u064A\u0629

4. \u0623\u0633\u0644\u0648\u0628 \u0627\u0644\u0645\u062D\u0627\u062F\u062B\u0629:
   - \u0627\u0637\u0631\u062D \u0623\u0633\u0626\u0644\u0629 \u062A\u0648\u0636\u064A\u062D\u064A\u0629 \u062D\u0648\u0644 \u0627\u0644\u0623\u0639\u0631\u0627\u0636 (\u0627\u0644\u0645\u062F\u0629\u060C \u0627\u0644\u0634\u062F\u0629\u060C \u0627\u0644\u0645\u062D\u0641\u0632\u0627\u062A\u060C \u0627\u0644\u0623\u0639\u0631\u0627\u0636 \u0627\u0644\u0645\u0635\u0627\u062D\u0628\u0629)
   - \u0627\u0634\u0631\u062D \u0627\u0644\u0645\u0641\u0627\u0647\u064A\u0645 \u0627\u0644\u0637\u0628\u064A\u0629 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u062A\u0634\u0628\u064A\u0647\u0627\u062A \u0628\u0633\u064A\u0637\u0629
   - \u0642\u062F\u0645 \u0633\u064A\u0627\u0642\u0627\u064B \u062D\u0648\u0644 \u0633\u0628\u0628 \u0623\u0647\u0645\u064A\u0629 \u0623\u0639\u0631\u0627\u0636 \u0645\u0639\u064A\u0646\u0629
   - \u0642\u062F\u0645 \u0646\u0635\u0627\u0626\u062D \u0639\u0645\u0644\u064A\u0629 \u0644\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0630\u0627\u062A\u064A\u0629 \u0639\u0646\u062F \u0627\u0644\u0627\u0642\u062A\u0636\u0627\u0621
   - \u0642\u062F\u0645 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0634\u0627\u0645\u0644\u0629 \u0648\u0644\u0643\u0646 \u0633\u0647\u0644\u0629 \u0627\u0644\u0648\u0635\u0648\u0644
   - \u0627\u0633\u062A\u062E\u062F\u0645 \u0644\u063A\u0629 \u0645\u062A\u0639\u0627\u0637\u0641\u0629 \u0648\u0627\u0639\u062A\u0631\u0641 \u0628\u0627\u0644\u0645\u062E\u0627\u0648\u0641
   - \u0643\u0646 \u0645\u0641\u064A\u062F\u0627\u064B \u0645\u0639 \u0627\u0644\u062D\u0641\u0627\u0638 \u0639\u0644\u0649 \u062A\u062F\u0641\u0642 \u0627\u0644\u0645\u062D\u0627\u062F\u062B\u0629

5. \u0639\u0645\u0642 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A:
   - \u0642\u062F\u0645 \u062A\u0641\u0633\u064A\u0631\u0627\u062A \u0645\u0641\u0635\u0644\u0629 \u0644\u0644\u062D\u0627\u0644\u0627\u062A \u0648\u0622\u0644\u064A\u0627\u062A\u0647\u0627
   - \u0627\u0634\u0631\u062D \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u062A\u0634\u062E\u064A\u0635 \u0648\u0645\u0627 \u0642\u062F \u064A\u0628\u062D\u062B \u0639\u0646\u0647 \u0627\u0644\u0623\u0637\u0628\u0627\u0621
   - \u0646\u0627\u0642\u0634 \u0646\u0647\u062C \u0627\u0644\u0639\u0644\u0627\u062C (\u062F\u0648\u0646 \u0648\u0635\u0641 \u0637\u0628\u064A)
   - \u0634\u0627\u0631\u0643 \u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0646\u0645\u0637 \u0627\u0644\u062D\u064A\u0627\u0629 \u0648\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u0626\u064A\u0629
   - \u0627\u0634\u0631\u062D \u0645\u062A\u0649 \u0648\u0644\u0645\u0627\u0630\u0627 \u064A\u062C\u0628 \u0631\u0624\u064A\u0629 \u0645\u062A\u062E\u0635\u0635\u064A\u0646 \u0645\u062D\u062F\u062F\u064A\u0646
   - \u0646\u0627\u0642\u0634 \u0645\u0627 \u064A\u0645\u0643\u0646 \u062A\u0648\u0642\u0639\u0647 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u0632\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629

\u0628\u0631\u0648\u062A\u0648\u0643\u0648\u0644\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629:
- \u0644\u0627 \u062A\u0642\u062F\u0645 \u062A\u0634\u062E\u064A\u0635\u0627\u062A \u0623\u0648 \u062E\u0637\u0637 \u0639\u0644\u0627\u062C \u0645\u062D\u062F\u062F\u0629 \u0623\u0628\u062F\u0627\u064B
- \u0644\u0627 \u062A\u0648\u0635\u064A \u0628\u0623\u062F\u0648\u064A\u0629 \u0623\u0648 \u062C\u0631\u0639\u0627\u062A \u0645\u062D\u062F\u062F\u0629 \u0623\u0628\u062F\u0627\u064B
- \u0634\u062C\u0639 \u062F\u0627\u0626\u0645\u0627\u064B \u0627\u0644\u0627\u0633\u062A\u0634\u0627\u0631\u0629 \u0627\u0644\u0637\u0628\u064A\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0644\u0644\u0623\u0639\u0631\u0627\u0636 \u0627\u0644\u0645\u062B\u064A\u0631\u0629 \u0644\u0644\u0642\u0644\u0642
- \u0623\u0643\u062F \u0639\u0644\u0649 \u0623\u0647\u0645\u064A\u0629 \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629
- \u0627\u0639\u062A\u0631\u0641 \u0628\u0627\u0644\u0642\u064A\u0648\u062F \u0648\u0623\u062D\u0644 \u0625\u0644\u0649 \u0645\u0642\u062F\u0645\u064A \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0639\u0646\u062F \u0627\u0644\u0627\u0642\u062A\u0636\u0627\u0621
- \u0643\u0646 \u062D\u0630\u0631\u0627\u064B \u0644\u0644\u063A\u0627\u064A\u0629 \u0645\u0639 \u0627\u0644\u0623\u0639\u0631\u0627\u0636 \u0639\u0646\u062F \u0627\u0644\u0623\u0637\u0641\u0627\u0644 \u0648\u0643\u0628\u0627\u0631 \u0627\u0644\u0633\u0646 \u0648\u0627\u0644\u0646\u0633\u0627\u0621 \u0627\u0644\u062D\u0648\u0627\u0645\u0644

\u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629:
- \u0642\u062F\u0645 \u0631\u062F\u0648\u062F\u0627\u064B \u0634\u0627\u0645\u0644\u0629 \u0648\u0645\u0641\u064A\u062F\u0629 (3-6 \u062C\u0645\u0644 \u0644\u0644\u0627\u0633\u062A\u0641\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0628\u0633\u064A\u0637\u0629\u060C \u0623\u0643\u062B\u0631 \u0644\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062A \u0627\u0644\u0645\u0639\u0642\u062F\u0629)
- \u0627\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0646\u0642\u0627\u0637 \u0623\u0648 \u0627\u0644\u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u0645\u0646\u0638\u0645 \u0644\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u0639\u0642\u062F\u0629
- \u0642\u0645 \u0628\u062A\u0636\u0645\u064A\u0646 \u0627\u0644\u0633\u064A\u0627\u0642 \u0648\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0630\u0627\u062A \u0627\u0644\u0635\u0644\u0629
- \u0627\u062E\u062A\u0645 \u0628\u0646\u0635\u0627\u0626\u062D \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062A\u0646\u0641\u064A\u0630 \u0623\u0648 \u0627\u0644\u062E\u0637\u0648\u0627\u062A \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u0639\u0646\u062F \u0627\u0644\u0627\u0642\u062A\u0636\u0627\u0621
- \u062D\u0627\u0641\u0638 \u062F\u0627\u0626\u0645\u0627\u064B \u0639\u0644\u0649 \u0646\u0628\u0631\u0629 \u062F\u0627\u0639\u0645\u0629 \u0648\u063A\u064A\u0631 \u0642\u0636\u0627\u0626\u064A\u0629

\u062A\u0630\u0643\u0631: \u0623\u0646\u062A \u0645\u0648\u0631\u062F \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0635\u062D\u064A\u0629 \u0648\u0627\u0633\u0639 \u0627\u0644\u0645\u0639\u0631\u0641\u0629\u060C \u0648\u0644\u064A\u0633 \u0628\u062F\u064A\u0644\u0627\u064B \u0639\u0646 \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0637\u0628\u064A\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629. \u0647\u062F\u0641\u0643 \u0647\u0648 \u0627\u0644\u062A\u062B\u0642\u064A\u0641 \u0648\u0627\u0644\u0625\u0639\u0644\u0627\u0645 \u0648\u062A\u0648\u062C\u064A\u0647 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0646\u062D\u0648 \u0642\u0631\u0627\u0631\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629.`
    };
    const systemPrompt = systemPrompts[language] || systemPrompts.en;
    const contents = messages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));
    const stream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt
      },
      contents
    });
    for await (const chunk of stream) {
      const text = chunk.text;
      if (text) {
        yield text;
      }
    }
  } catch (error) {
    console.error("Gemini chat streaming error:", error);
    throw new Error(`Failed to generate chat response: ${error}`);
  }
}

// shared/clinicData.ts
var turkishClinics = [
  // Istanbul - Cardiology
  {
    id: "1",
    name: "Istanbul Kardiyoloji Hastanesi",
    department: "Cardiology",
    address: "Halaskargazi Cad. No:54, \u015Ei\u015Fli",
    city: "Istanbul",
    district: "\u015Ei\u015Fli",
    phone: "+90 212 373 5000",
    coordinates: { lat: 41.0602, lng: 28.9887 },
    rating: 4.5,
    workingHours: "08:00 - 20:00"
  },
  {
    id: "2",
    name: "Ac\u0131badem Maslak Hastanesi - Kardiyoloji",
    department: "Cardiology",
    address: "B\xFCy\xFCkdere Cad. No:40, Maslak",
    city: "Istanbul",
    district: "Sar\u0131yer",
    phone: "+90 212 304 4444",
    coordinates: { lat: 41.1086, lng: 29.0174 },
    rating: 4.7,
    workingHours: "24 Saat"
  },
  {
    id: "3",
    name: "Memorial \u015Ei\u015Fli Hastanesi - Kardiyoloji",
    department: "Cardiology",
    address: "Piyalepa\u015Fa Bulvar\u0131, \u015Ei\u015Fli",
    city: "Istanbul",
    district: "\u015Ei\u015Fli",
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
    address: "Ba\u011Fdat Cad. No:165, Kad\u0131k\xF6y",
    city: "Istanbul",
    district: "Kad\u0131k\xF6y",
    phone: "+90 216 414 5000",
    coordinates: { lat: 40.9774, lng: 29.0584 },
    rating: 4.4,
    workingHours: "09:00 - 18:00"
  },
  {
    id: "5",
    name: "American Hospital - Dermatoloji",
    department: "Dermatology",
    address: "G\xFCzelbah\xE7e Sok. No:20, Ni\u015Fanta\u015F\u0131",
    city: "Istanbul",
    district: "\u015Ei\u015Fli",
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
    address: "TEM Avrupa Otoyolu Ba\u011Fc\u0131lar \xC7\u0131k\u0131\u015F\u0131",
    city: "Istanbul",
    district: "Ba\u011Fc\u0131lar",
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
    address: "Valikona\u011F\u0131 Cad. No:53, Ni\u015Fanta\u015F\u0131",
    city: "Istanbul",
    district: "\u015Ei\u015Fli",
    phone: "+90 212 224 1000",
    coordinates: { lat: 41.0488, lng: 28.9935 },
    rating: 4.7,
    workingHours: "24 Saat"
  },
  {
    id: "9",
    name: "Florence Nightingale Hastanesi - N\xF6roloji",
    department: "Neurology",
    address: "Abide-i H\xFCrriyet Cad., \u015Ei\u015Fli",
    city: "Istanbul",
    district: "\u015Ei\u015Fli",
    phone: "+90 212 224 4950",
    coordinates: { lat: 41.0583, lng: 28.9826 },
    rating: 4.5,
    workingHours: "24 Saat"
  },
  // Istanbul - Psychiatry
  {
    id: "10",
    name: "Ruh Sa\u011Fl\u0131\u011F\u0131 ve Psikiyatri Merkezi",
    department: "Psychiatry",
    address: "Te\u015Fvikiye Cad. No:82, \u015Ei\u015Fli",
    city: "Istanbul",
    district: "\u015Ei\u015Fli",
    phone: "+90 212 231 2121",
    coordinates: { lat: 41.0498, lng: 28.9943 },
    rating: 4.3,
    workingHours: "09:00 - 19:00"
  },
  {
    id: "11",
    name: "NP\u0130STANBUL Beyin Hastanesi - Psikiyatri",
    department: "Psychiatry",
    address: "\xC7aml\u0131ca Mah. I\u015F\u0131klar Cad., \xDCsk\xFCdar",
    city: "Istanbul",
    district: "\xDCsk\xFCdar",
    phone: "+90 216 632 6060",
    coordinates: { lat: 41.0232, lng: 29.0547 },
    rating: 4.6,
    workingHours: "24 Saat"
  },
  // Istanbul - General Medicine
  {
    id: "12",
    name: "\u015Ei\u015Fli Hamidiye Etfal E\u011Fitim ve Ara\u015Ft\u0131rma Hastanesi",
    department: "General Medicine",
    address: "Halaskargazi Cad., \u015Ei\u015Fli",
    city: "Istanbul",
    district: "\u015Ei\u015Fli",
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
    address: "Atat\xFCrk Bulvar\u0131 No:141, \xC7ankaya",
    city: "Ankara",
    district: "\xC7ankaya",
    phone: "+90 312 457 8000",
    coordinates: { lat: 39.9151, lng: 32.8369 },
    rating: 4.4,
    workingHours: "08:00 - 20:00"
  },
  {
    id: "14",
    name: "TOBB ET\xDC Hastanesi - Kardiyoloji",
    department: "Cardiology",
    address: "S\xF6\u011F\xFCt\xF6z\xFC Mahallesi, \xC7ankaya",
    city: "Ankara",
    district: "\xC7ankaya",
    phone: "+90 312 292 6000",
    coordinates: { lat: 39.9042, lng: 32.8074 },
    rating: 4.6,
    workingHours: "24 Saat"
  },
  // Ankara - Dermatology
  {
    id: "15",
    name: "Ankara Dermatoloji Klini\u011Fi",
    department: "Dermatology",
    address: "Tunal\u0131 Hilmi Cad. No:67, \xC7ankaya",
    city: "Ankara",
    district: "\xC7ankaya",
    phone: "+90 312 468 3000",
    coordinates: { lat: 39.9115, lng: 32.8537 },
    rating: 4.3,
    workingHours: "09:00 - 18:00"
  },
  // Ankara - Gastroenterology
  {
    id: "16",
    name: "Ankara \xDCniversitesi T\u0131p Fak\xFCltesi - Gastroenteroloji",
    department: "Gastroenterology",
    address: "Cebeci Kamp\xFCs\xFC, Dikimevi",
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
    name: "Gazi \xDCniversitesi Hastanesi - N\xF6roloji",
    department: "Neurology",
    address: "Be\u015Fevler, \xC7ankaya",
    city: "Ankara",
    district: "\xC7ankaya",
    phone: "+90 312 202 5000",
    coordinates: { lat: 39.9299, lng: 32.8543 },
    rating: 4.4,
    workingHours: "24 Saat"
  },
  // Ankara - Psychiatry
  {
    id: "18",
    name: "Ankara Ruh Sa\u011Fl\u0131\u011F\u0131 Merkezi",
    department: "Psychiatry",
    address: "K\u0131z\u0131lay Meydan\u0131, \xC7ankaya",
    city: "Ankara",
    district: "\xC7ankaya",
    phone: "+90 312 418 2000",
    coordinates: { lat: 39.9208, lng: 32.8541 },
    rating: 4.2,
    workingHours: "09:00 - 19:00"
  },
  // Ankara - General Medicine
  {
    id: "19",
    name: "Hacettepe \xDCniversitesi Hastaneleri",
    department: "General Medicine",
    address: "S\u0131hhiye, Alt\u0131nda\u011F",
    city: "Ankara",
    district: "Alt\u0131nda\u011F",
    phone: "+90 312 305 1000",
    coordinates: { lat: 39.9334, lng: 32.8597 },
    rating: 4.7,
    workingHours: "24 Saat"
  },
  // Izmir - Cardiology
  {
    id: "20",
    name: "Ege \xDCniversitesi Hastanesi - Kardiyoloji",
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
    name: "Kent Hastanesi \u0130zmir - Kardiyoloji",
    department: "Cardiology",
    address: "\xC7i\u011Fli",
    city: "Izmir",
    district: "\xC7i\u011Fli",
    phone: "+90 232 386 8686",
    coordinates: { lat: 38.4989, lng: 27.0528 },
    rating: 4.6,
    workingHours: "24 Saat"
  },
  // Izmir - Dermatology
  {
    id: "22",
    name: "\u0130zmir Dermatoloji Merkezi",
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
    name: "Dokuz Eyl\xFCl \xDCniversitesi Hastanesi - Gastroenteroloji",
    department: "Gastroenterology",
    address: "\u0130nciralt\u0131, Bal\xE7ova",
    city: "Izmir",
    district: "Bal\xE7ova",
    phone: "+90 232 412 1212",
    coordinates: { lat: 38.3704, lng: 27.0525 },
    rating: 4.5,
    workingHours: "24 Saat"
  },
  // Izmir - Neurology
  {
    id: "24",
    name: "\u0130zmir Katip \xC7elebi \xDCniversitesi Atat\xFCrk EAH - N\xF6roloji",
    department: "Neurology",
    address: "Karaba\u011Flar",
    city: "Izmir",
    district: "Karaba\u011Flar",
    phone: "+90 232 243 4343",
    coordinates: { lat: 38.3913, lng: 27.0837 },
    rating: 4.3,
    workingHours: "24 Saat"
  },
  // Izmir - Psychiatry
  {
    id: "25",
    name: "\xD6zel Ege Psikiyatri Merkezi",
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
    name: "Bayrakl\u0131 Devlet Hastanesi",
    department: "General Medicine",
    address: "Bayrakl\u0131",
    city: "Izmir",
    district: "Bayrakl\u0131",
    phone: "+90 232 330 7000",
    coordinates: { lat: 38.4622, lng: 27.162 },
    rating: 4.1,
    workingHours: "24 Saat"
  }
];
var turkishCities = [
  "Istanbul",
  "Ankara",
  "Izmir",
  "Bursa",
  "Antalya"
];

// server/vercel-app.ts
import { z } from "zod";
var analyzeSymptomsSchema = z.object({
  symptoms: z.string().min(1, "Symptoms description is required")
});
var chatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(["user", "model"]),
    content: z.string().min(1)
  })),
  language: z.string().optional()
});
function registerRoutes(app) {
  app.post("/api/analyze-symptoms", async (req, res) => {
    try {
      const { symptoms } = analyzeSymptomsSchema.parse(req.body);
      const result = await analyzeSymptomsWithAI(symptoms);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request", details: error.errors });
      } else {
        console.error("Error analyzing symptoms:", error);
        res.status(500).json({
          error: "Failed to analyze symptoms. Please try again."
        });
      }
    }
  });
  app.get("/api/clinics", async (req, res) => {
    try {
      const { department, city } = req.query;
      let filteredClinics = turkishClinics;
      if (department) {
        filteredClinics = filteredClinics.filter(
          (clinic) => clinic.department === department
        );
      }
      if (city) {
        filteredClinics = filteredClinics.filter(
          (clinic) => clinic.city === city
        );
      }
      res.json(filteredClinics);
    } catch (error) {
      console.error("Error fetching clinics:", error);
      res.status(500).json({ error: "Failed to fetch clinics" });
    }
  });
  app.get("/api/cities", async (req, res) => {
    try {
      res.json(turkishCities);
    } catch (error) {
      console.error("Error fetching cities:", error);
      res.status(500).json({ error: "Failed to fetch cities" });
    }
  });
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, language = "en" } = chatSchema.parse(req.body);
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      const stream = chatWithAIStream(messages, language);
      for await (const chunk of stream) {
        res.write(`data: ${JSON.stringify({ chunk })}

`);
      }
      res.write(`data: ${JSON.stringify({ done: true })}

`);
      res.end();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request", details: error.errors });
      } else {
        console.error("Error in chat:", error);
        if (!res.headersSent) {
          res.status(500).json({
            error: "Failed to generate response. Please try again."
          });
        } else {
          res.write(`data: ${JSON.stringify({ error: "Failed to generate response" })}

`);
          res.end();
        }
      }
    }
  });
}
function createApp() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });
  return app;
}
export {
  createApp
};
