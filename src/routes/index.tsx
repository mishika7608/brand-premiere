import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Brain,
  Shield,
  Code2,
  Github,
  Linkedin,
  Terminal,
  Download,
  ArrowUpRight,
  Mail,
  MapPin,
  Sparkles,
  Cpu,
  Lock,
  Database,
  Cloud,
  GitBranch,
  Trophy,
  GraduationCap,
  Briefcase,
  ExternalLink,
  Zap,
  Globe,
} from "lucide-react";
import {
  Counter,
  CustomCursor,
  MagneticButton,
  ParticleField,
  TiltCard,
  TypingHeadline,
} from "@/components/portfolio-ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mishika Kulshrestha — AI, ML & Cybersecurity Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Mishika Kulshrestha  — AI/ML research, security engineering, and full-stack product work. Building intelligent systems and defending them.",
      },
      { property: "og:title", content: "Mishika Kulshrestha — AI, ML & Cybersecurity Engineer" },
      {
        property: "og:description",
        content:
          "AI/ML research, security engineering, and full-stack product work — with a bias for shipping.",
      },
    ],
  }),
  component: Index,
});

// ---------- Data ----------

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];

const METRICS = [
  { label: "Projects Completed", value: 12, suffix: "+" },
  { label: "Cybersecurity Certifications", value: 10, suffix: "" },
  { label: "Technical Skills", value: 15, suffix: "+" },
  { label: "Curiosity", value: 100, suffix: "%" },
];

type TL = { year: string; title: string; org: string; body: string; kind: "work" | "edu" };
const TIMELINE: TL[] = [
  {
    year: "2023 — Now",
    title: "B.Tech Computer Science Engineering",
    org: "GL Bajaj Institute of Technology & Management",
    body: "CGPA: 8.58/10 • Coursework: DSA, DBMS, OS, Computer Networks, Machine Learning & Cybersecurity, Artificial Intelligence",
    kind: "edu",
  },
  {
    year: "2022 — 2023",
    title: "Senior Secondary Education",
    org: "Vishwa Bharati Public School",
    body: "Class XII • [CBSE] • [90.4]%",
    kind: "edu"
  },
  {
    year: "2021 — 2022",
    title: "Secondary Education",
    org: "Vishwa Bharati Public School",
    body: "Class X • [CBSE] • [92.6]%",
    kind: "edu"
  },
];

const SKILL_GROUPS = [
  {
    icon: Shield,
    color: "var(--purple)",
    title: "Cybersecurity",
    items: ["Ethical Hacking", "Reverse eng.", "Malware Analysis", "SOC", "Zero trust", "OWASP"],
  },
  {
    icon: Brain,
    color: "var(--blue)",
    title: "AI & Machine Learning",
    items: ["Transformers", "RAG", "LangGraph", "Deep Learning", "Computer Vision", "NLP"],
  },
  {
    icon: Globe,
    color: "var(--cyan)",
    title: "Full-Stack",
    items: ["TypeScript", "React", "Node",  "Python", "MongoDB", "Express",],
  },
  {
    icon: Code2,
    color: "var(--blue)",
    title: "Programming",
    items: ["C++", "Python", "JavaScript", "SQL", "Data Structures & Algorithms"
    ]
  },
];

type Category = "All" | "Cybersecurity" ;
type Project = {
  title: string;
  tag: Category;
  status?: string
  blurb: string;
  stack: string[];
  demo?: string;
  repo?: string;
  accent: "blue" | "cyan" | "purple";
  icon: typeof Brain;
};

