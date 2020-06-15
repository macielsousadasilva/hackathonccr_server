import express from "express";
import cors from "cors";
import routes from "./routes";
import config from "./config";

const app = express();
app.use(
  cors({
    //origin: 'http://192.168.0.109', //nossa url quando ir para prod
    origin: config.BASE_URL, //nossa url quando ir para prod
  })
);
app.use(routes);

app.listen(config.BASE_PORT);
