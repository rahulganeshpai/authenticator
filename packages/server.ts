import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import routes from "../router/router";

/**
 * Class - Server
 * @description
 * Class having implementation details for Express server
 */
class Server {
  /**
   * Method - Add_Configurations
   * @description
   * Method for adding server configurations
   */
  add_configurations() {
    const app = express();

    app.use(json());
    app.use(cors({ origin: "*" }));
    app.use(helmet());
    app.use(compression());
    app.use("/api/v1/welcome", routes().welcome_route);
    return app;
  }
  /**
   * Method - Initialise
   * @description
   * Method for initialising server
   */
  initialise() {
    const PORT = 8001;
    const app = this.add_configurations();
    const initialise = app.listen(PORT, () => {
      console.log(`Listening on Port: ${PORT}`);
    });
    //Server graceful exit
    process.on("SIGTERM", () => {
      console.log("Closing http server");
      initialise.close(() => {
        console.log("Http server closed");
        process.exit(0);
      });
      process.exit(0);
    });
    return initialise;
  }
}

/**
 * Instance - Express Server
 * @description
 * Instance of Express Server Class
 */
const server = new Server();
export default server;
