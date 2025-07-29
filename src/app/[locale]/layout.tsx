import '../../styles/globals.css';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ReactNode } from 'react';

export default function LocaleLayout({ children }: { children: ReactNode }) {
  const messages = useMessages();

  return (
    <html lang="en">
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
