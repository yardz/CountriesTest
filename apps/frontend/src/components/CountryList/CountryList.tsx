import Link from 'next/link';
import styles from './CountryList.module.scss';

interface Props {
  countryList: { name: string; countryCode: string }[];
}
export const CountryList = ({ countryList }: Props) => {
  return (
    <ul className={styles.list}>
      {countryList.map((country) => (
        <li key={country.name} className={styles.item}>
          <Link className={styles.link} href={`/info/${country.countryCode}`}>
            {country.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
