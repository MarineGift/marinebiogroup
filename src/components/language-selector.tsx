"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Language = 'ko' | 'eng';

const LANGUAGE_NAMES = {
  ko: '한국어',
  eng: 'English'
} as const;

export default function LanguageSelector() {
  const [language, setLanguage] = useState<Language>('ko');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {LANGUAGE_NAMES[language]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(LANGUAGE_NAMES).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code as Language)}
            className={language === code ? 'bg-gray-100' : ''}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}