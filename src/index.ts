import "reflect-metadata";
import path from "node:path";

import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { context } from "../prisma/index";
import { listResolvers } from "./modules/graphql/resolvers";

async function start() {
  const schema = await buildSchema({
    resolvers: listResolvers,
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const server = new ApolloServer({
    schema,
    context,
  });

  const { url } = await server.listen();

  console.log(url);
}

start();
