cat > src/hooks/useLanguage.ts << 'EOF'
"use client";

import { useState, useContext, createContext, ReactNode } from 'react';

export type Language = 'ko' | 'eng';

export const LANGUAGE_NAMES = {
  ko: '한국어',
  eng: 'English'
} as const;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ko');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Context 없어도 기본값 반환 (더 안전)
    const [language, setLanguage] = useState<Language>('ko');
    return { language, setLanguage };
  }
  return context;
}
EOF