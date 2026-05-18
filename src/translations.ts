export interface CourseDetail {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  lessonsPerWeek: string;
  outcomes: string[];
  teachers: string;
}

export type LanguageCode = 'kg' | 'ru' | 'en';

export const LANGUAGES = [
  { code: 'kg', label: 'Кыргызча', shortLabel: 'KG', flag: '🇰🇬' },
  { code: 'ru', label: 'Русский', shortLabel: 'RU', flag: '🇷🇺' },
  { code: 'en', label: 'English', shortLabel: 'EN', flag: 'EN' }
] as const;

export const COURSES_INFO_LANG: Record<LanguageCode, CourseDetail[]> = {
  kg: [
    {
      id: 'quran',
      title: 'Ыйык Куран жана Тажвид',
      description: 'Ариптерден баштап, Куранды эрежеси (тажвид) менен кооз окууга чейинки толук сапар.',
      duration: '3 ай',
      level: 'Нөлдөн баштап',
      lessonsPerWeek: 'Жумасына 3 жолу',
      outcomes: ['Куран ариптерин туура махраж менен айтуу', 'Тажвиддин негизги эрежелерин өздөштүрүү', 'Сүрөлөрдү кооз жана катасыз окуу машыгуусу'],
      teachers: 'Египеттин ал-Азхар университетинен билим алган карылар'
    },
    {
      id: 'arabic',
      title: 'Араб тили (Медиана курсу)',
      description: 'Араб тилинде эркин сүйлөө, жазуу, окуу жана угуу жөндөмдөрүн системалуу өнүктүрүү.',
      duration: '6 ай',
      level: 'Башталгыч / Орто',
      lessonsPerWeek: 'Жумасына 3 жолу',
      outcomes: ['Араб тилинде эркин баарлашуу жана түшүнүү', 'Куран тексттерин жана сөздөрүн өз алдынча талдоо', 'Грамматика жана лексика базасын бекемдөө'],
      teachers: 'Көп жылдык тажрыйбасы бар адистер жана араб тилдүү мугалимдер'
    },
    {
      id: 'tafsir',
      title: 'Куран Тафсири жана Илимдери',
      description: 'Жүрөгүңүздү Куран нуру менен толтуруп, аяттардин маанилерин, түшүү тарыхын терең түшүнүү сабагы.',
      duration: '4 ай',
      level: 'Орто жана андан жогору',
      lessonsPerWeek: 'Жумасына 2 жолу',
      outcomes: ['Аяттардын акыйкаттарын жана коомдук насааттарын аңдоо', 'Сүрөлөрдүн тарыхый контексттерин билүү', 'Ишеним орнотуу жана руханий өсүү'],
      teachers: 'Ислам илимдеринин докторлору жана теолог адистер'
    },
    {
      id: 'english',
      title: 'Англис тили (Рауда усулу)',
      description: 'Сүйлөө практикасына багытталган заманбап жана интерактивдүү англис тили курсу.',
      duration: '4 ай',
      level: 'Каалаган деңгээл',
      lessonsPerWeek: 'Жумасына 3 жолу',
      outcomes: ['Тил барьерин тез арада кесип өтүү', 'Англис тилинде эркин диалог жана презентация', 'Грамматиканы жеңил деңгээлде түшүнүү'],
      teachers: 'Эл аралык сертификаттары бар улук окутуучулар'
    }
  ],
  ru: [
    {
      id: 'quran',
      title: 'Священный Коран и Таджвид',
      description: 'Полный путь от изучения букв арабского алфавита до красивого чтения Корана по правилам (таджвиду).',
      duration: '3 месяца',
      level: 'С нуля',
      lessonsPerWeek: '3 раза в неделю',
      outcomes: ['Правильное произношение букв Корана (махрадж)', 'Освоение основных правил таджвида', 'Красивое и безошибочное чтение сур'],
      teachers: 'Кари, получившие образование в престижном Египетском университете Аль-Азхар'
    },
    {
      id: 'arabic',
      title: 'Арабский язык (Курс Медиана)',
      description: 'Систематическое развитие навыков разговорной речи, письма, чтения и восприятия арабской речи на слух.',
      duration: '6 месяцев',
      level: 'Начальный / Средний',
      lessonsPerWeek: '3 раза в неделю',
      outcomes: ['Свободное общение и понимание на арабском языке', 'Самостоятельный анализ коранических текстов и слов', 'Укрепление грамматической и лексической базы'],
      teachers: 'Опытные специалисты с многолетним стажем и носители языка'
    },
    {
      id: 'tafsir',
      title: 'Тафсир Корана и Исламские науки',
      description: 'Наполнение сердца светом Корана через глубокое понимание смыслов аятов и истории их ниспослания.',
      duration: '4 месяца',
      level: 'Средний и выше',
      lessonsPerWeek: '2 раза в неделю',
      outcomes: ['Понимание внутренней сути аятов и общественных наставлений', 'Знание исторического контекста сур', 'Укрепление веры и духовный рост'],
      teachers: 'Доктора исламских наук и специалисты-теологи'
    },
    {
      id: 'english',
      title: 'Английский язык (Метод Рауда)',
      description: 'Современный интерактивный курс английского языка со строгим акцентом на разговорную практику.',
      duration: '4 месяца',
      level: 'Любой уровень',
      lessonsPerWeek: '3 раза в неделю',
      outcomes: ['Быстрое преодоление языкового барьера', 'Свободный диалог и проведение презентаций на английском', 'Освоение грамматики в легком и доступном формате'],
      teachers: 'Старшие преподаватели с международными сертификатами'
    }
  ],
  en: [
    {
      id: 'quran',
      title: 'Holy Quran and Tajwid',
      description: 'A complete journey starting from learning letters up to beautiful recitation of the Quran with rules (Tajwid).',
      duration: '3 months',
      level: 'From scratch',
      lessonsPerWeek: '3 times a week',
      outcomes: ['Correct articulation of Quranic letters (makhraj)', 'Mastery of foundational Tajwid rules', 'Practice of beautiful and error-free recitation of surahs'],
      teachers: 'Qaris who studied at Egypt\'s Al-Azhar University'
    },
    {
      id: 'arabic',
      title: 'Arabic Language (Mediana Course)',
      description: 'Systematic development of speaking, writing, reading, and listening skills in Modern Standard Arabic.',
      duration: '6 months',
      level: 'Beginner / Intermediate',
      lessonsPerWeek: '3 times a week',
      outcomes: ['Conversing and expressing ideas fluently in Arabic', 'Analyzing Quranic texts and words independently', 'Strengthening grammar and vocabulary foundation'],
      teachers: 'Native Arabic speakers and specialists with years of experience'
    },
    {
      id: 'tafsir',
      title: 'Quran Tafsir and Selected Sciences',
      description: 'Nourish your heart with Quranic light as you deeply understand the verses, meanings, and historical context.',
      duration: '4 months',
      level: 'Intermediate & above',
      lessonsPerWeek: '2 times a week',
      outcomes: ['Grasping the pure truths of verses and social guidance', 'Understanding the historical context of surahs', 'Fostering inner faith and spiritual growth'],
      teachers: 'Doctors of Islamic sciences and professional theologians'
    },
    {
      id: 'english',
      title: 'English Language (Rauda Method)',
      description: 'A modern and interactive English course with a comprehensive focus on speaking practice.',
      duration: '4 months',
      level: 'Any level',
      lessonsPerWeek: '3 times a week',
      outcomes: ['Breaking the language barrier quickly and safely', 'Fluent conversation and presentations in English', 'Acquiring grammar in an easy-to-understand format'],
      teachers: 'Senior instructors holding international teaching certificates'
    }
  ]
};

