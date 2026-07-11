import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  type: string;
  placeholder?: string;
};

const Input = <T extends FieldValues>({
  register,
  name,
  type,
  placeholder,
}: InputProps<T>) => {
  return (
    <input
      {...register(name)}
      type={type}
      placeholder={placeholder}
      className="w-full h-11 rounded-lg border border-gray-300 px-3 outline-none focus:border-blue-500"
    />
  );
};

export default Input;
