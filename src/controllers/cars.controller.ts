import { NextFunction, Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

export default class CarsController {
  constructor(private service: IService<ICar>) { }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  public read = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.read();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public readOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.service.readOne(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}