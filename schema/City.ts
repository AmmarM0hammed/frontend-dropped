import { z } from "zod";
const number = new RegExp(/^[0-9]+(\.[0-9]+)?$/);

export const City = z.object({
  name: z
    .string({
      required_error:"هذا الحقل مطلوب"
    })
    .min(3, "الاسم يجب ان يكون اكبر من 3 احرف ")
    .max(200, "يجب ان يكون الاسم اصغر من 50 حرف"),

  governorateId: z.number({
    invalid_type_error: "يجب ام يكون رقماً",
  }),
});
