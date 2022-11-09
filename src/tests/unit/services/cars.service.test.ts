import * as sinon from 'sinon';
import chai from 'chai';
import CarsModel from '../../../models/cars.model';
import CarsService from '../../../services/cars.service';
import { ZodError } from 'zod';
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

describe('Cars Service', () => {
  const carModel = new CarsModel();
  const carsService = new CarsService(carModel);

  before(async () => {
    sinon.stub(carsService, 'create').resolves(carsResultMock);
    sinon.stub(carsService, 'read').resolves(carsMock);
    sinon.stub(carsService, 'readOne').resolves(carsResultMock);
  });

  after(()=>{
    sinon.restore();
  })

  it('Retorna o carro criado na Model', async () => {
    const result = await carsService.create(carMock);
    expect(result).to.be.eq(carsResultMock);
  });

  it('Retorna todos os carros da Model', async () => {
    const result = await carsService.read();
    expect(result).to.be.eq(carsMock);
  });

  it('Retorna um unico carro baseado no id', async () => {
    const result = await carsService.readOne(carsResultMock._id);
    expect(result).to.be.eq(carsResultMock);
  });
});

describe('Cars Service', () => {
  const carModel = new CarsModel();
  const carsService = new CarsService(carModel);

  before(async () => {
    sinon.stub(carsService, 'create');
    sinon.stub(carsService, 'readOne');
  });

  after(()=>{
    sinon.restore();
  })

  it('Dispara um excessão quando algum dado recebido estiver errado', async () => {
    try {
      await carsService.create({});
    } catch (error) {
      expect(error).to.be.instanceOf(ZodError);
    }
  })

  it('Dispara um excessão quando o id estiver errado', async () => {
    try {
      await carsService.readOne('iderrado');
    } catch (error) {
      expect(error).to.be.instanceOf(ZodError);
    }
  })
});
