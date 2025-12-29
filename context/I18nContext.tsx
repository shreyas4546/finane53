import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'hi';
export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'INR';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  t: (key: string) => string;
  formatCurrency: (amount: number) => string;
  exchangeRate: number;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

// Mock Exchange Rates (Base USD)
const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  INR: 83.12,
};

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    'app.name': 'FinSight AI',
    'nav.login': 'Log In',
    'nav.demo': 'Launch Demo',
    'nav.audit': 'Audit Log',
    'hero.badge': 'v2.0 Model Live',
    'hero.title.1': 'Financial Clarity,',
    'hero.title.2': 'Powered by AI',
    'hero.subtitle': 'Stop manually auditing transactions. FinSight AI categorizes spending, detects fraud risks, and explains every decision in plain English.',
    'hero.cta.dashboard': 'Go to Dashboard',
    'hero.cta.docs': 'View Documentation',
    'feat.cat.title': 'Smart Categorization',
    'feat.cat.desc': 'Our FinBERT model understands merchant context to categorize with 99% accuracy.',
    'feat.risk.title': 'Anomaly Detection',
    'feat.risk.desc': 'Real-time risk scoring flags suspicious amounts and unknown vendors instantly.',
    'feat.explain.title': 'Explainable Insights',
    'feat.explain.desc': 'Click "Explain" on any transaction to see exactly why the AI made its decision.',
    'footer': '© 2024 FinSight AI. Built for the Future of Finance.',
    
    'dash.title': 'Transactions',
    'dash.subtitle': 'AI-analyzed financial records for October 2023',
    'filter.search': 'Search merchant or description...',
    'filter.label': 'Filters',
    'filter.cat.all': 'All Categories',
    'filter.amount.any': 'Any Amount',
    'filter.amount.under100': 'Under 100',
    'filter.amount.100to500': '100 - 500',
    'filter.amount.500to1000': '500 - 1,000',
    'filter.amount.over1000': 'Over 1,000',
    'filter.risk.all': 'All Risks',
    'filter.risk.low': 'Low Risk',
    'filter.risk.medium': 'Medium Risk',
    'filter.risk.high': 'High Risk',
    'filter.date.all': 'All Dates',
    'filter.date.7d': 'Last 7 Days',
    'filter.date.30d': 'Last 30 Days',

    'table.date': 'Date',
    'table.merchant': 'Merchant / Description',
    'table.category': 'Category (AI)',
    'table.amount': 'Amount',
    'table.risk': 'Risk',
    'table.confidence': 'Confidence',
    'table.actions': 'Actions',
    'table.no_results': 'No transactions found matching your criteria.',
    'action.details': 'Details',

    'bulk.selected': 'Selected',
    'bulk.recategorize': 'Re-categorize',
    'bulk.flag': 'Flag Suspicious',
    'bulk.review': 'Mark Reviewed',
    'bulk.cat.select': 'Select new category...',
    'bulk.close': 'Close',

    'modal.title': 'AI Analysis Report',
    'modal.model': 'Model',
    'modal.reasoning': 'Classification Reasoning',
    'modal.keywords': 'Detected Keywords',
    'modal.risk': 'Risk Assessment',
    'modal.norisk': 'No significant risk anomalies detected.',
    'modal.conf_label': 'Prediction Confidence',
    'modal.cat_label': 'Category',

    'audit.title': 'Audit Log & Traceability',
    'audit.empty': 'No actions recorded yet.',
    'audit.override': 'Manual Override',
  },
  es: {
    'app.name': 'FinSight AI',
    'nav.login': 'Iniciar Sesión',
    'nav.demo': 'Iniciar Demo',
    'nav.audit': 'Auditoría',
    'hero.badge': 'Modelo v2.0 En Vivo',
    'hero.title.1': 'Claridad Financiera,',
    'hero.title.2': 'Impulsada por IA',
    'hero.subtitle': 'Deje de auditar transacciones manualmente. FinSight AI categoriza gastos, detecta fraudes y explica cada decisión.',
    'hero.cta.dashboard': 'Ir al Panel',
    'hero.cta.docs': 'Ver Documentación',
    'feat.cat.title': 'Categorización Inteligente',
    'feat.cat.desc': 'Nuestro modelo FinBERT entiende el contexto para categorizar con 99% de precisión.',
    'feat.risk.title': 'Detección de Anomalías',
    'feat.risk.desc': 'Puntaje de riesgo en tiempo real marca montos sospechosos al instante.',
    'feat.explain.title': 'Insights Explicables',
    'feat.explain.desc': 'Haga clic en "Detalles" para ver exactamente por qué la IA tomó su decisión.',
    'footer': '© 2024 FinSight AI. Construido para el Futuro de las Finanzas.',

    'dash.title': 'Transacciones',
    'dash.subtitle': 'Registros financieros analizados por IA para Octubre 2023',
    'filter.search': 'Buscar comercio o descripción...',
    'filter.label': 'Filtros',
    'filter.cat.all': 'Todas las Categorías',
    'filter.amount.any': 'Cualquier Monto',
    'filter.amount.under100': 'Menos de 100',
    'filter.amount.100to500': '100 - 500',
    'filter.amount.500to1000': '500 - 1,000',
    'filter.amount.over1000': 'Más de 1,000',
    'filter.risk.all': 'Todos los Riesgos',
    'filter.risk.low': 'Riesgo Bajo',
    'filter.risk.medium': 'Riesgo Medio',
    'filter.risk.high': 'Riesgo Alto',
    'filter.date.all': 'Todas las Fechas',
    'filter.date.7d': 'Últimos 7 Días',
    'filter.date.30d': 'Últimos 30 Días',

    'table.date': 'Fecha',
    'table.merchant': 'Comercio / Descripción',
    'table.category': 'Categoría (IA)',
    'table.amount': 'Monto',
    'table.risk': 'Riesgo',
    'table.confidence': 'Confianza',
    'table.actions': 'Acciones',
    'table.no_results': 'No se encontraron transacciones.',
    'action.details': 'Detalles',

    'bulk.selected': 'Seleccionados',
    'bulk.recategorize': 'Recategorizar',
    'bulk.flag': 'Marcar Sospechoso',
    'bulk.review': 'Marcar Revisado',
    'bulk.cat.select': 'Seleccionar categoría...',
    'bulk.close': 'Cerrar',

    'modal.title': 'Reporte de Análisis IA',
    'modal.model': 'Modelo',
    'modal.reasoning': 'Razonamiento de Clasificación',
    'modal.keywords': 'Palabras Clave Detectadas',
    'modal.risk': 'Evaluación de Riesgo',
    'modal.norisk': 'No se detectaron anomalías significativas.',
    'modal.conf_label': 'Confianza de Predicción',
    'modal.cat_label': 'Categoría',

    'audit.title': 'Registro de Auditoría',
    'audit.empty': 'No hay acciones registradas aún.',
    'audit.override': 'Anulación Manual',
  },
  fr: {
    'app.name': 'FinSight AI',
    'nav.login': 'Connexion',
    'nav.demo': 'Lancer la Démo',
    'nav.audit': 'Journal d\'audit',
    'hero.badge': 'Modèle v2.0 En Ligne',
    'hero.title.1': 'Clarté Financière,',
    'hero.title.2': 'Propulsée par l\'IA',
    'hero.subtitle': 'Arrêtez d\'auditer manuellement. FinSight AI catégorise les dépenses, détecte les fraudes et explique chaque décision.',
    'hero.cta.dashboard': 'Aller au Tableau de Bord',
    'hero.cta.docs': 'Voir la Documentation',
    'feat.cat.title': 'Catégorisation Intelligente',
    'feat.cat.desc': 'Notre modèle FinBERT comprend le contexte pour catégoriser avec une précision de 99%.',
    'feat.risk.title': 'Détection d\'Anomalies',
    'feat.risk.desc': 'Le scoring de risque en temps réel signale instantanément les montants suspects.',
    'feat.explain.title': 'Insights Explicables',
    'feat.explain.desc': 'Cliquez sur "Détails" pour voir exactement pourquoi l\'IA a pris sa décision.',
    'footer': '© 2024 FinSight AI. Construit pour le Futur de la Finance.',

    'dash.title': 'Transactions',
    'dash.subtitle': 'Dossiers financiers analysés par IA pour Octobre 2023',
    'filter.search': 'Rechercher un marchand ou une description...',
    'filter.label': 'Filtres',
    'filter.cat.all': 'Toutes Catégories',
    'filter.amount.any': 'Tout Montant',
    'filter.amount.under100': 'Moins de 100',
    'filter.amount.100to500': '100 - 500',
    'filter.amount.500to1000': '500 - 1 000',
    'filter.amount.over1000': 'Plus de 1 000',
    'filter.risk.all': 'Tous Risques',
    'filter.risk.low': 'Risque Faible',
    'filter.risk.medium': 'Risque Moyen',
    'filter.risk.high': 'Risque Élevé',
    'filter.date.all': 'Toutes Dates',
    'filter.date.7d': '7 Derniers Jours',
    'filter.date.30d': '30 Derniers Jours',

    'table.date': 'Date',
    'table.merchant': 'Marchand / Description',
    'table.category': 'Catégorie (IA)',
    'table.amount': 'Montant',
    'table.risk': 'Risque',
    'table.confidence': 'Confiance',
    'table.actions': 'Actions',
    'table.no_results': 'Aucune transaction trouvée.',
    'action.details': 'Détails',

    'bulk.selected': 'Sélectionné',
    'bulk.recategorize': 'Recatégoriser',
    'bulk.flag': 'Signaler',
    'bulk.review': 'Marquer Revu',
    'bulk.cat.select': 'Choisir catégorie...',
    'bulk.close': 'Fermer',

    'modal.title': 'Rapport d\'Analyse IA',
    'modal.model': 'Modèle',
    'modal.reasoning': 'Raisonnement de Classification',
    'modal.keywords': 'Mots-clés Détectés',
    'modal.risk': 'Évaluation des Risques',
    'modal.norisk': 'Aucune anomalie de risque significative détectée.',
    'modal.conf_label': 'Confiance de Prédiction',
    'modal.cat_label': 'Catégorie',

    'audit.title': 'Journal d\'Audit',
    'audit.empty': 'Aucune action enregistrée.',
    'audit.override': 'Modification Manuelle',
  },
  de: {
    'app.name': 'FinSight AI',
    'nav.login': 'Anmelden',
    'nav.demo': 'Demo Starten',
    'nav.audit': 'Audit-Protokoll',
    'hero.badge': 'v2.0 Modell Live',
    'hero.title.1': 'Finanzielle Klarheit,',
    'hero.title.2': 'Unterstützt durch KI',
    'hero.subtitle': 'Stoppen Sie manuelle Prüfungen. FinSight AI kategorisiert Ausgaben, erkennt Betrugsrisiken und erklärt jede Entscheidung.',
    'hero.cta.dashboard': 'Zum Dashboard',
    'hero.cta.docs': 'Dokumentation',
    'feat.cat.title': 'Intelligente Kategorisierung',
    'feat.cat.desc': 'Unser FinBERT-Modell versteht den Kontext, um mit 99% Genauigkeit zu kategorisieren.',
    'feat.risk.title': 'Anomalieerkennung',
    'feat.risk.desc': 'Echtzeit-Risikobewertung markiert verdächtige Beträge sofort.',
    'feat.explain.title': 'Erklärbare Einblicke',
    'feat.explain.desc': 'Klicken Sie auf "Details", um genau zu sehen, warum die KI entschieden hat.',
    'footer': '© 2024 FinSight AI. Gebaut für die Zukunft der Finanzen.',

    'dash.title': 'Transaktionen',
    'dash.subtitle': 'KI-analysierte Finanzdaten für Oktober 2023',
    'filter.search': 'Händler oder Beschreibung suchen...',
    'filter.label': 'Filter',
    'filter.cat.all': 'Alle Kategorien',
    'filter.amount.any': 'Jeder Betrag',
    'filter.amount.under100': 'Unter 100',
    'filter.amount.100to500': '100 - 500',
    'filter.amount.500to1000': '500 - 1.000',
    'filter.amount.over1000': 'Über 1.000',
    'filter.risk.all': 'Alle Risiken',
    'filter.risk.low': 'Geringes Risiko',
    'filter.risk.medium': 'Mittleres Risiko',
    'filter.risk.high': 'Hohes Risiko',
    'filter.date.all': 'Alle Daten',
    'filter.date.7d': 'Letzte 7 Tage',
    'filter.date.30d': 'Letzte 30 Tage',

    'table.date': 'Datum',
    'table.merchant': 'Händler / Beschreibung',
    'table.category': 'Kategorie (KI)',
    'table.amount': 'Betrag',
    'table.risk': 'Risiko',
    'table.confidence': 'Konfidenz',
    'table.actions': 'Aktionen',
    'table.no_results': 'Keine Transaktionen gefunden.',
    'action.details': 'Details',

    'bulk.selected': 'Ausgewählt',
    'bulk.recategorize': 'Neu kategorisieren',
    'bulk.flag': 'Als verdächtig markieren',
    'bulk.review': 'Als geprüft markieren',
    'bulk.cat.select': 'Neue Kategorie...',
    'bulk.close': 'Schließen',

    'modal.title': 'KI-Analysebericht',
    'modal.model': 'Modell',
    'modal.reasoning': 'Klassifizierungsbegründung',
    'modal.keywords': 'Erkannte Schlüsselwörter',
    'modal.risk': 'Risikobewertung',
    'modal.norisk': 'Keine signifikanten Risikoanomalien erkannt.',
    'modal.conf_label': 'Vorhersagekonfidenz',
    'modal.cat_label': 'Kategorie',

    'audit.title': 'Audit-Protokoll & Nachverfolgbarkeit',
    'audit.empty': 'Noch keine Aktionen aufgezeichnet.',
    'audit.override': 'Manuelle Überschreibung',
  },
  hi: {
    'app.name': 'FinSight AI',
    'nav.login': 'लॉग इन',
    'nav.demo': 'डेमो शुरू करें',
    'nav.audit': 'ऑडिट लॉग',
    'hero.badge': 'v2.0 मॉडल लाइव',
    'hero.title.1': 'वित्तीय स्पष्टता,',
    'hero.title.2': 'AI द्वारा संचालित',
    'hero.subtitle': 'मैन्युअल रूप से लेनदेन का ऑडिट करना बंद करें। FinSight AI खर्च को वर्गीकृत करता है, धोखाधड़ी के जोखिमों का पता लगाता है, और प्रत्येक निर्णय को सरल भाषा में समझाता है।',
    'hero.cta.dashboard': 'डैशबोर्ड पर जाएं',
    'hero.cta.docs': 'दस्तावेज़ देखें',
    'feat.cat.title': 'स्मार्ट वर्गीकरण',
    'feat.cat.desc': 'हमारा FinBERT मॉडल मर्चेंट संदर्भ को समझकर 99% सटीकता के साथ वर्गीकृत करता है।',
    'feat.risk.title': 'विसंगति का पता लगाना',
    'feat.risk.desc': 'वास्तविक समय का जोखिम स्कोरिंग संदिग्ध मात्रा और अज्ञात विक्रेताओं को तुरंत फ्लैग करता है।',
    'feat.explain.title': 'व्याख्या योग्य अंतर्दृष्टि',
    'feat.explain.desc': 'AI ने अपना निर्णय क्यों लिया, यह देखने के लिए किसी भी लेनदेन पर "विवरण" पर क्लिक करें।',
    'footer': '© 2024 FinSight AI. वित्त के भविष्य के लिए निर्मित।',
    
    'dash.title': 'लेनदेन',
    'dash.subtitle': 'अक्टूबर 2023 के लिए AI-विश्लेषित वित्तीय रिकॉर्ड',
    'filter.search': 'मर्चेंट या विवरण खोजें...',
    'filter.label': 'फिल्टर',
    'filter.cat.all': 'सभी श्रेणियां',
    'filter.amount.any': 'कोई भी राशि',
    'filter.amount.under100': '100 से कम',
    'filter.amount.100to500': '100 - 500',
    'filter.amount.500to1000': '500 - 1,000',
    'filter.amount.over1000': '1,000 से अधिक',
    'filter.risk.all': 'सभी जोखिम',
    'filter.risk.low': 'कम जोखिम',
    'filter.risk.medium': 'मध्यम जोखिम',
    'filter.risk.high': 'उच्च जोखिम',
    'filter.date.all': 'सभी तिथियां',
    'filter.date.7d': 'पिछले 7 दिन',
    'filter.date.30d': 'पिछले 30 दिन',

    'table.date': 'दिनांक',
    'table.merchant': 'मर्चेंट / विवरण',
    'table.category': 'श्रेणी (AI)',
    'table.amount': 'राशि',
    'table.risk': 'जोखिम',
    'table.confidence': 'विश्वास',
    'table.actions': 'कार्रवाई',
    'table.no_results': 'आपके मानदंडों से मेल खाने वाला कोई लेनदेन नहीं मिला।',
    'action.details': 'विवरण',

    'bulk.selected': 'चयनित',
    'bulk.recategorize': 'पुनः वर्गीकृत करें',
    'bulk.flag': 'संदिग्ध चिह्नित करें',
    'bulk.review': 'समीक्षित चिह्नित करें',
    'bulk.cat.select': 'नई श्रेणी चुनें...',
    'bulk.close': 'बंद करें',

    'modal.title': 'AI विश्लेषण रिपोर्ट',
    'modal.model': 'मॉडल',
    'modal.reasoning': 'वर्गीकरण तर्क',
    'modal.keywords': 'पता लगाए गए कीवर्ड',
    'modal.risk': 'जोखिम मूल्यांकन',
    'modal.norisk': 'कोई महत्वपूर्ण जोखिम विसंगति नहीं पाई गई।',
    'modal.conf_label': 'भविष्यवाणी विश्वास',
    'modal.cat_label': 'श्रेणी',

    'audit.title': 'ऑडिट लॉग और पता लगाने की क्षमता',
    'audit.empty': 'अभी तक कोई कार्रवाई दर्ज नहीं की गई।',
    'audit.override': 'मैन्युअल ओवरराइड',
  }
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD');

  // Load preferences
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    const savedCurr = localStorage.getItem('currency') as Currency;
    if (savedLang && TRANSLATIONS[savedLang]) setLanguage(savedLang);
    if (savedCurr && EXCHANGE_RATES[savedCurr]) setCurrency(savedCurr);
  }, []);

  // Save preferences
  useEffect(() => {
    localStorage.setItem('language', language);
    localStorage.setItem('currency', currency);
  }, [language, currency]);

  const t = (key: string): string => {
    return TRANSLATIONS[language][key] || key;
  };

  const exchangeRate = EXCHANGE_RATES[currency];

  const formatCurrency = (amountUSD: number): string => {
    const rate = exchangeRate;
    const converted = amountUSD * rate;
    
    // Handle locale formatting specifically for Hindi to use 'en-IN' or 'hi-IN' numbering system if preferred,
    // but Intl.NumberFormat usually handles 'hi' locale with Indian numbering system.
    const locale = language === 'en' ? 'en-US' : (language === 'hi' ? 'hi-IN' : language);
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(converted);
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, currency, setCurrency, t, formatCurrency, exchangeRate }}>
      {children}
    </I18nContext.Provider>
  );
};