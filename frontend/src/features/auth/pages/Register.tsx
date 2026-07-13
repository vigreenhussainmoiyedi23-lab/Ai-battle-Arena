import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import type { LoginData } from "./Login";
import { useAuth } from "../hooks/useAuth";
import ShowError from "../components/ShowError";

interface RegisterData extends LoginData {
  username: string;
}

const UserIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
    />
  </svg>
);

export default function Register() {
  const { register, handleSubmit } = useForm<RegisterData>();
  const { RegisterHandler } = useAuth();
  function submitHandler(data: RegisterData) {
    RegisterHandler(data);
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
            icon={<UserIcon />}
          />

          <Input<RegisterData>
            register={register}
            name="email"
            type="email"
            placeholder="Enter your email"
            icon={<EmailIcon />}
          />

          <Input<RegisterData>
            register={register}
            name="password"
            type="password"
            placeholder="Create a password"
            icon={<LockIcon />}
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
