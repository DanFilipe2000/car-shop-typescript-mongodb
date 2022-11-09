import { ErrorTypes } from '../errors/catalog';
import { MotorcycleSchema, IMotorcycle } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

export default class MotorcycleService implements IService<IMotorcycle> {
  protected _model: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._model = model;
  }

  public async create(objeto: unknown): Promise<IMotorcycle> {
    const result = MotorcycleSchema.safeParse(objeto);
    if (!result.success) throw result.error;
    return this._model.create({ ...objeto as IMotorcycle });
  }

  public async read(): Promise<IMotorcycle[]> {
    return this._model.read();
  }

  public async readOne(id: string): Promise<IMotorcycle | null> {
    if (id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);
    const result = await this._model.readOne(id);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    return result;
  }

  public async update(id: string, obj: unknown): Promise<IMotorcycle | null> {
    const zodParse = MotorcycleSchema.safeParse(obj);
    if (!zodParse.success) throw zodParse.error;
    if (id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);
    const result = await this._model.update(id, zodParse.data);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    return result;
  }

  public async delete(id: string): Promise<IMotorcycle> {
    if (id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);
    const result = await this._model.delete(id);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    return result;
  }
}

// Método safeParse retirado da documentação do Zod
// Link: https://zod.dev/?id=schema-methods
