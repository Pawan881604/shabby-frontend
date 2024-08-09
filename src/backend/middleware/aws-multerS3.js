const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const mime = require("mime-types");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadFile = async (filePath, bucketName, fileName) => {
  const fileContent = fs.readFileSync(filePath);
  const contentType = mime.lookup(filePath);

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
    ContentType: contentType,
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
};

module.exports = uploadFile;
