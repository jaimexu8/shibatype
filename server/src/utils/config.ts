import dotenv from "dotenv";
import path from "path";

const rootEnvPath = path.resolve(__dirname, "../../../.env");

dotenv.config({ path: rootEnvPath });

export const config = {
  port: process.env.PORT,
  uri: process.env.URI,
  testUri: process.env.TEST_URI,
};
