import "reflect-metadata";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import datasource from "./lib/datasource";
import { buildSchema } from "type-graphql";
import CountryResolver from "./resolvers/country.resolver";

async function main() {
  const schema = await buildSchema({
    resolvers: [CountryResolver]
  });
  const server = new ApolloServer<{}>({
    schema
  });

  const { url } = await startStandaloneServer(server);
  await datasource.initialize();
  console.log(`🚀 Server ready at ${url}`);
}

main();