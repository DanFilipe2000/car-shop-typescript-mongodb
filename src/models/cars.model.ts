import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './mongo.model';

const carMongooseSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

// versionKey: https://pt.stackoverflow.com/questions/174511/campo-v-em-todos-os-documentos-de-uma-cole%C3%A7%C3%A3o#:~:text=%C3%89%20poss%C3%ADvel%20desativar%20o%20versionamento,alterar%20o%20nome%20da%20chave.

export default class CarsModel extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('CarsModel', carMongooseSchema)) {
    super(model);
  }
}