import styles from './page.module.scss';
import { getCountryList } from '@src/services/getCountryList';
import { CountryList } from '@src/components/CountryList';

export default async function Home() {
  const countryList = await getCountryList();

  return (
    <div className={styles.page}>
      <main>
        <h1 className={styles.title}>Countries</h1>
        <CountryList countryList={countryList} />
      </main>
    </div>
  );
}
