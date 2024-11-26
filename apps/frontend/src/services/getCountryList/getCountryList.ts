export interface Country {
  name: string;
  countryCode: string;
}

export const getCountryList = async (): Promise<Country[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/countries`,
  );

  return await response.json();
};
