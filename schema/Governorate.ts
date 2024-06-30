import { z } from "zod";

export const Governorate = z.object({
  name: z
    .string()
    .min(3, "الاسم يجب ان يكون اكبر من 3 احرف ")
    .max(200, "يجب ان يكون الاسم اصغر من 50 حرف"),

  
});
