import { Field, ID, InputType, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Continent {
  Asia = "Asia",
  Africa = "Africa",
  NorthAmerica = "North America",
  SouthAmerica = "South America",
  Antarctica = "Antarctica",
  Europe = "Europe",
  Oceania = "Oceania",
}

registerEnumType(Continent, {
  name: "Continent",
  description: "The continents of the world",
});

@ObjectType()
@Entity()
class Country {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, length: 2})
  code: string;

  @Field()
  @Column({ unique: true, length: 100 })
  name: string;

  @Field()
  @Column({ unique: true, length: 5 })
  emoji: string;

  @Field(() => Continent)
  @Column({ type: "text" })
  continent: Continent;
}

@InputType()
export class CountryInput {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  emoji: string;

  @Field(() => Continent)
  continent: Continent;
}

export default Country;