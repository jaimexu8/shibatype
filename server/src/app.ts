import UserRoute from "./routes/user.route";
import TestRoute from "./routes/test.route";
import StoreRoute from "./routes/store.route";
import App from "./server";

const app = new App([new UserRoute(), new TestRoute(), new StoreRoute()]);

app.connectToDatabase().then(() => {
  app.listen();
});
