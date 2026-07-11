import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import type { LoginData } from "./Login";

interface RegisterData extends LoginData {
  username: string;
}

export default function Register() {
  const { register, handleSubmit } = useForm<RegisterData>();

  function submitHandler(data: RegisterData) {
    console.log(data);
  }

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-white">
          Create Account
        </h1>

        <p className="mt-2 mb-4 text-zinc-400">
          Join us today.
        </p>

        <div className="mt-8 space-y-5 flex flex-col gap-4">
          <Input<RegisterData>
            register={register}
            name="username"
            type="text"
            placeholder="Username"
          />

          <Input<RegisterData>
            register={register}
            name="email"
            type="email"
            placeholder="Email"
          />

          <Input<RegisterData>
            register={register}
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>

        <button
          className="mt-8 h-12 w-full rounded-lg bg-blue-600 font-semibold text-white transition hover:bg-blue-500"
        >
          Register
        </button>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-400 hover:text-blue-300"
          >
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}