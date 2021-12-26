import { gql } from "apollo-server";

import { User } from "../entity/User";

export const typeDefs = gql`
  type Tour {
    id: ID!
    name: String!
  }

  type TourMember {
    id: ID!
    admin: Boolean!
    tour: Tour!
  }

  type User {
    id: ID!
    name: String
    tourMembers: [TourMember]!
    username: String!
  }

  type Query {
    user(id: ID!): User
  }
`;

export const resolvers = {
  Query: {
    user: async (_parent, args, context, _info) => {
      const { connection } = context;
      return await connection.manager.findOne(User, args);
    },
  },
};
