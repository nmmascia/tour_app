import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("http://localhost:4000", { headers: {} });

export default client;
