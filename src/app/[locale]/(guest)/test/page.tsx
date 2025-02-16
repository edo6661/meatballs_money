// import { useTranslations } from 'next-intl';
// import { Link } from '@/i18n/routing';
import { HOME_PAGE } from '@/constants/il8n';
import { getTranslations } from 'next-intl/server';

export default async function HomePage() {
  // ! client component
  // const t = useTranslations(HOME_PAGE);
  // ! server component
  const t = await getTranslations(HOME_PAGE);
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('welcome.message')}</p>

      {/* <Link href="/about">{t('about')}</Link> */}
    </div>
  );
}