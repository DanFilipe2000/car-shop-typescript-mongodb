import { z } from 'zod';
import { VehicleSchema } from './IVehicle';

// import { IVehicle } from './IVehicle';

// export interface ICar extends IVehicle {
//   doorsQty: number;
//   seatsQty: number;
// }

const CarSchema = VehicleSchema.extend({
  doorsQty: z.number({
    required_error: 'Doors Qty is required',
    invalid_type_error: 'Doors Qty must be a number',
  }).int().min(2).max(4),
  seatsQty: z.number({
    required_error: 'Seats Qty is required',
    invalid_type_error: 'Seats Qty must be a number',
  }).int().min(2).max(7),
});

type ICar = z.infer<typeof CarSchema>;

export { ICar, CarSchema };
