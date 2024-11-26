export interface Country {
  name: string;
  countryCode: string;
}

export interface CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders?: CountryInfo[];
}

export interface CountryFlag {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}

export interface CountryPopulation {
  country: string;
  code: string;
  iso3: string;
  populationCounts: PopulationCount[];
}

export interface PopulationCount {
  year: number;
  value: number;
}
