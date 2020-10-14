import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Orphanage from "../models/Orphanage";

export default {
  async index(req: Request, res: Response) {
    try {
      const orphanagesRepository = getRepository(Orphanage);
  
      const orphanages = await orphanagesRepository.find();

      return res
        .status(200)
        .json(orphanages);

    } catch(error) {
      res
        .status(error.errorCode || 400)
        .send({
          message: error.message
        });
    }
  },

  async create(req: Request, res: Response) {
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
        .status(201)
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
  }
};