import { z } from "zod";

export const DCUSchema = z.object({
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
  address: z
    .string({
      required_error: "الحقل مطلوب",
    })
    .min(1, "الاسم يجب ان يكون اكبر من 1 احرف ")
    .max(200, "يجب ان يكون الاسم اصغر من 200 حرف"),

  companyId: z.number({
    invalid_type_error: "يجب ان يكون رقماً",
  }),
  originId: z.number({
    invalid_type_error: "يجب ان يكون رقماً",
  }),
  deviceModelId: z.number({
    invalid_type_error: "يجب ان يكون رقماً",
  }),

  governorateId: z.number({
    invalid_type_error: "يجب ان يكون رقماً",
  }),
  deviceIdentificationId: z.number({
    invalid_type_error: "يجب ان يكون رقماً",
  }),
  cityId: z.number({
    invalid_type_error: "يجب ان يكون رقماً",
  }),
});
