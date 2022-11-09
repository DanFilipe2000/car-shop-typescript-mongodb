import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './mongo.model';

const motorcycleMongooseSchema = new Schema<IMotorcycle>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

// versionKey: https://pt.stackoverflow.com/questions/174511/campo-v-em-todos-os-documentos-de-uma-cole%C3%A7%C3%A3o#:~:text=%C3%89%20poss%C3%ADvel%20desativar%20o%20versionamento,alterar%20o%20nome%20da%20chave.

export default class MotorcycleModel extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('MotorcycleModel', motorcycleMongooseSchema)) {
    super(model);
  }
}