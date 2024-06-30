import { z } from "zod";

export const User = z.object({
  fullName: z
    .string()
    .min(3, "الاسم يجب ان يكون اكبر من 3 احرف ")
    .max(200, "يجب ان يكون الاسم اصغر من 50 حرف"),
  userName: z
    .string()
    .min(3, "الاسم يجب ان يكون اكبر من 3 احرف ")
    .max(200, "يجب ان يكون الاسم اصغر من 50 حرف"),

  role: z.number({
    invalid_type_error: "يجب ام يكون رقماً",
  }),
 
});
