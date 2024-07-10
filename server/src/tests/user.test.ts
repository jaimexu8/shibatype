import App from "../server";
import UserRoute from "../routes/user.route";
import request from "supertest";
import mongoose from "mongoose";
import { config } from "../utils/config";
import { CreateUserData } from "../interfaces/user.interface";
import { v4 as uuidv4 } from "uuid";

const routes = [new UserRoute()];
const appInstance = new App(routes);

beforeAll(async () => {
  await mongoose.connect(config.testUri);
});

afterAll(async () => {
  await mongoose.disconnect();
});

beforeEach(async () => {
  await mongoose.connection.db.dropCollection("users");
});

describe("POST /api/user/", () => {
  it("User account information should be saved when created", async () => {
    const userData: CreateUserData = {
      firebaseID: uuidv4(),
      displayName: "user123",
      email: "user123@gmail.com",
    };

    const response = await request(appInstance.app)
      .post("/api/user/")
      .send(userData);
    expect(response.statusCode).toBe(201);
  });
});
