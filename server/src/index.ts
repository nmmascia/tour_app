import "dotenv/config";
import "reflect-metadata";

import { createConnection } from "typeorm";
import createServer from "./graphql/create-server";

async function main() {
  try {
    const connection = await createConnection();
    const server = createServer({ connection });
    const { url } = await server.listen({
      port: process.env.PORT,
    });
    console.log(url);
  } catch (error) {
    console.log(error);
  }
}

main();
