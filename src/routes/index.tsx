import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroTexture from "@/assets/hero-texture.jpg";
import project01 from "@/assets/project-01.jpg";
import project02 from "@/assets/project-02.jpg";
import project03 from "@/assets/project-03.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aris Vance — Independent Design Director" },
      {
        name: "description",
        content:
          "Independent design director crafting brand systems, product interfaces, and cinematic digital experiences for teams who build things that last.",
      },
      { property: "og:title", content: "Aris Vance — Independent Design Director" },
      {
        property: "og:description",
        content:
          "Independent design director crafting brand systems, product interfaces, and cinematic digital experiences for teams who build things that last.",
      },
    ],
  }),
  component: Index,
});

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 1s var(--ease-cinema) ${delay}ms, transform 1.1s var(--ease-cinema) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const projects = [
  {
    n: "01",
    year: "2025",
    role: "Brand System · Product",
    title: "Aurelius Horology",
    caption:
      "A full digital relaunch for a legacy watchmaker — micro-interactions tuned to mechanical time.",
    image: project01,
  },
  {
    n: "02",
    year: "2024",
    role: "Industrial · Interface",
    title: "Kinesis Field Unit",
    caption:
      "Hardware identity and companion OS for an autonomous sensing device shipped to research teams.",
    image: project02,
  },
  {
    n: "03",
    year: "2023",
    role: "Spatial · Direction",
    title: "Vesper Atelier",
    caption:
      "Environmental design and identity for a private members workspace carved into raw concrete.",
    image: project03,
  },
];

const press = [
  "Monocle · Top 50",
  "Fast Company Innovation",
  "It's Nice That · Feature",
  "Awwwards SOTD ×4",
  "Adobe Max · Speaker",
  "Wallpaper* Design Awards",
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <Nav />
      <Hero />
      <Manifesto />
      <Work />
      <PressStrip />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "py-4 backdrop-blur-md bg-background/70 border-b border-border"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <a href="#top" className="min-w-0 flex items-center gap-3 group">
          <span className="h-2 w-2 rounded-full bg-accent shrink-0 shadow-[0_0_16px_var(--accent)]" />
          <span className="font-serif text-lg tracking-tight truncate">
            Aris <span className="italic text-muted-foreground">Vance</span>
          </span>
        </a>
        <div className="flex items-center gap-8 md:gap-12 text-[10px] uppercase tracking-[0.28em] font-mono text-muted-foreground">
          <a href="#work" className="hover:text-accent transition-colors hidden sm:inline">
            Work
          </a>
          <a href="#about" className="hover:text-accent transition-colors hidden sm:inline">
            Studio
          </a>
          <a
            href="#contact"
            className="text-foreground hover:text-accent transition-colors border border-border rounded-full px-4 py-2"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden px-6 md:px-10 pb-16 md:pb-24 pt-40"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src={heroTexture}
          alt=""
          width={1920}
          height={1200}
          className="w-full h-full object-cover opacity-60 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_85%)]" />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        <div className="animate-reveal-in flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-mono text-accent mb-8">
          <span className="h-px w-10 bg-accent" />
          Edition · MMXXV
        </div>
        <h1 className="animate-reveal font-serif font-light leading-[0.88] tracking-[-0.02em] text-balance text-[clamp(3.2rem,11vw,10.5rem)]">
          Designing the <br />
          <span className="italic text-accent/90">unspoken</span> weight
          <br />
          of a brand.
        </h1>

        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-10 md:gap-16 items-end">
          <Reveal delay={300}>
            <p className="max-w-[46ch] text-base md:text-lg text-muted-foreground leading-relaxed">
              Independent design director for founders and legacy houses. I build visual
              systems, product interfaces, and launch moments engineered to feel
              inevitable — never decorated.
            </p>
          </Reveal>
          <Reveal delay={500}>
            <div className="flex items-center gap-6">
              <a
                href="#work"
                className="group relative inline-flex items-center gap-3 rounded-full bg-foreground text-background px-7 py-4 text-[11px] font-mono uppercase tracking-[0.28em] overflow-hidden transition-transform duration-500 hover:scale-[1.03]"
              >
                <span className="relative z-10">Selected Work</span>
                <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
                <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[var(--ease-cinema)]" />
              </a>
              <div className="hidden md:flex flex-col text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
                <span>Est. 2016</span>
                <span>Berlin / Remote</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-8 right-6 md:right-10 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
        <span className="h-px w-8 bg-muted-foreground/40" />
        Scroll
      </div>
    </header>
  );
}

