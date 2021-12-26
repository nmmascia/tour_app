import { gql } from "apollo-server";
import { Tour } from "../entity/Tour";

import { User } from "../entity/User";

export const typeDefs = gql`
  type Photo {
    id: ID!
    name: String!
    url: String!
  }

  type Location {
    name: String!
    address: String!
  }

  type TourLocation {
    id: ID!
    location: Location!
    photos: [Photo]!
  }

  type Tour {
    id: ID!
    name: String!
    tourMembers: [TourMember]!
    tourLocations: [TourLocation]!
  }

  type TourMember {
    id: ID!
    admin: Boolean!
    tour: Tour!
    user: User
  }

  type User {
    id: ID!
    name: String
    tourMembers: [TourMember]!
    username: String!
  }

  type Query {
    user(id: ID!): User
    tour(id: ID!): Tour
  }
`;

export const resolvers = {
  Query: {
    user: async (_parent, { id }, context, _info) => {
      const { connection } = context;
      return await connection.manager.findOne(User, { id });
    },
    tour: async (_parent, { id }, context, _info) => {
      const { connection } = context;
      return await connection.manager.findOne(Tour, { id });
    },
  },
};
