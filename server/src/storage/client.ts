import { S3 } from "aws-sdk";

/*
  const params = {
    Bucket: process.env.STORAGE_BUCKET,
    Key: "testobject",
    Body: "Hello from MinIO!!",
  };

  s3.putObject(params, function (err, data) {
    if (err) console.log(err) ;
    else console.log("Successfully uploaded data to testbucket/testobject");
  });
*/

const client = new S3({
  accessKeyId: process.env.STORAGE_ACCESS_KEY,
  secretAccessKey: process.env.STORAGE_ACCESS_SECRET_KEY,
  endpoint: process.env.STORAGE_ENDPOINT,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

export default client;
