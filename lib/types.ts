// lib/types.ts

/**
 * Til kalitlari
 */
export type LanguageKey = 'uzb' | 'rus' | 'eng';

/**
 * Header (navigatsiya) kontenti
 */
export type HeaderContent = {
  links: string[]; // masalan: ["Bosh sahifa", "Biz Haqimizda", ...]
};

/**
 * About bo'limi turlari
 */
export type AboutItem = {
  icon: 'lightbulb' | 'pentool' | 'rocket';
  title: string;
  description: string;
};

export type AboutContent = {
  heading: string;
  text: string;
  items: AboutItem[];
};

/**
 * Services bo'limi turlari
 */
export type ServiceItem = {
  icon: 'code' | 'design' | 'support' | 'cloud' | 'security' | 'database';
  title: string;
  description: string;
};

export type ServicesContent = {
  heading: string;
  text: string;
  items: ServiceItem[];
};

export type PortfolioItem = {
  title: string;
  description: string;
  tag: string;
  link: string;
  image?: string;
};

export type PortfolioContent = {
  heading: string;
  text: string;
  items: PortfolioItem[];
};


/**
 * Comments (Izohlar) bo'limi turlari
 */
export type CommentsForm = {
  name: string;
  message: string;
  submit: string;
  success: string;
};

export type CommentsContent = {
  heading: string;
  text: string;
  form: CommentsForm;
  listHeading: string;
};

/**
 * Footer kontenti
 */
export type FooterContent = {
  address: string;
  phone: string;
  email: string;
  copyright: string;
  contactsHeading: string;
};

/**
 * Bir til uchun to'liq sayt kontenti (SiteContent / SingleLangContent)
 */
export type SingleLangContent = {
  header: HeaderContent;
  about: AboutContent;
  services: ServicesContent;
  portfolio: PortfolioContent;
  comments: CommentsContent;
  footer: FooterContent;
};

/** 
 * aliases: ba'zi fayllar SiteContent deb import qilganligi uchun
 */
export type SiteContent = SingleLangContent;

/**
 * Barcha tillar uchun kontent map
 */
export type MultiLangContent = {
  [key in LanguageKey]: SingleLangContent;
};

/**
 * Izoh holati (enum)
 */
export enum CommentStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

/**
 * Izoh turi (comment)
 * (Sening commentState va Comments komponentlariga mos)
 */

export type Comment = {
  id: string;
  name: string;
  text: string;
  status: CommentStatus;
  timestamp: number;
};

/**
 * (Ixtiyoriy) global context tipi — kerak bo'lsa ishlatish uchun
 */
export type AppContextType = {
  currentLang: LanguageKey;
  setLang: (lang: LanguageKey) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  getContent: (lang?: LanguageKey) => SiteContent;
  setContentFromAdmin: (newContent: MultiLangContent) => void; // <<< kerakli joy
  comments: Comment[];
  refreshComments: () => void;
};

// lib/types.ts

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string; // upload qilinadigan rasm
  description?: string;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}
