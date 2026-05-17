import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
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
  Sparkles,
} from "lucide-react";

import {
  type ActiveNotification,
  NotificationOverlay,
  type NotificationType,
} from "./components/notification-system";
import { useCallback, useEffect, useState, useMemo, lazy, Suspense } from "react";
import { GlassProjectCard } from "./components/glass-project-card";
import Lenis from "lenis";

// Lazy load heavy components
const AnimatedList = lazy(() => import("./components/AnimatedList"));

const PROFILE = {
  name: "Rishikesh Patil",
  title: "Engineering Student | Startup Enthusiast | Mobility Innovator",
  summary:
    "I’m a passionate engineering student who enjoys combining technology, creativity, and business thinking to build impactful ideas.",
  location: "Belagavi, India",
  email: "rishikeshpatil82777@gmail.com",
  phone: "+91 8277747242",
  avatarUrl: "/profile.jpg",
  initials: "RP",
  socials: [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/rishikesh-patil-486421389?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
    { name: "Portfolio", icon: Globe, url: "#" },
  ],
};

const STATS = [
  { label: "Projects Built", value: "2+" },
  { label: "Startup Concepts", value: "3+" },
  { label: "Tech Stacks", value: "2+" },
  { label: "Current Sem", value: "2nd" },
];

const EXPERIENCE = [
  {
    role: "B.Tech in Electronics & Communication Engineering (ECE)",
    company: "Gogte Institute of Technology",
    period: "2nd Sem",
    location: "Belagavi",
    highlights: [
      "Currently pursuing B.Tech in ECE.",
      "Deeply interested in mobility systems, startup innovation, and solving real-world problems.",
      "Learning to combine technology, creativity, and business thinking to build impactful ideas."
    ]
  }
];

const PROJECTS = [
  {
    name: "Smart Emergency Street Light",
    tech: ["C", "Hardware"],
    desc: "An intelligent street lighting system designed to enhance safety and energy efficiency during emergencies by automating light intensity based on environmental conditions.",
    image: "https://images.unsplash.com/photo-1494452672938-ad7f60625bb4?auto=format&fit=crop&q=80&w=800",
    githubUrl: "#",
    stars: 5,
    metrics: {
      "Focus": "Energy Efficiency",
      "Type": "Smart Systems",
      "Status": "Completed"
    }
  },
  {
    name: "Mini Drone",
    tech: ["Python", "Aerodynamics"],
    desc: "A compact drone project focusing on mobility, control systems, and practical applications in transport. Built to explore tech-driven mobility solutions.",
    image: "https://images.unsplash.com/photo-1579822989524-2c700cb92c2f?auto=format&fit=crop&q=80&w=800",
    githubUrl: "#",
    stars: 8,
    metrics: {
      "Focus": "Mobility",
      "Type": "Hardware",
      "Status": "Completed"
    }
  }
];

const SKILL_CATEGORIES = [
  {
    title: "Programming",
    skills: ["C", "Python"]
  },
  {
    title: "Tools & Design",
    skills: ["Canva"]
  },
  {
    title: "Business & Strategy",
    skills: ["Team Leadership", "Communication", "Startup Strategy", "Product Thinking"]
  }
];

const HOW_I_WORK = [
  {
    title: "Think Beyond the Obvious",
    desc: "I enjoy exploring ideas from a bigger perspective and finding smarter, more scalable ways to solve problems instead of following conventional approaches.",
    icon: Sparkles,
  },
  {
    title: "User Experience Comes First",
    desc: "Whether it’s a tech product, mobility system, or service idea, I focus on creating experiences that feel smooth, practical, and comfortable for the end user.",
    icon: Globe,
  },
  {
    title: "Build with Purpose",
    desc: "I believe every project should solve a real problem or improve an existing system in a meaningful way rather than just looking impressive.",
    icon: Briefcase,
  },
  {
    title: "Learn, Adapt, Improve",
    desc: "I continuously explore new technologies, trends, and business models to improve my skills and stay adaptable in a fast-changing tech world.",
    icon: ArrowUpRight,
  },
  {
    title: "Systems Over Shortcuts",
    desc: "I prefer structured thinking, planning, and long-term scalability over temporary fixes, because strong systems create reliable results.",
    icon: Layers,
  },
];

