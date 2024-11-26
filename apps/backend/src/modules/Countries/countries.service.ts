import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import {
  Country,
  CountryFlag,
  CountryInfo,
  CountryPopulation,
} from './countries.type';
import { AxiosError } from 'axios';

@Injectable()
export class CountriesService {
  private ApiDateNager: string;
  private ApiCountriesNow: string;

  constructor(private readonly httpService: HttpService) {
    const dateNager = process.env.API_DATENAGER_PATH;
    if (!dateNager) {
      throw new Error('API_DATENAGER_PATH is not defined');
    }
    const countriesnow = process.env.API_COUNTRIES_NOW_PATH;
    if (!countriesnow) {
      throw new Error('API_COUNTRIES_NOW_PATH is not defined');
    }
    this.ApiDateNager = dateNager;
    this.ApiCountriesNow = countriesnow;
  }

  async getAllcountries() {
    const { data } = await firstValueFrom(
      this.httpService
        .get<Country[]>(`${this.ApiDateNager}/AvailableCountries`)
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error);
            throw new InternalServerErrorException();
          }),
        ),
    );
    return data;
  }

  private async getCountriesPopulation() {
    const { data } = await firstValueFrom(
      this.httpService
        .get<{
          data: CountryPopulation[];
        }>(`${this.ApiCountriesNow}/countries/population`)
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error);
            throw new InternalServerErrorException();
          }),
        ),
    );
    return data.data;
  }

  private async getCountryPopulation({
    countryCodeIso3,
  }: {
    countryCodeIso3?: string;
  }) {
    if (!countryCodeIso3) {
      return null;
    }
    const populations = await this.getCountriesPopulation();
    const population = populations.find(
      (population) => population.iso3 === countryCodeIso3,
    );
    return population?.populationCounts;
  }

  private async getFlags() {
    const { data } = await firstValueFrom(
      this.httpService
        .get<{
          data: CountryFlag[];
        }>(`${this.ApiCountriesNow}/countries/flag/images`)
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error);
            throw new InternalServerErrorException();
          }),
        ),
    );
    return data.data;
  }

  private async getFlag({ countryCode }: { countryCode: string }) {
    const flags = await this.getFlags();
    return flags.find((flag) => flag.iso2 === countryCode);
  }

  private async getCountryInfo({ countryCode }: { countryCode: string }) {
    const { data } = await firstValueFrom(
      this.httpService
        .get<CountryInfo>(`${this.ApiDateNager}/CountryInfo/${countryCode}`)
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error);
            throw new InternalServerErrorException();
          }),
        ),
    );
    return data;
  }

  async getInfo({ countryCode }: { countryCode: string }) {
    const { borders, ...info } = await this.getCountryInfo({ countryCode });
    const flag = await this.getFlag({ countryCode });
    const population = await this.getCountryPopulation({
      countryCodeIso3: flag?.iso3,
    });

    const borderCountries =
      borders?.map((border) => ({
        commonName: border.commonName,
        officialName: border.officialName,
        countryCode: border.countryCode,
        region: border.region,
      })) || [];

    return { ...info, flag: flag?.flag, borders: borderCountries, population };
  }
}
