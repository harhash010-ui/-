import React, { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Home, PlusCircle, PieChart as PieIcon, Target, Settings, ArrowLeft, ArrowRight, Trash2, Check, Globe, DollarSign, Moon, Bell, Fingerprint, Cloud, Download, HelpCircle, ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Utensils, ShoppingBag, Car, Receipt, Briefcase, Gift, Heart, Coffee, Plane, Smartphone, Sparkles, X, Plus } from 'lucide-react';

// ============== TRANSLATIONS ==============
const T = {
  ar: {
    appName: 'أموالي', tagline: 'إدارة أموالك بأناقة',
    welcome: 'أهلاً بك في', chooseLanguage: 'اختر لغتك', continue: 'متابعة',
    goodMorning: 'صباح الخير', goodEvening: 'مساء الخير', yourName: 'اسمك',
    totalBalance: 'الرصيد الإجمالي', monthIncome: 'الدخل هذا الشهر', monthExpenses: 'المصروفات',
    quickAdd: 'إضافة', quickTransfer: 'تحويل', quickGoals: 'أهداف', quickBills: 'فواتير',
    recentTx: 'آخر المعاملات', viewAll: 'الكل', noTx: 'لا توجد معاملات بعد',
    noTxHint: 'اضغط + لإضافة أول معاملة',
    home: 'الرئيسية', transactions: 'المعاملات', analytics: 'التحليل', goals: 'الأهداف', settings: 'الإعدادات',
    newTx: 'معاملة جديدة', income: 'دخل', expense: 'مصروف', amount: 'المبلغ', category: 'الفئة',
    note: 'ملاحظة (اختياري)', save: 'حفظ', cancel: 'إلغاء',
    food: 'طعام', shopping: 'تسوق', transport: 'نقل', bills: 'فواتير',
    salary: 'راتب', gift: 'هدية', health: 'صحة', coffee: 'قهوة', travel: 'سفر', tech: 'تقنية', other: 'أخرى',
    financialAnalysis: 'التحليل المالي', overview: 'نظرة شاملة على نشاطك',
    week: 'أسبوع', month: 'شهر', year: 'سنة',
    smartInsight: 'رؤية ذكية',
    insightMsg: 'تتبّع مصروفاتك بانتظام يساعدك على تحسين عاداتك المالية بشكل ملحوظ.',
    mainGoal: 'الهدف الرئيسي', myGoals: 'أهدافي', activeGoals: 'أهداف نشطة',
    goalTitle: 'اسم الهدف', targetAmount: 'المبلغ المستهدف', savedSoFar: 'المدخر حالياً',
    addGoal: 'إضافة هدف', newGoal: 'هدف جديد', deleteGoal: 'حذف الهدف',
    saved: 'تم ادخار', remaining: 'المتبقي', progress: 'الإنجاز',
    completed: 'مكتمل', percent: '%',
    language: 'اللغة', currency: 'العملة', darkMode: 'الوضع الداكن',
    notifications: 'الإشعارات', biometric: 'بصمة الإصبع', backup: 'النسخ الاحتياطي',
    exportData: 'تصدير البيانات', help: 'المساعدة والدعم',
    yourProfile: 'ملفك الشخصي', edit: 'تعديل',
    resetAll: 'مسح جميع البيانات', resetConfirm: 'هل أنت متأكد؟ سيتم حذف كل شيء.',
    today: 'اليوم', yesterday: 'أمس', noGoals: 'لا توجد أهداف بعد',
    noGoalsHint: 'أضف هدف ادخار أول لتبدأ رحلتك', 
    addFirstGoal: 'أضف هدفك الأول',
    requiredField: 'حقل مطلوب', addFunds: 'إضافة مبلغ',
    typeAmount: 'أدخل المبلغ', optional: 'اختياري', addToGoal: 'إضافة للهدف',
    byCategory: 'حسب الفئة', topCategory: 'الفئة الأعلى', noData: 'لا توجد بيانات',
    noDataHint: 'ابدأ بإضافة معاملاتك لرؤية التحليل',
    selectCategory: 'اختر فئة', iKnow: 'فهمت',
    deleteTxConfirm: 'حذف هذه المعاملة؟', delete: 'حذف',
  },
  en: {
    appName: 'Amwali', tagline: 'Manage your money elegantly',
    welcome: 'Welcome to', chooseLanguage: 'Choose your language', continue: 'Continue',
    goodMorning: 'Good morning', goodEvening: 'Good evening', yourName: 'Your Name',
    totalBalance: 'Total Balance', monthIncome: 'Income this month', monthExpenses: 'Expenses',
    quickAdd: 'Add', quickTransfer: 'Transfer', quickGoals: 'Goals', quickBills: 'Bills',
    recentTx: 'Recent Transactions', viewAll: 'View All', noTx: 'No transactions yet',
    noTxHint: 'Tap + to add your first transaction',
    home: 'Home', transactions: 'Transactions', analytics: 'Analytics', goals: 'Goals', settings: 'Settings',
    newTx: 'New Transaction', income: 'Income', expense: 'Expense', amount: 'Amount', category: 'Category',
    note: 'Note (optional)', save: 'Save', cancel: 'Cancel',
    food: 'Food', shopping: 'Shopping', transport: 'Transport', bills: 'Bills',
    salary: 'Salary', gift: 'Gift', health: 'Health', coffee: 'Coffee', travel: 'Travel', tech: 'Tech', other: 'Other',
    financialAnalysis: 'Financial Analysis', overview: 'Overview of your activity',
    week: 'Week', month: 'Month', year: 'Year',
    smartInsight: 'Smart Insight',
    insightMsg: 'Tracking your expenses regularly helps you noticeably improve your financial habits.',
    mainGoal: 'Main Goal', myGoals: 'My Goals', activeGoals: 'active goals',
    goalTitle: 'Goal Title', targetAmount: 'Target Amount', savedSoFar: 'Saved So Far',
    addGoal: 'Add Goal', newGoal: 'New Goal', deleteGoal: 'Delete Goal',
    saved: 'Saved', remaining: 'Remaining', progress: 'Progress',
    completed: 'Completed', percent: '%',
    language: 'Language', currency: 'Currency', darkMode: 'Dark Mode',
    notifications: 'Notifications', biometric: 'Biometric Lock', backup: 'Cloud Backup',
    exportData: 'Export Data', help: 'Help & Support',
    yourProfile: 'Your Profile', edit: 'Edit',
    resetAll: 'Reset All Data', resetConfirm: 'Are you sure? Everything will be deleted.',
    today: 'Today', yesterday: 'Yesterday', noGoals: 'No goals yet',
    noGoalsHint: 'Add your first savings goal to start your journey',
    addFirstGoal: 'Add Your First Goal',
    requiredField: 'Required', addFunds: 'Add Funds',
    typeAmount: 'Enter amount', optional: 'Optional', addToGoal: 'Add to Goal',
    byCategory: 'By Category', topCategory: 'Top Category', noData: 'No data',
    noDataHint: 'Start adding transactions to see analytics',
    selectCategory: 'Select category', iKnow: 'Got it',
    deleteTxConfirm: 'Delete this transaction?', delete: 'Delete',
  },
  fr: {
    appName: 'Amwali', tagline: 'Gérez votre argent avec élégance',
    welcome: 'Bienvenue sur', chooseLanguage: 'Choisissez votre langue', continue: 'Continuer',
    goodMorning: 'Bonjour', goodEvening: 'Bonsoir', yourName: 'Votre nom',
    totalBalance: 'Solde Total', monthIncome: 'Revenus ce mois', monthExpenses: 'Dépenses',
    quickAdd: 'Ajouter', quickTransfer: 'Transfert', quickGoals: 'Objectifs', quickBills: 'Factures',
    recentTx: 'Transactions Récentes', viewAll: 'Tout voir', noTx: 'Aucune transaction',
    noTxHint: 'Appuyez sur + pour ajouter',
    home: 'Accueil', transactions: 'Transactions', analytics: 'Analyse', goals: 'Objectifs', settings: 'Paramètres',
    newTx: 'Nouvelle Transaction', income: 'Revenu', expense: 'Dépense', amount: 'Montant', category: 'Catégorie',
    note: 'Note (optionnel)', save: 'Enregistrer', cancel: 'Annuler',
    food: 'Nourriture', shopping: 'Shopping', transport: 'Transport', bills: 'Factures',
    salary: 'Salaire', gift: 'Cadeau', health: 'Santé', coffee: 'Café', travel: 'Voyage', tech: 'Tech', other: 'Autre',
    financialAnalysis: 'Analyse Financière', overview: 'Aperçu de votre activité',
    week: 'Semaine', month: 'Mois', year: 'Année',
    smartInsight: 'Aperçu Intelligent',
    insightMsg: 'Suivre régulièrement vos dépenses améliore vos habitudes financières.',
    mainGoal: 'Objectif Principal', myGoals: 'Mes Objectifs', activeGoals: 'objectifs actifs',
    goalTitle: "Nom de l'objectif", targetAmount: 'Montant cible', savedSoFar: 'Économisé',
    addGoal: 'Ajouter', newGoal: 'Nouvel Objectif', deleteGoal: 'Supprimer',
    saved: 'Économisé', remaining: 'Restant', progress: 'Progrès',
    completed: 'Terminé', percent: '%',
    language: 'Langue', currency: 'Devise', darkMode: 'Mode Sombre',
    notifications: 'Notifications', biometric: 'Empreinte', backup: 'Sauvegarde',
    exportData: 'Exporter', help: 'Aide',
    yourProfile: 'Votre Profil', edit: 'Modifier',
    resetAll: 'Tout effacer', resetConfirm: 'Êtes-vous sûr?',
    today: "Aujourd'hui", yesterday: 'Hier', noGoals: 'Aucun objectif',
    noGoalsHint: 'Ajoutez votre premier objectif',
    addFirstGoal: 'Premier Objectif',
    requiredField: 'Requis', addFunds: 'Ajouter',
    typeAmount: 'Entrez le montant', optional: 'Optionnel', addToGoal: "Ajouter à l'objectif",
    byCategory: 'Par Catégorie', topCategory: 'Top', noData: 'Aucune donnée',
    noDataHint: 'Commencez à ajouter des transactions',
    selectCategory: 'Sélectionner', iKnow: 'Compris',
    deleteTxConfirm: 'Supprimer?', delete: 'Supprimer',
  }
};

