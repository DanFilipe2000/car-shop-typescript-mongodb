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


describe('Cars Service', () => {
  const carModel = new CarsModel();
  const carsService = new CarsService(carModel);

  before(async () => {
    sinon
      .stub(carsService, 'create')
      .resolves(carsResultMock);
  });

  after(()=>{
    sinon.restore();
  })

  it('Retorna o carro criado na Model', async () => {
    const result = await carsService.create(carMock);
    expect(result).to.be.eq(carsResultMock);
  });
});

describe('Cars Service', () => {
  const carModel = new CarsModel();
  const carsService = new CarsService(carModel);

  before(async () => {
    sinon
      .stub(carsService, 'create')
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
});
