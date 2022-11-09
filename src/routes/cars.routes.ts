import { Router } from 'express';
import VehicleController from '../controllers/vehicle.controller';
import CarsModel from '../models/cars.model';
import MotorcycleModel from '../models/motorcycle.model';
import MotorcycleService from '../services/motorcycle.service';
import CarsService from '../services/cars.service';

const carsModel = new CarsModel();
const carService = new CarsService(carsModel);
const carsController = new VehicleController(carService);

const vehicleRouter = Router();

vehicleRouter.post('/cars', async (req, res, next) => {
  try {
    await carsController.create(req, res);
  } catch (error) {
    next(error);
  }
});
vehicleRouter.get('/cars', async (req, res, next) => {
  try {
    await carsController.read(req, res);
  } catch (error) {
    next(error);
  }
});
vehicleRouter.get('/cars/:id', async (req, res, next) => {
  try {
    await carsController.readOne(req, res);
  } catch (error) {
    next(error);
  }
});
vehicleRouter.put('/cars/:id', async (req, res, next) => {
  try {
    await carsController.update(req, res);
  } catch (error) {
    next(error);
  }
});
vehicleRouter.delete('/cars/:id', async (req, res, next) => {
  try {
    await carsController.delete(req, res);
  } catch (error) {
    next(error);
  }
});

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new VehicleController(motorcycleService);

const URL_MOTORCYCLE_ID = '/motorcycles/:id';

vehicleRouter.post('/motorcycles', async (req, res, next) => {
  try {
    await motorcycleController.create(req, res);
  } catch (error) {
    next(error);
  }
});
vehicleRouter.get('/motorcycles', async (req, res, next) => {
  try {
    await motorcycleController.read(req, res);
  } catch (error) {
    next(error);
  }
});
vehicleRouter.get(URL_MOTORCYCLE_ID, async (req, res, next) => {
  try {
    await motorcycleController.readOne(req, res);
  } catch (error) {
    next(error);
  }
});
vehicleRouter.put(URL_MOTORCYCLE_ID, async (req, res, next) => {
  try {
    await motorcycleController.update(req, res);
  } catch (error) {
    next(error);
  }
});
vehicleRouter.delete(URL_MOTORCYCLE_ID, async (req, res, next) => {
  try {
    await motorcycleController.delete(req, res);
  } catch (error) {
    next(error);
  }
});

export default vehicleRouter;
