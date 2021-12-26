import { S3 } from "aws-sdk";

const client = new S3({
  accessKeyId: process.env.STORAGE_ACCESS_KEY,
  secretAccessKey: process.env.STORAGE_ACCESS_SECRET_KEY,
  endpoint: process.env.STORAGE_ENDPOINT,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

export default client;
