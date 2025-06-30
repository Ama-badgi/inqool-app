import { z } from "zod";

export const animalSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  type: z.enum(["dog", "cat", "other"], {
    errorMap: () => ({ message: "Select a type of the animal." }),
  }),
  age: z
    .number({ invalid_type_error: "Age must be a number." })
    .int({ message: "Age must be a whole number." })
    .nonnegative("Age must be greater or equal to zero."),
});

export type AnimalFormData = z.infer<typeof animalSchema>;