function Manifesto() {
  return (
    <section id="about" className="relative py-32 md:py-56 px-6 md:px-10">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <Reveal>
            <div className="sticky top-32">
              <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-accent">
                ( 001 ) — Philosophy
              </div>
              <div className="mt-8 h-px w-16 bg-border" />
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-8 space-y-14">
          <Reveal delay={100}>
            <p className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.015em] text-balance">
              I build brands for those who understand that true luxury lives in the{" "}
              <span className="italic text-accent">intentional omission</span> of the
              unnecessary.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pt-6 border-t border-border">
            <Reveal delay={200}>
              <div className="space-y-4">
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
                  Reduction
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Every project begins with what to remove. Weight, hierarchy, and silence
                  do more work than decoration ever will.
                </p>
              </div>
            </Reveal>
            <Reveal delay={350}>
              <div className="space-y-4">
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
                  Precision
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Interfaces built like hardware — soft-close hinges, machined edges, no
                  rattle. Systems designed to age with dignity.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="relative py-24 md:py-40 px-6 md:px-10 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-20 md:mb-32 gap-6">
          <Reveal>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-accent mb-5">
                ( 002 ) — Index
              </div>
              <h2 className="font-serif text-5xl md:text-7xl tracking-[-0.02em] leading-none">
                Selected <span className="italic">work</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground shrink-0">
              01 — 03 / MMXXV
            </span>
          </Reveal>
        </div>

        <div className="space-y-32 md:space-y-56">
          {projects.map((p, i) => (
            <ProjectRow key={p.n} project={p} flipped={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  flipped,
}: {
  project: (typeof projects)[number];
  flipped: boolean;
}) {
  return (
    <Reveal>
      <article className="group grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
        <div
          className={`md:col-span-7 relative overflow-hidden rounded-sm ${
            flipped ? "md:order-2" : ""
          }`}
        >
          <div className="relative aspect-[4/5] md:aspect-[5/6] overflow-hidden bg-surface">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              width={1200}
              height={1500}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-cinema)] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            <span className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/70">
              {project.n} / {project.year}
            </span>
          </div>
        </div>
        <div className="md:col-span-5 space-y-8">
          <div className="text-[10px] font-mono uppercase tracking-[0.32em] text-accent">
            {project.role}
          </div>
          <h3 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em]">
            {project.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed max-w-md">
            {project.caption}
          </p>
          <div className="pt-6 border-t border-border flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Case study
            </span>
            <a
              href="#"
              className="group/link inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.3em] hover:text-accent transition-colors"
            >
              View
              <span className="transition-transform duration-500 group-hover/link:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function PressStrip() {
  const items = [...press, ...press];
  return (
    <section className="border-y border-border py-8 overflow-hidden bg-surface/40">
      <div className="flex whitespace-nowrap animate-marquee gap-16 will-change-transform">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-16 text-[11px] font-mono uppercase tracking-[0.35em] text-muted-foreground"
          >
            <span>{item}</span>
            <span className="h-1 w-1 rounded-full bg-accent/60" />
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-32 md:py-56 px-6 md:px-10">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <Reveal>
            <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-accent">
              ( 003 ) — Inquiry
            </div>
            <div className="mt-8 h-px w-16 bg-border" />
            <div className="mt-10 space-y-2 text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
              <div>Booking · Q3 · MMXXV</div>
              <div>Retainer · limited</div>
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-8">
          <Reveal delay={100}>
            <p className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1] tracking-[-0.02em] mb-12">
              Available for a
              <br />
              <span className="italic text-accent">select</span> engagement.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <a
              href="mailto:studio@arisvance.co"
              className="group inline-flex items-baseline gap-4 font-serif text-3xl md:text-5xl lg:text-6xl italic border-b border-border pb-4 hover:border-accent transition-colors break-all"
            >
              <span>studio@arisvance.co</span>
              <span className="text-accent transition-transform duration-500 group-hover:translate-x-2 not-italic text-xl md:text-2xl">
                →
              </span>
            </a>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-16 flex flex-wrap gap-8 text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
              {["Instagram", "Read.cv", "LinkedIn", "Are.na"].map((s) => (
                <a key={s} href="#" className="hover:text-foreground transition-colors">
                  {s} ↗
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 md:px-10 py-10">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-3 gap-4 items-center text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
        <span>© MMXXV · Aris Vance</span>
        <span className="hidden md:block text-center">52.52° N · 13.40° E</span>
        <a href="#top" className="text-right hover:text-accent transition-colors">
          Return ↑
        </a>
      </div>
    </footer>
  );
}
