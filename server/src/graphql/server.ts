import { gql } from "apollo-server";
import { Location } from "../entity/Location";
import { Tour } from "../entity/Tour";

import { User } from "../entity/User";

export const typeDefs = gql`
  type Photo {
    id: ID!
    name: String!
    url: String!
  }

  type Location {
    id: ID!
    name: String!
    address: String!
    avatar: Photo
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
    tourLocation(id: ID!): TourLocation
    location(id: ID!): Location
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
    location: async (_parent, { id }, context, _info) => {
      const { connection } = context;
      return await connection.manager.findOne(Location, { id });
    },
  },
};
