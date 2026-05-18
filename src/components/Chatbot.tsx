import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Clock, 
  Sparkles, 
  Phone, 
  BookOpen, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  XCircle,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { type LanguageCode } from '../translations';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

interface ChatbotProps {
  lang: LanguageCode;
  theme: 'light' | 'dark';
}

const CHAT_DICTIONARY: Record<LanguageCode, {
  welcome: string;
  placeholder: string;
  tooltip: string;
  statusOnline: string;
  botTitle: string;
  options: { key: string; label: string }[];
  responses: Record<string, string>;
}> = {
  kg: {
    welcome: "Ассаламу алейкум! РАУДА билим борборунун чат-ботуна кош келиңиз. Сизге кантип жардам бере алам? Төмөндөгү баскычтарды тандап же каалаган сурооңузду жазсаңыз болот. 😊",
    placeholder: "Сурооңузду жазыңыз...",
    tooltip: "Сурооңуз барбы? 💬",
    statusOnline: "Ассистент • Онлайн",
    botTitle: "РАУДА Ассистент",
    options: [
      { key: 'courses', label: 'Курстар 📚' },
      { key: 'prices', label: 'Баалар 💰' },
      { key: 'schedule', label: 'График 📅' },
      { key: 'enroll', label: 'Катталуу ✍️' },
      { key: 'contacts', label: 'Байланыш 📞' }
    ],
    responses: {
      courses: "Бизде төмөнкү багыттар боюнча тереңдетилген курстар бар:\n\n📚 *Араб тили* (Куръан окуу жана маданияты, сүйлөө тили, негизги грамматика)\n📚 *Англис тили* (Башталгыч деңгээлден баштап эркин сүйлөөгө чейин)\n📚 *Түркия стипендияларына даярдоо* (YÖS, SAT сынактары жана кадамдык багыт)\n\nКурстар заманбап эффективдүү усулдар жана эң тажрыйбалуу мугалимдер тарабынан өтүлөт.",
      prices: "Биздин борбордо окуу акысы абдан арзан жана ийкемдүү:\n\n💰 *Араб тили курсу:* айына 3500 сомдон баштап\n💰 *Англис тили курсу:* айына 3800 сомдон баштап\n💰 *Түркия стипендияларына даярдоо:* айына 4500 сом\n\nОшондой эле, окууда өзгөчөлөнгөн студенттерге жана кошумча шарттарга муктаж жаштарга атайын Билим колдоо стипендиялары (жеңилдиктер) каралган! 🎁",
      schedule: "Сабактардын ырааттуу графиги эң сонун убакыттарга туураланган:\n\n🌅 *Эртең мененки тайпалар:* 09:00 - 11:00\n🌇 *Түштөн кийинки тайпалар:* 14:00 - 16:00\n🌃 *Кечки тайпалар:* 18:30 - 20:30\n\nСабактар жумасына 3 жолу, ар бир сабак 1.5–2 сааттан өтүлөт. Өзүңүзгө ылайыктуу убакытты тандасаңыз болот! 📅",
      enroll: "Биздин окуу курсубузга катталуу абдан оңой! Сайттагы 'Азыр катталуу' баскычын колдонуңуз же дароо ушул чатка атыңызды жана телефон номериңизди калтырыңыз. 😉\n\nБиздин билим берүү кураторубуз тез арада чалып, деңгээлиңизди аныктайт жана ыңгайлуу тайпаны тандап берет!",
      contacts: "Биз менен байланышуу жолдору:\n\n📞 *Телефон:* +996 (770) 123-456\n💬 *WhatsApp:* +996 (555) 123-456\n📍 *Дарегибиз:* Бишкек шаары, Чүй проспектиси 120\n📷 *Instagram:* @rauda_center\n\nЖумуш убактысы: Жумуш күндөрү саат 09:00дөн 21:00гө чейин. Сизди күтөбүз! ✨",
      leadConfirmation: "Рахмат! Атыңыз жана байланыш номериңиз кабыл алынды. Биздин кеңешчи сизге жакынкы убакта телефон аркылуу байланышат. 📞🌟",
      defaultRep: "Сурооңуз боюнча толук маалыматты тактоо үчүн бизге түз чалсаңыз же ушул чатка атыңызды жана телефон номериңизди калтырыңыз. Менеджерлерибиз сизге баарын кенен түшүндүрүп чалышат! 😊\n\n📞 +996 (770) 123-456\n💬 WhatsApp: +996 (555) 123-456"
    }
  },
  ru: {
    welcome: "Ассаламу алейкум! Добро пожаловать в чат-бот образовательного центра РАУДА. Чем я могу помочь вам? Выберите готовый вопрос ниже или напишите свой. 😊",
    placeholder: "Напишите ваш вопрос...",
    tooltip: "Нужна помощь? 💬",
    statusOnline: "Ассистент • Онлайн",
    botTitle: "Ассистент РАУДА",
    options: [
      { key: 'courses', label: 'Курсы 📚' },
      { key: 'prices', label: 'Цены 💰' },
      { key: 'schedule', label: 'Расписание 📅' },
      { key: 'enroll', label: 'Запись ✍️' },
      { key: 'contacts', label: 'Контакты 📞' }
    ],
    responses: {
      courses: "Мы предлагаем углубленное и качественное обучение по следующим направлениям:\n\n📚 *Арабский язык* (Разговорный язык, грамматика, культура и чтение Корана)\n📚 *Английский язык* (От базового уровня до уровня уверенной разговорной речи)\n📚 *Подготовка к стипендиям Турции* (Подготовка к YÖS, SAT и профориентация)\n\nВсе курсы ведутся по самым современным методикам опытными преподавателями.",
      prices: "Стоимость обучения в нашем центре доступная и прозрачная:\n\n💰 *Курс арабского языка:* от 3500 сомов в месяц\n💰 *Курс английского языка:* от 3800 сомов в месяц\n💰 *Подготовка к грантам Турции:* 4500 сомов в месяц\n\nТакже у нас действует социальная программа Билим колдоо, предоставляющая специальные льготы и стипендии лучшим и нуждающимся студентам! 🎁",
      schedule: "Расписание занятий составлено максимально удобно для любой занятости:\n\n🌅 *Утренние группы:* 09:00 - 11:00\n🌇 *Дневные группы:* 14:00 - 16:00\n🌃 *Вечерние группы:* 18:30 - 20:30\n\nЗанятия проходят 3 раза в неделю, длительность каждого занятия составляет 1.5–2 часа. Записывайтесь в удобную смену! 📅",
      enroll: "Для записи на обучение нажмите кнопку 'Записаться сейчас' в шапке сайта или напишите ваше имя и номер телефона прямо сюда в чат. 😉\n\nМенеджер свяжется с вами в течение короткого времени, проконсультирует, поможет бесплатно определить ваш уровень и подберет группу!",
      contacts: "Наши контактные данные для связи:\n\n📞 *Телефон:* +996 (770) 123-456\n💬 *WhatsApp:* +996 (555) 123-456\n📍 *Адрес:* г. Бишкек, проспект Чуй 120\n📷 *Instagram:* @rauda_center\n\nМы работаем в будние дни с 09:00 до 21:00. Будем рады видеть вас у нас! ✨",
      leadConfirmation: "Спасибо! Ваше имя и контактный телефон успешно сохранены. Наш академический консультант перезвонит вам в ближайшие минуты! 📞🌟",
      defaultRep: "Чтобы детальнее ответить на ваш вопрос, свяжитесь с нами напрямую или оставьте свое имя и телефон прямо здесь в диалоге. Менеджер свяжется с вами и детально всё объяснит! 😊\n\n📞 +996 (770) 123-456\n💬 WhatsApp: +996 (555) 123-456"
    }
  },
  en: {
    welcome: "Assalamu alaykum! Welcome to the RAUDA Center chatbot. How can we assist you today? Please choose an option below or type your question. 😊",
    placeholder: "Type your question...",
    tooltip: "Need help? 💬",
    statusOnline: "Assistant • Online",
    botTitle: "RAUDA Assistant",
    options: [
      { key: 'courses', label: 'Courses 📚' },
      { key: 'prices', label: 'Prices 💰' },
      { key: 'schedule', label: 'Schedule 📅' },
      { key: 'enroll', label: 'Enrollment ✍️' },
      { key: 'contacts', label: 'Contacts 📞' }
    ],
    responses: {
      courses: "We offer professional and deep training in the following programs:\n\n📚 *Arabic Language* (Quranic reading, fluency, and essential grammar)\n📚 *English Language* (From Beginner levels to conversational fluency)\n📚 *Turkey Scholarships Prep* (Roadmap, YÖS and SAT preparation)\n\nOur classes are conducted by highly qualified teachers with international certification using the best modern textbooks.",
      prices: "Our tuition fees are highly competitive and flexible:\n\n💰 *Arabic Course:* starting from 3500 KGS per month\n💰 *English Course:* starting from 3800 KGS per month\n💰 *Turkey Scholarship Prep:* 4500 KGS per month\n\nSpecial educational rewards and financial aid scholarships are available for high-achieving and needy students! 🎁",
      schedule: "Our schedule shifts fit comfortably into any daily routine:\n\n🌅 *Morning groups:* 09:00 AM - 11:00 AM\n🌇 *Afternoon groups:* 02:00 PM - 04:00 PM\n🌃 *Evening groups:* 06:30 PM - 08:30 PM\n\nLessons are held 3 times a week, lasting 1.5–2 hours each. Choose your perfect session! 📅",
      enroll: "Enrolling is extremely easy! You can click the 'Enroll Now' button in the menu layout, or just share your name and contact phone number right here in this chat. 😉\n\nOur advisor will call you to identify your level and reserve your seat.",
      contacts: "Here are all the ways you can reach us:\n\n📞 *Call:* +996 (770) 123-456\n💬 *WhatsApp:* +996 (555) 123-456\n📍 *Address:* 120 Chuy Avenue, Bishkek\n📷 *Instagram:* @rauda_center\n\nOffice hours: Weekdays 09:00 AM - 09:00 PM. We look forward to meeting you! ✨",
      leadConfirmation: "Thank you! Your name and phone number have been successfully received. Our educational advisor will call you shortly! 📞🌟",
      defaultRep: "For specialized questions, feel free to drop your name and phone number here in this chatbot, or reach out to us directly!\n\n📞 Phone: +996 (770) 123-456\n💬 WhatsApp: +996 (555) 123-456"
    }
  }
};

