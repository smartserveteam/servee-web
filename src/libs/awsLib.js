import { Storage } from "aws-amplify";

export async function s3Upload(file) {
  // If app is use intensively, use a different technique to generate a unique filename
  const filename = `${Date.now()}-${file.name}`;

  // Upload file to S3
  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type
  });

  // Return stored object's key
  return stored.key;
}
