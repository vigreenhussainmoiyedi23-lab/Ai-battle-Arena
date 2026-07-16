import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/redux/hook";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import {
  Zap,
  Swords,
  Brain,
  Trophy,
  ChevronRight,
  Shield,
  Cpu,
  MessageSquare,
  BarChart3,
  Sparkles,
  ArrowRight,
  Bot,
} from "lucide-react";
11;
import "./LandingPage.css";

const Counter = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = end / 60;
          1;
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else setCount(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);
  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const BattleVisual = () => (
  <div className="lp-battle-visual">
    <motion.div
      className="lp-bot lp-bot-cyan"
      animate={{ x: [-6, 6, -6] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="lp-bot-ring lp-bot-ring-cyan" />
      <div className="lp-bot-avatar">
        <Bot size={32} className="lp-bot-icon" />
      </div>
      <div className="lp-bot-label">AI Alpha</div>
      <div className="lp-bot-model">GPT-4o</div>
    </motion.div>
    <div className="lp-vs-center">
      <motion.div
        className="lp-vs-ring"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.span
        className="lp-vs-text"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        VS
      </motion.span>
      <div className="lp-sparks">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="lp-spark"
            style={{ rotate: `${i * 60}deg` }}
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
      </div>
    </div>
    <motion.div
      className="lp-bot lp-bot-purple"
      animate={{ x: [6, -6, 6] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="lp-bot-ring lp-bot-ring-purple" />
      <div className="lp-bot-avatar lp-bot-avatar-purple">
        <Brain size={32} className="lp-bot-icon" />
      </div>
      <div className="lp-bot-label">AI Beta</div>
      <div className="lp-bot-model">Claude 3.5</div>
    </motion.div>
  </div>
);

const JudgePreview = () => (
  <motion.div
    className="lp-judge-panel"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.3 }}
  >
    <div className="lp-judge-header">
      <Trophy size={16} className="lp-judge-trophy" />
      <span>Judge AI — Verdict</span>
    </div>
    <div className="lp-judge-scores">
      <div className="lp-score">
        <span className="lp-score-label">AI Alpha</span>
        <div className="lp-score-bar">
          <motion.div
            className="lp-score-fill lp-score-fill-cyan"
            initial={{ width: 0 }}
            whileInView={{ width: "78%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.6 }}
          />
        </div>
        <span className="lp-score-num lp-num-cyan">78</span>
      </div>
      <div className="lp-score">
        <span className="lp-score-label">AI Beta</span>
        <div className="lp-score-bar">
          <motion.div
            className="lp-score-fill lp-score-fill-purple"
            initial={{ width: 0 }}
            whileInView={{ width: "65%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.8 }}
          />
        </div>
        <span className="lp-score-num lp-num-purple">65</span>
      </div>
    </div>
    <div className="lp-judge-verdict">
      <Zap size={12} className="lp-verdict-icon" />
      <span>AI Alpha wins — superior reasoning &amp; clarity</span>
    </div>
  </motion.div>
);

const LandingPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  const features = [
    {
      icon: <Swords size={24} />,
      title: "Dual AI Battle",
      desc: "Two state-of-the-art AI models go head-to-head answering the same prompt simultaneously.",
      color: "cyan",
    },
    {
      icon: <Trophy size={24} />,
      title: "AI Judge",
      desc: "A powerful AI judge evaluates both responses on accuracy, depth, and clarity.",
      color: "amber",
    },
    {
      icon: <Cpu size={24} />,
      title: "Multiple Models",
      desc: "Choose from GPT-4o, Claude, Gemini, Llama and more for each side of the battle.",
      color: "purple",
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Detailed Scores",
      desc: "See breakdown scores across dimensions — reasoning, creativity, correctness.",
      color: "cyan",
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Battle History",
      desc: "Browse all past battles, replay them and see how different AIs compare over time.",
      color: "purple",
    },
    {
      icon: <Shield size={24} />,
      title: "Fair Judging",
      desc: "The judge AI is kept blind to which model wrote which response for unbiased verdicts.",
      color: "amber",
    },
  ];

  const steps = [
    {
      n: "01",
      icon: <MessageSquare size={22} />,
      title: "Enter a Prompt",
      desc: "Type any question, challenge, or creative task you want the AIs to battle on.",
      color: "cyan",
    },
    {
      n: "02",
      icon: <Swords size={22} />,
      title: "AIs Battle It Out",
      desc: "Two AI models generate their best responses simultaneously in real-time.",
      color: "purple",
    },
    {
      n: "03",
      icon: <Trophy size={22} />,
      title: "Judge Declares Winner",
      desc: "The judge AI evaluates both and gives a detailed verdict with scores.",
      color: "amber",
    },
  ];

  const stats = [
    { value: 50000, suffix: "+", label: "Battles Fought" },
    { value: 12, suffix: "", label: "AI Models" },
    { value: 99, suffix: "%", label: "Uptime" },
    { value: 4800, suffix: "+", label: "Users" },
  ];

  return (
    <div className="lp-root">
      <div className="lp-bg-orb lp-bg-orb-1" />
      <div className="lp-bg-orb lp-bg-orb-2" />
      <div className="lp-bg-orb lp-bg-orb-3" />

      {/* NAVBAR */}
      <motion.nav
        className="lp-nav"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="lp-nav-inner">
          <div className="lp-logo" onClick={() => navigate("/")}>
            <div className="lp-logo-icon">
              <Zap size={18} />
            </div>
            <span className="lp-logo-text">
              AI <span className="lp-logo-accent">Battle</span> Arena
            </span>
          </div>
          <div className="lp-nav-links">
            {["Features", "How It Works"].map((l) => (
              <a
                key={l}
                className="lp-nav-link"
                href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              >
                {l}
              </a>
            ))}
          </div>
          <div className="lp-nav-cta">
            {user ? (
              <motion.button
                className="lp-btn lp-btn-primary"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/chat")}
              >
                <Swords size={15} /> Go to Arena
              </motion.button>
            ) : (
              <>
                <motion.button
                  className="lp-btn lp-btn-ghost"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </motion.button>
                <motion.button
                  className="lp-btn lp-btn-primary"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/register")}
                >
                  Get Started <ChevronRight size={15} />
                </motion.button>
              </>
            )}
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <motion.section
        ref={heroRef}
        className="lp-hero"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <motion.div
          className="lp-hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Sparkles size={13} />
          <span>Powered by the world's most advanced AI models</span>
        </motion.div>
        <motion.h1
          className="lp-hero-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          The Ultimate
          <br />
          <span className="lp-hero-gradient">AI Showdown</span>
        </motion.h1>
        <motion.p
          className="lp-hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Two AI models. One prompt. One judge. Watch the battle unfold in
          real-time as powerful language models compete to give the best answer
          — and an impartial AI picks the winner.
        </motion.p>
        <motion.div
          className="lp-hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
        >
          <motion.button
            className="lp-btn lp-btn-hero-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(user ? "/chat" : "/register")}
          >
            <Swords size={18} /> Start a Battle <ArrowRight size={16} />
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <BattleVisual />
        </motion.div>
        <JudgePreview />
      </motion.section>

      {/* STATS */}
      <section className="lp-stats">
        <motion.div
          className="lp-stats-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="lp-stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="lp-stat-value">
                <Counter end={s.value} suffix={s.suffix} />
              </div>
              <div className="lp-stat-label">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section className="lp-section" id="how-it-works">
        <motion.div
          className="lp-section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="lp-section-badge">How It Works</div>
          <h2 className="lp-section-title">
            Three Steps to the{" "}
            <span className="lp-text-gradient-cyan">Ultimate Battle</span>
          </h2>
          <p className="lp-section-sub">
            Getting a battle started is as simple as typing a prompt. The rest
            is pure AI magic.
          </p>
        </motion.div>
        <div className="lp-steps-grid">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              className={`lp-step-card lp-step-${step.color}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              <div className="lp-step-number">{step.n}</div>
              <div className={`lp-step-icon lp-step-icon-${step.color}`}>
                {step.icon}
              </div>
              <h3 className="lp-step-title">{step.title}</h3>
              <p className="lp-step-desc">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="lp-section lp-features-section" id="features">
        <motion.div
          className="lp-section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="lp-section-badge">Features</div>
          <h2 className="lp-section-title">
            Everything You Need for the{" "}
            <span className="lp-text-gradient-purple">Perfect Battle</span>
          </h2>
          <p className="lp-section-sub">
            A full-featured arena built for AI enthusiasts, developers, and
            researchers.
          </p>
        </motion.div>
        <div className="lp-features-grid">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className={`lp-feature-card lp-feature-${f.color}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className={`lp-feature-icon lp-feature-icon-${f.color}`}>
                {f.icon}
              </div>
              <h3 className="lp-feature-title">{f.title}</h3>
              <p className="lp-feature-desc">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="lp-cta-banner">
        <motion.div
          className="lp-cta-inner"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="lp-cta-orb lp-cta-orb-1" />
          <div className="lp-cta-orb lp-cta-orb-2" />
          <Swords size={48} className="lp-cta-icon" />
          <h2 className="lp-cta-title">Ready to Start a Battle?</h2>
          <p className="lp-cta-sub">
            Join thousands of users who are already discovering which AI reigns
            supreme.
          </p>
          <motion.button
            className="lp-btn lp-btn-hero-primary"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(user ? "/chat" : "/register")}
          >
            <Zap size={18} /> {user ? "Go to Arena" : "Create Free Account"}{" "}
            <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-brand">
            <div className="lp-logo">
              <div className="lp-logo-icon">
                <Zap size={16} />
              </div>
              <span className="lp-logo-text">
                AI <span className="lp-logo-accent">Battle</span> Arena
              </span>
            </div>
            <p className="lp-footer-tagline">
              The fairest AI showdown on the internet.
            </p>
            <div className="lp-footer-social">
              <a className="lp-social-btn" href="#">
                <FaGithub size={18} />
              </a>
              <a className="lp-social-btn" href="#">
                <FaTwitter size={18} />
              </a>
            </div>
          </div>
          <div className="lp-footer-links">
            <div className="lp-footer-col">
              <div className="lp-footer-col-title">Product</div>
              {["Features", "How It Works", "Models", "Pricing"].map((l) => (
                <a key={l} className="lp-footer-link" href="#">
                  {l}
                </a>
              ))}
            </div>
            <div className="lp-footer-col">
              <div className="lp-footer-col-title">Company</div>
              {["About", "Blog", "Careers", "Press"].map((l) => (
                <a key={l} className="lp-footer-link" href="#">
                  {l}
                </a>
              ))}
            </div>
            <div className="lp-footer-col">
              <div className="lp-footer-col-title">Legal</div>
              {["Privacy", "Terms", "Cookies", "Contact"].map((l) => (
                <a key={l} className="lp-footer-link" href="#">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="lp-footer-bottom">
          <span>&copy; 2026 AI Battle Arena. All rights reserved.</span>
          <span>Built with &amp;#9889; for AI enthusiasts</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