const PROJECTS: Project[] = [
  {
    title: "Deepfake Detection & Digital Safety",
    tag: "Cybersecurity",
    blurb:
      "AI-powered system for detecting AI-generated and manipulated images, with analysis focused on facial consistency, semantic manipulation, identity verification, and attribute changes.",
    stack: ["Python", "Machine Learning", "Computer Vision", "OpenCV"],
    // demo: "#",
    repo: "#",
    status:"Actively Building",
    accent: "purple",

    icon: Brain,
  },
  {
    title: "RNIDS",
    tag: "Cybersecurity",
    // status:"",
    blurb:
      "Real-time network intrusion detection system that captures and analyzes network traffic, extracts flow features, classifies threats with ML models, and provides live risk assessment.",
    stack: ["Python", "Scapy", "Flask", "TensorFlow"],
    // demo: "#",
    repo: "#",
    accent: "blue",
    icon: Shield,
  },
  {
    title: "Agentic Incident Response",
    tag: "Cybersecurity",
    // status:"",
    blurb:
      "AI-driven incident response platform that analyzes security incidents, generates resolution plans, and integrates workflows to automate incident investigation and response.",
    stack: ["React", "Node.js", "Express", "GenAI", "ServiceNow"],
    // demo: "#",
    repo: "#",
    accent: "cyan",
    icon: Terminal,
  },
];

const CERTS = [
  { name: "Network Security Fundamentals", by: "Palo Alto Networks", year: "2026" },
  { name: "Security Operations Fundamentals", by: "Palo Alto Networks", year: "2026" },
  { name: "SOC Fundamentals", by: "Cyberexam", year: "2026" },
  { name: "Agentic AI Certified Foundations Associate" , by: "Oracle", year: "2026" },
  { name: "Ethical Hacker", by: "Cisco", year: "2025" },
];

// ---------- Root ----------

