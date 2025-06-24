import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { animalSchema } from "../../../schemas/animalSchema";
import type { AnimalFormData } from "../../../schemas/animalSchema";
import { usePostAnimal } from "../../../hooks/useAnimals";

function AnimalForm({ onClose }: { onClose: () => void }) {
  const { mutate } = usePostAnimal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnimalFormData>({
    resolver: zodResolver(animalSchema),
  });

  const onSubmit = (data: AnimalFormData) => {
    mutate(data, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" />
      {errors.name && <span>{errors.name.message}</span>}

      <select {...register("type")}>
        <option value="">Select Type...</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="other">Other</option>
      </select>
      {errors.type && <span>{errors.type.message}</span>}

      <input
        {...register("age", { valueAsNumber: true })}
        type="number"
        placeholder="Age"
      />
      {errors.age && <span>{errors.age.message}</span>}

      <button type="submit">Submit</button>
      <button onClick={onClose}>Cancel</button>
    </form>
  );
}

export default AnimalForm;
