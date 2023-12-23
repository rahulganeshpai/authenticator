import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import routes from "./router/router"

const app = express();
const PORT = 8001;

app.use(json());
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(compression());
app.use("/api/welcome", routes().welcome_route)

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
