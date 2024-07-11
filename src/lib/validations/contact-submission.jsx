import { z } from "zod";
const phoneRegExp = /^\d{10}$/;
export const contactSubmissionSchema = z.object({
  email: z.string().nonempty({ message: "Email is required!" }).email(),
  phone: z
    .string()
    .max(10, { message: "Phone Number cannot be more than 10 digits!" })
    .refine(
      (value) => {
        if (value) {
          return phoneRegExp.test(value);
        }
        return true;
      },
      { message: "Phone number is not valid!" }
    )
    .refine(
      (value) => {
        if (value) {
          return value.length === 10;
        }
        return true;
      },
      { message: "Phone Number must be exactly 10 digits!" }
    )
    .optional(),
  message: z.string().optional(),
});
