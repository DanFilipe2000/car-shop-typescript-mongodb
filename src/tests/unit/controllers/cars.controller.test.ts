import * as sinon from 'sinon';
import chai from 'chai';
import CarsModel from '../../../models/cars.model';
import CarsService from '../../../services/cars.service';
import CarsController from '../../../controllers/cars.controller';
import { NextFunction, Request, Response } from 'express';
const { expect } = chai;

const carMock = {
	model: "Ferrari Maranello",
	year: 1963,
	color: "red",
	buyValue: 3500000,
	doorsQty: 2,
	seatsQty: 2,
}

describe('CarsController', () => {
  const carsModel = new CarsModel();
  const carsService = new CarsService(carsModel);
  const carsController = new CarsController(carsService);

  const res = {} as Response;
  const req = {} as Request;
  const next = {} as NextFunction;

  before(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.send = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  it('Verifica se o status 201 é retornado corretamente', async () => {
    await carsController.create(req, res, next);
    expect(res.status as sinon.SinonStub).to.be.eq(201);
  });
});