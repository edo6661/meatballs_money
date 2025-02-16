import PageLayout from '@/components/common/PageLayout';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Params = Promise<{ locale: string }>

export default async function LocaleLayout({
  params
}: {
  params: Params;
}) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('PathnamesPage');

  return (
    <PageLayout title={t('title')}>
      <div className="max-w-[490px]">
        {t.rich('description', {
          p: (chunks) => <p className="mt-4">{chunks}</p>,
          code: (chunks) => (
            <code className="font-mono text-white">{chunks}</code>
          )
        })}
      </div>
    </PageLayout>
  );
}