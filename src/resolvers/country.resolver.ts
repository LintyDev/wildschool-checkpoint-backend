import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Country, { Continent, CountryInput } from "../entities/Country.entity";
import CountriesServices from "../services/countries.services";

@Resolver()
class CountryResolver {
  @Query(() => [Country])
  async list() {
    const countries = await new CountriesServices().list();
    return countries
  }

  @Query(() => Country)
  async findByCode(@Arg('code') code: string) {
    const country = await new CountriesServices().find(code);
    return country;
  }

  @Query(() => [Country])
  async findByContinent(@Arg('continent') continent: Continent) {
    const countries = await new CountriesServices().continent(continent);
    return countries;
  }

  @Mutation(() => Country)
  async create(@Arg('data') data: CountryInput) {
    const country = await new CountriesServices().create(data);
    return country;
  }
}

export default CountryResolver;