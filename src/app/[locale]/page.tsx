import {useTranslations} from 'next-intl';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div>
      <h1>{t('title')}</h1>
      <h2>{t('subtitle')}</h2>
      <p>{t('description')}</p>
    </div>
  );
}