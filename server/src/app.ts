import UserRoute from "./routes/user.route";
import TestRoute from "./routes/test.route";

import App from "./server";

const app = new App([new UserRoute(), new TestRoute()]);

app.connectToDatabase().then(() => {
  app.listen();
});
