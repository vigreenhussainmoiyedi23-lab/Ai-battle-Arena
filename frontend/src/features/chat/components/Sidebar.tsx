import { LogOut, MessageSquare, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/redux/hook";
import { setActiveChatId } from "../chatSlice";
import { useAuth } from "../../auth/hooks/useAuth";
const DEMO_SESSIONS = [
  { chatId: "1", topic: "Project Phoenix", createdAt: "2 hours ago" },
  { chatId: "2", topic: "Optimization Strategy", createdAt: "Yesterday" },
  { chatId: "3", topic: "Code Architecture", createdAt: "Jul 11" },
  { chatId: "4", topic: "API Design Patterns", createdAt: "Jul 9" },
];

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const activeChatId = useAppSelector((s) => s.chat.activeChatId);
  const navigate = useNavigate();

  const { LogoutHandler } = useAuth();
  function HandleNewChat() {
    navigate("/chat");
  }
  async function handleLogout() {
    await LogoutHandler();
  }
  return (
    <aside
      className="flex flex-col w-72 shrink-0 border-r"
      style={{
        background: "var(--bg-sidebar)",
        borderColor: "var(--border-subtle)",
      }}
    >
      {/* Brand */}
      <div
        className="flex items-center gap-3 px-5 py-5 border-b"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,210,255,0.2), rgba(168,85,247,0.2))",
            border: "1px solid rgba(0,210,255,0.2)",
          }}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
              fill="url(#sidebarGrad)"
            />
            <defs>
              <linearGradient
                id="sidebarGrad"
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
        <div>
          <p
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            AI Battle Arena
          </p>
          <p className="text-white font-semibold text-sm leading-tight">
            Arena Chat
          </p>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="px-4 py-4">
        <button
          onClick={HandleNewChat}
          className="w-full flex items-center justify-center gap-2 h-10 rounded-lg text-sm font-semibold transition-all duration-200"
          style={{
            background: "rgba(0,210,255,0.08)",
            border: "1px solid rgba(0,210,255,0.2)",
            color: "var(--cyan)",
            boxShadow: "0 0 12px rgba(0,210,255,0.1)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(0,210,255,0.14)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 20px rgba(0,210,255,0.2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(0,210,255,0.08)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 12px rgba(0,210,255,0.1)";
          }}
        >
          <PlusCircle /> New Chat
        </button>
      </div>

      {/* History Label */}
      <div className="px-5 pb-2">
        <p
          className="text-[10px] font-bold tracking-[0.15em] uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          Recent Battles
        </p>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 flex flex-col gap-1">
        {DEMO_SESSIONS.map((s) => {
          const isActive = s.chatId === activeChatId;
          return (
            <button
              key={s.chatId}
              onClick={() => {
                dispatch(setActiveChatId(s.chatId));
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg transition-all duration-150 flex gap-2 items-center group"
              style={{
                background: isActive ? "rgba(0,210,255,0.06)" : "transparent",
                borderLeft: isActive
                  ? "2px solid var(--cyan)"
                  : "2px solid transparent",
              }}
            >
              <span
                style={{
                  color: isActive ? "var(--cyan)" : "var(--text-muted)",
                }}
                className="shrink-0"
              >
                <MessageSquare />
              </span>
              <div className="min-w-0">
                <p
                  className="text-sm font-medium truncate leading-tight"
                  style={{
                    color: isActive
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",
                  }}
                >
                  {s.topic}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {s.createdAt}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* User Footer */}
      <div
        className="p-4 border-t flex items-center  gap-3"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
          style={{
            background: "linear-gradient(135deg, var(--cyan), var(--purple))",
            color: "#fff",
          }}
        >
          U
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            Arena User
          </p>
          <p
            className="text-xs truncate"
            style={{ color: "var(--text-muted)" }}
          >
            Pro Member
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded bg-linear-to-l  from-blue-400/5 via-blue-500/10 to-blue-600/10 border border-red-500 px-3 py-2 "
        >
          <LogOut /> Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
