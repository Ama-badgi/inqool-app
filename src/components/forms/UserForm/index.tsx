import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../../../schemas/userSchema";
import type { UserFormData } from "../../../schemas/userSchema";
import { usePatchUserDetails, usePostUser } from "../../../hooks/useUsers";
import type { User } from "../../../types/user";

import "./style.css";

function UserForm({ onClose, user }: { onClose: () => void; user?: User }) {
  const { mutate: createUser } = usePostUser();
  const { mutate: updateUser } = usePatchUserDetails();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: user ?? {},
  });

  const onSubmit = (data: UserFormData) => {
    if (user) {
      updateUser(
        { id: user.id, data },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else {
      createUser(data, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" autoFocus />

      <select {...register("gender")}>
        <option value="">Select Gender...</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <button type="submit">Submit</button>
      <button onClick={onClose}>Cancel</button>

      {Object.keys(errors).length > 0 && (
        <div className="form-errors">
          {errors.name && <p>{errors.name.message}</p>}
          {errors.gender && <p>{errors.gender.message}</p>}
        </div>
      )}
    </form>
  );
}

export default UserForm;
