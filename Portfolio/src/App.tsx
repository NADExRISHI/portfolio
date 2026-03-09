"use client";


import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Download,
  Github,
  Globe,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";

import {
  type ActiveNotification,
  NotificationOverlay,
  type NotificationType,
} from "./components/notification-system";
import { useCallback, useEffect, useState } from "react";
import { GlassProjectCard } from "./components/glass-project-card";

import Silk from "./components/Silk";

const PROFILE = {
  name: "Aditya Patil",
  title: "Edge AI & Intelligent Systems Architect",
  summary:
    "“Building production-grade systems that operate under real-world constraints — latency budgets, hardware limits, deployment complexity, and failure modes.”",
  location: "Belgaum, India",
  email: "adityavpatili818@gmail.com",
  phone: "+91 8152845070",
  avatarUrl: "/Adi.webp", // User's photo in public folder
  initials: "AP",
  socials: [
    { name: "GitHub", icon: Github, url: "https://github.com/Nadex19-Adi" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/aditya-patil-77aab2352/",
    },
    { name: "Portfolio", icon: Globe, url: "#" },
  ],
};

const STATS = [
  { label: "Systems & Products Engineered", value: "12+" },
  { label: "Real-World Deployments", value: "3" },
  { label: "Advanced AI / Robotics Projects", value: "4" },
  { label: "Publications", value: "2" },
];



const EXPERIENCE = [
  {
    role: "NeuroHarmonix",
    company: "Intelligent Tremor Stabilization Wearable",
    period: "Pre-Clinical",
    location: "Medical AI + Embedded Neurostimulation",
    highlights: [
      "Building a clinical-grade wearable targeting Parkinson's tremor suppression with <5ms latency and 88% tremor reduction.",
      "Integrating 100-300 Hz vibrotactile stimulation and TENS with IMU-based real-time tremor detection.",
      "Implementing AI/ML analytics for adaptive response on ESP32 + MPU6050 hardware.",
      "Architected a privacy-conscious system aligned with HIPAA/GDPR/DPDP for physician monitoring.",
      "Market positioned for $4-5K medical device segment; advanced from MSME Hackathon."
    ],
  },
  {
    role: "IoT-Based Accident Detection",
    company: "Emergency Alert System",
    period: "Deployable",
    location: "IoT | Sensor Architecture",
    highlights: [
      "Built a real-world event-triggered safety system focused on low-latency critical response.",
      "Designed a pipeline for real-time GPS coordinate transmission upon collision detection.",
      "Created an automated workflow for dispatching emergency contact notifications.",
      "Architected end-to-end IoT flow: detection → location tracking → alert dispatch."
    ],
  },
];

