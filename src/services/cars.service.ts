import { ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

export default class CarsService implements IService<ICar> {
  protected _model: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._model = model;
  }

  public async create(body: ICar): Promise<ICar> {
    return this._model.create({ ...body });
  }
}