const TECHNICAL_FOCUS = [
  "Mobility & Transport Innovation",
  "Startup Strategy & Product Thinking",
  "UI/UX & User Experience Concepts",
  "Smart Systems & Service Design",
  "Technology-Driven Business Solutions",
];

const BIO_PARAGRAPHS = [
  "I’m a passionate engineering student who enjoys combining technology, creativity, and business thinking to build impactful ideas. I’m deeply interested in mobility systems, startup innovation, and solving real-world problems through smart and scalable solutions. From designing futuristic transport concepts to exploring tech-driven business models, I enjoy turning ideas into structured projects.",
  "My journey started with curiosity around how modern systems work — from apps and user experience to transportation and operations. Over time, that curiosity evolved into building concepts like premium transit systems, EV battery delivery networks, and smart service-based solutions. I love learning new technologies, analyzing market trends, and thinking about how technology can improve everyday experiences.",
  "My goal is to grow as a tech-driven entrepreneur and engineer who can build innovative products, scalable businesses, and premium user-focused systems. I aim to work on projects that combine engineering, technology, and strategy to create solutions that are practical, efficient, and future-ready."
];

import BorderGlow from "./components/BorderGlow";
import { ContactBlock } from "./sections/Contact";
import { CustomCursor } from "./components/CustomCursor";
import Silk from "./components/Silk";

