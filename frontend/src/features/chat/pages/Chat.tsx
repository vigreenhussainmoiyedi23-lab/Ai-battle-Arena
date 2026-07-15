import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/redux/hook";
import {
  chatStart,
  clearMessages,
  type ChatMessage,
  type Judgement,
} from "../chatSlice";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { SendHorizonal, Trophy } from "lucide-react";

/* ── Helpers ── */
const uid = () => Math.random().toString(36).slice(2);

/* ── Sub-components ── */
function ScoreBadge({ score, color }: { score: number; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
      style={{
        background: `${color}18`,
        border: `1px solid ${color}40`,
        color,
      }}
    >
      {score}/10
    </span>
  );
}

function SolutionCard({
  title,
  content,
  score,
  isWinner,
  accentColor,
  glowColor,
}: {
  title: string;
  content: string;
  score: number;
  isWinner: boolean;
  accentColor: string;
  glowColor: string;
}) {
  return (
    <div
      className="flex-1 rounded-xl p-5 flex flex-col gap-3 transition-all duration-300 animate-fade-in"
      style={{
        background: "rgba(13,15,22,0.7)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${isWinner ? accentColor + "50" : "rgba(255,255,255,0.07)"}`,
        boxShadow: isWinner
          ? `0 0 30px ${glowColor}, 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 ${accentColor}20`
          : "0 8px 32px rgba(0,0,0,0.3)",
        borderTop: `2px solid ${accentColor}`,
      }}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{
              background: `${accentColor}15`,
              border: `1px solid ${accentColor}30`,
              color: accentColor,
            }}
          >
            {title[0]}
          </div>
          <span
            className="font-semibold text-sm"
            style={{ color: accentColor }}
          >
            {title}
          </span>
          {isWinner && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{
                background: `${accentColor}20`,
                color: accentColor,
                border: `1px solid ${accentColor}40`,
              }}
            >
              ★ Winner
            </span>
          )}
        </div>
        <ScoreBadge score={score} color={accentColor} />
      </div>

      {/* Card Body */}
      <p
        className="text-sm leading-relaxed flex-1"
        style={{ color: "var(--text-primary)" }}
      >
        {content}
      </p>
    </div>
  );
}

function JudgeVerdictPanel({ judgement }: { judgement: Judgement }) {
  const rec = judgement.recommendation;
  const isTie = rec === "0";
  const label = isTie
    ? "TIE"
    : rec === "1"
      ? "GROQ WINS"
      : "COHERE WINS";
  const subtitle = isTie
    ? "Both models performed equally well"
    : rec === "2"
      ? "Groq provided the superior response"
      : "Cohere provided the superior response";

  return (
    <div
      className="rounded-xl p-5 animate-fade-in"
      style={{
        background: "rgba(13,15,22,0.7)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(245,158,11,0.25)",
        boxShadow: "0 0 20px rgba(245,158,11,0.1), 0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="p-1.5 rounded-lg"
          style={{
            background: "rgba(245,158,11,0.15)",
            border: "1px solid rgba(245,158,11,0.25)",
            color: "var(--amber)",
          }}
        >
          <Trophy />
        </div>
        <span
          className="text-xs font-bold tracking-[0.15em] uppercase"
          style={{ color: "var(--amber)" }}
        >
          Judge Verdict
        </span>
        <div className="flex items-center gap-2 ml-auto">
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.2)",
              color: "rgba(245,158,11,0.7)",
            }}
          >
            Groq: {judgement.solution1Score}/10
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.2)",
              color: "rgba(245,158,11,0.7)",
            }}
          >
            Cohere: {judgement.solution2Score}/10
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p
          className="text-2xl font-extrabold tracking-tight"
          style={{ color: "var(--amber)" }}
        >
          {label}
        </p>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          — {subtitle}
        </p>
      </div>
    </div>
  );
}

function MessageGroup({ msg }: { msg: ChatMessage }) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end animate-fade-in">
        <div
          className="max-w-[65%] rounded-2xl rounded-tr-sm px-4 py-3 text-sm"
          style={{
            background: "rgba(0,210,255,0.08)",
            border: "1px solid rgba(0,210,255,0.15)",
            color: "var(--text-primary)",
          }}
        >
          {msg.content}
        </div>
      </div>
    );
  }

  const sol1 = msg.solution1 ?? "";
  const sol2 = msg.solution2 ?? "";
  const judgement = msg.judgement;
  const rec = judgement?.recommendation;

  return (
    <div className="flex flex-col gap-4 animate-slide-in">
      {/* VS badge */}
      <div className="flex items-center gap-3">
        <div
          className="flex-1 h-px"
          style={{ background: "var(--border-subtle)" }}
        />
        <span
          className="text-xs font-bold tracking-[0.15em] px-3 py-1 rounded-full"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-muted)",
          }}
        >
          GROQ vs COHERE
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: "var(--border-subtle)" }}
        />
      </div>

      {/* Dual Solution Cards */}
      <div className="flex gap-4">
        <SolutionCard
          title="Groq"
          content={sol1}
          score={judgement?.solution1Score ?? 0}
          isWinner={rec === "solution1"}
          accentColor="var(--cyan)"
          glowColor="var(--cyan-glow)"
        />
        <SolutionCard
          title="Cohere"
          content={sol2}
          score={judgement?.solution2Score ?? 0}
          isWinner={rec === "solution2"}
          accentColor="var(--purple)"
          glowColor="var(--purple-glow)"
        />
      </div>

      {/* Judge Verdict */}
      {judgement && <JudgeVerdictPanel judgement={judgement} />}
    </div>
  );
}



