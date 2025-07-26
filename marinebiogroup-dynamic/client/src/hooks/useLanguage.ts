import { useState, createContext, useContext } from 'react';

// Language context
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  getLanguageCode: () => string;
  getLanguageName: () => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language mapping - English only
export const LANGUAGE_CODES = {
  english: "eng"
} as const;

export const LANGUAGE_NAMES = {
  eng: "English"
} as const;

export const LANGUAGE_DISPLAY = {
  eng: "English"
} as const;

// Language hook
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Custom hook for language state management
export function useLanguageState() {
  const [language, setLanguageState] = useState<string>(() => {
    // Always default to English
    return 'eng';
  });

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const getLanguageCode = () => language;
  
  const getLanguageName = () => {
    return LANGUAGE_NAMES[language as keyof typeof LANGUAGE_NAMES] || language;
  };

  return {
    language,
    setLanguage,
    getLanguageCode,
    getLanguageName
  };
}

// Utility functions
export function getLanguageDisplay(code: string): string {
  return LANGUAGE_NAMES[code as keyof typeof LANGUAGE_NAMES] || code;
}

export function isValidLanguage(code: string): boolean {
  return Object.values(LANGUAGE_CODES).includes(code as any);
}