const Background = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 10%, hsla(270,60%,92%,0.7) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 80%, hsla(280,50%,88%,0.5) 0%, transparent 55%),
            linear-gradient(160deg, #f5f0ff 0%, #ffffff 50%, #ede8f7 100%)
          `
        }}
      />
      <div className="absolute inset-0 overflow-hidden topo-bg opacity-[0.4]" />
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-brand-blue/5 blur-[100px]" />
    </div>
  );
};

export default function App() {
  const [activeExperience, setActiveExperience] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  useEffect(() => {
    // Artificial delay for premium loading feel
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    const lenis = new Lenis({ duration: 1.2 });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const [notifications, setNotifications] = useState<ActiveNotification[]>([]);
  const addNotification = useCallback((type: NotificationType) => {
    const id = Math.random().toString(36).slice(2, 9);
    setNotifications((prev) => [...prev, { id, type }]);
    window.setTimeout(() => setNotifications((prev) => prev.filter((n) => n.id !== id)), 5000);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="relative min-h-svh overflow-hidden text-[color:var(--text-secondary)] bg-[color:var(--bg)]">
      <div className="grain-overlay" />
      
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              y: -100,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
          >
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-serif text-8xl font-medium text-black/5 tracking-[0.04em]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Rishikesh
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute top-0 left-0 overflow-hidden whitespace-nowrap font-serif text-8xl font-medium text-accent tracking-[0.04em]"
                style={{ 
                  fontFamily: "'Cormorant Garamond', serif",
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                }}
              >
                Rishikesh
              </motion.div>
            </div>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="mt-8 h-1 w-48 bg-accent/20 rounded-full overflow-hidden origin-left"
            >
              <motion.div 
                className="h-full bg-accent"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </motion.div>
            <p className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-accent/40">INITIALIZING SYSTEMS</p>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Background />
          <NotificationOverlay notifications={notifications} removeNotification={removeNotification} />
          
          <motion.header
            layout
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            onClick={() => setIsExpanded(!isExpanded)}
            transition={{ type: "spring", stiffness: 250, damping: 30, mass: 1 }}
            className="fixed top-8 left-0 right-0 z-50 mx-auto flex w-fit max-w-[95vw] items-center gap-2 rounded-[2.5rem] bg-white/60 border border-black/5 shadow-[0_30px_60px_rgba(0,0,0,0.12)] backdrop-blur-3xl overflow-hidden"
          >
            <motion.div layout className="flex items-center px-4 py-2.5 gap-3">
              <motion.div layout className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white shrink-0">
                <AnimatePresence mode="wait">
                  {isExpanded ? (
                    <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}><Sparkles className="w-5 h-5 text-accent" /></motion.div>
                  ) : activeExperience ? (
                    <motion.div key="briefcase" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}><Briefcase className="w-5 h-5" /></motion.div>
                  ) : (
                    <motion.span key="initials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-black">{PROFILE.initials}</motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <AnimatePresence>
                {!isExpanded && (
                  <motion.div layout initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} className="overflow-hidden">
                    <span className="font-display font-black text-sm tracking-tight text-black uppercase whitespace-nowrap">
                      {activeExperience || "Portfolio"}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence mode="popLayout">
              {isExpanded ? (
                <motion.div layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex items-center gap-[4vw] md:gap-6 px-[5vw] md:px-6 py-2.5">
                  {[
                    { id: 'home', icon: Globe },
                    { id: 'about', icon: BookOpen },
                    { id: 'experience', icon: Briefcase },
                    { id: 'projects', icon: Layers },
                    { id: 'skills', icon: Sparkles },
                    { id: 'contact', icon: Mail },
                  ].map((nav) => (
                    <motion.button
                      key={nav.id}
                      layout
                      whileHover={{ y: -4, color: 'var(--accent)' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById(nav.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-black/60 transition-colors flex flex-col items-center gap-1 min-w-[32px]"
                    >
                      <nav.icon className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="text-[6px] md:text-[7px] font-black uppercase tracking-tighter">{nav.id}</span>
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center border-l border-black/10 pl-3 pr-4 gap-3 relative overflow-hidden">
                  <motion.div className="absolute bottom-0 left-0 h-[1px] bg-accent/40" style={{ width: `${scrollProgress * 100}%` }} />
                  <motion.button layout onClick={(e) => { e.stopPropagation(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-black/40 hover:text-black transition-colors"><Layers className="w-5 h-5" /></motion.button>
                  <motion.button layout whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={(e) => { e.stopPropagation(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-[11px] font-black text-white group/btn shadow-lg hover:shadow-accent/20 transition-shadow">
                    <span>TALK</span>
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.header>

          <main className="relative z-10 mx-auto w-full max-w-[1440px] px-6">
            {/* HERO SECTION */}
            <motion.section variants={container} initial="hidden" animate="show" id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-12">
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.03]" aria-hidden="true">
                <div className="font-display text-[15vw] leading-none whitespace-nowrap">ENGINEERING</div>
                <div className="font-display text-[15vw] leading-none whitespace-nowrap mt-[-5vw]">THE FUTURE</div>
              </div>
              <h1 className="sr-only">Rishikesh Patil — Engineering Student & Innovator</h1>
              <div className="relative z-20 grid grid-cols-1 lg:grid-cols-[1.2fr_2fr_1.2fr] items-center gap-12 w-full max-w-[1200px]">
                <div className="hidden lg:flex flex-col gap-12">
                  <div className="space-y-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-text-muted opacity-40">Navigation</p>
                    {['HOME', 'ABOUT', 'PROJECTS', 'CONTACT'].map((page) => (
                      <motion.button key={page} whileHover={{ x: 12, color: 'var(--accent)' }} onClick={() => document.getElementById(page.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })} className="block font-display text-5xl font-black tracking-tighter text-text-primary transition-colors text-left">{page}</motion.button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center pt-5">
                  <motion.div variants={item} onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    e.currentTarget.style.setProperty('--x', `${x * 20}deg`);
                    e.currentTarget.style.setProperty('--y', `${y * -20}deg`);
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.setProperty('--x', '0deg');
                    e.currentTarget.style.setProperty('--y', '0deg');
                  }} className="relative group flex flex-col items-center" style={{ perspective: "1000px" } as any}>
                    <div className="absolute -inset-10 bg-accent/20 blur-[120px] rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-1000" />
                    <div className="relative h-[320px] w-[320px] md:h-[420px] md:w-[420px] overflow-hidden rounded-full border-[10px] border-white shadow-[0_40px_100px_rgba(0,0,0,0.3)] transition-all duration-200" style={{ transform: "rotateX(var(--y, 0deg)) rotateY(var(--x, 0deg))", transformStyle: "preserve-3d" } as any}>
                      <img src={PROFILE.avatarUrl} alt={PROFILE.name} className="h-full w-full object-cover scale-[1.22] -translate-x-[11%] translate-y-[10%] transition-transform duration-700 group-hover:scale-[1.3]" style={{ objectPosition: '90% 15%' }} />
                    </div>
                    <motion.div initial={{ y: 20, rotate: -5, opacity: 0 }} animate={{ y: 0, rotate: -5, opacity: 1 }} transition={{ delay: 1 }} className="z-30 mt-[-25px] bg-accent px-6 py-3 rounded-full shadow-xl relative group/badge">
                      <p className="font-signature text-2xl font-normal text-white whitespace-nowrap relative z-10">Building the Future</p>
                      <svg className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[80%] h-2 text-white/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <motion.path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.5, duration: 1, ease: "easeInOut" }} />
                      </svg>
                    </motion.div>
                  </motion.div>
                  <div className="mt-12 w-full max-w-[500px]">
                    <div className="grid grid-cols-4 gap-4 bg-white/10 border border-white/20 backdrop-blur-xl px-8 py-6 rounded-[2.5rem] shadow-2xl">
                      {STATS.map((s) => (
                        <div key={s.label} className="flex flex-col items-center">
                          <p className="text-2xl font-black text-text-primary tracking-tighter">{s.value}</p>
                          <p className="mt-1 text-[8px] font-bold uppercase tracking-wider opacity-40">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <motion.button variants={item} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="mt-10 bg-accent px-10 py-5 rounded-full font-display font-black text-xs uppercase tracking-widest text-white shadow-xl hover:scale-105 transition-all">Business Enquiries ↗</motion.button>
                </div>
                <div className="hidden lg:flex flex-col gap-12 items-end text-right">
                  <div className="space-y-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-text-muted opacity-40">Connect</p>
                    {['LINKEDIN', 'RESUME', 'EMAIL'].map((s) => (
                      <motion.a key={s} href={s === 'EMAIL' ? `mailto:${PROFILE.email}` : s === 'LINKEDIN' ? PROFILE.socials[0].url : s === 'RESUME' ? '/Rishikesh_Patil_Resume.pdf' : '#'} target="_blank" download={s === 'RESUME' ? 'Rishikesh_Patil_Resume.pdf' : undefined} whileHover={{ x: -12, color: 'var(--accent)' }} className="block font-display text-5xl font-black tracking-tighter text-text-primary transition-colors">{s}</motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* ABOUT SECTION */}
            <motion.section id="about" variants={item} className="mt-[120px] space-y-12">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15 text-accent"><BookOpen className="h-5 w-5" /></div>
                <h2 className="font-serif text-[42px] font-medium tracking-tight text-text-primary ios-heading">About Me</h2>
              </div>
              <div className="rounded-[2.5rem] border border-border/40 bg-white/40 p-10 shadow-xl backdrop-blur-3xl">
                <div className="space-y-6 text-text-secondary text-lg leading-relaxed max-w-[80ch]">
                  {BIO_PARAGRAPHS.map((p, i) => <p key={i}>{p}</p>)}
                </div>
                <div className="mt-10 flex flex-wrap gap-3">
                  {TECHNICAL_FOCUS.map((f) => <span key={f} className="rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-accent">{f}</span>)}
                </div>
              </div>
            </motion.section>

            {/* HOW I WORK */}
            <motion.section className="mt-[120px] space-y-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[2.5rem] bg-accent/15 text-accent"><Sparkles className="h-5 w-5" /></div>
                <h2 className="font-serif text-[42px] font-medium tracking-tight text-text-primary ios-heading">How I Work</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {HOW_I_WORK.map((w, i) => (
                  <div key={i} className="group rounded-[2.5rem] border border-border/40 bg-white/40 p-8 shadow-lg backdrop-blur-3xl transition-all hover:-translate-y-2 hover:border-accent/40">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[2.5rem] bg-black text-white group-hover:bg-accent transition-colors"><w.icon className="h-5 w-5" /></div>
                    <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-accent transition-colors">{w.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">{w.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* EXPERIENCE SECTION */}
            <motion.section id="experience" variants={item} className="mt-[120px]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[2.5rem] bg-accent/15 text-accent"><Briefcase className="h-5 w-5" /></div>
                  <h2 className="font-serif text-[42px] font-medium tracking-tight text-text-primary ios-heading">Experience</h2>
                </div>
                <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="hidden md:flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-text-muted">
                  <span>Scroll to Explore</span>
                  <ArrowUpRight className="w-3 h-3 rotate-90" />
                </motion.div>
              </div>
              <div className="mt-10">
                <Suspense fallback={<div className="h-40 w-full animate-pulse rounded-3xl bg-white/5" />}>
                  <AnimatedList items={EXPERIENCE.map((role) => (
                    <div key={role.role} className="w-full" onMouseEnter={() => setActiveExperience(role.company)} onMouseLeave={() => setActiveExperience(null)}>
                      <motion.div className="rounded-[2.5rem] border border-border/40 bg-white/40 p-10 shadow-xl backdrop-blur-3xl hover:border-accent/30 transition-all">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <h3 className="font-display text-2xl font-bold text-text-primary uppercase tracking-tight">{role.role}</h3>
                            <p className="text-sm font-bold text-accent uppercase tracking-widest mt-1">{role.company} · {role.location}</p>
                          </div>
                          <span className="rounded-full bg-black/5 px-5 py-2 text-[10px] font-black uppercase tracking-widest text-text-muted">{role.period}</span>
                        </div>
                        <div className="mt-6 space-y-3 text-text-secondary">
                          {role.highlights.map((h, i) => <p key={i} className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />{h}</p>)}
                        </div>
                      </motion.div>
                    </div>
                  ))} displayScrollbar={false} showGradients={true} />
                </Suspense>
              </div>
            </motion.section>

            {/* PROJECTS SECTION */}
            <motion.section id="projects" variants={item} className="mt-[120px] space-y-10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15 text-accent"><Layers className="h-5 w-5" /></div>
                <h2 className="font-serif text-[42px] font-medium tracking-tight text-text-primary ios-heading">Projects</h2>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {PROJECTS.map((p) => <GlassProjectCard key={p.name} title={p.name} description={p.desc} image={p.image} tech={p.tech} metrics={p.metrics} />)}
              </div>
            </motion.section>

            {/* SKILLS SECTION */}
            <motion.section id="skills" variants={item} className="mt-[120px] space-y-10 pb-20">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15 text-accent"><Sparkles className="h-5 w-5" /></div>
                <h2 className="font-serif text-[42px] font-medium tracking-tight text-text-primary ios-heading">Skills & Stack</h2>
              </div>
              <div className="grid gap-10 md:grid-cols-3">
                {SKILL_CATEGORIES.map((c) => (
                  <div key={c.title} className="space-y-6">
                    <h3 className="font-display text-xl font-bold text-text-primary border-b border-border/40 pb-3">{c.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {c.skills.map((s) => <span key={s} className="rounded-full border border-border/40 bg-white/50 px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-text-secondary hover:text-accent transition-colors">{s}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            <ContactBlock />
          </main>

          <footer className="relative z-10 border-t border-border/40 bg-white/5 py-12 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-8 md:flex-row">
              <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted order-2 md:order-1 items-center">
                <span className="font-serif italic capitalize tracking-normal text-sm">© 2026 Rishikesh Patil</span>
                <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
              </div>
              <div className="flex gap-6 order-1 md:order-2">
                {PROFILE.socials.map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="group relative" aria-label={`Follow me on ${s.name}`}>
                    <div className="absolute -inset-2 rounded-lg bg-accent/0 transition-colors group-hover:bg-accent/10" />
                    <s.icon className="relative h-5 w-5 text-text-muted transition-colors group-hover:text-accent" />
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
