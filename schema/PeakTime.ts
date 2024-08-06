import { z } from "zod";
const number = new RegExp(/^[0-9]+(\.[0-9]+)?$/);

export const PeakTimeSchema = z.object({
  name: z.string({
    required_error: "هذا الحقل مطلوب",
  }),
  description: z.string({
    required_error: "هذا الحقل مطلوب",
  }),

  startTime: z.string().pipe(z.coerce.date({
    invalid_type_error: "يجب ان يكون تاريخ",
  })),
  endTime:z.string().pipe(z.coerce.date({
    invalid_type_error: "يجب ان يكون تاريخ",
  })),
  percentage: z.number({
    invalid_type_error: "يجب ان يكون رقماً",
  }),
  governorateId: z.number({
    invalid_type_error: "يجب ان يكون رقماً",
  }),
  cityId: z.number({
    invalid_type_error: "يجب ان يكون رقماً",
  }),
 
});
