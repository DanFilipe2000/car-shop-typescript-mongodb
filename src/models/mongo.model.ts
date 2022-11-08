import { Model, UpdateQuery } from 'mongoose';
import { IModel } from '../interfaces/IModel';

export default abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(objeto: T): Promise<T> {
    return this._model.create({ ...objeto });
  }
  
  public async read(): Promise<T[]> {
    return this._model.find();
  }

  public async readOne(_id: string): Promise<T | null> {
    return this._model.findOne({ _id });
  }

  public async update(_id: string, objeto: T): Promise<T | null> {
    return this._model.findByIdAndUpdate({ _id }, { ...objeto } as UpdateQuery<T>);
  }

  public async delete(_id: string): Promise<T | null> {
    return this._model.findByIdAndDelete({ _id });
  }
}

// Model feita com o auxílio do conteúdo do course Dia 01: Mongoose e Arquitetura MSC
// Link: https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/31fdf796-fb5a-4a3f-b1d5-4eadd0ab0147/day/fa158180-d0d0-40d7-83bf-ff7c0c983b10/lesson/0d23dfa7-daf3-4490-89f4-916f03456093