import { any, z } from "zod";

export const newCarSchema = z.object({
  chassisNumber: z
    .string()
    .min(4, { message: "must be at least 4 character long" }),
  brand: z.string().min(1, { message: "must be at least 1 character long" }),
  model: z.string().min(1, { message: "must be at least 1 character long" }),
  year: z
    .string()
    .min(4, { message: "must be at least 4 character long" })
    .max(4, { message: "must be at most 4 character long" }),
  color: z.string().min(1, { message: "must be at least 1 character long" }),
  carImage: any(),
});

export type NewCarType = z.infer<typeof newCarSchema>;

export type car = {
  carId: number;
  chassisNumber: string;
  brand: string;
  model: string;
  year: string;
  color: string;
  carImage: string;
  currentKilometrage: number;
};

export type Log = {
  date: string;
  brand: string;
  price: string;
  kilometrageBeforeMaintenance: number;
  kilometrageNextMaintenance: number;
};

export type MaintenanceItem = {
  name: string;
  class: string;
  changeEvery: number;
  currentKilometrage: number;
  historyLog: Log[];
};
