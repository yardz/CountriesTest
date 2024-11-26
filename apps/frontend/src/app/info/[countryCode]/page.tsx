import { getCountryInfo } from '@src/services/getCountryInfo';
import styles from './page.module.css';
import Image from 'next/image';
import { CountryList } from '@src/components/CountryList';
import { Population } from '@src/components/Population';

export default async function Page({
  params,
}: {
  params: Promise<{ countryCode: string }>;
}) {
  const { countryCode } = await params;

  const countryInfo = await getCountryInfo(countryCode);
  const countryList = countryInfo.borders.map((border) => ({
    name: border.commonName,
    countryCode: border.countryCode,
  }));
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        {countryInfo.officialName} / {countryInfo.commonName}
        {countryInfo.flag && (
          <>
            <br />
            <Image
              src={countryInfo.flag}
              alt={`${countryInfo.commonName} flag`}
              width={500}
              height={300}
            />
          </>
        )}
      </h1>

      <h2>Borders</h2>
      <CountryList countryList={countryList} />

      <h2>Population</h2>
      <Population population={countryInfo.population || []} />
    </div>
  );
}