function Index() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.4 });

  return (
    <div className="relative min-h-screen font-sans text-foreground">
      <CustomCursor />

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[80] h-[2px] w-full origin-left"
      >
        <div className="h-full w-full" style={{ backgroundImage: "var(--gradient-brand)" }} />
      </motion.div>

      {/* Ambient glow blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -left-40 top-24 h-[520px] w-[520px] rounded-full opacity-30 blur-[120px] animate-float-slow"
          style={{ background: "radial-gradient(circle, var(--blue), transparent 60%)" }}
        />
        <div
          className="absolute right-[-10rem] top-[30rem] h-[560px] w-[560px] rounded-full opacity-25 blur-[140px] animate-float-slow"
          style={{ background: "radial-gradient(circle, var(--purple), transparent 60%)", animationDelay: "3s" }}
        />
        <div
          className="absolute left-1/3 top-[80rem] h-[420px] w-[420px] rounded-full opacity-20 blur-[120px] animate-float-slow"
          style={{ background: "radial-gradient(circle, var(--cyan), transparent 60%)", animationDelay: "6s" }}
        />
      </div>

      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

// ---------- Nav ----------

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

function Nav() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed left-0 right-0 top-4 z-[70] flex justify-center px-4">
      <nav
        aria-label="Primary"
        className="glass-strong grid w-full max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-full px-4 py-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.35)] sm:px-5"
      >
        <a href="#home" className="flex min-w-0 items-center gap-2.5">
          <span
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-primary-foreground"
            style={{ backgroundImage: "var(--gradient-brand)", boxShadow: "var(--shadow-glow)" }}
            aria-hidden
          >
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="truncate font-display text-sm font-semibold tracking-tight">
            mishika<span className="text-muted-foreground">.dev</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === n.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full border border-cyan/30 bg-cyan/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {n.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-primary-foreground"
            style={{ backgroundImage: "var(--gradient-brand)" }}
          >
            <Download className="h-3.5 w-3.5" /> Resume
          </a>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-[2px] w-full bg-foreground transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`}
            />
            <span
              className={`absolute bottom-0 left-0 h-[2px] w-full bg-foreground transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div className="glass-strong fixed left-4 right-4 top-20 rounded-2xl p-3 md:hidden">
          <div className="grid gap-1">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-2 text-sm ${active === n.id ? "bg-cyan/10 text-foreground" : "text-muted-foreground"}`}
              >
                {n.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-primary-foreground"
              style={{ backgroundImage: "var(--gradient-brand)" }}
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

// ---------- Sections ----------

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
} as const;

function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-nav relative px-4 py-28 sm:px-6 md:py-36 ${className}`}>
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title) && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            className="mb-14 md:mb-20"
          >
            {eyebrow && (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-cyan">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_var(--cyan)]" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                {title}
              </h2>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="scroll-mt-nav relative flex min-h-[100svh] items-center overflow-hidden px-4 pt-32 sm:px-6"
    >
      <ParticleField />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 font-mono text-[11px] text-muted-foreground backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            Open to select engagements · Q1 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            <span className="block">Mishika Kulshrestha.</span>
            <span className="block text-muted-foreground/80">I build & break</span>
            <span className="block min-h-[1.05em]">
              <TypingHeadline
                phrases={[
                  "Arificial Intelligence",
                  "Machine Learning",
                  "Cybersecurity.",
                ]}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-8 max-w-[54ch] text-lg leading-relaxed text-muted-foreground"
          >
            Final-year Computer Science student passionate about Artificial Intelligence, Machine Learning and Cybersecurity. 
            I build intelligent systems, security tools, and AI-powered solutions that solve real-world problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#projects">
              Explore My Projects <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="/resume.pdf" variant="ghost">
              <Download className="h-4 w-4" /> Download Resume
            </MagneticButton>
            <div className="ml-1 flex items-center gap-1">
              {[
                { icon: Github, label: "GitHub", href: "https://github.com/mishika7608" },
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/mishika-kulshrestha-9b774b305" },
                { icon: Terminal, label: "LeetCode", href: "https://leetcode.com/u/mishikakul" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-cyan/50 hover:text-cyan"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {METRICS.map((m) => (
              <div key={m.label} className="glass rounded-2xl px-4 py-5">
                <div className="font-display text-3xl font-semibold text-gradient">
                  <Counter to={m.value} suffix={m.suffix} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Terminal card */}
        <motion.div
          initial={{ opacity: 0, x: 30, rotate: 2 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="relative hidden w-[380px] lg:block"
        >
          <div className="glass-strong relative rounded-2xl p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                ~/mishika — zsh
              </span>
            </div>
            <pre className="font-mono text-[12.5px] leading-relaxed text-muted-foreground">
{`> whoami
Mishika_Kulshrestha
> skills --top
ai_ml         ██████████  100
python        █████████░   92
cybersecurity ████████░░   84
c++           ████████░░░  88
> projects --featured
✓ Deepfake Detection
✓ RealTime Network IDS
✓ Incident-Metrics
`}
              <span className="text-cyan">✓ shipped in 42s · latency 118ms</span>
            </pre>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <span>Learning Every Day · 99.998%</span>
              <span className="inline-flex items-center gap-1.5">
                <Zap className="h-3 w-3 text-cyan" /> live
              </span>
            </div>
          </div>
          <div
            aria-hidden
            className="absolute -inset-1 -z-10 rounded-3xl opacity-70 blur-2xl"
            style={{ background: "var(--gradient-brand-soft)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          Engineering AI That  <span className="text-gradient">Solves Real Problems</span>.
        </>
      }
    >
      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="space-y-5 text-lg leading-relaxed text-muted-foreground"
        >
          <p>
            I am a final-year Computer Science student passionate about Artificial 
            Intelligence, Machine Learning, Cybersecurity. I enjoy building 
            intelligent applications, exploring security research, and developing 
            practical solutions that address real-world challenges.
          </p>
          <p>
            My current work focuses on AI-powered deepfake detection for
            women's safety, security analytics, intrusion detection systems,
            and digital forensics. I believe technology should not only be
            intelligent but also secure, ethical, and impactful.
          </p>
          <p>
            Beyond academics, I enjoy solving Leetcode contests, 
            experimenting with emerging AI technologies, and continuously learning 
            about cybersecurity and software engineering.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="glass rounded-2xl p-6"
        >
          <div className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_var(--cyan)]" />
            Fast facts
          </div>
          <dl className="space-y-4 text-sm">
            {[
              ["Location", "India"],
              ["Currently", "Computer Science Engineering Student"],
              ["Focus", "Artificial Intelligence · Machine Learning · Cybersecurity"],
              ["Available", "Open to Internships · Research · Collaborations"],
              ["Languages", "EN · HI"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section
      id="education"
      eyebrow="Timeline"
      title={
        <>
          <span className="text-gradient">Education</span>
        </>
      }
    >
      <div className="relative">
        <div
          aria-hidden
          className="absolute left-[15px] top-2 h-full w-px md:left-1/2 md:-translate-x-1/2"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--border) 8%, var(--border) 92%, transparent)",
          }}
        />
        <ul className="space-y-14 md:space-y-20">
          {TIMELINE.map((t, i) => {
            const Icon = t.kind === "work" ? Briefcase : GraduationCap;
            const right = i % 2 === 1;
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`relative grid grid-cols-[40px_minmax(0,1fr)] gap-5 md:grid-cols-2 md:gap-10 ${
                  right ? "md:[&>div:first-child]:col-start-2 md:[&>div:last-child]:col-start-1 md:[&>div:last-child]:row-start-1" : ""
                }`}
              >
                <div className={`hidden md:block ${right ? "md:text-left" : "md:text-right"}`} />
                <div className="relative">
                  <span
                    className="absolute -left-[32px] top-1 grid h-8 w-8 place-items-center rounded-full border border-border bg-background text-cyan md:left-auto md:right-auto md:top-1"
                    style={{
                      boxShadow: "0 0 24px oklch(0.82 0.16 210 / 0.35)",
                      // Center on the vertical line at md
                      ...(typeof window !== "undefined" && window.innerWidth >= 768
                        ? right
                          ? { left: "-52px" }
                          : { right: "-52px", left: "auto" }
                        : {}),
                    }}
                    aria-hidden
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <TiltCard>
                    <div className="glass rounded-2xl p-6">
                      <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                        {t.year}
                        <span
                          className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                            t.kind === "work"
                              ? "bg-blue/15 text-blue"
                              : "bg-purple/15 text-purple"
                          }`}
                        >
                          {t.kind === "work" ? "Work" : "Edu"}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-semibold">{t.title}</h3>
                      <div className="mb-3 text-sm text-cyan">{t.org}</div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                    </div>
                  </TiltCard>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Toolbelt"
      title={
        <>
          Skills, categorized & <span className="text-gradient">honed</span>
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SKILL_GROUPS.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard className="h-full">
              <div className="glass relative flex h-full flex-col overflow-hidden rounded-2xl p-6">
                <div
                  className="mb-5 grid h-11 w-11 place-items-center rounded-xl"
                  style={{
                    background: `color-mix(in oklab, ${g.color} 18%, transparent)`,
                    boxShadow: `0 0 30px color-mix(in oklab, ${g.color} 30%, transparent)`,
                    color: g.color,
                  }}
                >
                  <g.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">{g.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: g.color, boxShadow: `0 0 8px ${g.color}` }}
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  const [filter, setFilter] = useState<Category>("All");
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter);
  const filters: Category[] = ["All"];

  const accentVar = { blue: "var(--blue)", cyan: "var(--cyan)", purple: "var(--purple)" } as const;

  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title={
        <>
          Things I've <span className="text-gradient">shipped</span>
        </>
      }
    >
      <div className="mb-10 flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`relative rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              filter === f ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {filter === f && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 -z-10 rounded-full border border-cyan/30 bg-cyan/10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <motion.article
            key={p.title}
            layout
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard className="h-full">
              <div className="glass relative flex h-full flex-col overflow-hidden rounded-2xl p-6">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
                  style={{ background: accentVar[p.accent] }}
                />
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className="grid h-11 w-11 place-items-center rounded-xl"
                    style={{
                      background: `color-mix(in oklab, ${accentVar[p.accent]} 18%, transparent)`,
                      boxShadow: `0 0 30px color-mix(in oklab, ${accentVar[p.accent]} 30%, transparent)`,
                      color: accentVar[p.accent],
                    }}
                  >
                    <p.icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-border bg-background/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {p.tag}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.blurb}
                </p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-md border border-border bg-background/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center gap-2 border-t border-border pt-4">
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:border-cyan/50 hover:text-cyan"
                    >
                      <ExternalLink className="h-3 w-3" /> Live demo
                    </a>
                  )}
                  {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Github className="h-3 w-3" /> Source
                </a>
              )}

              {p.status && (
                <span className="ml-auto rounded-full border border-cyan/30 bg-cyan/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-cyan">
                  {p.status}
                </span>
              )}
                </div>
              </div>
            </TiltCard>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Credentials"
      title={
        <>
          Certifications & <span className="text-gradient">recognition</span>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CERTS.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="glass group flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-cyan/40"
          >
            <div
              className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-cyan"
              style={{
                background: "color-mix(in oklab, var(--cyan) 12%, transparent)",
                boxShadow: "0 0 24px oklch(0.82 0.16 210 / 0.28)",
              }}
              aria-hidden
            >
              <Trophy className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-display text-base font-semibold">{c.name}</div>
              <div className="truncate text-xs text-muted-foreground">{c.by}</div>
            </div>
            <div className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {c.year}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={
        <>
          Let's build <span className="text-gradient">something rare</span>.
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="space-y-5"
        >
          <p className="text-lg leading-relaxed text-muted-foreground">
            Best for advisory retainers, security audits of AI systems, or a scoped
            product engagement. I read every message and reply within a few days.
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-cyan" />
              <a href="mailto:hello@kainakamura.dev" className="hover:text-cyan">
                hello@kainakamura.dev
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-cyan" /> Brooklyn, NY · UTC−5
            </li>
            <li className="flex items-center gap-3">
              <GitBranch className="h-4 w-4 text-cyan" /> Open-source at{" "}
              <a href="https://github.com" className="hover:text-cyan">
                github.com/kainakamura
              </a>
            </li>
          </ul>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            {[
              { icon: Github, label: "GitHub", href: "https://github.com" },
              { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
              { icon: Terminal, label: "LeetCode", href: "https://leetcode.com" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-cyan/40 hover:text-cyan"
              >
                <s.icon className="h-3.5 w-3.5" /> {s.label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="glass-strong relative overflow-hidden rounded-3xl p-6 md:p-8"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px -z-10 rounded-3xl opacity-60 blur-xl"
            style={{ background: "var(--gradient-brand-soft)" }}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name" name="name" placeholder="Your name" />
            <Field label="Email" name="email" type="email" placeholder="you@company.com" />
          </div>
          <div className="mt-4">
            <Field label="Subject" name="subject" placeholder="What are we building?" />
          </div>
          <div className="mt-4">
            <label htmlFor="message" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="A few lines on scope, timeline, and stakes."
              className="w-full resize-none rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-cyan/60 focus:outline-none focus:ring-2 focus:ring-cyan/20"
            />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {sent ? "✓ Message sent — talk soon" : "Encrypted in transit"}
            </span>
            <MagneticButton>
              Send message <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </motion.form>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-cyan/60 focus:outline-none focus:ring-2 focus:ring-cyan/20"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-3 text-xs text-muted-foreground sm:grid-cols-3">
        <span>© {new Date().getFullYear()} · Kai Nakamura</span>
        <span className="sm:text-center">
          Built with intent · React · TanStack · Framer Motion
        </span>
        <a href="#home" className="sm:text-right hover:text-cyan">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
