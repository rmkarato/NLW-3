import express, { Request, Response } from "express";
import { AddressInfo } from "net";

import "./database/connection";

import routes from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

app.get("/test", async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .send("Hi, your server is working!");
  } catch (error) {
    res
      .status(400)
      .send("ERROR :(");
  }
});

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});