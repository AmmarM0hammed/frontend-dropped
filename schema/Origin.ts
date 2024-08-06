import { z } from "zod";
const number = new RegExp(/^[0-9]+(\.[0-9]+)?$/);

export const OriginSchema = z.object({
  name: z
    .string({
      required_error:"هذا الحقل مطلوب"
    })

  })
