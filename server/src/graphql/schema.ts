import { Invite } from "../entity/Invite";
import { Location } from "../entity/Location";
import { Tour } from "../entity/Tour";
import { TourLocation } from "../entity/TourLocation";
import { TourMember } from "../entity/TourMember";
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
    currentUser: User
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

  "The createTour mutation input to create TourMembers on the Tour."
  input CreateTourTourMemberInput {
    "The user id used as the foreign key on the new TourMember model."
    id: ID!
  }

  "The createTour mutation input in order to create a new Tour model."
  input CreateTourInput {
    "The name of the new Tour."
    name: String!
    "The list of users to invite to join as TourMembers"
    tourMembers: [CreateTourTourMemberInput]!
  }

  type CreateTourPayload {
    success: Boolean!
    tour: Tour
  }

  type DeleteTourPayload {
    success: Boolean!
  }

  type Mutation {
    createTour(input: CreateTourInput!): CreateTourPayload!
    deleteTour(id: ID!): DeleteTourPayload!
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
    currentUser: (_parent, _args, context, _info) => context.user,
    location: createEntityResolver(Location),
    paginatedUsers: createOffsetEntityResolver(User),
    paginatedLocations: createOffsetEntityResolver(Location),
    tour: createEntityResolver(Tour),
    tourLocation: createEntityResolver(TourLocation),
    user: createEntityResolver(User),
  },
  Mutation: {
    createTour: async (_parent, args, context) => {
      const {
        input: { name, tourMembers },
      } = args;
      const { user, connection } = context;

      const result = await connection.transaction(async (manager) => {
        try {
          let tour = new Tour();
          tour.name = name;

          const userTourMember = new TourMember();
          userTourMember.user = user;
          userTourMember.admin = true;
          tour.tourMembers = Promise.resolve([userTourMember]);

          tour = await manager.save(tour);

          const invites = tourMembers.map((tourMember) => {
            const invite = new Invite();
            invite.invitee = tourMember.id;
            invite.inviter = user.id;
            invite.invitedAt = new Date();
            invite.targetType = "Tour";
            invite.targetId = tour.id;
            return invite;
          });

          await manager.save(invites);

          return {
            success: true,
            tour,
          };
        } catch (error) {
          return {
            success: false,
            tour: null,
          };
        }
      });

      return result;
    },
    deleteTour: async (_parent, args, context) => {
      try {
        const { user, connection } = context;
        const tour = await connection.manager.findOne(Tour, args);
        const tourMembers = await tour.tourMembers;
        const isAdmin = tourMembers.some(
          (tm) => tm.userId === user.id && tm.admin
        );
        if (!isAdmin) {
          return {
            success: false,
          };
        }

        /*
          Todo(Nick)
          Soft delete does not cascade for relations currently

          https://github.com/typeorm/typeorm/issues/5877
        */
        await connection.manager.delete(Tour, tour.id);
        return {
          success: true,
        };
      } catch (error) {
        return {
          success: false,
        };
      }
    },
  },
};
