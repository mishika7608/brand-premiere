import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const state = useRef({ x: 0, y: 0, rx: 0, ry: 0, hover: false });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      state.current.x = e.clientX;
      state.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest("a, button, [role='button'], input, textarea, [data-magnetic]");
      state.current.hover = interactive;
    };
    const onDown = () => ringRef.current?.classList.add("scale-75");
    const onUp = () => ringRef.current?.classList.remove("scale-75");

    let raf = 0;
    const tick = () => {
      state.current.rx += (state.current.x - state.current.rx) * 0.18;
      state.current.ry += (state.current.y - state.current.ry) * 0.18;
      if (ringRef.current) {
        const scale = state.current.hover ? 1.8 : 1;
        ringRef.current.style.transform = `translate3d(${state.current.rx}px, ${state.current.ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 rounded-full bg-cyan lg:block"
        style={{ boxShadow: "0 0 12px var(--cyan)" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden h-8 w-8 rounded-full border border-cyan/50 transition-[transform,border-color] duration-200 ease-out lg:block"
        style={{ boxShadow: "0 0 24px oklch(0.82 0.16 210 / 0.25)" }}
      />
    </>
  );
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: P[] = [];

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((width * height) / 18000));
      particles = new Array(count).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4,
      }));
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const f = (120 - dist) / 120;
          p.x += (dx / dist) * f * 1.2;
          p.y += (dy / dist) * f * 1.2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(147, 197, 253, 0.6)";
        ctx.fill();
      }
      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 120) {
            ctx.strokeStyle = `rgba(129, 140, 248, ${(1 - d / 120) * 0.18})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    if (!reduce) draw();
    else {
      // Draw once statically
      draw();
      cancelAnimationFrame(raf);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
    />
  );
}

export function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: (e.clientX - (r.left + r.width / 2)) * 0.35, y: (e.clientY - (r.top + r.height / 2)) * 0.35 });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  const base =
    "group relative inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium transition-[background,box-shadow,color] duration-300 will-change-transform";
  const variants = {
    primary:
      "text-primary-foreground shadow-[var(--shadow-glow)] hover:shadow-[0_0_60px_oklch(0.68_0.2_255/0.55)]",
    ghost:
      "glass text-foreground hover:border-cyan/60 hover:text-cyan",
  } as const;

  const style = {
    transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
    transition: "transform 0.35s var(--ease-cinema)",
    ...(variant === "primary" ? { backgroundImage: "var(--gradient-brand)", backgroundSize: "200% 200%" } : {}),
  } as React.CSSProperties;

  const props = {
    ref: ref as never,
    "data-magnetic": true,
    onMouseMove: onMove,
    onMouseLeave: reset,
    className: `${base} ${variants[variant]} ${className}`,
    style,
    ...rest,
  };

  if (href) return <a href={href} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>{children}</a>;
  return <button type="button" {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>{children}</button>;
}

export function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - y) * 10, ry: (x - 0.5) * 12, gx: x * 100, gy: y * 100 });
  };
  const reset = () => setT({ rx: 0, ry: 0, gx: 50, gy: 50 });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`group relative rounded-2xl transition-transform duration-500 ease-[var(--ease-cinema)] will-change-transform ${className}`}
      style={{ transform: `perspective(1000px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)` }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${t.gx}% ${t.gy}%, oklch(0.82 0.16 210 / 0.15), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}

export function Counter({ to, suffix = "", duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.disconnect();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export function TypingHeadline({ phrases }: { phrases: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[i % phrases.length];
    const speed = deleting ? 40 : 75;
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next.length === 0) {
          setDeleting(false);
          setI((v) => v + 1);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, i, phrases]);

  return (
    <span className="text-gradient">
      {text}
      <span aria-hidden className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] bg-cyan animate-blink" />
    </span>
  );
}
