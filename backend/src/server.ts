import express, { Request, Response } from "express";
import { AddressInfo } from "net";
import { getRepository } from "typeorm";
import Orphanage from "./models/Orphanage";

import "./database/connection";

const app = express();
app.use(express.json());

app.post("/orphanages", async (req: Request, res: Response) => {
  try {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    });

    await orphanagesRepository.save(orphanage);

    return res
      .status(200)
      .send({
        message: "Orfanato criado com sucesso!"
      });
  } catch(error) {
    res
      .status(error.errorCode || 400)
      .send({
        message: error.message
      });
  }
});

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