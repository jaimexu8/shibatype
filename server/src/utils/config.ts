import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT,
  uri: process.env.URI,
  testUri: process.env.TEST_URI,
};
