import * as express from "express";
import * as mongoose from "mongoose";

import { Controller } from "types/Controller";

class App {
  public app: express.Application;

  constructor(middlewares: express.Handler[], controllers: Controller[]) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares(middlewares);
    this.initializeControllers(controllers);
  }

  public listen(port: number) {
    this.app.listen(port, () => {
      console.log(`App listening on the port ${port}`);
    });
  }

  private initializeMiddlewares(middlewares: express.Handler[]) {
    middlewares.forEach(middleware => {
      this.app.use(middleware);
    });
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      this.app.use("/", controller.router);
    });
  }

  private connectToTheDatabase() {
    const { MONGO_URL } = process.env;

    mongoose.connect(MONGO_URL!, { useNewUrlParser: true });
  }
}

export default App;