const PROJECTS = [
  {
    name: "MemoryForm",
    tech: ["Python", "FastAPI", "Supabase", "React"],
    desc: "Long-term memory engine solving LLM amnesia with a hippocampal-layer cognitive architecture.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    githubUrl: "https://github.com/Nadex19-Adi",
    stars: 10,
    metrics: {
      "Latency": "<500ms Avg",
      "Architecture": "Multi-Agent",
      "Storage": "Hybrid PostgreSQL",
      "Testing": "500+ turns",
      "Embeddings": "384-dim semantic",
      "Status": "Production"
    }
  },
  {
    name: "Cloud Cost Optimization",
    tech: ["Python", "ARIMA", "LSTM", "K-Means"],
    desc: "Closed-loop control framework for cost-efficient cloud resource provisioning using clustering-based hybrid learning.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    githubUrl: "https://github.com/Nadex19-Adi",
    stars: 15,
    metrics: {
      "Cost Focus": "28% Reduction",
      "Utilization": "71% Efficiency",
      "Dataset": "Google Cluster Trace",
      "Architecture": "Hybrid NN + Stats",
      "Status": "Research"
    }
  },
  {
    name: "Disaster Response AI",
    tech: ["CrewAI", "Streamlit", "Transformers"],
    desc: "Multi-agent NLP system with real-time incident analysis and inter-agency resource coordination.",
    image: "/disaster.png",
    githubUrl: "https://github.com/Nadex19-Adi",
    stars: 8,
    metrics: {
      "Architecture": "5-Agent Crew",
      "NLP Focus": "Zero-shot RoBERTa",
      "Task": "Resource Allocation",
      "Core": "Damage Assessment",
      "Status": "Prototype"
    }
  },
  {
    name: "Elevare Platform",
    tech: ["React", "Flask", "Gemini 2.5", "SQL"],
    desc: "Full-stack intelligent resume analysis and skill-based job matching platform.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800",
    githubUrl: "https://github.com/Nadex19-Adi",
    stars: 20,
    metrics: {
      "Matching": "Domain-Specific",
      "Analysis": "Skill Gap + ATS",
      "Feature": "Interview Prep",
      "Status": "Production"
    }
  },
  {
    name: "Arogya Saathi",
    tech: ["Streamlit", "LangChain", "Ollama", "HuggingFace"],
    desc: "Multilingual AI-powered rural health companion providing guided triage and offline medical AI.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    githubUrl: "https://github.com/Nadex19-Adi",
    stars: 12,
    metrics: {
      "Triage": "AI-Guided",
      "LLM": "Local + Cloud",
      "Access": "Offline-First",
      "Status": "Prototype"
    }
  },
  {
    name: "Smart Crop Recommendation",
    tech: ["Python", "Scikit", "Streamlit", "MongoDB"],
    desc: "AI-driven farming assistant predicting crop suitability and detecting diseases using ML precision.",
    image: "/crop.png",
    githubUrl: "https://github.com/Nadex19-Adi",
    stars: 15,
    metrics: {
      "Geospatial": "Bhuvan API",
      "Assistant": "Multilingual AI",
      "Analysis": "CV Disease Detect",
      "Status": "Hackathon"
    }
  },
  {
    name: "BhashaAI Platform",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Shadcn"],
    desc: "Enterprise-grade translation orchestration engine frontend with modern motion graphics and responsive design.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    githubUrl: "https://github.com/Nadex19-Adi",
    stars: 10,
    metrics: {
      "Frontend": "App Router",
      "Animations": "Motion UI",
      "Ecosystem": "Multi-agent engine",
      "Status": "Production"
    }
  }
];

const SKILL_CATEGORIES = [
  {
    title: "AI / ML & NLP",
    skills: ["PyTorch", "TensorFlow", "OpenCV", "LangChain", "RAG", "CrewAI", "HuggingFace"]
  },
  {
    title: "Backend & Infrastructure",
    skills: ["FastAPI", "Flask", "PostgreSQL", "Supabase", "Docker", "AWS", "Nginx", "CI/CD", "Linux"]
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite"]
  }
];



const HOW_I_WORK = [
  {
    title: "Think in Systems",
    desc: "I break complex problems into controllable subsystems, design for failure cases early, and engineer with scalability in mind.",
    icon: Layers,
  },
  {
    title: "Build What Others Avoid",
    desc: "I deliberately choose technically uncomfortable projects — the kind that force rapid growth and differentiate me from the average engineer.",
    icon: ArrowUpRight,
  },
  {
    title: "Execution > Motivation",
    desc: "Consistency, structured learning, and aggressive iteration drive my progress more than temporary inspiration.",
    icon: Briefcase,
  },
  {
    title: "Engineer for Reality",
    desc: "I prioritize reliability, measurable performance, and deployment-readiness over demo-friendly builds.",
    icon: Globe,
  },
  {
    title: "Relentless Improvement",
    desc: "After every build, I analyze bottlenecks, skill gaps, and architectural mistakes — then upgrade.",
    icon: Sparkles,
  },
];

const TECHNICAL_FOCUS = [
  "Medical-grade embedded AI + neurostimulation hardware",
  "Multi-agent cognitive architectures for production LLMs",
  "Scalable backend engineering and cloud deployment",
  "Edge Inference & Hardware-software co-design",
  "Algorithm Optimization & Performance Engineering",
];

const BIO_PARAGRAPHS = [
  "I am an AIML engineer designing end-to-end intelligent systems that integrate AI models, embedded hardware, control pipelines, and scalable infrastructure. Not tutorials. Not toy ML. Real systems with real constraints.",
  "My core work spans medical-grade embedded AI & neurostimulation hardware, multi-agent cognitive architectures for production LLM systems, and scalable backend engineering.",
  "I approach engineering from first principles. Performance, reliability, and security are not afterthoughts—they are foundational design constraints embedded from the start. Every system I build is meant to run in the real world. Not to demo. Not to pass a course. To work."
];

