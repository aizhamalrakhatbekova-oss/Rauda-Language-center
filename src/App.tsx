import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Phone, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  Award, 
  Check, 
  X, 
  Mail, 
  Instagram, 
  ChevronRight,
  MapPin,
  Heart,
  MessageCircle,
  Quote,
  Globe,
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TRANSLATIONS, 
  COURSES_INFO_LANG, 
  LANGUAGES, 
  type LanguageCode, 
  type CourseDetail 
} from './translations';
import Chatbot from './components/Chatbot';

export default function App() {
  // Image Sources with fallback arrays to support environment file placement variants
  const logoSources = ["/input_file_0.png", "/image_0.png", "/logo.png", "/rauda_logo.png", "/src/assets/logo.png"];

  const [logoSrcIdx, setLogoSrcIdx] = useState(0);

  // Language State
  const [lang, setLang] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('rauda_preferred_lang');
    if (saved === 'kg' || saved === 'ru' || saved === 'en') return saved;
    return 'kg';
  });

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Theme State (Light / Dark Mode) - Deep blue with teal accents in dark mode
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('rauda_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('rauda_theme', theme);
  }, [theme]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (newLang: LanguageCode) => {
    setLang(newLang);
    localStorage.setItem('rauda_preferred_lang', newLang);
    setIsLangDropdownOpen(false);
  };

  const t = (keyPath: string): string => {
    const keys = keyPath.split('.');
    let value: any = TRANSLATIONS[lang];
    for (const key of keys) {
      if (value === undefined) return keyPath;
      value = value[key];
    }
    return typeof value === 'string' ? value : keyPath;
  };

  const COURSES_INFO = COURSES_INFO_LANG[lang];

  // Modal & Drawer State
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [selectedCourseTab, setSelectedCourseTab] = useState('quran');

  // Form Registration State
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formCourse, setFormCourse] = useState('quran');
  const [formFormat, setFormFormat] = useState('offline');
  const [formTime, setFormTime] = useState('evening');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+996')) {
      val = '+996 ' + val.replace(/^\+?9?9?6?\s*/, '');
    }
    setFormPhone(val);
  };

  const currentCourseInfo = COURSES_INFO.find(c => c.id === selectedCourseTab) || COURSES_INFO[0];

  const handleSubmitEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || formPhone.length < 13) {
      alert(t('common.validationPhoneName'));
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API registration to local storage / memory
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmittedSuccessfully(true);
    }, 1500);
  };

  const resetFormState = () => {
    setFormName('');
    setFormPhone('');
    setIsSubmittedSuccessfully(false);
    setIsEnrollModalOpen(false);
  };

  // Educational Support Program State
  const [supportName, setSupportName] = useState('');
  const [supportAge, setSupportAge] = useState('');
  const [supportCourse, setSupportCourse] = useState('quran');
  const [supportReasonLearn, setSupportReasonLearn] = useState('');
  const [supportReasonNeed, setSupportReasonNeed] = useState('');
  const [supportWhatsapp, setSupportWhatsapp] = useState('');
  const [isSupportSubmitting, setIsSupportSubmitting] = useState(false);
  const [isSupportSubmittedSuccessfully, setIsSupportSubmittedSuccessfully] = useState(false);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportName.trim() || !supportAge.trim() || !supportReasonLearn.trim() || !supportReasonNeed.trim() || !supportWhatsapp.trim()) {
      alert(t('common.validationAll'));
      return;
    }
    
    setIsSupportSubmitting(true);
    setTimeout(() => {
      setIsSupportSubmitting(false);
      setIsSupportSubmittedSuccessfully(true);
    }, 1500);
  };

  const handleSupportWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+996')) {
      val = '+996 ' + val.replace(/^\+?9?9?6?\s*/, '');
    }
    setSupportWhatsapp(val);
  };

  const handleResetSupportForm = () => {
    setSupportName('');
    setSupportAge('');
    setSupportCourse('quran');
    setSupportReasonLearn('');
    setSupportReasonNeed('');
    setSupportWhatsapp('');
    setIsSupportSubmittedSuccessfully(false);
  };

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [isContactSubmittedSuccessfully, setIsContactSubmittedSuccessfully] = useState(false);

  const handleContactPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+996')) {
      val = '+996 ' + val.replace(/^\+?9?9?6?\s*/, '');
    }
    setContactPhone(val);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || contactPhone.length < 13 || !contactMessage.trim()) {
      alert(t('common.validationAll'));
      return;
    }
    setIsContactSubmitting(true);
    setTimeout(() => {
      setIsContactSubmitting(false);
      setIsContactSubmittedSuccessfully(true);
    }, 1500);
  };

  const handleResetContactForm = () => {
    setContactName('');
    setContactPhone('');
    setContactMessage('');
    setIsContactSubmittedSuccessfully(false);
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-dark-indigo-deep islamic-grid-pattern overflow-x-hidden selection:bg-brand-teal selection:text-white transition-colors duration-300">
      
      {/* Modern Islamic Minimalist Header Section - Natural Tones theme */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 hover:border-brand-teal/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Brand typography - Responsive loaded image with custom fallback SVG logo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {logoSrcIdx < logoSources.length ? (
              <img 
                id="rauda-header-logo"
                src={logoSources[logoSrcIdx]} 
                alt="RAUDA" 
                className="h-[48px] sm:h-[54px] w-auto max-w-[190px] sm:max-w-[215px] object-contain transition-transform duration-300 hover:scale-102 cursor-pointer"
                referrerPolicy="no-referrer"
                onError={() => setLogoSrcIdx(prev => prev + 1)}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
            ) : (
              /* Highly detailed, custom vector SVG Logo combining Open Book/Leaves Mark and RAUDA Typography */
              <svg className="h-[48px] sm:h-[54px] w-[190px] sm:w-[215px] text-[#1b6dbb] dark:text-sky-400 shrink-0 select-none cursor-pointer transition-transform duration-300 hover:scale-102" viewBox="0 0 330 90" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <g transform="translate(10, 5)">
                  {/* Fanning leaves mimicking the real logo */}
                  <path d="M51.5 54.3C40.2 46.1 27.6 37.8 20.8 24.1C18.2 19 14.5 10.7 21 7C25.5 4.5 30.5 11 35.5 19C41.8 29.5 51.5 54.3 51.5 54.3Z" fill="currentColor" />
                  <path d="M53.5 54.3C45 39.5 36.5 24.5 31.8 11C29.8 5.5 28 -1.5 34.5 -3.5C40.5 -5 42.5 2 45.5 11.5Q49.3 25.5 53.5 54.3Z" fill="currentColor" />
                  <path d="M55.5 54.3Q52.5 36.5 49.5 18.7Q48.7 13.9 49.5 9Q50.2 3.8 52.5 1Q54 -0.8 56.5 0.5Q59.3 1.9 59.7 5.7Q60.5 11.5 59.5 18.7Q57.5 33 55.5 54.3Z" fill="currentColor" />
                  <path d="M57.5 54.3C62 39.5 69.5 25.5 77 15.5C82 8.5 87 2 92 6C96 9.5 90.5 17.5 85 27.5Q75.5 40 57.5 54.3Z" fill="currentColor" />
                  
                  {/* Double book bottom swooshes */}
                  <path d="M10 61C30 51.5 46.5 55.5 50 55.5Q51.5 55.5 53 55.5C56.5 55.5 73 51.5 93 61C73 56 56 61 53 61Q51.5 61 50 61C47 61 30 56 10 61Z" fill="currentColor" />
                  <path d="M10 65.5C30 56 46.5 60 50 60Q51.5 60 53 60C56.5 60 73 56 93 65.5C73 60.5 56 65.5 53 65.5Q51.5 65.5 50 65.5C47 65.5 30 60.5 10 65.5Z" fill="currentColor" opacity="0.4" />
                </g>
                <g transform="translate(115, 0)">
                  <text x="0" y="47" fontFamily="'Inter', 'Montserrat', 'Helvetica', sans-serif" fontWeight="900" fontSize="36" letterSpacing="0.05em" fill="currentColor">
                    RAUDA
                  </text>
                  <text x="1" y="66" fontFamily="'Inter', 'Montserrat', 'Helvetica', sans-serif" fontWeight="800" fontSize="11" letterSpacing="0.44em" fill="currentColor">
                    {lang === 'en' ? 'LANGUAGE CENTER' : lang === 'ru' ? 'ЯЗЫКОВОЙ ЦЕНТР' : 'ТИЛ БОРБОРУ'}
                  </text>
                </g>
              </svg>
            )}
          </div>

          {/* Desktop Navigation Links from Natural Tones Theme with equal spacing */}
          <div className="hidden lg:flex items-center justify-center gap-7 text-sm font-semibold text-slate-500 font-sans mx-auto">
            <span onClick={() => {
              const aboutSec = document.getElementById('about');
              if (aboutSec) aboutSec.scrollIntoView({ behavior: 'smooth' });
            }} className="hover:text-brand-teal cursor-pointer transition-colors duration-200 whitespace-nowrap">{t('nav.about')}</span>
            <span onClick={() => {
              const coursesSec = document.getElementById('courses');
              if (coursesSec) coursesSec.scrollIntoView({ behavior: 'smooth' });
            }} className="hover:text-brand-teal cursor-pointer transition-colors duration-200 whitespace-nowrap">{t('nav.courses')}</span>
            <span onClick={() => {
              const supportSec = document.getElementById('support-aid');
              if (supportSec) supportSec.scrollIntoView({ behavior: 'smooth' });
            }} className="hover:text-brand-teal cursor-pointer transition-colors duration-200 whitespace-nowrap">{t('nav.support')}</span>
            <span onClick={() => {
              const teachersSection = document.getElementById('teachers');
              if (teachersSection) teachersSection.scrollIntoView({ behavior: 'smooth' });
            }} className="hover:text-brand-teal cursor-pointer transition-colors duration-200 whitespace-nowrap">{t('nav.teachers')}</span>
            <span onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
            }} className="hover:text-brand-teal cursor-pointer transition-colors duration-200 whitespace-nowrap">{t('nav.contact')}</span>
          </div>

          {/* Minimalist Professional Actions & Contacts with balanced adaptive layouts */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">

            {/* Elegant Minimalist Theme Toggle Button with gentle hover responsiveness */}
            <button
              id="theme-toggle-btn"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="flex items-center justify-center w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full border border-slate-100 dark:border-brand-teal/20 bg-white dark:bg-dark-indigo-surface text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-dark-indigo-card transition-all cursor-pointer select-none active:scale-95 shadow-sm whitespace-nowrap shrink-0"
              title={theme === 'light' ? t('common.themeDark') : t('common.themeLight')}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-teal shrink-0" />
              ) : (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-teal shrink-0" />
              )}
            </button>
            
            {/* Custom Premium Smooth Language Switcher */}
            <div className="relative" ref={langDropdownRef}>
              <button
                id="lang-switcher-btn"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full border border-slate-100 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer select-none active:scale-95 shadow-sm whitespace-nowrap shrink-0"
              >
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-teal shrink-0" />
                <span className="uppercase">{LANGUAGES.find(l => l.code === lang)?.shortLabel}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-36 rounded-2xl bg-white border border-slate-100 shadow-xl py-1.5 z-50 origin-top-right overflow-hidden"
                  >
                    {LANGUAGES.map((item) => (
                      <button
                        key={item.code}
                        id={`lang-opt-${item.code}`}
                        onClick={() => changeLanguage(item.code)}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-left text-xs sm:text-sm transition-colors cursor-pointer ${
                          lang === item.code 
                            ? 'bg-brand-teal/5 text-brand-teal font-bold' 
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-sm leading-none">{item.flag}</span>
                          <span>{item.label}</span>
                        </span>
                        {lang === item.code && <Check className="w-3.5 h-3.5 text-brand-teal" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Subtle elegant separation line on larger than mobile viewports */}
            <div className="hidden sm:block h-5 w-px bg-slate-200 shrink-0 self-center" />

            <a 
              href="tel:+996770123456" 
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-slate-100 bg-white hover:border-brand-teal/20 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-teal shrink-0" />
              <span className="font-sans leading-none">{t('common.phone')}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Luxury Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 relative">
        
        {/* Background Glowing Auroras (Natural Tones soft atmospheric layers) */}
        <div className="absolute top-1/4 right-0 -z-10 w-[500px] h-[500px] bg-sky-50 rounded-full blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute bottom-10 left-10 -z-10 w-[400px] h-[400px] bg-teal-50 rounded-full blur-2xl opacity-50 pointer-events-none translate-y-12" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography, Subtitle & Interactive Buttons */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Elegant upper trust badge / indicator */}
            <div className="inline-flex items-center gap-2 self-start px-4.5 py-1.5 rounded-full bg-teal-50/60 border border-brand-teal/20 mb-6 group hover:border-brand-teal/40 transition-all cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
              <span className="text-xs md:text-sm text-brand-teal tracking-wide font-semibold flex items-center gap-1">
                {t('hero.badge')} <Sparkles className="w-3.5 h-3.5 text-brand-gold inline" />
              </span>
            </div>

            {/* Giant Heading - Beautiful Serif & Sans Serif Pairing with crisp Natural Tones title hierarchy */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-brand-navy font-bold leading-[1.1] tracking-tight">
              {t('hero.titlePart1')} <br className="hidden sm:block" />
              <span className="relative inline-block text-brand-teal pb-2 pb-1 mr-2">
                {t('hero.titleHighlight')}
                {/* Decorative elegant underline ornament */}
                <span className="absolute left-0 bottom-0 w-full h-[3px] bg-gradient-to-r from-brand-gold via-brand-teal to-transparent rounded-full" />
              </span>
              {t('hero.titlePart2')}
            </h1>

            {/* Premium, comforting Subhead */}
            <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-600 font-sans font-light leading-relaxed max-w-2xl antialiased">
              {t('hero.subhead')}
            </p>

            {/* Brand Highlighted Trust Items */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 mb-10">
              <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 hover:border-brand-teal/20 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-teal-100/50 flex items-center justify-center text-brand-teal mb-3 group-hover:bg-brand-teal group-hover:text-white transition-all">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-brand-navy text-sm mb-1">{t('trust.teachers.title')}</h4>
                <p className="text-[11px] text-slate-500 leading-normal">{t('trust.teachers.desc')}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 hover:border-brand-teal/20 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-teal-100/50 flex items-center justify-center text-brand-teal mb-3 group-hover:bg-brand-teal group-hover:text-white transition-all">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-brand-navy text-sm mb-1">{t('trust.methods.title')}</h4>
                <p className="text-[11px] text-slate-500 leading-normal">{t('trust.methods.desc')}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 hover:border-brand-teal/20 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-teal-100/50 flex items-center justify-center text-brand-teal mb-3 group-hover:bg-brand-teal group-hover:text-white transition-all">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-brand-navy text-sm mb-1">{t('trust.schedule.title')}</h4>
                <p className="text-[11px] text-slate-500 leading-normal">{t('trust.schedule.desc')}</p>
              </div>
            </div>

            {/* The 2 Required Action Buttons - Beautifully configured in Natural Tones rounded-2xl geometry */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              
              <button 
                onClick={() => setIsEnrollModalOpen(true)}
                className="group px-8 py-4 rounded-2xl bg-brand-blue text-white font-semibold text-sm tracking-wide transition-all duration-300 shadow-xl shadow-brand-blue/20 hover:bg-brand-blue/90 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>{t('hero.btnEnroll')}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-slate-200" />
              </button>

              <button 
                onClick={() => {
                  const coursesSection = document.getElementById('courses');
                  if (coursesSection) coursesSection.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group px-8 py-4 rounded-2xl bg-white border-2 border-brand-teal/30 hover:border-brand-teal text-brand-teal font-semibold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>{t('hero.btnMore')}</span>
                <ChevronRight className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-all" />
              </button>
            </div>

            {/* Avatar pile + Statistics integrated into Natural Tones feel */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  <div className="w-9 h-9 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm flex items-center justify-center text-[10px] text-slate-600 font-bold">A</div>
                  <div className="w-9 h-9 rounded-full border-2 border-white bg-teal-100 overflow-hidden shadow-sm flex items-center justify-center text-[10px] text-brand-teal font-bold">Р</div>
                  <div className="w-9 h-9 rounded-full border-2 border-white bg-sky-100 overflow-hidden shadow-sm flex items-center justify-center text-[10px] text-brand-blue font-bold">Б</div>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-none">
                  <span className="text-brand-navy font-bold text-sm mr-1">500+</span> {t('hero.avatarText')}
                </p>
              </div>
              
              <div className="hidden sm:block w-px h-6 bg-slate-150" />

              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {t('hero.upcomingGroups')} <b className="text-slate-700 ml-0.5">{t('hero.upcomingDate')}</b>
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Premium, floating transparent Quran illustration on Rehal wood stand with glowing teal halo */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            
            {/* Soft Ambient Radial Behind the Book - Premium Multi-layered Glow (Teal, Cyan-blue, Soft Green-blue) */}
            {/* Layer 1: Wide Backdrop soft cyan-blue bloom */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] lg:w-[550px] lg:h-[550px] bg-gradient-to-tr from-brand-teal/10 via-brand-cyan/8 to-sky-400/5 dark:from-brand-teal/20 dark:via-brand-cyan/15 dark:to-sky-500/8 rounded-full blur-3xl pointer-events-none -z-10 animate-[pulse_8s_ease-in-out_infinite]" />
            {/* Layer 2: Medium glowing soft teal-blue core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px] bg-gradient-to-bl from-teal-400/12 via-[#2dd4bf]/10 to-sky-300/8 dark:from-teal-400/20 dark:via-[#2dd4bf]/15 dark:to-sky-300/10 rounded-full blur-2xl pointer-events-none -z-10 animate-[pulse_5s_ease-in-out_infinite]" />
            {/* Layer 3: Tight subtle green-blue anchor accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] bg-gradient-to-r from-[#0d9488]/15 to-[#34d399]/8 dark:from-[#0d9488]/22 dark:to-[#34d399]/12 rounded-full blur-xl pointer-events-none -z-10" />

            {/* Seamless Responsive Image Wrapper */}
            <div className="relative w-full max-w-[560px] lg:max-w-[620px] xl:max-w-[660px] flex items-center justify-center select-none">
              
              {/* Image-Wrapper Integrated High-Fidelity Glow that sits precisely behind the Quran Illustration */}
              <div className="absolute inset-0 m-auto w-[85%] h-[85%] rounded-full bg-gradient-to-tr from-brand-teal/8 via-brand-cyan/10 to-transparent dark:from-brand-teal/15 dark:via-brand-cyan/15 dark:to-transparent filter blur-2xl pointer-events-none -z-10 animate-[pulse_6s_ease-in-out_infinite] opacity-85" />

              <motion.img 
                id="rauda-quran-image"
                src="/input_file_1.png" 
                alt="Quran Illustration" 
                className="w-full h-auto object-contain filter drop-shadow-2xl brightness-100 dark:brightness-105 pointer-events-none relative z-10"
                referrerPolicy="no-referrer"
                initial={{ y: 0 }}
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              />

              {/* Float Premium Badge (With star icon) to keep elegant premium touch, beautifully adjusted */}
              <div id="float-badge" className="absolute -bottom-2 right-4 bg-brand-gold text-brand-gold-light text-[10px] md:text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg border border-brand-gold/40 flex items-center gap-1.5 backdrop-blur-sm select-none animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold-light" />
                <span>{t('hero.badgeSpiritual')}</span>
              </div>
            </div>
            
          </div>

        </div>
      </main>

      {/* SECTION: БИЗ ЖӨНҮНДӨ (About us) - Natural Tones theme */}
      <section id="about" className="py-20 bg-slate-50/50 border-y border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-50 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Mission, values & detailed introduction */}
            <div className="lg:col-span-6 space-y-6">
              <div className="h-1.5 w-16 bg-brand-teal rounded-full" />
              
              <span className="text-xs uppercase tracking-[0.2em] text-brand-teal font-bold block">{t('about.badge')}</span>
              
              <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy font-bold leading-tight">
                {t('about.headlinePart1')} <br />
                <span className="text-brand-teal">{t('about.headlineHighlight')}</span> {t('about.headlinePart2')}
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                {t('about.p1')}
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                {t('about.p2')}
              </p>

              {/* Stat grid inside About Us */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-brand-navy">{t('about.stat1.title')}</h4>
                    <p className="text-xs text-slate-400 mt-1">{t('about.stat1.desc')}</p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-brand-navy">{t('about.stat2.title')}</h4>
                    <p className="text-xs text-slate-400 mt-1">{t('about.stat2.desc')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic decorative detail cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Card 1: Quran teaching */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-brand-teal/20 transition-all group hover:-translate-y-1 duration-300">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-brand-teal mb-4 group-hover:bg-brand-teal group-hover:text-white transition-all duration-300">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-brand-navy mb-2">{t('about.card1.title')}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  {t('about.card1.desc')}
                </p>
              </div>

              {/* Card 2: Modern Education */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-brand-teal/20 transition-all group hover:-translate-y-1 duration-300">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-brand-teal mb-4 group-hover:bg-brand-teal group-hover:text-white transition-all duration-300">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-brand-navy mb-2">{t('about.card2.title')}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  {t('about.card2.desc')}
                </p>
              </div>

              {/* Card 3: Warm atmosphere */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-brand-teal/20 transition-all group hover:-translate-y-1 duration-300 sm:col-span-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 group-hover:bg-brand-gold group-hover:text-white transition-all duration-300">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-brand-navy mb-1">{t('about.card3.title')}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      {t('about.card3.desc')}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION: КУРСТАР (Courses) - Natural Tones cards */}
      <section id="courses" className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header portion */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-teal font-bold block">{t('courses.badge')}</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy font-bold">{t('courses.title')}</h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full" />
            <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
              {t('courses.sub')}
            </p>
          </div>

          {/* Courses grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Course Card 1: Quran reading and understanding */}
            <div className="bg-white rounded-2xl border border-slate-100 hover:border-brand-teal/20 shadow-sm hover:shadow-brand-teal/5 transition-all duration-300 flex flex-col h-full group overflow-hidden">
              <div className="p-6 flex-1 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-brand-teal mb-5 group-hover:bg-brand-teal group-hover:text-white transition-all duration-300">
                  <BookOpen className="w-6 h-6" />
                </div>

                <h3 className="font-serif font-bold text-xl text-brand-navy mb-3 group-hover:text-brand-teal transition-colors">{t('courses.quranTitle')}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light mb-6 flex-1">
                  {t('courses.quranDesc')}
                </p>

                <div className="space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{t('courses.duration')}</span>
                    <span className="font-bold text-brand-navy">{lang === 'en' ? '3 months' : lang === 'ru' ? '3 месяца' : '3 ай'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{t('courses.intensity')}</span>
                    <span className="font-bold text-brand-navy">{lang === 'en' ? '3 times a week' : lang === 'ru' ? '3 раза in week' : 'Жумасына 3 жолу'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{t('courses.level')}</span>
                    <span className="font-bold text-brand-teal bg-teal-50 px-2 py-0.5 rounded text-[10px]">{lang === 'en' ? 'From scratch' : lang === 'ru' ? 'С нуля' : 'Нөлдөн баштап'}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50/50 border-t border-slate-100/60 flex items-center gap-3">
                <button 
                  onClick={() => {
                    setFormCourse('quran');
                    setIsEnrollModalOpen(true);
                  }}
                  className="flex-1 py-3 bg-brand-blue hover:bg-brand-teal text-white rounded-xl text-center text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer"
                >
                  {t('courses.btnEnroll')}
                </button>
                <button 
                  onClick={() => {
                    setSelectedCourseTab('quran');
                    setIsExplorerOpen(true);
                  }}
                  className="px-4 py-3 bg-white border border-slate-250 hover:border-brand-teal/30 hover:text-brand-teal text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  {t('courses.btnMore')}
                </button>
              </div>
            </div>

            {/* Course Card 2: Arabic language */}
            <div className="bg-white rounded-2xl border border-slate-100 hover:border-brand-teal/20 shadow-sm hover:shadow-brand-teal/5 transition-all duration-300 flex flex-col h-full group overflow-hidden">
              <div className="p-6 flex-1 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-brand-teal mb-5 group-hover:bg-brand-teal group-hover:text-white transition-all duration-300">
                  <GraduationCap className="w-6 h-6" />
                </div>

                <h3 className="font-serif font-bold text-xl text-brand-navy mb-3 group-hover:text-brand-teal transition-colors">{t('courses.arabicTitle')}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light mb-6 flex-1">
                  {t('courses.arabicDesc')}
                </p>

                <div className="space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{t('courses.duration')}</span>
                    <span className="font-bold text-brand-navy">{lang === 'en' ? '6 months' : lang === 'ru' ? '6 месяцев' : '6 ай'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{t('courses.intensity')}</span>
                    <span className="font-bold text-brand-navy">{lang === 'en' ? '3 times a week' : lang === 'ru' ? '3 раза в неделю' : 'Жумасына 3 жолу'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{t('courses.level')}</span>
                    <span className="font-bold text-brand-navy bg-slate-100 px-2 py-0.5 rounded text-[10px]">{lang === 'en' ? 'Beginner / Intermediate' : lang === 'ru' ? 'Начальный / Средний' : 'Орто / Башталгыч'}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50/50 border-t border-slate-100/60 flex items-center gap-3">
                <button 
                  onClick={() => {
                    setFormCourse('arabic');
                    setIsEnrollModalOpen(true);
                  }}
                  className="flex-1 py-3 bg-brand-blue hover:bg-brand-teal text-white rounded-xl text-center text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer"
                >
                  {t('courses.btnEnroll')}
                </button>
                <button 
                  onClick={() => {
                    setSelectedCourseTab('arabic');
                    setIsExplorerOpen(true);
                  }}
                  className="px-4 py-3 bg-white border border-slate-250 hover:border-brand-teal/30 hover:text-brand-teal text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  {t('courses.btnMore')}
                </button>
              </div>
            </div>

            {/* Course Card 3: English language */}
            <div className="bg-white rounded-2xl border border-slate-100 hover:border-brand-teal/20 shadow-sm hover:shadow-brand-teal/5 transition-all duration-300 flex flex-col h-full group overflow-hidden">
              <div className="p-6 flex-1 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-brand-teal mb-5 group-hover:bg-brand-teal group-hover:text-white transition-all duration-300">
                  <Award className="w-6 h-6" />
                </div>

                <h3 className="font-serif font-bold text-xl text-brand-navy mb-3 group-hover:text-brand-teal transition-colors">{t('courses.englishTitle')}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light mb-6 flex-1">
                  {t('courses.englishDesc')}
                </p>

                <div className="space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{t('courses.duration')}</span>
                    <span className="font-bold text-brand-navy">{lang === 'en' ? '4 months' : lang === 'ru' ? '4 месяца' : '4 ай'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{t('courses.intensity')}</span>
                    <span className="font-bold text-brand-navy">{lang === 'en' ? '3 times a week' : lang === 'ru' ? '3 раза в неделю' : 'Жумасына 3 жолу'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{t('courses.level')}</span>
                    <span className="font-bold text-brand-navy bg-slate-100 px-2 py-0.5 rounded text-[10px]">{lang === 'en' ? 'Any level' : lang === 'ru' ? 'Любой уровень' : 'Баардык деңгээлдер'}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50/50 border-t border-slate-100/60 flex items-center gap-3">
                <button 
                  onClick={() => {
                    setFormCourse('english');
                    setIsEnrollModalOpen(true);
                  }}
                  className="flex-1 py-3 bg-brand-blue hover:bg-brand-teal text-white rounded-xl text-center text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer"
                >
                  {t('courses.btnEnroll')}
                </button>
                <button 
                  onClick={() => {
                    setSelectedCourseTab('english');
                    setIsExplorerOpen(true);
                  }}
                  className="px-4 py-3 bg-white border border-slate-250 hover:border-brand-teal/30 hover:text-brand-teal text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  {t('courses.btnMore')}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: БИЛИМ КОЛДОО ПРОГРАММАСЫ (Educational Support Program) - Soft highlighted premium design */}
      <section id="support-aid" className="py-20 bg-teal-50/20 border-t border-slate-100 relative overflow-hidden">
        {/* Background ambient light */}
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-teal-100/30 rounded-full blur-3xl opacity-60 pointer-events-none -translate-x-1/2" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-amber-50/50 rounded-full blur-2xl opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Program info with dignity & warm message */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-brand-teal/20">
                <Heart className="w-3.5 h-3.5 text-brand-teal fill-brand-teal/15 animate-pulse" />
                <span className="text-xs text-brand-teal font-bold uppercase tracking-wider">{t('support.badge')}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy font-bold leading-tight">
                {t('support.title')}
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                {t('support.p1')}
              </p>

              <div className="p-5 rounded-2xl bg-white border border-brand-teal/10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-teal" />
                <p className="text-sm md:text-base text-brand-navy font-medium leading-relaxed">
                  {t('support.pHighlight')}
                </p>
                <p className="text-xs text-slate-400 mt-2.5 font-light">
                  {t('support.pNote')}
                </p>
              </div>

              {/* Selection Process Timeline */}
              <div className="space-y-4 pt-4">
                <h3 className="font-serif font-bold text-lg text-brand-navy flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  {t('support.processTitle')}
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 pt-2">
                  {[
                    { id: 1, title: t('support.step1.title'), desc: t('support.step1.desc') },
                    { id: 2, title: t('support.step2.title'), desc: t('support.step2.desc') },
                    { id: 3, title: t('support.step3.title'), desc: t('support.step3.desc') },
                    { id: 4, title: t('support.step4.title'), desc: t('support.step4.desc') },
                    { id: 5, title: t('support.step5.title'), desc: t('support.step5.desc') }
                  ].map((step, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs text-center flex flex-col justify-between relative group hover:border-brand-teal/20 transition-all">
                      <div className="w-7 h-7 rounded-full bg-teal-50 text-brand-teal font-bold text-xs flex items-center justify-center mx-auto mb-2 group-hover:bg-brand-teal group-hover:text-white transition-all">
                        {step.id}
                      </div>
                      <h4 className="font-semibold text-xs text-brand-navy mb-1 leading-tight">{step.title}</h4>
                      <p className="text-[10px] text-slate-400 leading-normal font-light">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Interaction Form Card */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-150/60 shadow-xl relative">
              <div className="absolute top-2 right-2 p-1.5 opacity-[0.03] pointer-events-none">
                <Heart className="w-24 h-24 text-brand-teal" />
              </div>

              {isSupportSubmittedSuccessfully ? (
                // Success State with clean respect tone
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-8 h-8" strokeWidth={3} />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-brand-navy">{t('support.successTitle')}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                    {t('support.successDesc')}
                  </p>
                  <p className="text-[11px] text-slate-400 font-light">
                    {t('support.successDisclaimer')}
                  </p>
                  <button
                    onClick={handleResetSupportForm}
                    className="mt-4 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    {t('support.btnReset')}
                  </button>
                </div>
              ) : (
                // Form Interface
                <form onSubmit={handleSupportSubmit} className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="font-serif font-bold text-lg text-brand-navy">{t('support.formTitle')}</h3>
                    <p className="text-xs text-slate-400 font-light mt-0.5">{t('support.formSub')}</p>
                  </div>

                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">{t('support.fieldName')}</label>
                    <input
                      type="text"
                      required
                      placeholder={t('support.placeholderName')}
                      value={supportName}
                      onChange={(e) => setSupportName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/40 focus:border-brand-teal font-light"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Age field */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">{t('support.fieldAge')}</label>
                      <input
                        type="number"
                        min="7"
                        max="120"
                        required
                        placeholder={t('support.placeholderAge')}
                        value={supportAge}
                        onChange={(e) => setSupportAge(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/40 focus:border-brand-teal font-light"
                      />
                    </div>

                    {/* Course select field */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">{t('support.fieldCourse')}</label>
                      <select
                        value={supportCourse}
                        onChange={(e) => setSupportCourse(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/40 focus:border-brand-teal text-slate-700 font-light bg-white"
                      >
                        <option value="quran">{t('courses.quranTitle')}</option>
                        <option value="arabic">{t('courses.arabicTitle')}</option>
                        <option value="english">{t('courses.englishTitle')}</option>
                      </select>
                    </div>
                  </div>

                  {/* Why learn quran ? */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">{t('support.fieldReasonLearn')}</label>
                    <textarea
                      required
                      rows={2}
                      placeholder={t('support.placeholderReasonLearn')}
                      value={supportReasonLearn}
                      onChange={(e) => setSupportReasonLearn(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/40 focus:border-brand-teal font-light resize-none"
                    />
                  </div>

                  {/* Why need support ? */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">{t('support.fieldReasonNeed')}</label>
                    <textarea
                      required
                      rows={2}
                      placeholder={t('support.placeholderReasonNeed')}
                      value={supportReasonNeed}
                      onChange={(e) => setSupportReasonNeed(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/40 focus:border-brand-teal font-light resize-none"
                    />
                  </div>

                  {/* WhatsApp Number field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">{t('support.fieldWhatsapp')}</label>
                    <input
                      type="text"
                      required
                      placeholder="+996 555 123 456"
                      value={supportWhatsapp}
                      onChange={handleSupportWhatsappChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal/40 focus:border-brand-teal font-light"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSupportSubmitting}
                    className="w-full py-3.5 bg-brand-blue hover:bg-brand-teal text-white rounded-xl text-center text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                  >
                    {isSupportSubmitting ? (
                      <span className="flex items-center gap-2 animate-pulse">
                        <span>{t('support.submitting')}</span>
                      </span>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 text-brand-gold-light group-hover:scale-115 transition-transform" />
                        <span>{t('support.btnSubmit')}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: МУГАЛИМДЕР (Teachers) - Minimalist & Warm design */}
      <section id="teachers" className="py-20 bg-white relative overflow-hidden">
        {/* Decorative background details */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header portion */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-teal font-bold block">{t('teachers.badge')}</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy font-bold">{t('teachers.title')}</h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full" />
            <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
              {t('teachers.sub')}
            </p>
          </div>

          {/* Teachers grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Teacher 1: Aisha Bekova */}
            <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100 hover:border-brand-teal/20 transition-all duration-300 group text-center flex flex-col justify-between">
              <div>
                {/* Elegant placeholder frame for Aisha Bekova */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-brand-teal/10 to-teal-500/10 border border-brand-teal/10 mx-auto flex items-center justify-center relative overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                  <User className="w-10 h-10 text-brand-teal opacity-80" />
                  <span className="absolute bottom-2 bg-brand-teal text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">{t('teachers.t1.badge')}</span>
                </div>

                <h3 className="font-serif font-bold text-xl text-brand-navy mb-1 group-hover:text-brand-teal transition-colors">{t('teachers.t1.name')}</h3>
                <span className="text-xs font-semibold text-brand-gold uppercase tracking-wider block mb-4">{t('teachers.t1.title')}</span>
                
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light mb-6">
                  {t('teachers.t1.desc')}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100/60 text-[11px] text-slate-400 flex items-center justify-center gap-1.5 font-light" id="experience-stat-1">
                <Check className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                <span>{t('teachers.t1.exp')}</span>
              </div>
            </div>

            {/* Teacher 2: Medina Isaeva */}
            <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100 hover:border-brand-teal/20 transition-all duration-300 group text-center flex flex-col justify-between">
              <div>
                {/* Elegant placeholder frame for Medina Isaeva */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-brand-teal/10 to-teal-500/10 border border-brand-teal/10 mx-auto flex items-center justify-center relative overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                  <User className="w-10 h-10 text-brand-teal opacity-80" />
                  <span className="absolute bottom-2 bg-brand-teal text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">{t('teachers.t2.badge')}</span>
                </div>

                <h3 className="font-serif font-bold text-xl text-brand-navy mb-1 group-hover:text-brand-teal transition-colors">{t('teachers.t2.name')}</h3>
                <span className="text-xs font-semibold text-brand-gold uppercase tracking-wider block mb-4">{t('teachers.t2.title')}</span>
                
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light mb-6">
                  {t('teachers.t2.desc')}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100/60 text-[11px] text-slate-400 flex items-center justify-center gap-1.5 font-light" id="experience-stat-2">
                <Check className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                <span>{t('teachers.t2.exp')}</span>
              </div>
            </div>

            {/* Teacher 3: Amankul Karimov */}
            <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100 hover:border-brand-teal/20 transition-all duration-300 group text-center flex flex-col justify-between">
              <div>
                {/* Elegant placeholder frame for Amankul Karimov */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-brand-teal/10 to-teal-500/10 border border-brand-teal/10 mx-auto flex items-center justify-center relative overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                  <User className="w-10 h-10 text-brand-teal opacity-80" />
                  <span className="absolute bottom-2 bg-brand-navy text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">{t('teachers.t3.badge')}</span>
                </div>

                <h3 className="font-serif font-bold text-xl text-brand-navy mb-1 group-hover:text-brand-teal transition-colors">{t('teachers.t3.name')}</h3>
                <span className="text-xs font-semibold text-brand-gold uppercase tracking-wider block mb-4">{t('teachers.t3.title')}</span>
                
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light mb-6">
                  {t('teachers.t3.desc')}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100/60 text-[11px] text-slate-400 flex items-center justify-center gap-1.5 font-light" id="experience-stat-3">
                <Check className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                <span>{t('teachers.t3.exp')}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: ОКУУЧУЛАРДЫН ПИКИРЛЕРИ (Student reviews) - Clean Grid design */}
      <section id="reviews" className="py-20 bg-slate-50/50 border-t border-slate-100 relative overflow-hidden">
        {/* Background blobs for premium depth */}
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-teal-50 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-12 w-60 h-60 bg-sky-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-teal font-bold block">{t('reviews.badge')}</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy font-bold">{t('reviews.title')}</h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto rounded-full" />
            <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
              {t('reviews.sub')}
            </p>
          </div>

          {/* Testimonial cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Review Card 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow" id="review-card-1">
              <div className="space-y-4">
                {/* Quote Icon Background ornament */}
                <div className="absolute top-6 right-8 text-teal-100 opacity-20">
                  <Quote className="w-10 h-10" />
                </div>
                
                {/* Star Rating */}
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light font-serif italic relative z-10">
                  {t('reviews.r1.text')}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-brand-teal font-bold text-xs flex items-center justify-center shrink-0">
                  АБ
                </div>
                <div>
                  <h4 className="font-bold text-xs text-brand-navy">{t('reviews.r1.name')}</h4>
                  <p className="text-[10px] text-slate-400">{t('reviews.r1.age')}</p>
                </div>
              </div>
            </div>

            {/* Review Card 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow" id="review-card-2">
              <div className="space-y-4">
                <div className="absolute top-6 right-8 text-teal-100 opacity-20">
                  <Quote className="w-10 h-10" />
                </div>
                
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light font-serif italic relative z-10">
                  {t('reviews.r2.text')}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-brand-teal font-bold text-xs flex items-center justify-center shrink-0">
                  МА
                </div>
                <div>
                  <h4 className="font-bold text-xs text-brand-navy">{t('reviews.r2.name')}</h4>
                  <p className="text-[10px] text-slate-400">{t('reviews.r2.age')}</p>
                </div>
              </div>
            </div>

            {/* Review Card 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow" id="review-card-3">
              <div className="space-y-4">
                <div className="absolute top-6 right-8 text-teal-150 opacity-20">
                  <Quote className="w-10 h-10" />
                </div>
                
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light font-serif italic relative z-10">
                  {t('reviews.r3.text')}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-55 text-brand-teal font-bold text-xs flex items-center justify-center shrink-0">
                  НТ
                </div>
                <div>
                  <h4 className="font-bold text-xs text-brand-navy">{t('reviews.r3.name')}</h4>
                  <p className="text-[10px] text-slate-400">{t('reviews.r3.age')}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: БАЙЛАНЫШ (Contact) - Splendid Full-width Bento block layout */}
      <section id="contact" className="py-20 bg-white relative overflow-hidden">
        {/* Ambient effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-slate-50 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Column 1: Direct links (WhatsApp, Instagram, Tel) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.25em] text-brand-teal font-bold block font-bold block">
                  {t('contact.badge')}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-brand-navy font-bold">
                  {t('contact.title')}
                </h2>
                <div className="w-12 h-1 bg-brand-gold rounded-full" />
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  {t('contact.sub')}
                </p>
              </div>

              {/* Quick Communication Blocks */}
              <div className="space-y-3.5 pt-4">
                
                {/* Whatsapp callout */}
                <a 
                  href="https://wa.me/996555123456" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-teal-50/40 hover:bg-teal-50 border border-brand-teal/10 hover:border-brand-teal/30 transition-all duration-200 group"
                  id="whatsapp-contact-link"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-400">{t('contact.whatsappTitle')}</h4>
                    <p className="font-semibold text-xs sm:text-sm text-brand-navy mt-0.5">+996 (555) 123-456</p>
                    <span className="text-[9px] text-emerald-600 font-semibold block">{t('contact.whatsappSub')}</span>
                  </div>
                </a>

                {/* Instagram block */}
                <a 
                  href="https://instagram.com/rauda_center" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-amber-50/15 hover:bg-amber-50/45 border border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-200 group"
                  id="instagram-contact-link"
                >
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-600 flex items-center justify-center shrink-0 group-hover:bg-pink-600 group-hover:text-white transition-all duration-300">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-400">{t('contact.instaTitle')}</h4>
                    <p className="font-semibold text-xs sm:text-sm text-brand-navy mt-0.5">@rauda_center</p>
                    <span className="text-[9px] text-pink-600 font-semibold block">{t('contact.instaSub')}</span>
                  </div>
                </a>

                {/* Direct Phone */}
                <a 
                  href="tel:+996555123456" 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 hover:border-brand-teal/20 transition-all duration-200 group"
                  id="phone-contact-link"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-400">{t('contact.phoneTitle')}</h4>
                    <p className="font-semibold text-xs sm:text-sm text-brand-navy mt-0.5">+996 (555) 123-456</p>
                    <span className="text-[9px] text-indigo-600 font-semibold block">{t('contact.phoneSub')}</span>
                  </div>
                </a>

              </div>
            </div>

            {/* Column 2: Google Map & Address Card */}
            <div className="lg:col-span-4 flex flex-col justify-between bg-white border border-slate-150/60 p-5 rounded-3xl shadow-xs relative overflow-hidden" id="map-address-bento-card">
              <div className="space-y-4 flex-1 flex flex-col justify-between text-left">
                
                {/* Header elements */}
                <div className="flex items-start gap-3.5 p-1">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-brand-teal flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">{t('contact.addressTitle')}</h4>
                    <p className="font-semibold text-xs sm:text-sm text-brand-navy mt-0.5">{t('contact.addressDesc')}</p>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{t('contact.addressSub')}</span>
                  </div>
                </div>

                {/* The Responsive Google Map Frame */}
                <div className="relative w-full h-[180px] sm:h-[195px] rounded-2xl border border-slate-100 shadow-inner overflow-hidden bg-slate-50 mt-2">
                  <iframe 
                    src="https://maps.google.com/maps?q=%D1%83%D0%BB.%20%D0%A5%D0%B2%D0%BE%D0%B9%D0%BD%D0%B0%D1%8F%2064%2F3%2C%20%D0%91%D0%B8%D1%88%D0%BA%D0%B5%D0%BA%2C%20%D0%9A%D1%8B%D1%80%D0%B3%D1%8B%D0%B7%D1%81%D1%82%D0%B0%D0%BD&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    name="Rauda Center Map Location"
                    title="Rauda Center Map Location"
                    className="w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>

                {/* Open in Google Maps Button */}
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=%D1%83%D0%BB.%20%D0%A5%D0%B2%D0%BE%D0%B9%D0%BD%D0%B0%D1%8F%2064%2F3%2C%20%D0%91%D0%B8%D1%88%D0%BA%D0%B5%D0%BA%2C%20%D0%9A%D1%8B%D1%80%D0%B3%D1%8B%D0%B7%D1%81%D1%82%D0%B0%D0%BD"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2.5 w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-brand-navy hover:bg-brand-teal text-white text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer group"
                >
                  <MapPin className="w-4 h-4 shrink-0 text-brand-gold group-hover:scale-110 transition-transform" />
                  <span>{t('contact.openMap')}</span>
                </a>

              </div>
            </div>

            {/* Column 3: Contact form */}
            <div className="lg:col-span-4 bg-slate-50/50 p-5 rounded-3xl border border-slate-100 flex flex-col justify-between shadow-xs">
              
              {isContactSubmittedSuccessfully ? (
                <div className="text-center py-12 space-y-4 my-auto">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-brand-navy">{t('contact.successTitle')}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                    {t('contact.successDesc')}
                  </p>
                  <button
                    type="button"
                    onClick={handleResetContactForm}
                    className="mt-6 px-6 py-2.5 bg-brand-blue hover:bg-brand-teal text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
                  >
                    {t('contact.btnReset')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-brand-navy font-semibold">{t('contact.formTitle')}</h3>
                    <p className="text-xs text-slate-400 mt-1 font-light">{t('contact.formSub')}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t('contact.fieldName')}</label>
                      <input 
                        type="text"
                        required
                        placeholder={t('contact.placeholderName')}
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-brand-teal/40 focus:border-brand-teal focus:outline-none transition-all placeholder:text-slate-350"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-semibold">{t('contact.fieldPhone')}</label>
                      <input 
                        type="tel"
                        required
                        placeholder="+996 555 123 456"
                        value={contactPhone}
                        onChange={handleContactPhoneChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-brand-teal/40 focus:border-brand-teal focus:outline-none transition-all placeholder:text-slate-350"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-semibold">{t('contact.fieldMessage')}</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder={t('contact.placeholderMessage')}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-brand-teal/40 focus:border-brand-teal focus:outline-none transition-all resize-none placeholder:text-slate-350"
                    />
                  </div>

                  {/* Compliance note */}
                  <div className="text-[10px] text-slate-400 font-light leading-relaxed">
                    {t('contact.compliance')}
                  </div>

                  {/* Submit contact button */}
                  <button 
                    type="submit"
                    disabled={isContactSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-brand-blue hover:bg-brand-teal text-white rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-brand-teal/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isContactSubmitting ? (
                      <span className="flex items-center gap-2 animate-pulse">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {t('contact.submitting')}
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-brand-gold-light" />
                        <span>{t('contact.btnSubmit')}</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* Interactive Feature 1: "Курска катталуу" ENROLLMENT FORM MODAL (Overlay) */}
      <AnimatePresence>
        {isEnrollModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark background glass backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetFormState}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Form dialogue structure container */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-10"
            >
              
              {/* Top design header of modal */}
              <div className="bg-gradient-to-r from-brand-navy to-brand-blue p-6 text-white relative">
                <button 
                  onClick={resetFormState}
                  className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">{t('enroll.title')}</h3>
                <p className="text-xs sm:text-sm text-brand-gold-light mt-1 font-light">{t('enroll.sub')}</p>
              </div>

              {/* Dynamic state check */}
              {!isSubmittedSuccessfully ? (
                // Actual Form UI
                <form onSubmit={handleSubmitEnroll} className="p-6 space-y-4">
                  
                  {/* Name field */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1.5">{t('enroll.fieldName')}</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input 
                        type="text"
                        required
                        placeholder={t('enroll.placeholderName')} 
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-brand-teal focus:bg-white focus:outline-none transition-all placeholder:text-slate-300"
                      />
                    </div>
                  </div>

                  {/* Phone field */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1.5">{t('enroll.fieldPhone')}</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input 
                        type="tel"
                        required
                        placeholder="+996 (___) __-__-__" 
                        value={formPhone}
                        onChange={handlePhoneChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-brand-teal focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">{t('enroll.fieldPhoneNote')}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Course Selection */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1.5">{t('enroll.fieldCourse')}</label>
                      <select 
                        value={formCourse}
                        onChange={(e) => setFormCourse(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm focus:border-brand-teal focus:bg-white focus:outline-none transition-all"
                      >
                        <option value="quran">{t('enroll.courseOptionQuran')}</option>
                        <option value="arabic">{t('enroll.courseOptionArabic')}</option>
                        <option value="tafsir">{t('enroll.courseOptionTafsir')}</option>
                        <option value="english">{t('enroll.courseOptionEnglish')}</option>
                      </select>
                    </div>

                    {/* Format Selector */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1.5">{t('enroll.fieldFormat')}</label>
                      <select 
                        value={formFormat}
                        onChange={(e) => setFormFormat(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm focus:border-brand-teal focus:bg-white focus:outline-none transition-all"
                      >
                        <option value="offline">{t('enroll.formatOffline')}</option>
                        <option value="online">{t('enroll.formatOnline')}</option>
                      </select>
                    </div>
                  </div>

                  {/* Time Selector */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1.5">{t('enroll.fieldTime')}</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'morning', label: t('enroll.timeMorning') },
                        { id: 'afternoon', label: t('enroll.timeAfternoon') },
                        { id: 'evening', label: t('enroll.timeEvening') }
                      ].map((time) => (
                        <button
                          key={time.id}
                          type="button"
                          onClick={() => setFormTime(time.id)}
                          className={`py-2 px-3 rounded-lg text-xs font-semibold text-center border transition-all ${
                            formTime === time.id 
                              ? 'bg-teal-50 border-brand-teal text-brand-teal' 
                              : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                          }`}
                        >
                          {time.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Confirm Submission button */}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 mt-2 bg-brand-teal hover:bg-brand-teal-light text-white rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-brand-teal/20 flex items-center justify-center gap-2 disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {t('enroll.submitting')}
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-brand-gold-light" />
                        <span>{t('enroll.btnConfirm')}</span>
                      </>
                    )}
                  </button>

                </form>
              ) : (
                // Stunning Submission Success screen
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="p-8 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  
                  <h4 className="font-serif text-2xl font-bold text-brand-navy mb-2">{t('enroll.successTitle')}</h4>
                  <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                    {t('enroll.successDesc1')}<b className="text-brand-teal">{t('enroll.successDesc2')}</b>{t('enroll.successDesc3')}
                  </p>

                  <div className="w-full p-4 rounded-xl bg-slate-50 text-left border border-slate-100 space-y-2 mb-6">
                    <div className="text-xs text-slate-400">{t('enroll.receiptTitle')}</div>
                    <div className="text-xs text-slate-700"><b>{t('enroll.receiptStudent')}:</b> {formName}</div>
                    <div className="text-xs text-slate-700"><b>{t('enroll.receiptCourse')}:</b> {COURSES_INFO.find(c => c.id === formCourse)?.title}</div>
                    <div className="text-xs text-slate-700"><b>{t('enroll.receiptFormat')}:</b> {formFormat === 'offline' ? t('enroll.formatOffline') : t('enroll.formatOnline')}</div>
                  </div>

                  <button 
                    onClick={resetFormState}
                    className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold rounded-lg transition-all"
                  >
                    {t('enroll.btnBack')}
                  </button>
                </motion.div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Feature 2: "Кененирээк маалымат" CURRICULUM EXPLORER (Slide-in Drawer) */}
      <AnimatePresence>
        {isExplorerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            
            {/* Background Backdrop blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExplorerOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Slide-out Panel container */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div 
                initial={{ translateX: "100%" }}
                animate={{ translateX: "0%" }}
                exit={{ translateX: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col"
              >
                
                {/* Header of curriculum explorer */}
                <div className="p-6 bg-gradient-to-r from-brand-navy splitted-gradient to-brand-blue text-white flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold">{t('explorer.title')}</h3>
                    <p className="text-xs text-brand-gold-light mt-1">{t('explorer.sub')}</p>
                  </div>
                  <button 
                    onClick={() => setIsExplorerOpen(false)}
                    className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Tabs to switch courses details */}
                <div className="border-b border-slate-100 bg-slate-50/50 p-4 shrink-0 overflow-x-auto flex gap-1.5 scrollbar-thin">
                  {COURSES_INFO.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => setSelectedCourseTab(course.id)}
                      className={`px-4 py-2.5 rounded-lg text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                        selectedCourseTab === course.id 
                          ? 'bg-white shadow text-brand-teal border border-slate-100' 
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      {course.title.split(' ')[0]} {/* Shorter word for tablet tabs */}
                    </button>
                  ))}
                </div>

                {/* Scrollable details of the selected course */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  
                  {/* Title & description */}
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand-teal">{t('explorer.tag')}</span>
                    <h4 className="font-serif text-2xl font-bold text-brand-navy mt-1">{currentCourseInfo.title}</h4>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">{currentCourseInfo.description}</p>
                  </div>

                  {/* Program stats cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-teal-50/40 rounded-xl border border-teal-100/30 text-center">
                      <Clock className="w-5 h-5 text-brand-teal mx-auto mb-1.5" />
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">{t('explorer.statDuration')}</div>
                      <div className="text-sm font-bold text-slate-800 mt-0.5">{currentCourseInfo.duration}</div>
                    </div>

                    <div className="p-3 bg-teal-50/40 rounded-xl border border-teal-100/30 text-center">
                      <Calendar className="w-5 h-5 text-brand-teal mx-auto mb-1.5" />
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">{t('explorer.statIntensity')}</div>
                      <div className="text-sm font-bold text-slate-800 mt-0.5">{currentCourseInfo.lessonsPerWeek}</div>
                    </div>

                    <div className="p-3 bg-teal-50/40 rounded-xl border border-teal-100/30 text-center">
                      <User className="w-5 h-5 text-brand-teal mx-auto mb-1.5" />
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">{t('explorer.statLevel')}</div>
                      <div className="text-sm font-bold text-slate-800 mt-0.5">{currentCourseInfo.level}</div>
                    </div>
                  </div>

                  {/* Expected Outcomes */}
                  <div className="space-y-3.5">
                    <h5 className="text-sm font-bold text-brand-navy uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-3 bg-brand-gold rounded-full" />
                      {t('explorer.outcomesTitle')}
                    </h5>
                    <div className="space-y-2.5">
                      {currentCourseInfo.outcomes.map((outcome, idx) => (
                        <div key={idx} className="flex gap-3 items-start p-3 rounded-lg bg-slate-50/60 border border-slate-100/40">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </div>
                          <span className="text-xs sm:text-sm text-slate-600">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Teacher credentials */}
                  <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-100 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-teal shadow-sm shrink-0 border border-slate-100">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">{t('explorer.teachersTitle')}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-normal">{currentCourseInfo.teachers}</p>
                    </div>
                  </div>

                </div>

                {/* Sticky CTA inside explorer footer */}
                <div className="p-6 border-t border-slate-100 shrink-0 bg-white shadow-xl flex items-center gap-4">
                  <button 
                    onClick={() => {
                      setIsExplorerOpen(false);
                      setIsEnrollModalOpen(true);
                    }}
                    className="flex-1 py-3.5 bg-brand-navy hover:bg-brand-teal text-white rounded-xl text-center text-sm font-bold tracking-wide transition-all duration-300 shadow-md"
                  >
                    {t('explorer.btnEnroll')}
                  </button>
                  <button 
                    onClick={() => setIsExplorerOpen(false)}
                    className="px-5 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-xl transition-all"
                  >
                    {t('explorer.btnClose')}
                  </button>
                </div>

              </motion.div>
            </div>

          </div>
        )}
      </AnimatePresence>

      {/* RICH BRAND FOOTER - Natural Tones theme */}
      <footer className="bg-brand-navy text-slate-100 border-t border-brand-teal/20 relative overflow-hidden pt-16 pb-8">
        {/* Subtle geometric elements background overlay */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-white/5">
            
            {/* Column 1: Brand details */}
            <div className="md:col-span-5 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white p-0.5 flex items-center justify-center shadow-lg shrink-0">
                  <div className="w-full h-full bg-brand-navy rounded-[9px] flex items-center justify-center relative overflow-hidden">
                    <svg className="w-6 h-6 text-brand-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                </div>
                <span className="font-serif font-bold text-xl text-white tracking-widest uppercase">РАУДА</span>
              </div>

              <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
                {t('footer.branding')}
              </p>

              {/* Social clickables */}
              <div className="flex items-center gap-3 pt-2">
                <a 
                  href="https://wa.me/996555123456" 
                  aria-label="WhatsApp" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-500 hover:text-white text-slate-300 flex items-center justify-center transition-all duration-300 border border-white/5"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a 
                  href="https://instagram.com/rauda_center" 
                  aria-label="Instagram" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-pink-600 hover:text-white text-slate-300 flex items-center justify-center transition-all duration-300 border border-white/5"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="tel:+996555123456" 
                  aria-label="Phone" 
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-teal hover:text-white text-slate-300 flex items-center justify-center transition-all duration-300 border border-white/5"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-serif font-bold text-sm text-brand-gold uppercase tracking-wider">{t('footer.linksTitle')}</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400 font-light">
                <li>
                  <a href="#about-us" className="hover:text-brand-teal transition-colors">{t('nav.about')}</a>
                </li>
                <li>
                  <a href="#courses" className="hover:text-brand-teal transition-colors">{t('nav.courses')}</a>
                </li>
                <li>
                  <a href="#support-program" className="hover:text-brand-teal transition-colors">{t('nav.support')}</a>
                </li>
                <li>
                  <a href="#teachers" className="hover:text-brand-teal transition-colors">{t('nav.teachers')}</a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-brand-teal transition-colors">{t('reviews.title')}</a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact details summary */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-serif font-bold text-sm text-brand-gold uppercase tracking-wider">{t('footer.officeTitle')}</h4>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-400 font-light text-left">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                  <span>{t('footer.address')}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>+996 (555) 123-456</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>rauda.center@gmail.com</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 text-center text-xs text-slate-500 font-light flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5">
            <p>© {new Date().getFullYear()} {t('footer.copy')}</p>
            <p className="flex items-center gap-1.5">
              <span>{t('footer.motto')}</span>
              <Heart className="w-3.5 h-3.5 text-brand-teal fill-brand-teal/20" />
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Modern Interactive Chatbot with helpful ready queries */}
      <Chatbot lang={lang} theme={theme} />

    </div>
  );
}
