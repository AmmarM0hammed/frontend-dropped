import { z } from "zod";
const number = new RegExp(/^[0-9]+(\.[0-9]+)?$/);

const DeviceModal = z.object({
  name: z.string({
    required_error: "هذا الحقل مطلوب",
  }),
});
const DeviceIdentificationSchema = z.object({
  name: z.string({
    required_error: "هذا الحقل مطلوب",
  }),
});

export { DeviceModal, DeviceIdentificationSchema };