import { ContactBlock } from "./sections/Contact";

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Only run on client-side
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [notifications, setNotifications] = useState<ActiveNotification[]>([]);

  const addNotification = useCallback((type: NotificationType) => {
    const id = Math.random().toString(36).slice(2, 9);
    setNotifications((prev) => [...prev, { id, type }]);

    window.setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    }, 5000);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);



  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="relative min-h-svh overflow-hidden text-[color:var(--text-secondary)] bg-[color:var(--bg)]">
      {/* Dark: Silk full-page background */}
      {theme === "dark" && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Silk
            color="#5F06A7"
            speed={4.5}
            scale={1}
            noiseIntensity={1.4}
            rotation={0}
          />
        </div>
      )}

      {/* Dark: vignette for text legibility over Silk */}
      {theme === "dark" && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: 'rgba(8,4,18,0.55)' }}
        />
      )}

      {/* Light: clean soft gradient — no Silk */}
      {theme === "light" && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 10%, hsla(270,60%,92%,0.7) 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 80% 80%, hsla(280,50%,88%,0.5) 0%, transparent 55%),
              linear-gradient(160deg, #f5f0ff 0%, #ffffff 50%, #ede8f7 100%)
            `
          }}
        />
      )}

      <NotificationOverlay notifications={notifications} removeNotification={removeNotification} />

      <header
        className="dark-card fixed top-6 left-0 right-0 z-50 mx-auto flex w-max items-center justify-between gap-8 md:gap-16 px-6 py-3 rounded-full bg-[color:var(--surface)] border border-[color:var(--border)] shadow-xl transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[color:var(--accent)] text-sm font-semibold text-white shadow-[0_12px_30px_rgba(139,92,246,0.35)]">
            AP
          </div>
        </div>
        <nav className="hidden items-center justify-center gap-3 md:flex flex-1 relative min-h-[50px]">
          {[
            { label: 'About', icon: BookOpen, id: '#about' },
            { label: 'Experience', icon: Briefcase, id: '#experience' },
            { label: 'Projects', icon: Layers, id: '#projects' },
            { label: 'Contact', icon: Mail, id: '#contact' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                const target = document.querySelector(item.id);
                if (target) {
                  window.scrollTo({
                    top: target.getBoundingClientRect().top + window.pageYOffset - 100,
                    behavior: 'smooth'
                  });
                }
              }}
              title={item.label}
              className="group relative flex items-center justify-center p-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--text-primary)] shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] hover:shadow-md"
            >
              <item.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--text-primary)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
            title="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => {
              addNotification("info");
              window.location.href = `mailto:${PROFILE.email}`;
            }}
            className={`hidden items-center gap-2 rounded-full border border-[color:var(--border)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:flex backdrop-blur-md bg-[color:var(--surface)] text-[color:var(--text-primary)] hover:bg-[color:var(--accent)] hover:text-white hover:border-[color:var(--accent)]`}
          >
            Let's Talk
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-[1180px] px-6 py-[110px]">
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
        >
          <motion.div variants={item} className="space-y-6">
            <div className="mt-12 inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-muted)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--text-secondary)] shadow-[0_10px_30px_rgba(73,34,91,0.1)]">
              <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
              Available for select work
            </div>
            <h1 className="font-display font-bold text-4xl text-[color:var(--text-primary)] md:text-[72px] md:leading-[1.05]">
              {PROFILE.name}
              <span className="block text-[color:var(--text-secondary)] md:text-[22px] md:font-medium md:opacity-[0.85] mt-2">
                {PROFILE.title}
              </span>
            </h1>
            <p className="max-w-[70ch] text-[18px] leading-[1.75] font-normal text-[color:var(--text-secondary)]" style={{ fontFamily: '"Playfair Display", serif' }}>
              {PROFILE.summary}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/Aditya-Resume.pdf"
                download="Aditya-Resume.pdf"
                onClick={() => addNotification("success")}
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--accent)] px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[color:var(--accent-hover)] hover:shadow-md"
              >
                Download CV
                <Download className="h-4 w-4" />
              </a>
              <button
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-2.5 text-sm font-semibold text-[color:var(--text-primary)] backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[color:var(--accent)] hover:text-white hover:border-[color:var(--accent)]"
              >
                Let's Talk
                <Mail className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-2.5 text-sm font-semibold text-[color:var(--text-primary)] backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[color:var(--accent)] hover:text-white hover:border-[color:var(--accent)] cursor-default">
                <MapPin className="h-4 w-4 text-[color:var(--accent)] transition-colors group-hover:text-white" />
                {PROFILE.location}
              </span>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              {PROFILE.socials.map((social) => (
                <button
                  key={social.name}
                  onClick={() => {
                    addNotification("info");
                    window.open(social.url, '_blank');
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text-primary)] backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[color:var(--accent)] hover:text-white hover:border-[color:var(--accent)]"
                >
                  <social.icon className="h-4 w-4" />
                  {social.name}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item} className="relative">
            <div className="rounded-[32px] border border-[color:var(--border)] bg-[color:var(--surface)]/80 p-12 shadow-[0_25px_60px_rgba(0,0,0,0.3)] backdrop-blur">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
                Profile
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                  Online
                </span>
              </div>
              <div className="mt-8 flex flex-col items-center gap-6 text-center">
                <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-[color:var(--border)] shadow-[0_12px_24px_rgba(0,0,0,0.5)]">
                  <img src={PROFILE.avatarUrl} alt={PROFILE.name} className="h-full w-full object-cover object-[50%_55%]" />
                </div>
                {/* Removed obscured text */}
              </div>
            </div>


            <div className="absolute -bottom-28 left-1/2 hidden -translate-x-1/2 rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)]/90 px-10 py-6 shadow-[0_22px_45px_rgba(0,0,0,0.25)] backdrop-blur lg:block w-[120%]">
              <div className="grid grid-cols-4 gap-4 text-center">
                {STATS.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center justify-center">
                    <p className="text-[32px] font-bold text-[color:var(--text-primary)]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[12px] uppercase tracking-[1.5px] opacity-[0.65] text-[color:var(--text-muted)]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section id="about" variants={item} className="mt-[120px] space-y-12">
          {/* Bio Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--plum-700)]/15 text-[color:var(--plum-700)]">
                <BookOpen className="h-5 w-5" />
              </div>
              <h2 className="font-display text-[36px] font-semibold text-[color:var(--text-primary)] mb-8">
                About Me
              </h2>
            </div>
            <div className="rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface)]/80 p-8 shadow-[0_16px_34px_rgba(0,0,0,0.1)] backdrop-blur">
              <div className="space-y-6 text-[color:var(--text-secondary)] text-[18px] leading-[1.75] font-normal max-w-[70ch]">
                {BIO_PARAGRAPHS.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Focus Section */}
          <div className="space-y-6">
            <h3 className="font-display text-xl text-[color:var(--text-primary)] ml-2 border-l-4 border-[color:var(--accent)] pl-4">
              Technical Focus
            </h3>
            <div className="flex flex-wrap gap-3">
              {TECHNICAL_FOCUS.map((focus) => (
                <span
                  key={focus}
                  className="rounded-lg border border-[color:var(--brand-blue)]/20 bg-[color:var(--brand-blue)]/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-blue)]"
                >
                  {focus}
                </span>
              ))}
            </div>
          </div>

          {/* How I Work Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--accent)]/15 text-[color:var(--accent)]">
                <Sparkles className="h-5 w-5" />
              </div>
              <h2 className="font-display text-[36px] font-semibold text-[color:var(--text-primary)] mb-8">
                How I Work
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {HOW_I_WORK.map((workItem, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  whileHover={{ y: -5 }}
                  className="group relative h-full flex flex-col items-start rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface)]/80 p-6 shadow-[0_16px_34px_rgba(0,0,0,0.1)] backdrop-blur transition-all duration-300 hover:border-[color:var(--accent)]/40 hover:bg-[color:var(--surface)] hover:shadow-[0_20px_40px_rgba(139,92,246,0.15)]"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--surface)] text-[color:var(--text-primary)] shadow-[0_12px_24px_rgba(0,0,0,0.15)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[color:var(--accent)] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                    <workItem.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-[24px] font-semibold text-[color:var(--text-primary)] transition-colors duration-300 group-hover:text-[color:var(--accent)]">
                    {workItem.title}
                  </h3>
                  <p className="mt-3 text-[18px] leading-[1.75] font-normal text-[color:var(--text-secondary)] group-hover:text-[color:var(--text-primary)]/90">
                    {workItem.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="experience"
          variants={item}
          className="mt-[120px]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--accent)]/20 text-[color:var(--accent)]">
              <Briefcase className="h-5 w-5" />
            </div>
            <h2 className="font-display text-[36px] font-semibold text-[color:var(--text-primary)] mb-8">
              Experience
            </h2>
          </div>

          <div className="relative mt-8 space-y-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:h-full before:w-px before:bg-[color:var(--border)]">
            {EXPERIENCE.map((role) => (
              <div key={role.role} className="relative pl-10">
                <span className="absolute left-[6px] top-4 h-3 w-3 rounded-full bg-[color:var(--brand-blue)] shadow-[0_0_0_6px_rgba(61,109,242,0.15)]" />
                <div className={`group relative overflow-hidden rounded-3xl border border-border/50 bg-background/45 p-6 backdrop-blur-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 ${theme === "light" ? "shadow-[0_15px_40px_rgba(0,0,0,0.15)] hover:border-black hover:shadow-[0_25px_50px_rgba(0,0,0,0.2)]" : "shadow-sm hover:border-black hover:shadow-md"}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent" />
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-col">
                        <h3 className="font-display text-[24px] font-semibold text-[color:var(--text-primary)]">
                          {role.role}
                        </h3>
                        <p className="text-[18px] text-[color:var(--text-secondary)] mt-2">
                          {role.company} · {role.location}
                        </p>
                      </div>
                      {role.period && (
                        <span className="shrink-0 rounded-full border border-border/40 bg-background/40 px-4 py-1.5 text-[13px] font-medium uppercase tracking-[0.15em] text-[color:var(--text-muted)] backdrop-blur-md">
                          {role.period}
                        </span>
                      )}
                    </div>
                    <div className="mt-5 space-y-3 text-[18px] leading-[1.75] text-[color:var(--text-secondary)]">
                      {role.highlights.map((line) => (
                        <p key={line} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section id="projects" variants={item} className="mt-[120px]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--accent)]/20 text-[color:var(--accent)]">
              <Layers className="h-5 w-5" />
            </div>
            <h2 className="font-display text-[36px] font-semibold text-[color:var(--text-primary)] mb-8">
              Featured Projects
            </h2>
          </div>

          {/* Private Repos Notice */}
          <div className="mt-2 mb-6 flex items-start gap-3 rounded-2xl border border-[color:var(--accent)]/20 bg-[color:var(--accent)]/5 px-5 py-4 backdrop-blur-md">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)]/20 text-[color:var(--accent)]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
              </svg>
            </span>
            <p className="text-[13px] leading-relaxed text-[color:var(--text-secondary)]">
              <span className="font-semibold text-[color:var(--accent)]">Repositories are currently private</span> due to ongoing testing and documentation. They will be made public soon. For technical documentation or evaluation access, feel free to{" "}
              <button
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="underline underline-offset-2 text-[color:var(--accent)] hover:opacity-80 transition-opacity"
              >
                contact me
              </button>.
            </p>
          </div>

          <div className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <GlassProjectCard
                key={project.name}
                title={project.name}
                description={project.desc}
                image={project.image}
                tech={project.tech}
                {...("stars" in project && { stars: project.stars })}
                {...("metrics" in project && { metrics: project.metrics })}
              />
            ))}
          </div>
        </motion.section>

        <motion.section id="skills" variants={item} className="mt-[120px]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--accent)]/15 text-[color:var(--accent)]">
              <Sparkles className="h-5 w-5" />
            </div>
            <h2 className="font-display text-[36px] font-semibold text-[color:var(--text-primary)] mb-8">
              Skills & Tools
            </h2>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {SKILL_CATEGORIES.map((category) => (
              <div key={category.title} className="space-y-4">
                <h3 className="font-display text-[24px] font-semibold text-[color:var(--text-primary)] border-b border-[color:var(--border)] pb-2">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/80 px-4 py-2 text-[13px] font-medium text-[color:var(--text-secondary)] shadow-[0_5px_15px_rgba(0,0,0,0.05)] backdrop-blur-md hover:bg-[color:var(--surface)] hover:text-[color:var(--accent)] transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>



        <ContactBlock />
      </main>
    </div>
  );
}