export const TRANSLATIONS: Record<LanguageCode, Record<string, any>> = {
  kg: {
    common: {
      phone: "+996 (770) 123-456",
      phoneRaw: "+996770123456",
      whatsappRaw: "https://wa.me/996555123456",
      instagramRaw: "https://instagram.com/rauda_center",
      phoneFooterRaw: "tel:+996555123456",
      validationPhoneName: "Сураныч, атыңызды жана телефон номериңизди толук киргизиңиз!",
      validationAll: "Сураныч, бардык маалыматтарды толук толтуруңуз!",
      themeLight: "Жарык режим",
      themeDark: "Караңгы режим"
    },
    nav: {
      about: "Биз жөнүндө",
      courses: "Биздин курстар",
      support: "Билим колдоо",
      teachers: "Биздин мугалимдер",
      contact: "Байланыш",
      enrollBtn: "Азыр катталуу"
    },
    banner: {
      opportunity: "МҮМКҮНЧҮЛҮК:",
      alert: "Куран окуу жана араб тили топторуна кабыл алуу кызуу жүрүүдө. Орун саны чектелүү!"
    },
    hero: {
      badge: "Кыргызстандагы эң заманбап окуу усулу",
      titlePart1: "Куранды туура окууга жана",
      titleHighlight: "түшүнүүгө сапар",
      titlePart2: "баштаңыз",
      subhead: "Араб тили, Англис тили, Куран окуу жана тафсир сабактары заманбап жана түшүнүктүү ыкмада. Борборубузда Сизге руханий тынчтык жана профессионалдык билим кепилденет.",
      btnEnroll: "Курска катталуу",
      btnMore: "Кененирээк маалымат",
      avatarText: "окуучу бизге ишеним артты",
      upcomingGroups: "Жакында башталчу топтор:",
      upcomingDate: "15-май",
      badgeSpiritual: "Ислам баалуулуктары",
      quranQuote: "رَّبِّ زِدْنِي عِلْمًا",
      quranQuoteTranslate: "«Оо, Раббим! Билимимди арттыр!»",
      quranQuoteSource: "Та-Ха сүрөөсү, 114-аят"
    },
    trust: {
      teachers: {
        title: "Квалификациялуу карылар",
        desc: "Араб өлкөлөрүндө такшалган адистер"
      },
      methods: {
        title: "Интерактивдүү методика",
        desc: "Ар бир студентке жеке усулдук мамиле"
      },
      schedule: {
        title: "Ийкемдүү ыңгайлуу график",
        desc: "Эртең мененки, түштөн кийинки жана кечки топтор"
      }
    },
    about: {
      badge: "Биз жөнүндө маалымат",
      headlinePart1: "Руханий тазалык жана",
      headlineHighlight: "заманбап терең билим",
      headlinePart2: "чөйрөсү",
      p1: "“Рауда Тил Борбору” — бул жөн гана сабак өтүүчү класс эмес. Сиздин жан дүйнөңүздү, руханий баалуулуктарыңызды Куран нурлары менен сугарып, заманбап заман талаптарына ылайык кошумча дүйнөлүк тилдерди (араб, англис) эң жогорку деңгээлде өздөштүрүүңүзгө шарт түзүүчү заманбап билим кутучасы.",
      p2: "Биздин негизги миссиябыз коомубузга Куран тилин жана маңызын жеткиликтүү, жеңил усулдар менен жайылтуу. Ар бир сабагыбыз тажрыйбалуу адистерибиздин жардамы менен жандуу жана унутулгус диалог түрүндө өнүгүп турат.",
      stat1: {
        title: "Билим Уясы",
        desc: "Окуучулардын 98%ы натыйжалуу көрсөткүчкө ээ"
      },
      stat2: {
        title: "Ыңгайлуу Жай",
        desc: "Борбордук шарт жана тынч, жылуу дубалдар"
      },
      card1: {
        title: "Куран үйрөтүү",
        desc: "Эрежелердин майда бөлүктөрүн (махраж, тажвид) так көрсөтүү менен Куранды туура кырааттоо. Сүрөөлөрдүн терең маанилери жана руханий сабагы."
      },
      card2: {
        title: "Заманбап окутуу",
        desc: "Кургак жаттоо эмес, интерактивдүү материалдар жана технологиялык куралдар. Тилдерди заманбап Рауда усулунда жеңил баарлашуу формасында үйрөнүү."
      },
      card3: {
        title: "Жылуу атмосфера",
        desc: "Биздин борбордо жылуу жана руханий орнотулган достук мамиле өкүм сүрөт. Ар бир сабак катышуучунун жан-дүйнөсүнө тынчтык, кубаныч жана ички ишеним тартуулайт. Сиз өзүңүздү эркин жана коопсуз үй-бүлөдөгүдөй сезесиз."
      }
    },
    courses: {
      badge: "Сапаттуу Окуу Программалары",
      title: "Ыңгайлуу топтор жана заманбап курстар",
      sub: "Сизге эң ылайыктуу болгон деңгээлди жана форматты тандап, келечегиңизге жана руханий дүйнөңүзгө карай баалуу кадамды ушул жерден таштаңыз.",
      duration: "Мөөнөтү:",
      intensity: "Интенсивдүүлүк:",
      level: "Баштапкы деңгээл:",
      btnEnroll: "Катталуу",
      btnMore: "Кененирээк",
      quranTitle: "Куран окуу жана түшүнүү",
      quranDesc: "Куран тамгаларын жазуу менен нөлдөн баштап, тажвид эрежелерин мыкты деңгээлде өздөштүрүү курсу. Аяттардын маңызын, түшүү тарыхын терең түшүнүүгө сугарылыңыз.",
      arabicTitle: "Араб тили",
      arabicDesc: "Сүйлөө, угуу, жазуу жана грамматиканы айкалыштырган Медиана заманбап усулу. Куран тилин түп нускасында окуп-түшүнүү жана эркин баарлашуу жөндөмдүүлүгү.",
      englishTitle: "Англис тили",
      englishDesc: "Сүйлөө практикасына багытталган заманбап Рауда интерактивдүү тил усулу. Тил барьерин коопсуз белгилүү деңгээлде угуу, жазуу жана сүйлөө аркылуу өстүрүү."
    },
    support: {
      badge: "Билим колдоо программасы",
      title: "Илимге умтулган ар бир адамга мүмкүнчүлүк",
      p1: "Рауда Тил Борбору Куран окууну жана түшүнүүнү чындап үйрөнгүсү келген, бирок финансылык мүмкүнчүлүгү чектелүү адамдар үчүн атайын билим колдоо программасын сунуштайт.",
      pHighlight: "Ар бир айда 2 окуучуга Куран окуу жана Куранды түшүнүү боюнча акысыз окуу мүмкүнчүлүгү берилет.",
      pNote: "* Бул демилге садака же жардам катары эмес, адамдын жеке кадыр-баркын сактаган, билим алууга болгон умтулуусун сыйлаган жылуу колдоо катары сунушталат.",
      processTitle: "Тандоо процесси",
      step1: { title: "Арыз калтырат", desc: "Сурам толтурулат" },
      step2: { title: "Карап чыгабыз", desc: "Арыз бааланат" },
      step3: { title: "Байланышуу", desc: "Сүйлөшүү жүрөт" },
      step4: { title: "Ишеним & Ниет", desc: "Ыкластуулугу каралат" },
      step5: { title: "Окуу чечими", desc: "Айына 2 окуучу" },
      formTitle: "Арыз Калтыруу",
      formSub: "Төмөнкү маалыматтарды калтырыңыз, биз байланышабыз",
      fieldName: "Аты-жөнүңүз",
      placeholderName: "Мисалы: Асан Усупов",
      fieldAge: "Жашыңыз",
      placeholderAge: "Мисалы: 25",
      fieldCourse: "Кызыккан курс",
      fieldReasonLearn: "Эмнеге Куран үйрөнгүңүз келет?",
      placeholderReasonLearn: "Сиздин асыл ниетиңиз же максатыңыз жөнүндө...",
      fieldReasonNeed: "Эмне үчүн бул программага кулач жайып жатасыз?",
      placeholderReasonNeed: "Турмуштук жагдайыңызды кыскача баяндап бериңиз...",
      fieldWhatsapp: "WhatsApp номериңиз",
      btnSubmit: "Арыз калтыруу",
      submitting: "Жиберилүүдө...",
      successTitle: "Арызыңыз кабыл алынды!",
      successDesc: "Сиздин асыл ниетиңиз жана билим алууга болгон умтулууңуз үчүн терең ыраазычылык билдиребиз. Биз ар бир сурамды сый-урмат менен карап чыгабыз жана жакында сиз менен байланышабыз.",
      successDisclaimer: "* Сиз калтырган бардык маалыматтар купуя сакталат жана башка эч кимге көрсөтүлбөйт.",
      btnReset: "Жаңы арыз калтыруу"
    },
    teachers: {
      badge: "Биздин Насаатчылар",
      title: "Тажрыйбалуу жана мээримдүү мугалимдерибиз",
      sub: "Ар бир студентибиздин туура өнүгүүсүнө жана руханий өсүүсүнө жан үрөгөн, өз ишинин чыныгы адистери.",
      t1: {
        name: "Айша Бекова",
        title: "Ыйык Куран жана Тажвид",
        badge: "Устаза",
        desc: "Египеттин эң абройлуу Ал-Азхар университетинен Ислам илимдери жана Куран окутуу багытында билим алган. Көп жылдык тажрыйбасы менен Куран тамгаларын эң кыска убакытта үйрөтүү усулуна ээ.",
        exp: "8 жылдык педагогикалык тажрыйба"
      },
      t2: {
        name: "Медина Исаева",
        title: "Араб Тилинин Адиси",
        badge: "Устаза",
        desc: "Улуттук университеттин филология багытын бүтүргөн. Чет өлкөлөрдө араб тилин үйрөтүүнүн заманбап жана интерактивдүү оюн усулдарын өздөштүргөн. Кургак грамматика эмес, сүйлөө практикасын биринчи орунга коёт.",
        exp: "6 жылдан бери араб тилин үйрөтөт"
      },
      t3: {
        name: "Аманкул Каримов",
        title: "Англис Тили Мугалими",
        badge: "Устаз",
        desc: "CELTA эл аралык сертификатынын ээси. Тил барьерин коопсуз жана ыңгайлуу жеңүү үчүн атайын сүйлөшүү клубдарын жана Рауда интерактивдүү усулун иштеп чыккан. Ар бир студентке достук мамиле жасайт.",
        exp: "Эл аралык тил үйрөтүү тажрыйбасы"
      }
    },
    reviews: {
      badge: "Жүрөктөн чыккан жакшы сөздөр",
      title: "Окуучуларыбыздын пикирлери",
      sub: "Биздин борбордо билим алып, жашоосунда чоң руханий жана заманбап өзгөрүүлөрдү байкаган студенттерибиздин ишенимдүү баяндары.",
      r1: {
        text: "“Нөлдөн баштап араб тамгаларын үйрөнүп, Араб тилинде эркин сүйлөйм деп такыр ойлогон эмесмин. Раудага жана мугалимдериме башымды ийип терең ыраазычылык билдирем! Сабактар абдан кызыктуу жана заманбап өтөт экен.”",
        name: "Алтынай Бектурсунова",
        age: "23 жашта, араб тили студенти"
      },
      r2: {
        text: "“Биринчи айда эле Куранды катасыз окууга жетиштим. Борбордун ичиндеги жылуулук маанай, сый мамиле сабакты калтырбай барууга дем-күч берет. Билим колдоо программасы ушундай кооз демилге кимдин гана жүрөгүн козгобойт!”",
        name: "Мирбек Асанов",
        age: "34 жашта, Ыйык Куран окуучусу"
      },
      r3: {
        text: "“Бул жерде топтогу ар бир адамга өзгөчө убакыт бөлүнөт. Мугалимдердин сабырдуулугу абдан чоң шык берди. Мугалимден Курандын сөз маанисин үйрөнгөндө аалам башкача ачылат экен. Баарыңыздарга сунуштайм.”",
        name: "Нургүл Турдубаева",
        age: "45 жашта, Куран жана Тафсир окуучусу"
      }
    },
    contact: {
      badge: "Биз ар дайым байланыштабыз",
      title: "Биз менен байланышыңыз",
      sub: "Окуу программалары, баасы жана топтордун убактысы боюнча суроолоруңуз калдыбы? Төмөнкү байланыш куралдары же форма аркылуу оңой кошулуп, маалымат алсаңыз болот.",
      whatsappTitle: "WhatsApp аркылуу жазуу",
      whatsappSub: "Тез арада жооп беребиз",
      instaTitle: "Instagram баракчабыз",
      instaSub: "Күнүмдүк маалыматтар",
      phoneTitle: "Түз чалуу (Борбордук номер)",
      phoneSub: "Ар күнү 09:00 - 21:00",
      addressTitle: "Биздин Дарек",
      addressDesc: "Дордой району, Хвойная көчөсү 64/3",
      addressSub: "Бишкек шаары, жаңы заманбап имарат",
      formTitle: "Пикир же Суроо калтыруу",
      formSub: "Сурооңузду же байланыш сурамыңызды жазыңыз, биз сизге тез арада жооп беребиз.",
      fieldName: "Аты-жөнүңүз *",
      placeholderName: "Мисалы: Асел Каримова",
      fieldPhone: "Телефон номериңиз *",
      fieldMessage: "Сизди кызыктырган суроо же билдирүү *",
      placeholderMessage: "Акысыз сабактар, окуу мөөнөттөрү жана башка суроолоруңузду бул жерге жазыңыз...",
      compliance: "* \"Жөнөтүү\" кнопкасын басуу менен, сиз өзүңүздүн байланыш маалыматыңыздын борбор тарабынан купуялуулук саясатына ылайык файлына макулдугуңузду бересиз.",
      btnSubmit: "Кабарды Жөнөтүү",
      submitting: "Жиберилүүдө...",
      successTitle: "Билдирүүңүз жөнөтүлдү!",
      successDesc: "Маалымат калтырганыңыз үчүн чоң рахмат. Сиз сураган суроо же сунуш боюнча администраторубуз абдан жакынкы убакта сизге байланышка чыгат.",
      openMap: "Google Maps аркылуу ачуу",
      btnReset: "Жаңы билдирүү калтыруу"
    },
    enroll: {
      title: "Курска Катталуу",
      sub: "Рауда Тил Борборунан билимиңизди баштаңыз",
      fieldName: "Аты-жөнүңүз *",
      placeholderName: "Мисалы: Азамат Рахатбеков",
      fieldPhone: "Телефон номериңиз *",
      fieldPhoneNote: "Мугалимдер сиз менен байланышуу үчүн керектелет",
      fieldCourse: "Тандалган сабак",
      courseOptionQuran: "Ыйык Куран",
      courseOptionArabic: "Араб тили",
      courseOptionTafsir: "Тафсир",
      courseOptionEnglish: "Англис тили",
      fieldFormat: "Окуу форматы",
      formatOffline: "Оффлайн (Борбордо)",
      formatOnline: "Онлайн (Зоом)",
      fieldTime: "Сизге ыңгайлуу убакыт",
      timeMorning: "Эртең менен",
      timeAfternoon: "Түштөн кийин",
      timeEvening: "Кечкисин",
      btnConfirm: "Жазылууну тастыктоо",
      submitting: "Байланыш курулууда...",
      successTitle: "Ийгиликтүү катталдыңыз!",
      successDesc1: "Каттооңуз кабыл алынды. Борбордун администратору жакынкы ",
      successDesc2: "15 мүнөттүн ичинде",
      successDesc3: " сизге телефон чалып, толук маалымат берет.",
      receiptTitle: "Кабыл алуу карточкасы:",
      receiptStudent: "Студент",
      receiptCourse: "Тандалган сабак",
      receiptFormat: "Формат",
      btnBack: "Артка кайтуу"
    },
    explorer: {
      title: "Сабактардын Программасы",
      sub: "Окуу мөөнөттөрү, деңгээлдери жана күтүлгөн натыйжалар",
      tag: "Классикалык Окуу Багыты",
      statDuration: "Курстун узактыгы",
      statIntensity: "Интенсивдүүлүгү",
      statLevel: "Башталгыч деңгээл",
      outcomesTitle: "Окуудан кийин эмнелерди үйрөнөсүз?",
      teachersTitle: "Мугалимдердин курамы",
      btnEnroll: "Бул курска катталуу",
      btnClose: "Жабуу"
    },
    footer: {
      branding: "Рауда Тил Борбору — бул руханий жана заманбап заман талаптарына ылайык так Куран илимине, араб жана англис тилдерине үйрөтүүчү заманбап тил жана маданият уясы.",
      linksTitle: "Байланыштуу шилтемелер",
      officeTitle: "Борбордук Офис",
      address: "Бишкек шаары, Дордой району, Хвойная көчөсү 64/3",
      copy: "Рауда Тил Борбору. Бардык укуктар корголгон.",
      motto: "Илим жолу — ишенимдүү өсүү кадамдары."
    }
  },
  ru: {
    common: {
      phone: "+996 (770) 123-456",
      phoneRaw: "+996770123456",
      whatsappRaw: "https://wa.me/996555123456",
      instagramRaw: "https://instagram.com/rauda_center",
      phoneFooterRaw: "tel:+996555123456",
      validationPhoneName: "Пожалуйста, введите ваше имя и номер телефона полностью!",
      validationAll: "Пожалуйста, заполните все поля полностью!",
      themeLight: "Светлая тема",
      themeDark: "Темная тема"
    },
    nav: {
      about: "О нас",
      courses: "Наши курсы",
      support: "Поддержка",
      teachers: "Наши преподаватели",
      contact: "Контакты",
      enrollBtn: "Записаться сейчас"
    },
    banner: {
      opportunity: "ВОЗМОЖНОСТЬ:",
      alert: "Идет активный набор в группы по чтению Корана и арабскому языку. Количество мест ограничено!"
    },
    hero: {
      badge: "Самый современный метод обучения в Кыргызстане",
      titlePart1: "Начните путь к правильному",
      titleHighlight: "чтению и пониманию",
      titlePart2: "Священного Корана",
      subhead: "Уроки арабского, английского языков, чтения Корана и тафсира в современном и доступном формате. В нашем центре вам гарантированы душевный покой и профессиональные знания.",
      btnEnroll: "Записаться на курс",
      btnMore: "Подробнее о курсах",
      avatarText: "учеников доверили нам свое обучение",
      upcomingGroups: "Ближайшие группы стартуют:",
      upcomingDate: "15 мая",
      badgeSpiritual: "Исламские ценности",
      quranQuote: "رَّبِّ زِدْنِي عِلْمًا",
      quranQuoteTranslate: "«Господи! Приумножь мои знания!»",
      quranQuoteSource: "Сура Та Ха, 114-й аят"
    },
    trust: {
      teachers: {
        title: "Квалифицированные кари",
        desc: "Специалисты, прошедшие обучение в арабских странах"
      },
      methods: {
        title: "Интерактивная методика",
        desc: "Индивидуальный подход к каждому студенту"
      },
      schedule: {
        title: "Гибкий удобный график",
        desc: "Утренние, дневные и вечерние группы"
      }
    },
    about: {
      badge: "Информация о нас",
      headlinePart1: "Среда духовной чистоты и",
      headlineHighlight: "глубоких современных знаний",
      headlinePart2: "",
      p1: "«Языковой центр Рауда» — это не просто учебный класс. Это современная колыбель знаний, которая наполняет вашу душу и духовные ценности светом Корана, а также помогает в совершенстве овладеть мировыми языками (арабским, английским) в соответствии с требованиями современности.",
      p2: "Наша главная миссия — распространение языка Корана и его сути в обществе с помощью доступных и легких методик. Каждый наш урок проходит в формате живого и незабываемого диалога под руководством опытных специалистов.",
      stat1: {
        title: "Обитель знаний",
        desc: "98% студентов достигают отличных академических результатов"
      },
      stat2: {
        title: "Удобное место",
        desc: "Уютная и теплая атмосфера в самом центре столицы"
      },
      card1: {
        title: "Обучение Корану",
        desc: "Правильное чтение Корана с точным соблюдением правил произношения (махрадж, таджвид). Глубокий смысл сур и духовные уроки."
      },
      card2: {
        title: "Современное обучение",
        desc: "Использование интерактивных материалов и технологических инструментов. Изучение языков в легкой форме по современной методике Рауда."
      },
      card3: {
        title: "Теплая атмосфера",
        desc: "В нашем центре царит теплая, духовная и дружеская атмосфера. Каждый урок приносит душе покой, радость и уверенность. Вы будете чувствовать себя свободно и безопасно, как в дружной семье."
      }
    },
    courses: {
      badge: "Качественные программы",
      title: "Удобные группы и современные курсы",
      sub: "Выберите наиболее подходящий для вас уровень и формат, чтобы сделать ценный шаг навстречу своему будущему и духовному развитию.",
      duration: "Срок обучения:",
      intensity: "Интенсивность:",
      level: "Начальный уровень:",
      btnEnroll: "Записаться",
      btnMore: "Подробнее",
      quranTitle: "Чтение и понимание Корана",
      quranDesc: "Курс изучения арабских букв с нуля и полного освоения правил таджвида. Погрузитесь в понимание сути аятов и истории их ниспослания.",
      arabicTitle: "Арабский язык",
      arabicDesc: "Современная комплексная методика Медиана, развивающая навыки говорения, аудирования, письма и грамматики. Понимание оригинала Корана.",
      englishTitle: "Английский язык",
      englishDesc: "Интерактивный курс английского языка по методу Рауда с акцентом на разговорную практику для преодоления языкового барьера."
    },
    support: {
      badge: "Образовательная поддержка",
      title: "Возможность для каждого, кто стремится к знаниям",
      p1: "Языковой центр Рауда предлагает специальную программу образовательной поддержки для тех, кто искренне желает научиться читать и понимать Коран, но имеет ограниченные в данный момент финансовые возможности.",
      pHighlight: "Каждый месяц 2 студентам предоставляется возможность бесплатного обучения чтению и пониманию Корана.",
      pNote: "* Эта инициатива предлагается не как благотворительность или милостыня, а как искренняя поддержка, сохраняющая личное достоинство человека и уважающая его стремление к знаниям.",
      processTitle: "Процесс отбора",
      step1: { title: "Подача заявки", desc: "Заполнение анкеты" },
      step2: { title: "Рассмотрение", desc: "Оценка анкет" },
      step3: { title: "Связь с нами", desc: "Проведение беседы" },
      step4: { title: "Искренность", desc: "Оценка намерений" },
      step5: { title: "Решение", desc: "2 студента в месяц" },
      formTitle: "Подать Заявку",
      formSub: "Оставьте следующие данные, и мы свяжемся с вами",
      fieldName: "Ваше имя и фамилия",
      placeholderName: "Например: Асан Усупов",
      fieldAge: "Ваш возраст",
      placeholderAge: "Например: 25",
      fieldCourse: "Интересующий курс",
      fieldReasonLearn: "Почему вы хотите изучать Коран?",
      placeholderReasonLearn: "Расскажите о ваших благих намерениях и целях...",
      fieldReasonNeed: "Почему вам необходима эта программа поддержки?",
      placeholderReasonNeed: "Кратко опишите вашу текущую жизненную ситуацию...",
      fieldWhatsapp: "Ваш номер WhatsApp",
      btnSubmit: "Отправить заявку",
      submitting: "Отправка...",
      successTitle: "Заявка принята!",
      successDesc: "Выражаем искреннюю благодарность за ваши благородные намерения и стремление к знаниям. Мы с глубоким уважением рассмотрим ваш запрос и свяжемся с вами в ближайшее время.",
      successDisclaimer: "* Все предоставленные вами данные останутся строго конфиденциальными и не будут переданы третьим лицам.",
      btnReset: "Подать новую заявку"
    },
    teachers: {
      badge: "Наши Наставники",
      title: "Наши опытные и отзывчивые преподаватели",
      sub: "Настоящие профессионалы своего дела, которые вкладывают душу в академические успехи и духовный рост каждого ученика.",
      t1: {
        name: "Айша Бекова",
        title: "Священный Коран и Таджвид",
        badge: "Устаза",
        desc: "Окончила престижный египетский университет Аль-Азхар по направлению исламских наук и преподавания Корана. Она владеет уникальной экспресс-методикой обучения буквам.",
        exp: "8 лет педагогического стажа"
      },
      t2: {
        name: "Медина Исаева",
        title: "Преподаватель арабского языка",
        badge: "Устаза",
        desc: "Выпускница филологического факультета Национального университета. Освоила современные интерактивные игровые методики обучения за рубежом. Большое внимание уделяет практике общения.",
        exp: "Преподает арабский язык 6 лет"
      },
      t3: {
        name: "Аманкул Каримов",
        title: "Учитель английского языка",
        badge: "Устаз",
        desc: "Сертифицированный преподаватель с международным дипломом CELTA. Разработал специальные разговорные клубы и интерактивный подход для быстрого снятия языкового барьера.",
        exp: "Международный опыт преподавания языков"
      }
    },
    reviews: {
      badge: "Отзывы наших студентов",
      title: "Что говорят ученики",
      sub: "Честные и искренние истории успеха от наших студентов, изменивших свою жизнь благодаря качественному обучению.",
      r1: {
        text: "«Никогда не думала, что смогу с абсолютного нуля изучить арабские буквы и начать свободно говорить на арабском. Выражаю огромную благодарность центру Рауда и моим дорогим преподавателям! Уроки проходят очень современно».",
        name: "Алтынай Бектурсунова",
        age: "23 года, студентка курса арабского"
      },
      r2: {
        text: "«Всего за первый месяц обучения я научился безошибочно читать Священный Коран. Теплая и радушная атмосфера центра мотивирует посещать каждое занятие. А программа поддержки — невероятно благородное дело!»",
        name: "Мирбек Асанов",
        age: "34 года, изучает Священный Коран"
      },
      r3: {
        text: "«Здесь каждому человеку в группе уделяется максимум внимания. Редкое терпение преподавателей вдохновляет учиться дальше. Когда понимаешь скрытый смысл слов Корана вместе с наставником, жизнь обретает новые краски».",
        name: "Нургүл Турдубаева",
        age: "45 лет, студентка курса Корана и Тафсира"
      }
    },
    contact: {
      badge: "Мы всегда на связи",
      title: "Свяжитесь с нами",
      sub: "У вас остались вопросы насчет программы обучения, стоимости или расписания групп? Свяжитесь с нами в любое время, мы с радостью проконсультируем вас.",
      whatsappTitle: "Написать в WhatsApp",
      whatsappSub: "Ответим в самый короткий срок",
      instaTitle: "Наш аккаунт Instagram",
      instaSub: "Ежедневные полезные материалы",
      phoneTitle: "Позвонить по телефону",
      phoneSub: "Ежедневно с 09:00 до 21:00",
      addressTitle: "Адрес центра",
      addressDesc: "г. Бишкек, р-н Дордой, ул. Хвойная 64/3",
      addressSub: "Новое теплое современное здание центра",
      formTitle: "Оставить вопрос или сообщение",
      formSub: "Заполните форму ниже, наш администратор перезвонит вам в кратчайшие сроки.",
      fieldName: "Ваше имя и фамилия *",
      placeholderName: "Например: Асель Каримова",
      fieldPhone: "Ваш номер телефона *",
      fieldMessage: "Интересующий вас вопрос или сообщение *",
      placeholderMessage: "Напишите здесь вопросы по расписанию, оплате или бесплатным пробным урокам...",
      compliance: "* Нажимая на кнопку «Отправить сообщение», вы соглашаетесь на обработку персональных данных в соответствии с политикой конфиденциальности.",
      btnSubmit: "Отправить сообщение",
      submitting: "Отправка...",
      successTitle: "Сообщение отправлено!",
      successDesc: "Большое спасибо за ваше обращение. Администратор свяжется с вами в течение самого ближайшего времени для подробного ответа на все ваши вопросы.",
      openMap: "Открыть в Google Maps",
      btnReset: "Отправить новое сообщение"
    },
    enroll: {
      title: "Запись на курс",
      sub: "Сделайте важный шаг к знаниям прямо сейчас вместе с Рауда",
      fieldName: "Ваше имя и фамилия *",
      placeholderName: "Например: Азамат Рахатбеков",
      fieldPhone: "Ваш номер телефона *",
      fieldPhoneNote: "Номер используется только для связи по расписанию и группам",
      fieldCourse: "Выбранный курс",
      courseOptionQuran: "Священный Коран",
      courseOptionArabic: "Арабский язык",
      courseOptionTafsir: "Тафсир",
      courseOptionEnglish: "Английский язык",
      fieldFormat: "Формат обучения",
      formatOffline: "Оффлайн (В центре)",
      formatOnline: "Онлайн (В Zoom)",
      fieldTime: "Удобное время занятий",
      timeMorning: "Утро",
      timeAfternoon: "День",
      timeEvening: "Вечер",
      btnConfirm: "Подтвердить запись",
      submitting: "Соединение с сервером...",
      successTitle: "Вы успешно записаны!",
      successDesc1: "Ваша регистрация принята. Администратор нашего центра свяжется с вами в течение следующих ",
      successDesc2: "15 минут",
      successDesc3: " для подтверждения расписания и деталей группы.",
      receiptTitle: "Карточка регистрации:",
      receiptStudent: "Студент",
      receiptCourse: "Выбранный курс",
      receiptFormat: "Формат",
      btnBack: "Вернуться назад"
    },
    explorer: {
      title: "Программа Обучения",
      sub: "Продолжительность, уровни групп и ожидаемые результаты обучения",
      tag: "Классическое академическое направление",
      statDuration: "Длительность",
      statIntensity: "Интенсивность",
      statLevel: "Начальный уровень",
      outcomesTitle: "Чему именно вы научитесь на курсе?",
      teachersTitle: "Информация о преподавателях",
      btnEnroll: "Записаться на этот курс",
      btnClose: "Закрыть"
    },
    footer: {
      branding: "Языковой центр Рауда — это современная обитель языка и культуры, обучающая кораническим наукам, арабскому и английскому языкам в соответствии с духовными требованиями.",
      linksTitle: "Быстрые ссылки",
      officeTitle: "Центральный Офис",
      address: "г. Бишкек, район Дордой, ул. Хвойная 64/3",
      copy: "Языковой центр Рауда. Все права защищены.",
      motto: "Путь знаний — надежные шаги роста."
    }
  },
  en: {
    common: {
      phone: "+996 (770) 123-456",
      phoneRaw: "+996770123456",
      whatsappRaw: "https://wa.me/996555123456",
      instagramRaw: "https://instagram.com/rauda_center",
      phoneFooterRaw: "tel:+996555123456",
      validationPhoneName: "Please write your full name and complete phone number!",
      validationAll: "Please fill out all fields completely!",
      themeLight: "Light Mode",
      themeDark: "Dark Mode"
    },
    nav: {
      about: "About Us",
      courses: "Our Courses",
      support: "Financial Aid",
      teachers: "Our Teachers",
      contact: "Contact us",
      enrollBtn: "Enroll Now"
    },
    banner: {
      opportunity: "OPPORTUNITY:",
      alert: "Active enrollment for Quran reading and Arabic groups is underway. Places are limited!"
    },
    hero: {
      badge: "The most modern teaching methodology in Kyrgyzstan",
      titlePart1: "Begin your journey to proper",
      titleHighlight: "reading and understanding",
      titlePart2: "of the Holy Quran",
      subhead: "Arabic, English, Quran reading, and Tafsir lessons in a modern, easy, and accessible format. Inner peace and highly professional training are guaranteed.",
      btnEnroll: "Enroll in a Course",
      btnMore: "Learn More Details",
      avatarText: "students have entrusted their learning to us",
      upcomingGroups: "Cohort slots begin on:",
      upcomingDate: "May 15",
      badgeSpiritual: "Islamic Values",
      quranQuote: "رَّبِّ زِدْنِي عِلْمًا",
      quranQuoteTranslate: "“O my Lord! Advance me in knowledge!”",
      quranQuoteSource: "Surah Ta-Ha, Verse 114"
    },
    trust: {
      teachers: {
        title: "Qualified Qaris",
        desc: "Scholars trained in renowned Arab institutions"
      },
      methods: {
        title: "Interactive Method",
        desc: "Tailored pedagogical approach for every learner"
      },
      schedule: {
        title: "Flexible Timetable",
        desc: "Morning, afternoon, and evening cohorts"
      }
    },
    about: {
      badge: "About Our Center",
      headlinePart1: "An environment of spiritual purity and",
      headlineHighlight: "profound modern knowledge",
      headlinePart2: "",
      p1: "“Rauda Language Center” is much more than a typical classroom. It is a modern cradle of knowledge that nurtures your soul with Quranic wisdom while helping you master global languages (Arabic, English) according to modern demands.",
      p2: "Our core mission is to make the language and deep wisdom of the Quran highly accessible and enjoyable for our community. Every single class is conversational, interactive, and led by experienced specialists.",
      stat1: {
        title: "Cradle of Knowledge",
        desc: "98% of our students achieve highly effective academic outcomes"
      },
      stat2: {
        title: "Cozy Setting",
        desc: "Warm atmosphere located directly in the center of the capital"
      },
      card1: {
        title: "Quran Recitation",
        desc: "Accurate Quranic recitation with precise rules of articulation (Makhraj and Tajwid). Explore the deep conceptual messages of surahs."
      },
      card2: {
        title: "Modern Education",
        desc: "Interactive tools and digital learning systems rather than dry rote memorization. Learn languages naturally through conversation."
      },
      card3: {
        title: "Warm Atmosphere",
        desc: "A warm, spiritual, and welcoming family atmosphere. Every single lesson fills the student's heart with peace, joy, and deep self-confidence."
      }
    },
    courses: {
      badge: "High-Quality Programs",
      title: "Convenient Cohorts & Modern Courses",
      sub: "Select the learning level and format that suits your schedule, and take a valuable step today towards your education and spiritual life.",
      duration: "Duration:",
      intensity: "Intensity:",
      level: "Starting Level:",
      btnEnroll: "Join Class",
      btnMore: "View details",
      quranTitle: "Quran Reading & Understanding",
      quranDesc: "Learn Quranic Arabic from the alphabet onwards and master all Tajwid rules. Develop a profound understanding of verses and their context.",
      arabicTitle: "Arabic Language",
      arabicDesc: "Comprehensive Mediana system focusing on writing, listening, speaking, and functional grammar. Read the original Arabic text fluently.",
      englishTitle: "English Language",
      englishDesc: "Dynamic conversational English following the Rauda interactive methodology to remove language barriers quickly and safely."
    },
    support: {
      badge: "Educational Support",
      title: "An opportunity for everyone seeking knowledge",
      p1: "Rauda Center provides an educational support initiative designed specifically for sincere individuals who wish to learn and comprehend the Quran but face financial obstacles.",
      pHighlight: "Every month, 2 students receive fully financed, free training in Quran reading and understanding under this program.",
      pNote: "* This program is not administered as charity or alms, but rather as supportive aid which deeply respects the dignity of our students and their thirst for divine knowledge.",
      processTitle: "Selection Process",
      step1: { title: "Submit Form", desc: "Fill out the application" },
      step2: { title: "Review Period", desc: "Evaluation of entries" },
      step3: { title: "Get in Touch", desc: "Initial conversation" },
      step4: { title: "Sincerity Check", desc: "Evaluating goals" },
      step5: { title: "Admissions", desc: "2 students monthly" },
      formTitle: "Support Application",
      formSub: "Submit the details below and we will contact you directly",
      fieldName: "Your Full Name",
      placeholderName: "Example: John Doe",
      fieldAge: "Your Age",
      placeholderAge: "Example: 25",
      fieldCourse: "Desired Course",
      fieldReasonLearn: "Why do you want to learn the Quran?",
      placeholderReasonLearn: "Share your pure goals, dreams, or intentions...",
      fieldReasonNeed: "Why do you need this scholarship support?",
      placeholderReasonNeed: "Briefly outline your current financial or life situation...",
      fieldWhatsapp: "Your WhatsApp Number",
      btnSubmit: "Submit Application",
      submitting: "Sending...",
      successTitle: "Application Received!",
      successDesc: "We express our sincere appreciation for your beautiful intent and commitment to receiving knowledge. We will review your request with utmost care and respect, then contact you soon.",
      successDisclaimer: "* All your submitted information is fully confidential and will never be shared with third parties.",
      btnReset: "Submit new application"
    },
    teachers: {
      badge: "Our Instructors",
      title: "Our Experienced & Loving Mentors",
      sub: "Highly dedicated professionals committed entirely to the academic excellence and moral growth of each student.",
      t1: {
        name: "Aisha Bekova",
        title: "Holy Quran & Tajwid",
        badge: "Ustaadhah",
        desc: "Graduated from Al-Azhar University in Cairo, Egypt, specializing in Islamic Sciences and Tajwid. She is famous for teaching Quran reading within incredibly short periods.",
        exp: "8 years of active teaching experience"
      },
      t2: {
        name: "Medina Isaeva",
        title: "Arabic Language Expert",
        badge: "Ustaadhah",
        desc: "Holds a degree in Philology from the Kyrgyz National University. Trained in foreign interactive gamified curricula. Emphasizes talk-time over dry memorization.",
        exp: "Teaching Arabic for more than 6 years"
      },
      t3: {
        name: "Amankul Karimov",
        title: "English Instructor",
        badge: "Ustaadh",
        desc: "Holder of the internationally acclaimed CELTA certificate. He developed specialized speaking clubs and custom methods to bypass language barriers with ease.",
        exp: "International language teaching background"
      }
    },
    reviews: {
      badge: "Student Testimonials",
      title: "Hear From Our Students",
      sub: "Genuine success stories from students who achieved significant spiritual and academic breakthroughs and discovered new paths.",
      r1: {
        text: "“I never thought I could learn Arabic letters from scratch and speak fluently. I raise my hands in profound gratitude to Rauda and my teachers! The lessons are incredibly engaging and modern.”",
        name: "Altynai Bektursunova",
        age: "23 y.o., Arabic Language student"
      },
      r2: {
        text: "“Even in the first month, I achieved error-free Quran reading. The warm hospitality and utmost respect inside the center encourage me to never miss a class. The educational support program is such a heartwarming initiative!”",
        name: "Mirbek Asanov",
        age: "34 y.o., Quran Recitation student"
      },
      r3: {
        text: "“Every person in the class receives dedicated attention. The instructors' patience gave me immense inspiration. Learning the deep meanings of the Quran's words reveals a whole new perspective on life. I highly recommend it.”",
        name: "Nurgul Turdubaeva",
        age: "45 y.o., Quran & Tafsir student"
      }
    },
    contact: {
      badge: "We are always available",
      title: "Get in Touch With Us",
      sub: "Do you have any remaining questions about tuition fees, timetables, or cohort starts? Submit your request here or message us directly on WhatsApp.",
      whatsappTitle: "Message on WhatsApp",
      whatsappSub: "We will reply shortly",
      instaTitle: "Our Instagram Feed",
      instaSub: "Daily educational posts",
      phoneTitle: "Direct Office Call",
      phoneSub: "Available Daily 09:00 - 21:00",
      addressTitle: "Our Address",
      addressDesc: "Bishkek city, Dordoy area, Khvoynaya St 64/3",
      addressSub: "Brand new modern warm office block",
      formTitle: "Leave a Question or Suggestion",
      formSub: "Write your inquiry below, and our coordinator will call you back in a short time.",
      fieldName: "Your Full Name *",
      placeholderName: "Example: Jane Doe",
      fieldPhone: "Your Phone Number *",
      fieldMessage: "Your Question or Message *",
      placeholderMessage: "Ask your questions about fees, study terms, or request a free trial lesson...",
      compliance: "* By clicking the Send Message button, you represent that you consent to the secure handling of your contact info in line with our privacy policies.",
      btnSubmit: "Send Message",
      submitting: "Sending...",
      successTitle: "Brief Sent!",
      successDesc: "Thank you for writing to us. Our supervisor will connect with you via phone very soon to provide full support and answer all detailed questions.",
      openMap: "Open in Google Maps",
      btnReset: "Send another message"
    },
    enroll: {
      title: "Group Enrollment",
      sub: "Launch your language and spiritual literacy journey right now with Rauda",
      fieldName: "Your Full Name *",
      placeholderName: "Example: John Doe",
      fieldPhone: "Your Phone Number *",
      fieldPhoneNote: "Your phone number will only be used to organize schedules and classes",
      fieldCourse: "Selected Subject",
      courseOptionQuran: "Holy Quran",
      courseOptionArabic: "Arabic Language",
      courseOptionTafsir: "Tafsir",
      courseOptionEnglish: "English Language",
      fieldFormat: "Learning Format",
      formatOffline: "Offline (At Center)",
      formatOnline: "Online (via Zoom)",
      fieldTime: "Preferred Class Schedule",
      timeMorning: "Morning",
      timeAfternoon: "Afternoon",
      timeEvening: "Evening",
      btnConfirm: "Confirm Sign Up",
      submitting: "Contacting database...",
      successTitle: "Enrolled Successfully!",
      successDesc1: "We received your application. The local administrator of the center will call you within the next ",
      successDesc2: "15 minutes",
      successDesc3: " to confirm schedules and cohort details.",
      receiptTitle: "Enrollment Admission Card:",
      receiptStudent: "Student",
      receiptCourse: "Target Subject",
      receiptFormat: "Format",
      btnBack: "Return Back"
    },
    explorer: {
      title: "Program Syllabus",
      sub: "Review duration guidelines, initial levels, and expected learning outcomes",
      tag: "Classical Academic Syllabus",
      statDuration: "Course Duration",
      statIntensity: "Frequency/Week",
      statLevel: "Prerequisite Level",
      outcomesTitle: "What competencies will you acquire?",
      teachersTitle: "Instructors in charge",
      btnEnroll: "Join this specified cohort",
      btnClose: "Close Window"
    },
    footer: {
      branding: "Rauda Center is a state-of-the-art academy teaching proper Quranic sciences, Arabic and English languages aligned with modern demands.",
      linksTitle: "Useful links",
      officeTitle: "Central Campus",
      address: "Bishkek, Dordoy area, Khvoynaya Street 64/3",
      copy: "Rauda Language Center. All rights reserved.",
      motto: "The path of knowledge leads to secure growth."
    }
  }
};
