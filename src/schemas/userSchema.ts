import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1),
  gender: z.enum(["male", "female", "other"]),
});

export type UserFormData = z.infer<typeof userSchema>;
