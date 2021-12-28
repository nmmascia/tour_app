import * as GraphQLScalars from "graphql-scalars";

import { ApolloServer, Config } from "apollo-server";
import { resolvers, typeDefs } from "./schema";

import { Connection } from "typeorm";
import { GraphQLDatabaseLoader } from "@mando75/typeorm-graphql-loader";
import { User } from "../entity/User";

const createServer = ({ connection }: { connection: Connection }) =>
  new ApolloServer({
    typeDefs: [...GraphQLScalars.typeDefs, typeDefs],
    resolvers: {
      ...GraphQLScalars.resolvers,
      ...resolvers,
    },
    context: async ({ req }) => {
      const user = await connection.manager.findOne(User, { id: 1 });

      return {
        connection,
        user,
        loader: new GraphQLDatabaseLoader(connection),
      };
    },
  } as Config);

export default createServer;
