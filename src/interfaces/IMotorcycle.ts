import { z } from 'zod';
import { VehicleSchema } from './IVehicle';

const MotorcycleSchema = VehicleSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().min(1).max(2500),
});

type IMotorcycle = z.infer<typeof MotorcycleSchema>;

export { MotorcycleSchema, IMotorcycle };
