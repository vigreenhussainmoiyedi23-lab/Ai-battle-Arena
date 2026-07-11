import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/Input";

export interface LoginData {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<LoginData>();

  function submitHandler(data: LoginData) {
    console.log(data);
  }

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 block p-8 shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-white ">Welcome Back</h1>

        <p className="mt-2 text-zinc-400">
          Login to continue.
        </p>

        <div className="mt-8 space-y-5 flex flex-col gap-4">
          <Input<LoginData>
            register={register}
            name="email"
            type="email"
            placeholder="Email"
          />

          <Input<LoginData>
            register={register}
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>

        <button
          className="mt-8 h-12 w-full rounded-lg bg-blue-600 font-semibold text-white transition hover:bg-blue-500"
        >
          Login
        </button>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-400 hover:text-blue-300"
          >
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}