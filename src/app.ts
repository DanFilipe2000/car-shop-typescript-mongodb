import express from 'express';
import 'express-async-errors';
import errorHandler from './middleware/errorMiddleware';
import carsRouter from './routes/cars.routes';

const app = express();

app.use(express.json());
app.use(carsRouter);
app.use(errorHandler);

export default app;
