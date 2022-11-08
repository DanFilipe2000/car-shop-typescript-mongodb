import { Router } from 'express';
import CarsController from '../controllers/cars.controller';
import CarsModel from '../models/cars.model';
import CarsService from '../services/cars.service';

const carsModel = new CarsModel();
const carService = new CarsService(carsModel);
const carsController = new CarsController(carService);

const carsRouter = Router();

carsRouter.post('/cars', (req, res, next) => {
  carsController.create(req, res, next);
});

export default carsRouter;
