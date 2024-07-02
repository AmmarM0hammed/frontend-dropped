import { z } from "zod";
const number = new RegExp(/^[0-9]+(\.[0-9]+)?$/);

export const Company = z.object({
  name: z
    .string()
    .min(3, "الاسم يجب ان يكون اكبر من 3 احرف ")
    .max(200, "يجب ان يكون الاسم اصغر من 200 حرف"),

  
});
