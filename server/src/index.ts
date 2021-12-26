import "dotenv/config";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { typeDefs, resolvers } from "./graphql/server";
import { ApolloServer, Config } from "apollo-server";
import storageClient from "./storage/client";

async function main() {
  try {
    const connection = await createConnection();
    const users = await connection.manager.findOne(User, { id: 1 });
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req: _req }) => {
        return {
          connection,
          user: users,
          storageClient,
        };
      },
    } as Config);

    const { url } = await server.listen({
      port: process.env.PORT,
    });

    console.log(url);
  } catch (error) {
    console.log(error);
  }
}

main();
