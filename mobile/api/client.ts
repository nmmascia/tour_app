import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("http://localhost:4000", {
  headers: {
    Authorization: "1",
  },
});

export default client;
