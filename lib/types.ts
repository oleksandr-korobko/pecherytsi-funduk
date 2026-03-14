// Site Configuration
export interface SiteConfig {
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  email: string;
  phone: string;
  address: string;
  instagram: string;
  facebook?: string;
  copyright: string;
  navigation: {
    home: string;
    about: string;
    shop: string;
    tourism: string;
    masters: string;
    events: string;
    contact: string;
  };
}

// Home Page Content
export interface HomePageContent {
  hero: HeroSection;
  about: AboutSection;
  stats: StatsSection;
  content: string;
}

export interface HeroSection {
  title: string;
  subtitle: string;
  description: string;
  ctaButtons: {
    shop: string;
    tourism: string;
  };
}

export interface AboutSection {
  badge: string;
  title: string;
  titleHighlight: string;
  paragraphs: string[];
  infoBox: string;
}

export interface StatsSection {
  hectares: {
    value: string;
    label: string;
  };
  distance: {
    value: string;
    label: string;
  };
  eco: {
    value: string;
    label: string;
  };
}

// Products
export interface Product {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
}

// Tourism Services
export interface TourismService {
  id: string;
  icon: string;
  title: string;
  description: string;
  details?: ExcursionDetails | PhotoSessionDetails | LocationRentalDetails;
  gradient: string;
  buttonText: string;
}

export interface ExcursionDetails {
  schedule: string;
  duration: string;
  minPeople: string;
  pricing: {
    adults: string;
    children: string;
    kids: string;
  };
}

export interface PhotoSessionDetails {
  price: string;
  priceUnit: string;
  locations: string[];
}

export interface LocationRentalDetails {
  options: Array<{
    name: string;
    description: string;
  }>;
}

// Master Classes
export interface MasterClass {
  id: string;
  name: string;
  icon: string;
}

// Events
export interface Event {
  id: string;
  title: string;
  schedule: string;
  day: string;
  color: string;
}

// About Page
export interface AboutPageContent {
  title: string;
  content: string;
  history?: string;
  mission?: string;
  team?: TeamMember[];
}

export interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  bio?: string;
}

// Contact Page
export interface ContactPageContent {
  title: string;
  subtitle: string;
  content: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  socialMedia: {
    instagram?: string;
    facebook?: string;
  };
}

// Page Types
export type PageSlug = 'home' | 'about' | 'contact' | 'shop' | 'tourism' | 'masters' | 'events';
