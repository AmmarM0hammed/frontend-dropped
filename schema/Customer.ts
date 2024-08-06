import { z } from "zod";

const number = new RegExp(/^[0-9]+(\.[0-9]+)?$/);

export const Customer = z.object({
  firstName: z.string({
    message: "هذا الحقل مطلوب",
  }),
  secondName: z.string({
    message: "هذا الحقل مطلوب",
  }),
  thirdName: z.string({
    message: "هذا الحقل مطلوب",
  }),
  surname: z.string({
    message: "هذا الحقل مطلوب",
  }),
  birthDate: z.string().pipe(
    z.coerce.date({
      invalid_type_error: "يجب ان يكون تاريخ",
    })
  ),
  motherName: z.string({
    message: "هذا الحقل مطلوب",
  }),
  phoneNumber: z.string({
    message: "هذا الحقل مطلوب",
  }),
  customerType: z.number({
    required_error: "هذا الحقل مطلوب",
  }),
  governorateId: z.number({
    required_error: "هذا الحقل مطلوب",
  }),
  cityId: z.number({
    required_error: "هذا الحقل مطلوب",
  }),
  mahalla: z.string({
    message: "هذا الحقل مطلوب",
  }),
  street: z.string({
    message: "هذا الحقل مطلوب",
  }),
  house: z.string({
    message: "هذا الحقل مطلوب",
  }),
  latitud: z.number({
    required_error: "هذا الحقل مطلوب",
  }),
  longitud: z.number({
    required_error: "هذا الحقل مطلوب",
  }),
  
});