// ============== CATEGORIES ==============
const CATEGORIES = {
  food:     { icon: Utensils,   color: '#e08074', bg: 'rgba(184,85,77,.12)' },
  shopping: { icon: ShoppingBag, color: '#9aabd8', bg: 'rgba(111,140,200,.12)' },
  transport:{ icon: Car,        color: '#b8a86a', bg: 'rgba(214,178,106,.12)' },
  bills:    { icon: Receipt,    color: '#d6b26a', bg: 'rgba(214,178,106,.15)' },
  salary:   { icon: Briefcase,  color: '#6fa884', bg: 'rgba(111,168,132,.12)' },
  gift:     { icon: Gift,       color: '#c87aa8', bg: 'rgba(200,122,168,.12)' },
  health:   { icon: Heart,      color: '#e08074', bg: 'rgba(184,85,77,.12)' },
  coffee:   { icon: Coffee,     color: '#b89a7a', bg: 'rgba(184,154,122,.12)' },
  travel:   { icon: Plane,      color: '#9aabd8', bg: 'rgba(111,140,200,.12)' },
  tech:     { icon: Smartphone, color: '#7ec5d6', bg: 'rgba(126,197,214,.12)' },
  other:    { icon: Sparkles,   color: '#8b8a78', bg: 'rgba(139,138,120,.12)' },
};

const INCOME_CATS = ['salary', 'gift', 'other'];
const EXPENSE_CATS = ['food', 'shopping', 'transport', 'bills', 'health', 'coffee', 'travel', 'tech', 'other'];

const CURRENCIES = {
  SAR: { ar: 'ر.س', en: 'SAR', fr: 'SAR' },
  USD: { ar: '$', en: '$', fr: '$' },
  EUR: { ar: '€', en: '€', fr: '€' },
  AED: { ar: 'د.إ', en: 'AED', fr: 'AED' },
  EGP: { ar: 'ج.م', en: 'EGP', fr: 'EGP' },
};

const LANGUAGES = [
  { code: 'ar', name: 'العربية', english: 'Arabic', rtl: true },
  { code: 'en', name: 'English', english: 'English', rtl: false },
  { code: 'fr', name: 'Français', english: 'French', rtl: false },
];

// ============== HELPERS ==============
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

const fmtNum = (n) => Math.round(n).toLocaleString('en-US');

const fmtDate = (dateStr, lang, t) => {
  const d = new Date(dateStr);
  const now = new Date();
  const yesterday = new Date(now); yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === now.toDateString()) return t.today;
  if (d.toDateString() === yesterday.toDateString()) return t.yesterday;
  return d.toLocaleDateString(lang === 'ar' ? 'ar-EG' : lang, { day: 'numeric', month: 'short' });
};

const safeStorage = {
  async get(key) {
    try { return await window.storage.get(key); } catch (e) { return null; }
  },
  async set(key, val) {
    try { return await window.storage.set(key, val); } catch (e) { return null; }
  },
  async delete(key) {
    try { return await window.storage.delete(key); } catch (e) { return null; }
  }
};

