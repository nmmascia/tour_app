import { typeDefs, resolvers } from "./schema";
import { ApolloServer, Config } from "apollo-server";
import { GraphQLDatabaseLoader } from "@mando75/typeorm-graphql-loader";
import * as GraphQLScalars from "graphql-scalars";
import { User } from "../entity/User";
import { Connection } from "typeorm";

const createServer = ({ connection }: { connection: Connection }) =>
  new ApolloServer({
    typeDefs: [...GraphQLScalars.typeDefs, typeDefs],
    resolvers: {
      ...GraphQLScalars.resolvers,
      ...resolvers,
    },
    context: async ({ req: _req }) => {
      const user = await connection.manager.findOne(User, { id: 1 });
      return {
        user,
        loader: new GraphQLDatabaseLoader(connection),
      };
    },
  } as Config);

export default createServer;
