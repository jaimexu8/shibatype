import UserRoute from "./routes/user.route";
import TestRoute from "./routes/test.route";
import StoreRoute from "./routes/store.route";
import App from "./server";
import { isStitchPreview } from "./data/stitch-preview";

const app = new App([new UserRoute(), new TestRoute(), new StoreRoute()]);

if (isStitchPreview()) {
  console.log(
    "Stitch preview mode: serving fixture API data without MongoDB"
  );
  app.listen();
} else {
  app.connectToDatabase().then(() => {
    app.listen();
  });
}
