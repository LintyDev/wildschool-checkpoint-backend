import { DataSource } from "typeorm";
import Country from "../entities/Country.entity";

export default new DataSource({
  type: 'sqlite',
  database: 'checkpoint.sqlite',
  entities: [Country],
  synchronize: true, // only prod
  logging: ['error', 'query'] // only prod
});