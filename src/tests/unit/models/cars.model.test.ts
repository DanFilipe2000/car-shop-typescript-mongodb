import * as sinon from 'sinon';
import chai from 'chai';
import CarsModel from '../../../models/cars.model';
import CarsService from '../../../services/cars.service';
import { ICar } from '../../../interfaces/ICar';
const { expect } = chai;

const carMock = {
	model: "Ferrari Maranello",
	year: 1963,
	color: "red",
	buyValue: 3500000,
	doorsQty: 2,
	seatsQty: 2,
}

const carsResultMock = {
	model: "Ferrari Maranello",
	year: 1963,
	color: "red",
	buyValue: 3500000,
	doorsQty: 2,
	seatsQty: 2,
	_id: "636ad96b90d18397cccbbbe4"
}

const carsMock = [
  {
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    doorsQty: 2,
    seatsQty: 2,
    _id: "636ad96b90d18397cccbbbe4"
  },
  {
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    doorsQty: 2,
    seatsQty: 2,
    _id: "636ad96b90d18397cccbbbe4"
  }
]

describe('Model', () => {
  const carsModel = new CarsModel();

  before(async () => {
    sinon.stub(carsModel, 'create').resolves(carsResultMock);
    sinon.stub(carsModel, 'read').resolves(carsMock);
    sinon.stub(carsModel, 'readOne').resolves(carsResultMock);
  });

  after(()=>{
    sinon.restore();
  })

  it('Cria um carro com sucesso', async () => {
    const result = await carsModel.create(carMock);
    expect(result).to.be.eq(carsResultMock);
  });

  it('Retorna todos os carros com sucesso', async () => {
    const result = await carsModel.read();
    expect(result).to.be.eq(carsMock);
  });

  it('Retorna apenas um carro correspondete ao id', async () => {
    const result = await carsModel.readOne(carsResultMock._id);
    expect(result).to.be.eq(carsResultMock);
  });
});

describe('Model', () => {
  const carsModel = new CarsModel();

  before(async () => {
    sinon.stub(carsModel, 'readOne').resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  it('Dispara uma excessão quando um id errado é passado', async () => {
    try {
      await carsModel.readOne('iderrado');
    } catch (error: any) {
      expect(error.message).to.be.eq('InvalidMongoId');
    }
  });
});