// ============== MAIN APP ==============
export default function App() {
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [screen, setScreen] = useState('home');
  const [lang, setLang] = useState('ar');
  const [currency, setCurrency] = useState('SAR');
  const [userName, setUserName] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [toggles, setToggles] = useState({ dark: true, notif: true, bio: false, backup: false });

  const t = T[lang];
  const isRTL = LANGUAGES.find(l => l.code === lang)?.rtl;
  const currencySymbol = CURRENCIES[currency][lang] || CURRENCIES[currency].en;

  // Load on mount
  useEffect(() => {
    (async () => {
      const sRes = await safeStorage.get('amwali:settings');
      if (sRes) {
        try {
          const s = JSON.parse(sRes.value);
          if (s.lang) setLang(s.lang);
          if (s.currency) setCurrency(s.currency);
          if (s.userName) setUserName(s.userName);
          if (s.toggles) setToggles(s.toggles);
          if (s.onboarded) setShowWelcome(false);
          else setShowWelcome(true);
        } catch (e) { setShowWelcome(true); }
      } else {
        setShowWelcome(true);
      }

      const txRes = await safeStorage.get('amwali:transactions');
      if (txRes) { try { setTransactions(JSON.parse(txRes.value)); } catch (e) {} }

      const gRes = await safeStorage.get('amwali:goals');
      if (gRes) { try { setGoals(JSON.parse(gRes.value)); } catch (e) {} }

      setLoading(false);
    })();
  }, []);

  // Save settings
  useEffect(() => {
    if (loading) return;
    safeStorage.set('amwali:settings', JSON.stringify({
      lang, currency, userName, toggles, onboarded: !showWelcome
    }));
  }, [lang, currency, userName, toggles, showWelcome, loading]);

  // Save transactions
  useEffect(() => {
    if (loading) return;
    safeStorage.set('amwali:transactions', JSON.stringify(transactions));
  }, [transactions, loading]);

  // Save goals
  useEffect(() => {
    if (loading) return;
    safeStorage.set('amwali:goals', JSON.stringify(goals));
  }, [goals, loading]);

  // Computed stats
  const stats = useMemo(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthTx = transactions.filter(tx => new Date(tx.date) >= monthStart);
    const income = monthTx.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = monthTx.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const balance = totalIncome - totalExpense;
    return { income, expense, balance, monthTx };
  }, [transactions]);

  // Font loader
  useEffect(() => {
    if (document.getElementById('amwali-fonts')) return;
    const link = document.createElement('link');
    link.id = 'amwali-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&family=Reem+Kufi:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
  }, []);

  const addTx = (tx) => setTransactions(prev => [{ ...tx, id: uid(), date: new Date().toISOString() }, ...prev]);
  const deleteTx = (id) => setTransactions(prev => prev.filter(t => t.id !== id));
  const addGoal = (g) => setGoals(prev => [...prev, { ...g, id: uid(), createdAt: new Date().toISOString() }]);
  const updateGoal = (id, updates) => setGoals(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
  const deleteGoal = (id) => setGoals(prev => prev.filter(g => g.id !== id));
  const resetAll = async () => {
    await safeStorage.delete('amwali:transactions');
    await safeStorage.delete('amwali:goals');
    await safeStorage.delete('amwali:settings');
    setTransactions([]); setGoals([]); setUserName(''); setShowWelcome(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0b10', fontFamily: 'Tajawal, system-ui' }}>
        <div className="text-3xl font-bold" style={{ color: '#d6b26a', fontFamily: 'Reem Kufi' }}>أموالي</div>
      </div>
    );
  }

  const commonProps = { t, lang, isRTL, currencySymbol, currency, userName, setUserName };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} lang={lang}
      style={{
        minHeight: '100vh',
        fontFamily: isRTL ? 'Tajawal, system-ui' : 'system-ui, sans-serif',
        background: 'radial-gradient(1200px 600px at 85% -10%, rgba(214,178,106,.06), transparent 60%), radial-gradient(900px 500px at 10% 100%, rgba(74,122,94,.04), transparent 55%), #0a0b10',
        color: '#ecead8'
      }}>
      <div className="mx-auto relative" style={{ maxWidth: '440px', minHeight: '100vh', background: 'linear-gradient(180deg, #11131c, #0a0b10)', boxShadow: '0 0 80px rgba(0,0,0,.5)' }}>

        {showWelcome ? (
          <WelcomeScreen {...commonProps}
            onComplete={(name, langCode, curr) => {
              setUserName(name);
              setLang(langCode);
              setCurrency(curr);
              setShowWelcome(false);
            }}
          />
        ) : (
          <>
            <div className="pb-24">
              {screen === 'home' && <HomeScreen {...commonProps} stats={stats} transactions={transactions} onNav={setScreen} onDelete={deleteTx} />}
              {screen === 'add' && <AddScreen {...commonProps} onSave={(tx) => { addTx(tx); setScreen('home'); }} onCancel={() => setScreen('home')} />}
              {screen === 'analytics' && <AnalyticsScreen {...commonProps} transactions={transactions} stats={stats} />}
              {screen === 'goals' && <GoalsScreen {...commonProps} goals={goals} onAdd={addGoal} onUpdate={updateGoal} onDelete={deleteGoal} />}
              {screen === 'settings' && <SettingsScreen {...commonProps} setLang={setLang} setCurrency={setCurrency} toggles={toggles} setToggles={setToggles} onReset={resetAll} />}
            </div>
            <BottomNav t={t} current={screen} onChange={setScreen} />
          </>
        )}
      </div>
    </div>
  );
}

