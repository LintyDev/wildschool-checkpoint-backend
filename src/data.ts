import Country, { CountryInput } from "./entities/Country.entity";
import datasource from "./lib/datasource";

async function fillDb() {
  try {
    console.log('fetching data...')
    const req = await fetch('https://restcountries.com/v3.1/all');
    const res = await req.json();
    const data: CountryInput[] = res.map((c: any) => ({
      name: c.name.common,
      code: c.cca2,
      emoji: c.flag,
      continent: c.continents[0]
    }));

    await datasource.initialize();
    const db = datasource.getRepository(Country);
    await db.clear();
    console.log("Table Country cleared.");

    const saveData = data.map(async (c) => {
      const newCountry = new Country();
      newCountry.name = c.name;
      newCountry.code = c.code;
      newCountry.emoji = c.emoji;
      newCountry.continent = c.continent;

      return await db.save(newCountry);
    });

    await Promise.all(saveData)
    console.log('Data loaded !');
  } catch (error) {
    console.log('Error : ', error);
  }
}

fillDb();