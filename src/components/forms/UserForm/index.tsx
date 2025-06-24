import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../../../schemas/userSchema";
import type { UserFormData } from "../../../schemas/userSchema";
import { usePostUser } from "../../../hooks/useUsers";

function UserForm({ onClose }: { onClose: () => void }) {
  const { mutate } = usePostUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: UserFormData) => {
    mutate(data, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" />
      {errors.name && <span>{errors.name.message}</span>}

      <select {...register("gender")}>
        <option value="">Select Gender...</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {errors.gender && <span>{errors.gender.message}</span>}

      <button type="submit">Submit</button>
      <button onClick={onClose}>Cancel</button>
    </form>
  );
}

export default UserForm;
