interface Country {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
}

interface PopulationCount {
  year: number;
  value: number;
}

export interface CountryInfo extends Country {
  flag?: string;
  borders: Country[];
  population?: PopulationCount[];
}

export const getCountryInfo = async (
  countryCode: string,
): Promise<CountryInfo> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/countries/${countryCode}`,
  );

  return await response.json();
};
