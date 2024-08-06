import { z } from "zod";
const number = new RegExp(/^[0-9]+(\.[0-9]+)?$/);

export const ElectricityServicePrice = z.object({
  
  classify: z.number({
    invalid_type_error: "يجب ام يكون رقماً",
  }),
  
  price: z.number({
    invalid_type_error: "يجب ام يكون رقماً",
  }),
  forKWH: z.number({
    invalid_type_error: "يجب ام يكون رقماً",
  }),
  governorateId: z.number({
    invalid_type_error: "يجب ام يكون رقماً",
  }),
});
