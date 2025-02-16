import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';
import Nav from '../header/Nav';
import { Toaster } from '../ui/sonner';


type Props = {
  children: ReactNode;
  locale: string;
};

export default async function BaseLayout({ children, locale }: Props) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Toaster />
          <Nav />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}