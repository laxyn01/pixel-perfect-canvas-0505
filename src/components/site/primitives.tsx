import { Link } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SITE } from "@/data/site";
import { useEstimate } from "./estimate";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5";
export const btn = {
  primary: cn(base, "bg-primary text-primary-foreground hover:glow"),
  outline: cn(base, "border border-border bg-transparent text-foreground hover:border-primary"),
  ghost: cn(base, "text-foreground hover:text-primary"),
};

export function Arrow() {
  return <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />;
}

export function CallButton({ className, label }: { className?: string; label?: string }) {
  return (
    <a href={SITE.phoneHref} className={cn(btn.outline, className)}>
      <Phone className="h-4 w-4" aria-hidden /> {label ?? SITE.phone}
    </a>
  );
}

export function QuoteLink({ className, label = "Free Quote" }: { className?: string; label?: string }) {
  return (
    <Link to="/contact" className={cn(btn.primary, className)}>
      {label} <Arrow />
    </Link>
  );
}

export function EstimateButton({ className, label = "Book Free Estimate" }: { className?: string; label?: string }) {
  const { open } = useEstimate();
  return (
    <button type="button" onClick={open} className={cn(btn.primary, className)}>
      {label} <Arrow />
    </button>
  );
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
export const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

export function Reveal({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" | "ul" }) {
  const C = motion[as];
  return (
    <C className={className} variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
      {children}
    </C>
  );
}
export function Item({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

export function ImageReveal({ src, alt, className, eager }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return (
    <motion.div
      className={cn("overflow-hidden rounded-xl", className)}
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} width={1200} height={912} className="h-full w-full object-cover" />
    </motion.div>
  );
}

export function SectionHead({ eyebrow, title, text, center }: { eyebrow?: string; title: ReactNode; text?: string; center?: boolean }) {
  return (
    <Reveal className={cn("mb-12 max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <Item><p className="eyebrow mb-4">{eyebrow}</p></Item>}
      <Item><h2 className="text-4xl md:text-6xl">{title}</h2></Item>
      {text && <Item><p className="mt-5 text-lg text-muted-foreground">{text}</p></Item>}
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text: string; image?: string }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-52 md:pb-28">
      {image && (
        <>
          <img src={image} alt="" aria-hidden className="animate-kenburns absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </>
      )}
      <Reveal className="container-x relative">
        <Item><p className="eyebrow mb-5">{eyebrow}</p></Item>
        <Item><h1 className="max-w-4xl text-5xl md:text-8xl">{title}</h1></Item>
        <Item><p className="mt-6 max-w-xl text-lg text-muted-foreground">{text}</p></Item>
        <Item className="mt-8 flex flex-wrap gap-3">
          <QuoteLink label="Get Free Quote" />
          <CallButton />
        </Item>
      </Reveal>
    </section>
  );
}
