import { z } from "zod";

export const animalSchema = z.object({
  name: z.string().min(1),
  type: z.enum(["dog", "cat", "other"]),
  age: z.number().int().nonnegative(),
});

export type AnimalFormData = z.infer<typeof animalSchema>;