const DEMO_MESSAGES: ChatMessage[] = [
  { id: "m1", role: "user", content: "hi" },
  {
    id: "m2",
    role: "ai",
    solution1: "Hello! How can I help you today?",
    solution2: "Hello! How can I assist you today?",
    judgement: {
      solution1Score: 9,
      solution2Score: 9,
      recommendation: "0",
    },
  },
];

/* ── Main Chat Component ── */
export default function Chat() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((s) => s.chat);
  const { id } = useParams();
  
  const [messages, setMessages] = useState<ChatMessage[]>(DEMO_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text) return;

    const userMsg: ChatMessage = { id: uid(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    dispatch(chatStart());

    // Simulate API call — replace with real fetch to /api/invoke-graph
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: uid(),
        role: "ai",
        solution1: `Groq's answer to: "${text}"`,
        solution2: `Cohere's perspective on: "${text}"`,
        judgement: {
          solution1Score: Math.floor(Math.random() * 3) + 7,
          solution2Score: Math.floor(Math.random() * 3) + 7,
          recommendation: ["solution1", "solution2", "tie"][
            Math.floor(Math.random() * 3)
          ] as "solution1" | "solution2" | "tie",
        },
      };
      setMessages((prev) => [...prev, aiMsg]);
      dispatch(clearMessages()); // reset loading
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

 

  return (
    <div
      className="flex h-screen w-full overflow-hidden"
      style={{ background: "var(--bg-floor)" }}
    >
      {/* ─── Sidebar ─── */}
      <Sidebar  />

      {/* ─── Main Panel ─── */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top Bar */}
        <header
          className="flex items-center px-8 py-4 border-b flex-shrink-0"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <div>
            <h1 className="font-bold text-lg text-white">AI Battle Arena</h1>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Groq vs Cohere — judged by Mistral
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: "rgba(0,210,255,0.07)",
                border: "1px solid rgba(0,210,255,0.15)",
                color: "var(--cyan)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-current inline-block"
                style={{ animation: "pulseGlow 2s ease infinite" }}
              />
              Live Arena
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-4 opacity-40">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,210,255,0.1), rgba(168,85,247,0.1))",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
                    fill="url(#emptyGrad)"
                  />
                  <defs>
                    <linearGradient
                      id="emptyGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#00d2ff" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="text-center">
                <p className="text-white font-semibold">Start a Battle</p>
                <p
                  className="text-sm mt-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Send a prompt to pit Groq against Cohere
                </p>
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <MessageGroup key={msg.id} msg={msg} />
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-4 animate-fade-in">
              <div
                className="flex-1 rounded-xl p-5 flex items-center gap-3"
                style={{
                  background: "rgba(13,15,22,0.7)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: "var(--cyan)",
                      animation: `pulseGlow 1.2s ease infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
                <span
                  className="text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  Models are thinking...
                </span>
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* ─── Input Bar ─── */}
        <div
          className="px-8 py-5 border-t flex-shrink-0"
          style={{
            borderColor: "var(--border-subtle)",
            background: "rgba(9,11,16,0.8)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            className="flex items-end gap-3 rounded-xl px-4 py-3"
            style={{
              background: "rgba(13,15,22,0.8)",
              border: "1px solid var(--border-normal)",
              boxShadow: "0 0 0 0 transparent",
              transition: "box-shadow 0.2s ease",
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 0 0 2px rgba(0,210,255,0.2)";
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "rgba(0,210,255,0.4)";
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 0 0 0 transparent";
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "var(--border-normal)";
            }}
          >
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              rows={1}
              className="flex-1 bg-transparent resize-none text-sm outline-none"
              style={{
                color: "var(--text-primary)",
                fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                lineHeight: "1.6",
                minHeight: "24px",
                maxHeight: "120px",
              }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
              }}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, var(--cyan), #3a7bd5)",
                boxShadow: "0 0 12px var(--cyan-glow)",
                color: "#fff",
              }}
            >
              <SendHorizonal />
            </button>
          </div>
          <p
            className="text-center text-xs mt-2"
            style={{ color: "var(--text-muted)" }}
          >
            Press{" "}
            <kbd
              className="px-1 py-0.5 rounded text-[10px]"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              Enter
            </kbd>{" "}
            to send ·{" "}
            <kbd
              className="px-1 py-0.5 rounded text-[10px]"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              Shift+Enter
            </kbd>{" "}
            for newline
          </p>
        </div>
      </div>
    </div>
  );
}
