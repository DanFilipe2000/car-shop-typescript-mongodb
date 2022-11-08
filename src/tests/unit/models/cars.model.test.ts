import * as sinon from 'sinon';
import chai from 'chai';
import CarsModel from '../../../models/cars.model';
import CarsService from '../../../services/cars.service';
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

describe('Model', () => {
  const carsModel = new CarsModel();

  before(async () => {
    sinon
      .stub(carsModel, 'create')
      .resolves(carsResultMock);
  });

  after(()=>{
    sinon.restore();
  })

  it('Cria um carro com sucesso', async () => {
    const result = await carsModel.create(carMock);
    expect(result).to.be.eq(carsResultMock);
  });
});