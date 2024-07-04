import { z } from "zod";

export const FeederSchema = z.object({
  name: z.string({
    required_error: "الحقل مطلوب",
  }),

  load: z.number({
    invalid_type_error: "يجب ام يكون رقماً",
  }),
  distributionStationId: z.number({
    invalid_type_error: "يجب ام يكون رقماً",
  }),

  cityId: z.number({
    invalid_type_error: "يجب ام يكون رقماً",
  }),
  governorateId: z.number({
    invalid_type_error: "يجب ام يكون رقماً",
  }),
});
