import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Lang, languages } from 'i18nOptions';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { removeLangFromPathname } from 'helpers/common';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const pathname = usePathname();

  return (
    <Fragment>
      {languages.map((lang) => {
        const nextPathName = `/${lang}${removeLangFromPathname(pathname)}`;

        return (
          <p key={lang}>
            <Link href={nextPathName} prefetch={false}>
              {lang === Lang.en && '🇬🇧'} {lang === Lang.vi && '🇻🇳'}
              {t('switchLocale', { locale: lang })}
            </Link>
          </p>
        );
      })}
    </Fragment>
  );
}
