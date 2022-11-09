import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';

export default class VehicleController {
  constructor(private _service: IService<ICar | IMotorcycle>) { }

  public create = async (req: Request, res: Response) => {
    const result = await this._service.create(req.body);
    return res.status(201).json(result);
  };

  public read = async (_req: Request, res: Response) => {
    const result = await this._service.read();
    return res.status(200).json(result);
  };

  public readOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this._service.readOne(id);
    return res.status(200).json(result);
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this._service.update(id, req.body);
    res.status(200).json(result);
  };

  public delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this._service.delete(id);
    res.status(204).send();
  };
}