import express from 'express';
import 'express-async-errors';
import errorHandler from './middleware/errorMiddleware';
import vehicleRouter from './routes/vehicles.routes';

const app = express();

app.use(express.json());
app.use(vehicleRouter);
app.use(errorHandler);

export default app;
