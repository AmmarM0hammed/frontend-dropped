import { z } from "zod";

export const LowVoltageStationSchema = z.object({
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
    invalid_type_error: "يجب ان يكون رقماً",
  }),
  outgoingVoltage: z.number({
    invalid_type_error: "يجب ان يكون رقماً",
  }),
  capacity: z.number({
    invalid_type_error: "يجب ان يكون رقماً",
  }),
  capacityUnit: z.number({
    invalid_type_error: "يجب ان يكون رقماً",
  }),
  transformerType: z.number({
    invalid_type_error: "يجب ان يكون رقماً",
  }),
  connactionType: z.number({
    invalid_type_error: "يجب ان يكون رقماً",
  }),
  feederId: z.number({
    invalid_type_error: "يجب ان يكون رقماً",
  }),
  governorateId: z.number({
    invalid_type_error: "يجب ان يكون رقماً",
  }),
  cityId: z.number({
    invalid_type_error: "يجب ان يكون رقماً",
  }),
  dataCollectionUnitId: z.number({
    invalid_type_error: "يجب ان يكون رقماً",
  })
});
