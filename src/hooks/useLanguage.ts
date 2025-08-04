import { useState } from 'react';

export type Language = 'ko' | 'eng';

export const LANGUAGE_NAMES = {
  ko: '한국어',
  eng: 'English'
} as const;

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('ko');

  return {
    language,
    setLanguage
  };
}