import { ErrorTypes } from '../errors/catalog';
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

  public async read(): Promise<ICar[]> {
    return this._model.read();
  }

  public async readOne(id: string): Promise<ICar | null> {
    if (id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);
    const result = await this._model.readOne(id);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    return result;
  }

  public async update(id: string, obj: unknown): Promise<ICar | null> {
    const zodParse = CarSchema.safeParse(obj);
    if (!zodParse.success) throw zodParse.error;
    if (id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);
    const result = await this._model.update(id, zodParse.data);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    return result;
  }

  public async delete(id: string): Promise<ICar> {
    if (id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);
    const result = await this._model.delete(id);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    return result;
  }
}

// Método safeParse retirado da documentação do Zod
// Link: https://zod.dev/?id=schema-methods
