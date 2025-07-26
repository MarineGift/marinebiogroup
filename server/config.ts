// Site configuration based on environment variables
// Environment-based site configuration system

export interface SiteConfig {
  siteName: string;
  domainName: string;
  companyName: string;
  supportEmail: string;
  defaultLanguage: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  enableCarousel: boolean;
  enableBlog: boolean;
  enableGallery: boolean;
  enableProducts: boolean;
}

// Get site configuration from environment variables
export function getSiteConfig(): SiteConfig {
  return {
    siteName: process.env.SITE_NAME || "marinebiogroup",
    domainName: process.env.DOMAIN_NAME || "marinebiogroup.com",
    companyName: process.env.COMPANY_NAME || "MarineBioGroup",
    supportEmail: process.env.SUPPORT_EMAIL || "support@marinebiogroup.com",
    defaultLanguage: process.env.DEFAULT_LANGUAGE || "en",
    primaryColor: process.env.PRIMARY_COLOR || "#0EA5E9",
    secondaryColor: process.env.SECONDARY_COLOR || "#10B981",
    accentColor: process.env.ACCENT_COLOR || "#F59E0B",
    enableCarousel: process.env.ENABLE_CAROUSEL !== "false",
    enableBlog: process.env.ENABLE_BLOG !== "false",
    enableGallery: process.env.ENABLE_GALLERY !== "false",
    enableProducts: process.env.ENABLE_PRODUCTS !== "false",
  };
}

// Language mapping - English only
export const LANGUAGE_CODES = {
  english: "en"
} as const;

export const LANGUAGE_NAMES = {
  en: "English"
} as const;

// Language display mapping
export function getLanguageDisplay(code: string): string {
  return LANGUAGE_NAMES[code as keyof typeof LANGUAGE_NAMES] || code;
}

// Validate language code
export function isValidLanguage(code: string): boolean {
  return Object.values(LANGUAGE_CODES).includes(code as any);
}

// Get current site config as global object
export const siteConfig = getSiteConfig();