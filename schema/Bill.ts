import { z } from "zod";
const number = new RegExp(/^[0-9]+(\.[0-9]+)?$/);

export const BillSchema = z.object({
  serialNumber: z.string({
    required_error: "هذا الحقل مطلوب",
  }),

  from: z.string().pipe(
    z.coerce.date({
      invalid_type_error: "يجب ان يكون تاريخ",
    })
  ),
  to: z.string().pipe(
    z.coerce.date({
      invalid_type_error: "يجب ان يكون تاريخ",
    })
  ),
});
