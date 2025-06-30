import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Select a gender." }),
  }),
});

export type UserFormData = z.infer<typeof userSchema>;
