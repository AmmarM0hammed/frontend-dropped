import { z } from "zod";

export const DistributionStation = z.object({
  name: z
    .string({
      required_error: "الحقل مطلوب",
    })
    .min(3, "الاسم يجب ان يكون اكبر من 3 احرف ")
    .max(200, "يجب ان يكون الاسم اصغر من 200 حرف"),
  serialNumber: z
    .string({
      required_error: "الحقل مطلوب",
    })
    .min(1, "الاسم يجب ان يكون اكبر من 1 احرف ")
    .max(200, "يجب ان يكون الاسم اصغر من 200 حرف"),
  referenceNumber: z
    .string({
      required_error: "الحقل مطلوب",
    })
    .min(1, "الاسم يجب ان يكون اكبر من 1 احرف ")
    .max(200, "يجب ان يكون الاسم اصغر من 200 حرف"),

  incomingVoltage: z.number({
    invalid_type_error: "يجب ام يكون رقماً",
  }),
  outgoingVoltage: z.number({
    invalid_type_error: "يجب ام يكون رقماً",
  }),
  capacity: z.number({
    invalid_type_error: "يجب ام يكون رقماً",
  }),
  capacityUnit: z.number({
    invalid_type_error: "يجب ام يكون رقماً",
  }),
  cityId: z.number({
    invalid_type_error: "يجب ام يكون رقماً",
  }),
  governorateId: z.number({
    invalid_type_error: "يجب ام يكون رقماً",
  }),
});
