import { Location } from "../entity/Location";
import { Tour } from "../entity/Tour";
import { TourLocation } from "../entity/TourLocation";
import { User } from "../entity/User";
import { gql } from "apollo-server";

export const typeDefs = gql`
  type TourStopMember {
    id: ID!
    user: User!
    rating: Float
  }

  type TourStop {
    id: ID!
    date: Date!
    tourStopMembers: [TourStopMember]!
  }

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
    tourStops: [TourStop]!
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
    avatar: String
  }

  type Query {
    user(id: ID!): User
    tour(id: ID!): Tour
    tourLocation(id: ID!): TourLocation
    location(id: ID!): Location
  }
`;

/*
  Load all relationship based on GQL info.
*/
const createEntityResolver =
  (type) =>
  async (_parent, { id }, context, info) => {
    const { loader } = context;
    return await loader
      .loadEntity(type, "entity")
      .where("entity.id = :id", { id })
      .info(info)
      .loadOne();
  };

export const resolvers = {
  Query: {
    user: createEntityResolver(User),
    tour: createEntityResolver(Tour),
    tourLocation: createEntityResolver(TourLocation),
    location: createEntityResolver(Location),
  },
};
