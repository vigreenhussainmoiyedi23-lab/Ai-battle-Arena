import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import type { LoginData } from "./Login";
import { useAuth } from "../hooks/useAuth";
import ShowError from "../components/ShowError";
import { Lock, Mail, User } from "lucide-react";

interface RegisterData extends LoginData {
  username: string;
}

export default function Register() {
  const { register, handleSubmit } = useForm<RegisterData>();
  const { RegisterHandler } = useAuth();
  async function submitHandler(data: RegisterData) {
    await RegisterHandler(data);
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "var(--bg-floor)" }}
    >
      {/* Ambient glow blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(168,85,247,0.05) 0%, rgba(0,210,255,0.04) 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,210,255,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Card */}
      <div
        className="glass relative z-10 w-full max-w-[440px] rounded-2xl p-8 animate-fade-in"
        style={{
          boxShadow:
            "0 0 0 1px rgba(168,85,247,0.08), 0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(168,85,247,0.05)",
        }}
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-7 gap-3">
          <div
            className="flex items-center justify-center w-14 h-14 rounded-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(0,210,255,0.15))",
              border: "1px solid rgba(168,85,247,0.2)",
              boxShadow: "0 0 20px rgba(168,85,247,0.15)",
            }}
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path
                d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
                fill="url(#regLogoGrad)"
                opacity="0.9"
              />
              <path
                d="M12 6L9 8v3.5c0 2.5 1.5 4.8 3 5.5 1.5-.7 3-3 3-5.5V8L12 6z"
                fill="rgba(255,255,255,0.8)"
              />
              <defs>
                <linearGradient
                  id="regLogoGrad"
                  x1="100%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#00d2ff" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="text-center">
            <h2
              className="text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              AI BATTLE ARENA
            </h2>
            <p
              className="text-sm mt-0.5"
              style={{ color: "var(--text-secondary)" }}
            >
              Join the Arena
            </p>
          </div>
        </div>

        <div
          className="h-px mb-7"
          style={{ background: "var(--border-subtle)" }}
        />

        <h1 className="text-2xl font-bold text-white mb-1">Create Account</h1>
        <p className="text-sm mb-7" style={{ color: "var(--text-secondary)" }}>
          Register and start your first battle.
        </p>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-4"
        >
          <Input<RegisterData>
            register={register}
            name="username"
            type="text"
            placeholder="Choose a username"
            icon={<User width={16}/>}
          />

          <Input<RegisterData>
            register={register}
            name="email"
            type="email"
            placeholder="Enter your email"
            icon={<Mail width={16}/>}
          />

          <Input<RegisterData>
            register={register}
            name="password"
            type="password"
            placeholder="Create a password"
            icon={<Lock width={16}/>}
          />
          <ShowError />
          <button
            type="submit"
            className="btn-primary mt-1 h-12 w-full rounded-lg text-sm"
            style={{
              background:
                "linear-gradient(135deg, var(--purple), #ec4899 50%, var(--cyan))",
              backgroundSize: "200% auto",
            }}
          >
            Create Account
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div
            className="flex-1 h-px"
            style={{ background: "var(--border-subtle)" }}
          />
          <span
            className="text-xs font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            OR
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: "var(--border-subtle)" }}
          />
        </div>

        <p
          className="text-center text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold transition-colors"
            style={{ color: "var(--cyan)" }}
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
