import { Repository } from "typeorm";
import Country, { Continent, CountryInput } from "../entities/Country.entity";
import datasource from "../lib/datasource";

class CountriesServices {
  db: Repository<Country>;

  constructor() {
    this.db = datasource.getRepository(Country);
  }

  async create(data: CountryInput) {
    const newCountry = this.db.create(data);
    return await this.db.save(newCountry);
  }

  async list() {
    return await this.db.find();
  }

  async find(code: string) {
    const country = await this.db.findOneOrFail({ where: { code } });
    return country;
  }

  async continent(continent: Continent) {
    const countries = await this.db.findBy({ continent });
    return countries
  }
}

export default CountriesServices;