import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { animalSchema } from "../../../schemas/animalSchema";
import type { AnimalFormData } from "../../../schemas/animalSchema";
import type { Animal } from "../../../types/animal";
import { usePostAnimal, usePatchAnimal } from "../../../hooks/useAnimals";

import "../style.css";

function AnimalForm({
  onClose,
  animal,
}: {
  onClose: () => void;
  animal?: Animal;
}) {
  const { mutate: createAnimal } = usePostAnimal();
  const { mutate: updateAnimal } = usePatchAnimal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnimalFormData>({
    resolver: zodResolver(animalSchema),
    defaultValues: animal ?? {},
  });

  const onSubmit = (data: AnimalFormData) => {
    if (animal) {
      updateAnimal(
        { id: animal.id, data },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else {
      createAnimal(data, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form__body">
        <input {...register("name")} placeholder="Name" autoFocus />

        <select {...register("type")}>
          <option value="">Select Type...</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="other">Other</option>
        </select>

        <input
          {...register("age", { valueAsNumber: true })}
          type="number"
          placeholder="Age"
        />

        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="form-errors">
          {errors.name && <p>{errors.name.message}</p>}
          {errors.type && <p>{errors.type.message}</p>}
          {errors.age && <p>{errors.age.message}</p>}
        </div>
      )}
    </form>
  );
}

export default AnimalForm;