export default function Chatbot({ lang, theme }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentDict = CHAT_DICTIONARY[lang] || CHAT_DICTIONARY.kg;

  // Show a helpful friendly tooltip helper after some delay to invite interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);

    // Hide tooltip automatically after 9 seconds if not opened
    const autoHide = setTimeout(() => {
      setShowTooltip(false);
    }, 13000);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoHide);
    };
  }, []);

  // Initialize welcome message from the assistant only once
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'bot',
          text: currentDict.welcome,
          timestamp: new Date()
        }
      ]);
    }
  }, [messages.length, currentDict.welcome]);

  // Handle language switch by replacing the first greeting if messages only have greeting
  useEffect(() => {
    setMessages(prev => {
      if (prev.length <= 1) {
        return [
          {
            id: 'welcome',
            sender: 'bot',
            text: currentDict.welcome,
            timestamp: new Date()
          }
        ];
      }
      return prev;
    });
  }, [lang, currentDict.welcome]);

  // Clean scrolling to bottom when message log updates
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Bot response generator based on key or typed query
  const handleBotResponse = (key: string, typedText?: string) => {
    setIsTyping(true);

    setTimeout(() => {
      let botResponseText = '';

      if (key && currentDict.responses[key]) {
        botResponseText = currentDict.responses[key];
      } else if (typedText) {
        const textLower = typedText.toLowerCase();
        
        // Smart Kyrgyz / Russian / English keyword matching
        const containsPhone = /(\+?996|\b0[2579]\d{2})\d{6}\b|(\b\d{9,10}\b)/.test(textLower);
        
        const isCourses = /курс|окуу|окуш|араб|англис|ыйс|граматик|сабак|класс|урок|арабск|английск|шпоргалк|scholarship|english|arabic|yös|sat/i.test(textLower);
        const isPrices = /баа|акча|сом|төлөө|скидк|арзан|билим колдоо|жеңилдик|оплата|цена|стоимост|скидка|акция|рубл|доллар|сомов|price|cost|fee|discount|scholarship/i.test(textLower);
        const isSchedule = /убакыт|ыраат|график|саат|күн|качан|интервал|расписан|время|дни|когда|смен|час|schedule|time|days|hour|when/i.test(textLower);
        const isEnroll = /каттал|жазыл|окугум|заявка|регистрац|запис|поступл|записат|зарегистрироват|начат|enroll|register|apply|join/i.test(textLower);
        const isContacts = /байланыш|телефон|номер|дарек|карта|инстаграм|ватсап|адрес|офис|чуй|бишкек|контакт|карта|instagram|whatsapp|phone|address|map|location|contact/i.test(textLower);

        if (containsPhone) {
          botResponseText = currentDict.responses.leadConfirmation;
        } else if (isCourses) {
          botResponseText = currentDict.responses.courses;
        } else if (isPrices) {
          botResponseText = currentDict.responses.prices;
        } else if (isSchedule) {
          botResponseText = currentDict.responses.schedule;
        } else if (isEnroll) {
          botResponseText = currentDict.responses.enroll;
        } else if (isContacts) {
          botResponseText = currentDict.responses.contacts;
        } else {
          botResponseText = currentDict.responses.defaultRep;
        }
      } else {
        botResponseText = currentDict.responses.defaultRep;
      }

      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'bot',
          text: botResponseText,
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
    }, 850);
  };

  // Click on predefined option
  const selectOption = (optKey: string, optLabel: string) => {
    if (isTyping) return;
    
    // Add user response
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: optLabel,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    handleBotResponse(optKey);
  };

  // Submit custom inquiry from keybaord input
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const typedText = inputValue;
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: typedText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    handleBotResponse('', typedText);
  };

  return (
    <div id="modern-floating-chatbot-container" className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      
      {/* Gentle responsive chat trigger button invitation helper tooltip */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            onClick={() => {
              setIsOpen(true);
              setShowTooltip(false);
            }}
            className="mb-3.5 mr-1 px-4 py-2.5 bg-white dark:bg-dark-indigo-surface hover:bg-slate-50 dark:hover:bg-dark-indigo-card border border-brand-teal/20 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-semibold rounded-2xl rounded-br-sm shadow-xl flex items-center gap-1.5 cursor-pointer transition-all hover:scale-102 select-none premium-shadow whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-brand-teal animate-pulse" />
            <span>{currentDict.tooltip}</span>
            <X 
              className="w-3 h-3 ml-1 text-slate-400 hover:text-red-500 transition-colors" 
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Beautiful Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.93 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-[calc(100vw-32px)] sm:w-[380px] h-[520px] max-h-[calc(105vh-160px)] md:max-h-[calc(100vh-120px)] rounded-3xl overflow-hidden shadow-2xl flex flex-col bg-white dark:bg-dark-indigo-surface border border-slate-100 dark:border-brand-teal/20 mb-4 premium-shadow"
          >
            {/* Elegant Header section with modern emerald gradient */}
            <div className="bg-gradient-to-r from-brand-navy via-[#0d9488] to-brand-teal px-5 py-4 flex items-center justify-between shrink-0 relative overflow-hidden">
              {/* Sparking geometric ornament background pattern overlay */}
              <div className="absolute inset-0 opacity-10 islamic-grid-pattern pointer-events-none" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 p-0.5 flex items-center justify-center">
                    <div className="w-full h-full bg-white text-brand-teal rounded-full flex items-center justify-center font-bold text-base shadow-inner">
                      Р
                    </div>
                  </div>
                  {/* Glowing online status pulse marker */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-brand-navy flex items-center justify-center">
                    <span className="absolute w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm leading-tight tracking-wide flex items-center gap-1.5">
                    {currentDict.botTitle}
                  </h4>
                  <span className="text-[10px] text-emerald-100/90 font-medium tracking-wide flex items-center gap-1">
                    {currentDict.statusOnline}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 text-white/90 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Continuous stream scrollable message log */}
            <div className="flex-1 p-4 bg-slate-50/40 dark:bg-dark-indigo-deep/30 overflow-y-auto space-y-4 scrollbar-thin flex flex-col">
              
              {messages.map((msg) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} gap-1`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] font-mono text-slate-400">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div
                      className={`px-3.5 py-2.5 text-xs sm:text-sm shadow-xs ${
                        isBot
                          ? 'bg-white dark:bg-dark-indigo-card border border-slate-100/80 dark:border-brand-teal/15 text-slate-800 dark:text-slate-100 rounded-2xl rounded-tl-none whitespace-pre-line leading-relaxed'
                          : 'bg-[#0d9488] text-white rounded-2xl rounded-tr-none font-medium'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {/* Bot Loading Dots Typing representation */}
              {isTyping && (
                <div className="flex flex-col items-start gap-1">
                  <span className="text-[9px] font-mono text-slate-400">
                    ...
                  </span>
                  <div className="px-5 py-3.5 bg-white dark:bg-dark-indigo-card border border-slate-100/80 dark:border-brand-teal/15 text-slate-400 rounded-2xl rounded-tl-none flex items-center gap-1 shadow-xs">
                    <span className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Touch Friendly Quick options panel wrapper */}
            <div className="flex flex-wrap gap-1.5 p-3 px-4 bg-white dark:bg-dark-indigo-surface border-t border-slate-100 dark:border-brand-teal/10 shrink-0">
              {currentDict.options.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => selectOption(opt.key, opt.label)}
                  disabled={isTyping}
                  className="px-2.5 py-1.5 bg-slate-50 dark:bg-dark-indigo-card hover:bg-[#0d9488]/10 dark:hover:bg-brand-teal/10 border border-slate-150/40 dark:border-brand-teal/20 hover:border-brand-teal/40 text-slate-700 dark:text-slate-200 text-xs rounded-full transition-all duration-200 font-semibold cursor-pointer select-none active:scale-95 disabled:opacity-50 inline-flex items-center whitespace-nowrap"
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Custom Manual Chat write message console */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-slate-50 dark:bg-dark-indigo-surface border-t border-slate-100 dark:border-brand-teal/20 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={currentDict.placeholder}
                maxLength={200}
                disabled={isTyping}
                className="flex-1 bg-white dark:bg-dark-indigo-card text-xs sm:text-sm border border-slate-200 dark:border-brand-teal/20 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1.5 focus:ring-brand-teal focus:border-brand-teal"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="w-10 h-10 rounded-full bg-[#0d9488] hover:bg-[#0f766e] text-white flex items-center justify-center transition-all cursor-pointer select-none active:scale-95 disabled:opacity-40 disabled:hover:bg-[#0d9488]"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Animated Sphere Toggle Bubble button */}
      <motion.button
        id="chatbot-floating-toggle-bubble"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#0d9488] through-[#11b981] to-brand-teal text-white flex items-center justify-center shadow-lg hover:shadow-brand-teal/30 cursor-pointer select-none z-10 overflow-hidden"
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="chat-icon"
              initial={{ rotate: -15, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 15, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 stroke-[2.2]" />
            </motion.div>
          ) : (
            <motion.div
              key="close-icon"
              initial={{ rotate: 15, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -15, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 stroke-[2.2]" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Soft elegant pulsing ring warning of action indicator */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border-2 border-brand-teal-light animate-ping opacity-20 pointer-events-none" />
        )}
      </motion.button>

    </div>
  );
}
