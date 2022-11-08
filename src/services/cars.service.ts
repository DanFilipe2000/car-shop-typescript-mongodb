import { CarSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

export default class CarsService implements IService<ICar> {
  protected _model: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._model = model;
  }

  public async create(objeto: unknown): Promise<ICar> {
    const result = CarSchema.safeParse(objeto);
    if (!result.success) throw result.error;
    return this._model.create({ ...objeto as ICar });
  }
}

// Método safeParse retirado da documentação do Zod
// Link: https://zod.dev/?id=schema-methods
