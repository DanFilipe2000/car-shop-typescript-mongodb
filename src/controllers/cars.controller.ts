import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

export default class CarsController {
  constructor(private service: IService<ICar>) { }

  public create = async (req: Request, res: Response) => {
    const result = await this.service.create(req.body);
    return res.status(201).json(result);
  };

  public read = async (_req: Request, res: Response) => {
    const result = await this.service.read();
    return res.status(200).json(result);
  };

  public readOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.service.readOne(id);
    return res.status(200).json(result);
  };
}