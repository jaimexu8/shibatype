import App from "../server";
import TestRoute from "../routes/test.route";
import UserRoute from "../routes/user.route";
import request from "supertest";
import mongoose from "mongoose";
import { config } from "../utils/config";
import { defaultCreateTestData, defaultUserData } from "./setup/test.utils";

const routes = [new TestRoute(), new UserRoute()];
const appInstance = new App(routes);

beforeAll(async () => {
  await mongoose.connect(config.testUri);
});

afterAll(async () => {
  await mongoose.disconnect();
});

beforeEach(async () => {
  await mongoose.connection.db.dropCollection("users");
  await mongoose.connection.db.dropCollection("tests");
});

describe("POST /api/tests", () => {
  it("Typing test results should be saved", async () => {
    const createUserRes = await request(appInstance.app)
      .post("/api/user/")
      .send(defaultUserData);

    const response = await request(appInstance.app)
      .post("/api/test/")
      .send(defaultCreateTestData(createUserRes.body.firebaseID));
    expect(response.statusCode).toBe(201);
  });
});
