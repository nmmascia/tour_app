import { Location } from "../entity/Location";
import { Tour } from "../entity/Tour";
import { TourLocation } from "../entity/TourLocation";
import { User } from "../entity/User";
import { gql } from "apollo-server";

export const typeDefs = gql`
  interface OffsetPagination {
    offset: Int
    totalCount: Int!
    limit: Int!
  }

  type UserPagination implements OffsetPagination {
    records: [User]!
    offset: Int
    totalCount: Int!
    limit: Int!
  }

  type LocationPagination implements OffsetPagination {
    records: [Location]!
    offset: Int
    totalCount: Int!
    limit: Int!
  }

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
    avatar: Photo
  }

  type Query {
    user(id: ID!): User
    tour(id: ID!): Tour
    tourLocation(id: ID!): TourLocation
    location(id: ID!): Location
    paginatedUsers(searchTerm: String!, limit: Int, offset: Int): UserPagination
    paginatedLocations(
      searchTerm: String!
      limit: Int
      offset: Int
    ): LocationPagination
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

const createOffsetEntityResolver =
  (type) => async (_parent, args, context, info) => {
    const { searchTerm, limit = 20, offset = 0 } = args;
    const { loader } = context;

    const [records, totalCount] = await loader
      .loadEntity(type)
      .info(info, "records")
      .search({
        searchText: searchTerm,
        searchColumns: ["name", "username"],
      })
      .paginate({ limit, offset })
      .loadPaginated();

    let nextOffset = offset + records.length + 1;

    if (totalCount <= nextOffset) {
      nextOffset = null;
    }

    if (totalCount === 0) {
      nextOffset = null;
    }

    return {
      records,
      offset: nextOffset,
      totalCount,
      limit,
    };
  };

export const resolvers = {
  Query: {
    user: createEntityResolver(User),
    tour: createEntityResolver(Tour),
    tourLocation: createEntityResolver(TourLocation),
    location: createEntityResolver(Location),
    paginatedUsers: createOffsetEntityResolver(User),
    paginatedLocations: createOffsetEntityResolver(Location),
  },
};
