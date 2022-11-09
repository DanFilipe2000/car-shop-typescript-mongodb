import { Router } from 'express';
import CarsController from '../controllers/cars.controller';
import CarsModel from '../models/cars.model';
import CarsService from '../services/cars.service';

const carsModel = new CarsModel();
const carService = new CarsService(carsModel);
const carsController = new CarsController(carService);

const carsRouter = Router();

carsRouter.post('/cars', async (req, res, next) => {
  try {
    await carsController.create(req, res);
  } catch (error) {
    next(error);
  }
});
carsRouter.get('/cars', async (req, res, next) => {
  try {
    await carsController.read(req, res);
  } catch (error) {
    next(error);
  }
});
carsRouter.get('/cars/:id', async (req, res, next) => {
  try {
    await carsController.readOne(req, res);
  } catch (error) {
    next(error);
  }
});
carsRouter.put('/cars/:id', async (req, res, next) => {
  try {
    await carsController.update(req, res);
  } catch (error) {
    next(error);
  }
});
carsRouter.delete('/cars/:id', async (req, res, next) => {
  try {
    await carsController.delete(req, res);
  } catch (error) {
    next(error);
  }
});

export default carsRouter;
