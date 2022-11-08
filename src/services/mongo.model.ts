import { Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';

export default abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;
  
  constructor(model:Model<T>) {
    this._model = model;
  }

  public async create(objeto: T): Promise<T> {
    return this._model.create({ ...objeto });
  }
}
