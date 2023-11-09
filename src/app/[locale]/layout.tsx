import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { NextAppDirEmotionCacheProvider } from 'tss-react/next';
import AppThemeProvider from 'providers/AppThemeProvider';
import AuthProvider from 'providers/AuthProvider';
import ToastifyProvider from 'providers/ToastifyProvider';
import AppLocalization from 'providers/AppLocalization';
import BroadcastProvider from 'providers/BroadcastProvider';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <title>Mediwey magazine</title>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap'
          rel='stylesheet'
        ></link>
        <link
          href='https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200&display=swap'
          rel='stylesheet'
        ></link>
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NextAppDirEmotionCacheProvider options={{ key: 'css', prepend: true }}>
            <AppThemeProvider>
              <AppLocalization>
                <BroadcastProvider>
                  <AuthProvider>
                    <ToastifyProvider>{children}</ToastifyProvider>
                  </AuthProvider>
                </BroadcastProvider>
              </AppLocalization>
            </AppThemeProvider>
          </NextAppDirEmotionCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