// ============== WELCOME SCREEN ==============
function WelcomeScreen({ t, lang, isRTL, onComplete }) {
  const [step, setStep] = useState(1);
  const [selectedLang, setSelectedLang] = useState(lang);
  const [name, setName] = useState('');
  const [curr, setCurr] = useState('SAR');
  const currentT = T[selectedLang];
  const currentRTL = LANGUAGES.find(l => l.code === selectedLang)?.rtl;

  return (
    <div dir={currentRTL ? 'rtl' : 'ltr'} className="min-h-screen p-6 pt-12 flex flex-col" style={{
      background: 'radial-gradient(600px 400px at 50% 0%, rgba(214,178,106,.15), transparent 60%), radial-gradient(400px 400px at 50% 100%, rgba(74,122,94,.1), transparent 60%), #11131c'
    }}>
      <div className="mx-auto mb-8 mt-12 relative" style={{
        width: '110px', height: '110px', borderRadius: '30px',
        background: 'linear-gradient(135deg, #d6b26a, #8a6f3d)',
        display: 'grid', placeItems: 'center',
        boxShadow: '0 20px 60px -20px rgba(214,178,106,.6)',
      }}>
        <span style={{ fontFamily: 'Reem Kufi', fontSize: '48px', fontWeight: 700, color: '#1a1405' }}>أ</span>
        <div className="absolute" style={{ inset: '-10px', borderRadius: '36px', border: '1px solid rgba(214,178,106,.3)', animation: 'pulse 3s ease-in-out infinite' }}></div>
      </div>

      <h1 className="text-3xl text-center mb-2" style={{ fontFamily: 'Reem Kufi', fontWeight: 600 }}>
        {currentT.welcome} <span style={{ color: '#d6b26a' }}>{currentT.appName}</span>
      </h1>
      <p className="text-center mb-10" style={{ color: '#8b8a78', fontSize: '14px' }}>{currentT.tagline}</p>

      {step === 1 && (
        <>
          <p className="text-xs text-center mb-4 uppercase tracking-widest" style={{ color: '#d6b26a', fontWeight: 600 }}>
            {currentT.chooseLanguage}
          </p>
          <div className="grid grid-cols-1 gap-2 mb-6">
            {LANGUAGES.map(l => (
              <button key={l.code} onClick={() => setSelectedLang(l.code)}
                className="flex items-center justify-between p-4 rounded-2xl transition-all"
                style={{
                  border: selectedLang === l.code ? '1px solid #d6b26a' : '1px solid rgba(236,234,216,.14)',
                  background: selectedLang === l.code ? 'linear-gradient(135deg, rgba(214,178,106,.15), rgba(214,178,106,.05))' : 'rgba(236,234,216,.03)',
                  color: '#ecead8',
                }}>
                <div className={currentRTL ? 'text-right' : 'text-left'}>
                  <div style={{ fontWeight: 500, fontSize: '15px' }}>{l.name}</div>
                  <div style={{ fontSize: '11px', color: '#8b8a78', direction: 'ltr' }}>{l.english}</div>
                </div>
                {selectedLang === l.code && (
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#d6b26a', display: 'grid', placeItems: 'center' }}>
                    <Check size={14} color="#1a1405" strokeWidth={3} />
                  </div>
                )}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="w-full mt-auto py-4 rounded-2xl font-bold"
            style={{ background: 'linear-gradient(135deg, #d6b26a, #8a6f3d)', color: '#1a1405', fontSize: '15px', boxShadow: '0 10px 30px -10px rgba(214,178,106,.6)', fontFamily: currentRTL ? 'Tajawal' : 'inherit' }}>
            {currentT.continue} {currentRTL ? '←' : '→'}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <p className="text-xs text-center mb-4 uppercase tracking-widest" style={{ color: '#d6b26a', fontWeight: 600 }}>
            {currentT.yourName}
          </p>
          <input value={name} onChange={e => setName(e.target.value)}
            placeholder={currentT.yourName}
            className="w-full p-4 rounded-2xl mb-6 text-center"
            style={{ background: 'rgba(236,234,216,.05)', border: '1px solid rgba(236,234,216,.14)', color: '#ecead8', fontSize: '16px', fontFamily: 'inherit', outline: 'none' }}
          />

          <p className="text-xs text-center mb-4 uppercase tracking-widest" style={{ color: '#d6b26a', fontWeight: 600 }}>
            {currentT.currency}
          </p>
          <div className="grid grid-cols-5 gap-2 mb-6">
            {Object.keys(CURRENCIES).map(code => (
              <button key={code} onClick={() => setCurr(code)}
                className="py-3 rounded-xl"
                style={{
                  border: curr === code ? '1px solid #d6b26a' : '1px solid rgba(236,234,216,.14)',
                  background: curr === code ? 'rgba(214,178,106,.15)' : 'rgba(236,234,216,.03)',
                  color: curr === code ? '#d6b26a' : '#ecead8',
                  fontSize: '12px', fontWeight: 600
                }}>
                {code}
              </button>
            ))}
          </div>

          <button onClick={() => name.trim() && onComplete(name.trim(), selectedLang, curr)}
            disabled={!name.trim()}
            className="w-full mt-auto py-4 rounded-2xl font-bold disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg, #d6b26a, #8a6f3d)', color: '#1a1405', fontSize: '15px', boxShadow: '0 10px 30px -10px rgba(214,178,106,.6)', fontFamily: currentRTL ? 'Tajawal' : 'inherit' }}>
            {currentT.continue} {currentRTL ? '←' : '→'}
          </button>
        </>
      )}

      <style>{`@keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.08);opacity:.5}}`}</style>
    </div>
  );
}

// ============== HOME SCREEN ==============
function HomeScreen({ t, lang, isRTL, userName, currencySymbol, stats, transactions, onNav, onDelete }) {
  const [delConfirm, setDelConfirm] = useState(null);
  const hour = new Date().getHours();
  const greeting = hour < 17 ? t.goodMorning : t.goodEvening;
  const recent = transactions.slice(0, 6);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between p-6 pt-12">
        <div>
          <div style={{ fontSize: '13px', color: '#8b8a78' }}>{greeting} ✨</div>
          <h2 style={{ fontFamily: 'Reem Kufi', fontSize: '19px', fontWeight: 500, marginTop: '2px' }}>{userName || '—'}</h2>
        </div>
        <button onClick={() => onNav('settings')}
          style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg, #2a2d3e, #1a1c28)', display: 'grid', placeItems: 'center', border: '1px solid rgba(236,234,216,.14)', fontFamily: 'Reem Kufi', color: '#d6b26a', fontWeight: 600 }}>
          {(userName || 'A')[0].toUpperCase()}
        </button>
      </div>

      {/* Balance Card */}
      <div className="mx-5 mb-6 p-6 rounded-3xl relative overflow-hidden" style={{
        background: 'radial-gradient(400px 200px at 20% 0%, rgba(214,178,106,.2), transparent 60%), linear-gradient(135deg, #1a1d2a, #0e1018)',
        border: '1px solid rgba(214,178,106,.18)'
      }}>
        <div style={{ fontSize: '11px', color: '#8b8a78', textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: '10px' }}>
          {t.totalBalance}
        </div>
        <div style={{ fontFamily: 'Reem Kufi', fontSize: '38px', fontWeight: 600, display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span>{fmtNum(stats.balance)}</span>
          <span style={{ fontSize: '16px', color: '#d6b26a' }}>{currencySymbol}</span>
        </div>
        <div className="flex gap-4 mt-5 pt-5" style={{ borderTop: '1px solid rgba(236,234,216,.08)' }}>
          <div className="flex-1">
            <div style={{ width: '30px', height: '30px', borderRadius: '10px', background: 'rgba(111,168,132,.15)', color: '#6fa884', display: 'grid', placeItems: 'center', marginBottom: '8px' }}>
              <TrendingUp size={14} />
            </div>
            <div style={{ fontSize: '10px', color: '#8b8a78' }}>{t.monthIncome}</div>
            <div style={{ fontFamily: 'Reem Kufi', fontSize: '15px', color: '#6fa884', fontWeight: 500 }}>+{fmtNum(stats.income)}</div>
          </div>
          <div className="flex-1">
            <div style={{ width: '30px', height: '30px', borderRadius: '10px', background: 'rgba(184,85,77,.15)', color: '#e08074', display: 'grid', placeItems: 'center', marginBottom: '8px' }}>
              <TrendingDown size={14} />
            </div>
            <div style={{ fontSize: '10px', color: '#8b8a78' }}>{t.monthExpenses}</div>
            <div style={{ fontFamily: 'Reem Kufi', fontSize: '15px', color: '#e08074', fontWeight: 500 }}>−{fmtNum(stats.expense)}</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-2 px-5 mb-6">
        <QuickAction icon={Plus} label={t.quickAdd} onClick={() => onNav('add')} />
        <QuickAction icon={PieIcon} label={t.analytics} onClick={() => onNav('analytics')} />
        <QuickAction icon={Target} label={t.quickGoals} onClick={() => onNav('goals')} />
        <QuickAction icon={Settings} label={t.settings} onClick={() => onNav('settings')} />
      </div>

      {/* Recent */}
      <div className="flex items-center justify-between px-6 mb-3">
        <h3 style={{ fontFamily: 'Reem Kufi', fontSize: '15px', fontWeight: 500 }}>{t.recentTx}</h3>
      </div>

      {recent.length === 0 ? (
        <div className="mx-5 py-10 text-center rounded-2xl" style={{ border: '1px dashed rgba(236,234,216,.14)' }}>
          <div style={{ fontSize: '14px', color: '#ecead8', marginBottom: '4px' }}>{t.noTx}</div>
          <div style={{ fontSize: '12px', color: '#8b8a78' }}>{t.noTxHint}</div>
        </div>
      ) : (
        <div className="px-3">
          {recent.map(tx => {
            const cat = CATEGORIES[tx.category] || CATEGORIES.other;
            const Icon = cat.icon;
            return (
              <div key={tx.id} onClick={() => setDelConfirm(tx)} className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer" style={{ transition: 'background .2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(236,234,216,.03)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: cat.bg, color: cat.color, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: '13px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {tx.note || t[tx.category] || tx.category}
                  </div>
                  <div style={{ fontSize: '10px', color: '#8b8a78' }}>
                    {fmtDate(tx.date, lang, t)} · {t[tx.category]}
                  </div>
                </div>
                <div style={{ direction: 'ltr', textAlign: isRTL ? 'left' : 'right' }}>
                  <div style={{ fontFamily: 'Reem Kufi', fontSize: '14px', fontWeight: 600, color: tx.type === 'income' ? '#6fa884' : '#ecead8' }}>
                    {tx.type === 'income' ? '+' : '−'}{fmtNum(tx.amount)}
                  </div>
                  <div style={{ fontSize: '9px', color: '#8b8a78' }}>{currencySymbol}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirm */}
      {delConfirm && (
        <Modal onClose={() => setDelConfirm(null)}>
          <div style={{ fontFamily: 'Reem Kufi', fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}>{t.deleteTxConfirm}</div>
          <div style={{ fontSize: '13px', color: '#8b8a78', marginBottom: '20px' }}>
            {delConfirm.note || t[delConfirm.category]} · {fmtNum(delConfirm.amount)} {currencySymbol}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setDelConfirm(null)} className="flex-1 py-3 rounded-xl" style={{ background: 'rgba(236,234,216,.06)', color: '#ecead8', fontFamily: 'inherit' }}>{t.cancel}</button>
            <button onClick={() => { onDelete(delConfirm.id); setDelConfirm(null); }} className="flex-1 py-3 rounded-xl" style={{ background: '#b8554d', color: '#fff', fontFamily: 'inherit', fontWeight: 600 }}>{t.delete}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function QuickAction({ icon: Icon, label, onClick }) {
  return (
    <button onClick={onClick} className="py-4 rounded-2xl text-center"
      style={{ background: 'rgba(236,234,216,.025)', border: '1px solid rgba(236,234,216,.08)' }}>
      <div style={{ width: '38px', height: '38px', margin: '0 auto 8px', borderRadius: '12px', background: 'rgba(214,178,106,.1)', color: '#d6b26a', display: 'grid', placeItems: 'center' }}>
        <Icon size={18} />
      </div>
      <div style={{ fontSize: '11px', color: '#ecead8' }}>{label}</div>
    </button>
  );
}

// ============== ADD TRANSACTION ==============
function AddScreen({ t, isRTL, currencySymbol, onSave, onCancel }) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');

  const cats = type === 'income' ? INCOME_CATS : EXPENSE_CATS;

  const handleSave = () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0 || !category) return;
    onSave({ type, amount: amt, category, note: note.trim() });
  };

  return (
    <div className="p-6 pt-10 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onCancel} style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(236,234,216,.05)', border: '1px solid rgba(236,234,216,.14)', display: 'grid', placeItems: 'center', color: '#ecead8' }}>
          {isRTL ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
        </button>
        <h2 style={{ fontFamily: 'Reem Kufi', fontSize: '19px', fontWeight: 500 }}>{t.newTx}</h2>
      </div>

      {/* Type switch */}
      <div className="flex p-1 rounded-2xl mb-6" style={{ background: 'rgba(236,234,216,.04)' }}>
        <button onClick={() => { setType('income'); setCategory(''); }} className="flex-1 py-3 rounded-xl"
          style={{
            background: type === 'income' ? 'linear-gradient(135deg, #4a7a5e, #6fa884)' : 'transparent',
            color: type === 'income' ? '#fff' : '#8b8a78',
            fontWeight: 600, fontSize: '13px', fontFamily: 'inherit',
            boxShadow: type === 'income' ? '0 4px 12px -4px rgba(111,168,132,.5)' : 'none'
          }}>
          {t.income}
        </button>
        <button onClick={() => { setType('expense'); setCategory(''); }} className="flex-1 py-3 rounded-xl"
          style={{
            background: type === 'expense' ? 'linear-gradient(135deg, #b8554d, #9a4841)' : 'transparent',
            color: type === 'expense' ? '#fff' : '#8b8a78',
            fontWeight: 600, fontSize: '13px', fontFamily: 'inherit',
            boxShadow: type === 'expense' ? '0 4px 12px -4px rgba(184,85,77,.5)' : 'none'
          }}>
          {t.expense}
        </button>
      </div>

      {/* Amount */}
      <div className="p-6 rounded-2xl mb-5 text-center" style={{ background: 'linear-gradient(135deg, #1a1d2a, #0e1018)', border: '1px solid rgba(236,234,216,.08)' }}>
        <div style={{ fontSize: '10px', color: '#8b8a78', textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: '12px' }}>
          {t.amount}
        </div>
        <div className="flex items-baseline justify-center gap-2">
          <input type="number" inputMode="decimal" value={amount} onChange={e => setAmount(e.target.value)}
            placeholder="0" className="text-center bg-transparent outline-none"
            style={{
              fontFamily: 'Reem Kufi', fontSize: '46px', fontWeight: 600, color: '#ecead8',
              width: '60%', minWidth: '120px', border: 'none'
            }} />
          <span style={{ fontSize: '18px', color: '#d6b26a', fontFamily: 'Reem Kufi' }}>{currencySymbol}</span>
        </div>
      </div>

      {/* Category */}
      <div style={{ fontSize: '11px', color: '#8b8a78', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '10px', fontWeight: 600 }}>
        {t.category}
      </div>
      <div className="grid grid-cols-4 gap-2 mb-5">
        {cats.map(c => {
          const cat = CATEGORIES[c];
          const Icon = cat.icon;
          const active = category === c;
          return (
            <button key={c} onClick={() => setCategory(c)} className="rounded-2xl flex flex-col items-center justify-center gap-1 py-3"
              style={{
                background: active ? 'linear-gradient(135deg, rgba(214,178,106,.2), rgba(214,178,106,.05))' : 'rgba(236,234,216,.03)',
                border: active ? '1px solid #d6b26a' : '1px solid rgba(236,234,216,.08)',
                color: active ? '#d6b26a' : '#ecead8'
              }}>
              <Icon size={20} />
              <span style={{ fontSize: '10px' }}>{t[c]}</span>
            </button>
          );
        })}
      </div>

      {/* Note */}
      <div style={{ fontSize: '11px', color: '#8b8a78', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '10px', fontWeight: 600 }}>
        {t.note}
      </div>
      <input value={note} onChange={e => setNote(e.target.value)} placeholder={t.optional}
        className="w-full p-3 rounded-xl mb-6"
        style={{ background: 'rgba(236,234,216,.03)', border: '1px solid rgba(236,234,216,.08)', color: '#ecead8', fontFamily: 'inherit', fontSize: '14px', outline: 'none' }}
      />

      {/* Save */}
      <button onClick={handleSave} disabled={!amount || !category || parseFloat(amount) <= 0}
        className="w-full py-4 rounded-2xl font-bold disabled:opacity-40"
        style={{ background: 'linear-gradient(135deg, #d6b26a, #8a6f3d)', color: '#1a1405', fontSize: '15px', boxShadow: '0 10px 30px -10px rgba(214,178,106,.6)', fontFamily: 'inherit' }}>
        {t.save}
      </button>
    </div>
  );
}

// ============== ANALYTICS ==============
function AnalyticsScreen({ t, lang, isRTL, currencySymbol, transactions, stats }) {
  const [period, setPeriod] = useState('month');

  const filtered = useMemo(() => {
    const now = new Date();
    let start = new Date();
    if (period === 'week') start.setDate(now.getDate() - 7);
    else if (period === 'month') start = new Date(now.getFullYear(), now.getMonth(), 1);
    else start = new Date(now.getFullYear(), 0, 1);
    return transactions.filter(t => new Date(t.date) >= start && t.type === 'expense');
  }, [transactions, period]);

  const catData = useMemo(() => {
    const map = {};
    filtered.forEach(tx => {
      map[tx.category] = (map[tx.category] || 0) + tx.amount;
    });
    return Object.entries(map).map(([key, value]) => ({
      name: t[key] || key,
      key,
      value,
      color: CATEGORIES[key]?.color || '#8b8a78'
    })).sort((a, b) => b.value - a.value);
  }, [filtered, t]);

  const total = catData.reduce((s, c) => s + c.value, 0);

  return (
    <div className="pt-10">
      <div className="px-6 mb-5">
        <h2 style={{ fontFamily: 'Reem Kufi', fontSize: '22px', fontWeight: 600, marginBottom: '4px' }}>{t.financialAnalysis}</h2>
        <p style={{ color: '#8b8a78', fontSize: '13px' }}>{t.overview}</p>
      </div>

      {/* Period tabs */}
      <div className="mx-5 mb-5 flex gap-1 p-1 rounded-2xl" style={{ background: 'rgba(236,234,216,.03)' }}>
        {['week', 'month', 'year'].map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className="flex-1 py-2.5 rounded-xl"
            style={{
              background: period === p ? 'linear-gradient(135deg, #d6b26a, #8a6f3d)' : 'transparent',
              color: period === p ? '#1a1405' : '#8b8a78',
              fontWeight: period === p ? 700 : 500, fontSize: '12px', fontFamily: 'inherit'
            }}>
            {t[p]}
          </button>
        ))}
      </div>

      {catData.length === 0 ? (
        <div className="mx-5 p-8 text-center rounded-3xl" style={{ background: 'linear-gradient(135deg, #1a1d2a, #0e1018)', border: '1px solid rgba(236,234,216,.08)' }}>
          <PieIcon size={40} style={{ margin: '0 auto 16px', color: '#8b8a78' }} />
          <div style={{ fontSize: '15px', fontFamily: 'Reem Kufi', color: '#ecead8', marginBottom: '6px' }}>{t.noData}</div>
          <div style={{ fontSize: '12px', color: '#8b8a78' }}>{t.noDataHint}</div>
        </div>
      ) : (
        <>
          {/* Donut */}
          <div className="mx-5 mb-5 p-6 rounded-3xl" style={{ background: 'linear-gradient(135deg, #1a1d2a, #0e1018)', border: '1px solid rgba(236,234,216,.08)' }}>
            <div style={{ height: '200px', position: 'relative' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={catData} dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={3} stroke="none">
                    {catData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div style={{ fontSize: '10px', color: '#8b8a78', marginBottom: '4px' }}>{t.monthExpenses}</div>
                <div style={{ fontFamily: 'Reem Kufi', fontSize: '22px', fontWeight: 600 }}>{fmtNum(total)}</div>
                <div style={{ fontSize: '11px', color: '#d6b26a', marginTop: '2px' }}>{currencySymbol}</div>
              </div>
            </div>

            <div className="mt-4 pt-4 space-y-2.5" style={{ borderTop: '1px solid rgba(236,234,216,.06)' }}>
              {catData.slice(0, 6).map(c => (
                <div key={c.key} className="flex items-center gap-3">
                  <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: c.color, flexShrink: 0 }}></div>
                  <span className="flex-1" style={{ fontSize: '13px' }}>{c.name}</span>
                  <span style={{ color: '#8b8a78', fontSize: '12px', fontFamily: 'Reem Kufi' }}>
                    {fmtNum(c.value)} · {((c.value / total) * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Smart Insight */}
          <div className="mx-5 p-5 rounded-3xl flex gap-3" style={{ background: 'linear-gradient(135deg, rgba(74,122,94,.18), rgba(74,122,94,.05))', border: '1px solid rgba(74,122,94,.3)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '13px', background: 'rgba(111,168,132,.2)', color: '#6fa884', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ fontFamily: 'Reem Kufi', fontSize: '14px', fontWeight: 600, color: '#6fa884', marginBottom: '6px' }}>{t.smartInsight}</div>
              <p style={{ fontSize: '12px', color: '#8b8a78', lineHeight: 1.7 }}>{t.insightMsg}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ============== GOALS ==============
function GoalsScreen({ t, lang, isRTL, currencySymbol, goals, onAdd, onUpdate, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [fundGoal, setFundGoal] = useState(null);
  const [delConfirm, setDelConfirm] = useState(null);

  return (
    <div className="pt-10">
      <div className="px-6 mb-6 flex items-start justify-between">
        <div>
          <h2 style={{ fontFamily: 'Reem Kufi', fontSize: '22px', fontWeight: 600, marginBottom: '4px' }}>{t.myGoals}</h2>
          <p style={{ color: '#8b8a78', fontSize: '12px' }}>{goals.length} {t.activeGoals}</p>
        </div>
        <button onClick={() => setShowForm(true)}
          style={{ padding: '10px 14px', borderRadius: '14px', background: 'linear-gradient(135deg, #d6b26a, #8a6f3d)', color: '#1a1405', fontFamily: 'inherit', fontWeight: 600, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={16} /> {t.addGoal}
        </button>
      </div>

      {goals.length === 0 ? (
        <div className="mx-5 p-10 text-center rounded-3xl" style={{ background: 'linear-gradient(135deg, #1a1d2a, #0e1018)', border: '1px solid rgba(236,234,216,.08)' }}>
          <Target size={44} style={{ margin: '0 auto 16px', color: '#d6b26a' }} />
          <div style={{ fontFamily: 'Reem Kufi', fontSize: '16px', color: '#ecead8', marginBottom: '6px' }}>{t.noGoals}</div>
          <div style={{ fontSize: '12px', color: '#8b8a78', marginBottom: '20px' }}>{t.noGoalsHint}</div>
          <button onClick={() => setShowForm(true)}
            style={{ padding: '12px 24px', borderRadius: '14px', background: 'linear-gradient(135deg, #d6b26a, #8a6f3d)', color: '#1a1405', fontFamily: 'inherit', fontWeight: 600, fontSize: '13px' }}>
            {t.addFirstGoal}
          </button>
        </div>
      ) : (
        <div className="px-5 space-y-3">
          {goals.map((g, i) => {
            const pct = Math.min(100, (g.saved / g.target) * 100);
            const done = pct >= 100;
            return (
              <div key={g.id} className="p-5 rounded-3xl relative overflow-hidden" style={{
                background: i === 0
                  ? 'radial-gradient(400px 200px at 80% 0%, rgba(214,178,106,.2), transparent 60%), linear-gradient(135deg, #1a1d2a, #0e1018)'
                  : 'linear-gradient(135deg, #1a1d2a, #0e1018)',
                border: i === 0 ? '1px solid rgba(214,178,106,.2)' : '1px solid rgba(236,234,216,.08)'
              }}>
                <div className="flex justify-between items-start mb-3">
                  <div style={{ flex: 1 }}>
                    {i === 0 && <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '20px', background: 'rgba(214,178,106,.15)', color: '#d6b26a', fontSize: '10px', fontWeight: 600, marginBottom: '8px' }}>◆ {t.mainGoal}</div>}
                    <div style={{ fontFamily: 'Reem Kufi', fontSize: '17px', fontWeight: 600 }}>{g.title}</div>
                  </div>
                  <button onClick={() => setDelConfirm(g)} style={{ color: '#8b8a78', padding: '6px' }}>
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex justify-between mb-2" style={{ fontSize: '12px' }}>
                  <span style={{ color: '#8b8a78' }}>{t.saved}</span>
                  <span style={{ fontFamily: 'Reem Kufi', fontWeight: 600 }}>
                    {fmtNum(g.saved)} / {fmtNum(g.target)} {currencySymbol}
                  </span>
                </div>

                <div style={{ height: '8px', borderRadius: '8px', background: 'rgba(236,234,216,.06)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: pct + '%',
                    borderRadius: '8px',
                    background: done
                      ? 'linear-gradient(90deg, #4a7a5e, #6fa884)'
                      : 'linear-gradient(90deg, #8a6f3d, #d6b26a, #eccd8a)',
                    boxShadow: '0 0 20px rgba(214,178,106,.4)',
                    transition: 'width .6s ease'
                  }}></div>
                </div>

                <div className="flex justify-between mt-4 pt-4" style={{ borderTop: '1px solid rgba(236,234,216,.08)', fontSize: '10px', color: '#8b8a78' }}>
                  <div>
                    {t.remaining}<br/>
                    <b style={{ color: '#d6b26a', fontFamily: 'Reem Kufi', fontSize: '13px', fontWeight: 500 }}>{fmtNum(Math.max(0, g.target - g.saved))}</b>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    {t.progress}<br/>
                    <b style={{ color: done ? '#6fa884' : '#ecead8', fontFamily: 'Reem Kufi', fontSize: '13px', fontWeight: 500 }}>{pct.toFixed(0)}%</b>
                  </div>
                  <div>
                    <button onClick={() => setFundGoal(g)}
                      style={{ padding: '6px 12px', borderRadius: '10px', background: 'rgba(214,178,106,.15)', color: '#d6b26a', fontFamily: 'inherit', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Plus size={12} /> {t.addFunds}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showForm && <GoalForm t={t} isRTL={isRTL} currencySymbol={currencySymbol}
        onSave={(data) => { onAdd(data); setShowForm(false); }}
        onCancel={() => setShowForm(false)} />}

      {fundGoal && <FundGoalModal t={t} currencySymbol={currencySymbol} goal={fundGoal}
        onSave={(amt) => { onUpdate(fundGoal.id, { saved: fundGoal.saved + amt }); setFundGoal(null); }}
        onCancel={() => setFundGoal(null)} />}

      {delConfirm && (
        <Modal onClose={() => setDelConfirm(null)}>
          <div style={{ fontFamily: 'Reem Kufi', fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}>{t.deleteGoal}</div>
          <div style={{ fontSize: '13px', color: '#8b8a78', marginBottom: '20px' }}>{delConfirm.title}</div>
          <div className="flex gap-3">
            <button onClick={() => setDelConfirm(null)} className="flex-1 py-3 rounded-xl" style={{ background: 'rgba(236,234,216,.06)', color: '#ecead8', fontFamily: 'inherit' }}>{t.cancel}</button>
            <button onClick={() => { onDelete(delConfirm.id); setDelConfirm(null); }} className="flex-1 py-3 rounded-xl" style={{ background: '#b8554d', color: '#fff', fontFamily: 'inherit', fontWeight: 600 }}>{t.delete}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function GoalForm({ t, isRTL, currencySymbol, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [saved, setSaved] = useState('0');

  const handleSave = () => {
    const tgt = parseFloat(target);
    const sv = parseFloat(saved) || 0;
    if (!title.trim() || !tgt || tgt <= 0) return;
    onSave({ title: title.trim(), target: tgt, saved: sv });
  };

  return (
    <Modal onClose={onCancel}>
      <div style={{ fontFamily: 'Reem Kufi', fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>{t.newGoal}</div>

      <div style={{ fontSize: '11px', color: '#8b8a78', marginBottom: '6px' }}>{t.goalTitle}</div>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder={t.goalTitle}
        className="w-full p-3 rounded-xl mb-4"
        style={{ background: 'rgba(236,234,216,.05)', border: '1px solid rgba(236,234,216,.14)', color: '#ecead8', fontFamily: 'inherit', fontSize: '14px', outline: 'none' }} />

      <div style={{ fontSize: '11px', color: '#8b8a78', marginBottom: '6px' }}>{t.targetAmount} ({currencySymbol})</div>
      <input type="number" value={target} onChange={e => setTarget(e.target.value)} placeholder="10000"
        className="w-full p-3 rounded-xl mb-4"
        style={{ background: 'rgba(236,234,216,.05)', border: '1px solid rgba(236,234,216,.14)', color: '#ecead8', fontFamily: 'inherit', fontSize: '14px', outline: 'none' }} />

      <div style={{ fontSize: '11px', color: '#8b8a78', marginBottom: '6px' }}>{t.savedSoFar} ({currencySymbol})</div>
      <input type="number" value={saved} onChange={e => setSaved(e.target.value)} placeholder="0"
        className="w-full p-3 rounded-xl mb-6"
        style={{ background: 'rgba(236,234,216,.05)', border: '1px solid rgba(236,234,216,.14)', color: '#ecead8', fontFamily: 'inherit', fontSize: '14px', outline: 'none' }} />

      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 py-3 rounded-xl" style={{ background: 'rgba(236,234,216,.06)', color: '#ecead8', fontFamily: 'inherit' }}>{t.cancel}</button>
        <button onClick={handleSave} disabled={!title.trim() || !target} className="flex-1 py-3 rounded-xl disabled:opacity-40" style={{ background: 'linear-gradient(135deg, #d6b26a, #8a6f3d)', color: '#1a1405', fontFamily: 'inherit', fontWeight: 700 }}>{t.save}</button>
      </div>
    </Modal>
  );
}

function FundGoalModal({ t, currencySymbol, goal, onSave, onCancel }) {
  const [amount, setAmount] = useState('');
  return (
    <Modal onClose={onCancel}>
      <div style={{ fontFamily: 'Reem Kufi', fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>{t.addToGoal}</div>
      <div style={{ fontSize: '13px', color: '#8b8a78', marginBottom: '20px' }}>{goal.title}</div>

      <div className="p-4 rounded-2xl mb-5 text-center" style={{ background: 'rgba(236,234,216,.03)', border: '1px solid rgba(236,234,216,.08)' }}>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder={t.typeAmount}
          className="w-full text-center bg-transparent outline-none"
          style={{ fontFamily: 'Reem Kufi', fontSize: '32px', fontWeight: 600, color: '#ecead8', border: 'none' }} />
        <div style={{ color: '#d6b26a', fontSize: '13px', marginTop: '4px' }}>{currencySymbol}</div>
      </div>

      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 py-3 rounded-xl" style={{ background: 'rgba(236,234,216,.06)', color: '#ecead8', fontFamily: 'inherit' }}>{t.cancel}</button>
        <button onClick={() => { const a = parseFloat(amount); if (a > 0) onSave(a); }} disabled={!amount || parseFloat(amount) <= 0}
          className="flex-1 py-3 rounded-xl disabled:opacity-40" style={{ background: 'linear-gradient(135deg, #d6b26a, #8a6f3d)', color: '#1a1405', fontFamily: 'inherit', fontWeight: 700 }}>{t.save}</button>
      </div>
    </Modal>
  );
}

// ============== SETTINGS ==============
function SettingsScreen({ t, lang, isRTL, userName, setUserName, currency, currencySymbol, setLang, setCurrency, toggles, setToggles, onReset }) {
  const [showLang, setShowLang] = useState(false);
  const [showCurr, setShowCurr] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);

  const toggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="pt-10">
      <div className="px-6 mb-5">
        <h2 style={{ fontFamily: 'Reem Kufi', fontSize: '22px', fontWeight: 600 }}>{t.settings}</h2>
      </div>

      {/* Profile */}
      <div className="mx-5 mb-6 p-5 rounded-3xl flex items-center gap-4" style={{ background: 'linear-gradient(135deg, #1a1d2a, #0e1018)', border: '1px solid rgba(236,234,216,.08)' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'linear-gradient(135deg, #d6b26a, #8a6f3d)', display: 'grid', placeItems: 'center', fontFamily: 'Reem Kufi', fontSize: '26px', fontWeight: 700, color: '#1a1405', boxShadow: '0 8px 20px -8px rgba(214,178,106,.5)' }}>
          {(userName || 'A')[0].toUpperCase()}
        </div>
        <div className="flex-1">
          {editingName ? (
            <div className="flex gap-2">
              <input value={tempName} onChange={e => setTempName(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg"
                style={{ background: 'rgba(236,234,216,.05)', border: '1px solid rgba(236,234,216,.14)', color: '#ecead8', fontFamily: 'inherit', outline: 'none', fontSize: '14px' }} />
              <button onClick={() => { setUserName(tempName.trim() || userName); setEditingName(false); }}
                style={{ padding: '8px', borderRadius: '10px', background: '#d6b26a', color: '#1a1405' }}>
                <Check size={16} />
              </button>
            </div>
          ) : (
            <>
              <div style={{ fontFamily: 'Reem Kufi', fontSize: '16px', fontWeight: 500 }}>{userName || '—'}</div>
              <button onClick={() => { setTempName(userName); setEditingName(true); }}
                style={{ fontSize: '11px', color: '#d6b26a', marginTop: '4px' }}>
                {t.edit}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Group 1 */}
      <div className="mx-5 mb-4 rounded-2xl overflow-hidden" style={{ background: 'rgba(236,234,216,.025)', border: '1px solid rgba(236,234,216,.08)' }}>
        <SetItem icon={Globe} color="#d6b26a" bg="rgba(214,178,106,.1)"
          title={t.language} subtitle="Language / اللغة"
          right={<div style={{ color: '#d6b26a', fontSize: '12px' }}>{LANGUAGES.find(l => l.code === lang)?.name} {isRTL ? '←' : '→'}</div>}
          onClick={() => setShowLang(true)} />
        <SetItem icon={DollarSign} color="#6fa884" bg="rgba(111,168,132,.1)"
          title={t.currency} subtitle="Default currency"
          right={<div style={{ color: '#d6b26a', fontSize: '12px' }}>{currency} {isRTL ? '←' : '→'}</div>}
          onClick={() => setShowCurr(true)} />
        <SetItem icon={Moon} color="#9aabd8" bg="rgba(111,140,200,.1)"
          title={t.darkMode} subtitle="Dark mode"
          right={<Toggle on={toggles.dark} />}
          onClick={() => toggle('dark')} last />
      </div>

      {/* Group 2 */}
      <div className="mx-5 mb-4 rounded-2xl overflow-hidden" style={{ background: 'rgba(236,234,216,.025)', border: '1px solid rgba(236,234,216,.08)' }}>
        <SetItem icon={Bell} color="#e08074" bg="rgba(184,85,77,.1)"
          title={t.notifications}
          right={<Toggle on={toggles.notif} />}
          onClick={() => toggle('notif')} />
        <SetItem icon={Fingerprint} color="#6fa884" bg="rgba(111,168,132,.1)"
          title={t.biometric}
          right={<Toggle on={toggles.bio} />}
          onClick={() => toggle('bio')} />
        <SetItem icon={Cloud} color="#7ec5d6" bg="rgba(126,197,214,.1)"
          title={t.backup}
          right={<Toggle on={toggles.backup} />}
          onClick={() => toggle('backup')} last />
      </div>

      {/* Group 3 */}
      <div className="mx-5 mb-4 rounded-2xl overflow-hidden" style={{ background: 'rgba(236,234,216,.025)', border: '1px solid rgba(236,234,216,.08)' }}>
        <SetItem icon={Download} color="#d6b26a" bg="rgba(214,178,106,.1)"
          title={t.exportData} subtitle="PDF · CSV"
          right={<div style={{ color: '#8b8a78', fontSize: '12px' }}>{isRTL ? '←' : '→'}</div>} />
        <SetItem icon={HelpCircle} color="#8b8a78" bg="rgba(139,138,120,.1)"
          title={t.help}
          right={<div style={{ color: '#8b8a78', fontSize: '12px' }}>{isRTL ? '←' : '→'}</div>} last />
      </div>

      {/* Reset */}
      <div className="mx-5 mb-6">
        <button onClick={() => setConfirmReset(true)}
          className="w-full py-3 rounded-2xl"
          style={{ background: 'rgba(184,85,77,.1)', color: '#e08074', fontFamily: 'inherit', fontSize: '13px', fontWeight: 500, border: '1px solid rgba(184,85,77,.2)' }}>
          {t.resetAll}
        </button>
      </div>

      <div className="text-center pb-4">
        <div style={{ fontFamily: 'Reem Kufi', fontSize: '14px', color: '#d6b26a' }}>أموالي · Amwali</div>
        <div style={{ fontSize: '10px', color: '#8b8a78', marginTop: '4px' }}>v1.0 · 2026</div>
      </div>

      {/* Language picker */}
      {showLang && (
        <Modal onClose={() => setShowLang(false)}>
          <div style={{ fontFamily: 'Reem Kufi', fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>{t.language}</div>
          <div className="space-y-2">
            {LANGUAGES.map(l => (
              <button key={l.code} onClick={() => { setLang(l.code); setShowLang(false); }}
                className="w-full flex justify-between items-center p-3 rounded-xl"
                style={{
                  background: lang === l.code ? 'rgba(214,178,106,.15)' : 'rgba(236,234,216,.03)',
                  border: lang === l.code ? '1px solid #d6b26a' : '1px solid rgba(236,234,216,.08)',
                  color: '#ecead8'
                }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>{l.name}</div>
                  <div style={{ fontSize: '11px', color: '#8b8a78', direction: 'ltr' }}>{l.english}</div>
                </div>
                {lang === l.code && <Check size={18} color="#d6b26a" />}
              </button>
            ))}
          </div>
        </Modal>
      )}

      {/* Currency picker */}
      {showCurr && (
        <Modal onClose={() => setShowCurr(false)}>
          <div style={{ fontFamily: 'Reem Kufi', fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>{t.currency}</div>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(CURRENCIES).map(code => (
              <button key={code} onClick={() => { setCurrency(code); setShowCurr(false); }}
                className="flex justify-between items-center p-3 rounded-xl"
                style={{
                  background: currency === code ? 'rgba(214,178,106,.15)' : 'rgba(236,234,216,.03)',
                  border: currency === code ? '1px solid #d6b26a' : '1px solid rgba(236,234,216,.08)',
                  color: '#ecead8'
                }}>
                <span style={{ fontSize: '14px', fontWeight: 500 }}>{code}</span>
                <span style={{ color: '#d6b26a' }}>{CURRENCIES[code][lang] || CURRENCIES[code].en}</span>
              </button>
            ))}
          </div>
        </Modal>
      )}

      {/* Reset confirm */}
      {confirmReset && (
        <Modal onClose={() => setConfirmReset(false)}>
          <div style={{ fontFamily: 'Reem Kufi', fontSize: '17px', fontWeight: 600, marginBottom: '8px' }}>{t.resetAll}</div>
          <div style={{ fontSize: '13px', color: '#8b8a78', marginBottom: '20px' }}>{t.resetConfirm}</div>
          <div className="flex gap-3">
            <button onClick={() => setConfirmReset(false)} className="flex-1 py-3 rounded-xl" style={{ background: 'rgba(236,234,216,.06)', color: '#ecead8', fontFamily: 'inherit' }}>{t.cancel}</button>
            <button onClick={() => { onReset(); setConfirmReset(false); }} className="flex-1 py-3 rounded-xl" style={{ background: '#b8554d', color: '#fff', fontFamily: 'inherit', fontWeight: 600 }}>{t.delete}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function SetItem({ icon: Icon, color, bg, title, subtitle, right, onClick, last }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 p-4 text-left" style={{ borderBottom: last ? 'none' : '1px solid rgba(236,234,216,.06)' }}>
      <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: bg, color, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
        <Icon size={16} />
      </div>
      <div className="flex-1">
        <div style={{ fontSize: '13px', fontWeight: 500, color: '#ecead8' }}>{title}</div>
        {subtitle && <div style={{ fontSize: '10px', color: '#8b8a78', marginTop: '2px' }}>{subtitle}</div>}
      </div>
      {right}
    </button>
  );
}

function Toggle({ on }) {
  return (
    <div style={{ width: '38px', height: '22px', borderRadius: '20px', background: on ? '#d6b26a' : 'rgba(236,234,216,.1)', position: 'relative', flexShrink: 0, transition: 'background .2s' }}>
      <div style={{
        position: 'absolute', top: '2px',
        left: on ? '18px' : '2px',
        width: '18px', height: '18px', borderRadius: '50%',
        background: on ? '#1a1405' : '#8b8a78',
        transition: 'left .2s'
      }}></div>
    </div>
  );
}

// ============== BOTTOM NAV ==============
function BottomNav({ t, current, onChange }) {
  const items = [
    { key: 'home', icon: Home, label: t.home },
    { key: 'analytics', icon: PieIcon, label: t.analytics },
    { key: 'add', icon: PlusCircle, label: t.quickAdd, main: true },
    { key: 'goals', icon: Target, label: t.goals },
    { key: 'settings', icon: Settings, label: t.settings },
  ];

  return (
    <nav style={{
      position: 'fixed', bottom: '12px', left: '12px', right: '12px',
      maxWidth: '416px', margin: '0 auto',
      background: 'rgba(17,19,28,.88)', backdropFilter: 'blur(20px)',
      border: '1px solid rgba(236,234,216,.14)', borderRadius: '24px',
      display: 'flex', justifyContent: 'space-around', padding: '8px',
      zIndex: 20,
    }}>
      {items.map(it => {
        const Icon = it.icon;
        const active = current === it.key;
        if (it.main) {
          return (
            <button key={it.key} onClick={() => onChange(it.key)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '8px',
              }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '14px',
                background: 'linear-gradient(135deg, #d6b26a, #8a6f3d)',
                color: '#1a1405', display: 'grid', placeItems: 'center',
                boxShadow: '0 8px 20px -6px rgba(214,178,106,.6)',
                marginTop: '-12px', marginBottom: '2px'
              }}>
                <Icon size={22} />
              </div>
            </button>
          );
        }
        return (
          <button key={it.key} onClick={() => onChange(it.key)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
              padding: '10px 6px', borderRadius: '14px',
              background: active ? 'rgba(214,178,106,.12)' : 'transparent',
              color: active ? '#d6b26a' : '#8b8a78',
              fontSize: '9px', fontFamily: 'inherit', transition: 'all .2s'
            }}>
            <Icon size={17} />
            <span>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

// ============== MODAL ==============
function Modal({ children, onClose }) {
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 50,
      background: 'rgba(10,11,16,.7)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      animation: 'fadeIn .2s'
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: '416px',
        background: 'linear-gradient(180deg, #1a1d2a, #11131c)',
        borderTopLeftRadius: '28px', borderTopRightRadius: '28px',
        padding: '28px 24px 24px',
        borderTop: '1px solid rgba(214,178,106,.15)',
        animation: 'slideUp .25s cubic-bezier(.2,.9,.3,1.2)'
      }}>
        <div style={{ width: '36px', height: '4px', background: 'rgba(236,234,216,.2)', borderRadius: '4px', margin: '-8px auto 20px' }}></div>
        {children}
      </div>
      <style>{`
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
      `}</style>
    </div>
  );
}
