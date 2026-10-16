import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Facebook, Star, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { REVIEWS, type Project } from "@/data/content";
import { SERVICES, type Service } from "@/data/services";
import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";
import { QuickQuote } from "./forms";
import { btn, CallButton, Item, Reveal, SectionHead } from "./primitives";

export function Marquee() {
  const names = [...SERVICES, ...SERVICES].map((s) => s.name);
  return (
    <div className="overflow-hidden border-y border-border py-6" aria-hidden>
      <div className="animate-marquee flex w-max gap-12">
        {[...names, ...names].map((n, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-3xl font-bold uppercase text-muted-foreground/60 md:text-5xl">
            {n} <span className="text-primary">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function ServiceCard({ s }: { s: Service }) {
  return (
    <Item>
      <Link to="/services/$slug" params={{ slug: s.slug }} className="group surface block h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary">
        <div className="aspect-[4/3] overflow-hidden">
          <img src={s.image} alt={`${s.name} in ${SITE.city}`} loading="lazy" width={1200} height={912} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-3xl">{s.name}</h3>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
        </div>
      </Link>
    </Item>
  );
}

export function ServiceGrid({ items = SERVICES }: { items?: Service[] }) {
  return (
    <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => <ServiceCard key={s.slug} s={s} />)}
    </Reveal>
  );
}

export function Lightbox({ items, index, onClose, onIndex }: { items: Project[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  useEffect(() => {
    if (index === null) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % items.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [index, items.length, onClose, onIndex]);
  return (
    <AnimatePresence>
      {index !== null && items[index] && (
        <motion.div role="dialog" aria-modal="true" aria-label="Image viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center bg-overlay p-4 backdrop-blur" onClick={onClose}>
          <motion.figure key={index} initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={items[index].image} alt={items[index].title} className="max-h-[78vh] w-full rounded-xl object-contain" />
            <figcaption className="mt-3 text-sm text-muted-foreground">Sample project · {items[index].title}</figcaption>
          </motion.figure>
          <button aria-label="Close" onClick={onClose} className="absolute right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card"><X className="h-5 w-5" /></button>
          <button aria-label="Previous" onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + items.length) % items.length); }} className="absolute left-3 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card"><ChevronLeft className="h-5 w-5" /></button>
          <button aria-label="Next" onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % items.length); }} className="absolute right-3 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card"><ChevronRight className="h-5 w-5" /></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function GalleryTile({ p, onOpen, className }: { p: Project; onOpen: () => void; className?: string }) {
  return (
    <button onClick={onOpen} className={cn("group relative block w-full overflow-hidden rounded-xl border border-border", className)} aria-label={`View sample project: ${p.title}`}>
      <img src={p.image} alt={`Sample ${SITE.tradeLower} project: ${p.title}`} loading="lazy" width={1200} height={912} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/90 via-background/10 to-transparent p-4 text-left opacity-90 transition-opacity group-hover:opacity-100">
        <span className="eyebrow">Sample project</span>
        <span className="font-display text-xl font-bold uppercase">{p.title}</span>
      </span>
    </button>
  );
}

export function Process({ steps }: { steps: { title: string; text: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div ref={ref} className="relative">
      <div className="absolute left-6 top-0 h-full w-px bg-border md:left-0 md:top-6 md:h-px md:w-full" aria-hidden />
      <motion.div style={{ scaleY: scale }} className="absolute left-6 top-0 h-full w-px origin-top bg-primary md:hidden" aria-hidden />
      <motion.div style={{ scaleX: scale }} className="absolute left-0 top-6 hidden h-px w-full origin-left bg-primary md:block" aria-hidden />
      <Reveal as="ul" className={cn("relative grid gap-10", steps.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3")}>
        {steps.map((s, i) => (
          <Item key={s.title} className="flex gap-5 md:block">
            <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary bg-background font-display text-xl font-bold text-primary">{i + 1}</span>
            <div className="md:mt-6">
              <h3 className="text-3xl">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </div>
          </Item>
        ))}
      </Reveal>
    </div>
  );
}

function GoogleIcon() {
  return <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[11px] font-bold text-background" aria-label="Google">G</span>;
}

export function ReviewsSection() {
  const [tab, setTab] = useState("all");
  const [paused, setPaused] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const real = REVIEWS.length > 0;
  const list = real ? REVIEWS.filter((r) => tab === "all" || r.source === tab) : Array.from({ length: 6 }, (_, i) => ({ source: (i % 3 === 2 ? "facebook" : "google") as "google" | "facebook", i })).filter((r) => tab === "all" || r.source === tab);
  const avg = real ? (REVIEWS.reduce((a, r) => a + r.rating, 0) / REVIEWS.length).toFixed(1) : null;

  const scrollBy = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (dir > 0 && el.scrollLeft >= max - 4) el.scrollTo({ left: 0, behavior: "smooth" });
    else el.scrollBy({ left: dir * 340, behavior: "smooth" });
  };
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => scrollBy(1), 4000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div>
      <div className="surface flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <h2 className="text-4xl md:text-5xl">What customers say</h2>
          {avg ? (
            <p className="mt-2 flex items-center gap-2 text-lg"><strong>{avg}</strong><span className="flex text-primary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</span><span className="text-muted-foreground">({REVIEWS.length})</span></p>
          ) : (
            <p className="mt-2 text-muted-foreground">Rating appears here</p>
          )}
        </div>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="h-12 bg-background">
            <TabsTrigger value="all" className="h-10 px-4 data-[state=active]:bg-card">All reviews</TabsTrigger>
            <TabsTrigger value="google" className="h-10 px-4 data-[state=active]:bg-card">Google</TabsTrigger>
            <TabsTrigger value="facebook" className="h-10 px-4 data-[state=active]:bg-card">Facebook</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="relative mt-6" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={() => setPaused(true)}>
        <div ref={scroller} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none]">
          {real
            ? (list as typeof REVIEWS).map((r, i) => <RealCard key={i} r={r} />)
            : (list as { source: "google" | "facebook"; i: number }[]).map((r) => <PlaceholderCard key={r.i} source={r.source} />)}
          {list.length === 0 && <p className="text-muted-foreground">No reviews from this source yet.</p>}
        </div>
        <button aria-label="Next reviews" onClick={() => scrollBy(1)} className="absolute -right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card hover:border-primary md:inline-flex">
          <ChevronRight className="h-5 w-5" />
        </button>
        <button aria-label="Previous reviews" onClick={() => scrollBy(-1)} className="absolute -left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card hover:border-primary md:inline-flex">
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>

      {!real && (
        <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">Real Google reviews will be added before launch.</p>
          <a href={SITE.reviewLink} className={btn.outline}>Leave us a review</a>
        </div>
      )}
    </div>
  );
}

function SourceIcon({ s }: { s: "google" | "facebook" }) {
  return s === "google" ? <GoogleIcon /> : <Facebook className="h-5 w-5 text-muted-foreground" aria-label="Facebook" />;
}

function PlaceholderCard({ source }: { source: "google" | "facebook" }) {
  return (
    <article className="surface w-[85%] shrink-0 snap-start p-5 sm:w-80">
      <div className="flex items-center gap-3">
        <span className="h-10 w-10 rounded-full bg-muted" aria-hidden />
        <div className="flex-1 space-y-2">
          <span className="block h-3 w-24 rounded bg-muted-foreground/40 blur-[2px]" aria-hidden />
          <span className="block h-2 w-14 rounded bg-muted" aria-hidden />
        </div>
        <SourceIcon s={source} />
      </div>
      <div className="mt-4 flex gap-0.5 text-muted-foreground/50" aria-hidden>{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" />)}</div>
      <p className="mt-3 text-sm text-muted-foreground">Your customer's real review will appear here.</p>
      <span className="mt-4 inline-block rounded-full border border-border px-2.5 py-1 text-[11px] uppercase tracking-wider text-muted-foreground">Sample layout</span>
    </article>
  );
}

function RealCard({ r }: { r: (typeof REVIEWS)[number] }) {
  const [more, setMore] = useState(false);
  return (
    <article className="surface flex w-[85%] shrink-0 snap-start gap-4 p-5 sm:w-96">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-semibold">{r.name[0]}</span>
          <div className="flex-1"><p className="font-semibold">{r.name}</p><p className="text-xs text-muted-foreground">{r.time}</p></div>
          <SourceIcon s={r.source} />
        </div>
        <div className="mt-3 flex text-primary">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
        <p className={cn("mt-2 text-sm text-muted-foreground", !more && "line-clamp-4")}>{r.text}</p>
        <button onClick={() => setMore(!more)} className="mt-1 text-sm text-primary">{more ? "Show less" : "Read more"}</button>
      </div>
      {r.photo && <img src={r.photo} alt="" className="h-20 w-20 rounded-lg object-cover" loading="lazy" />}
    </article>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion type="single" collapsible className="grid gap-3">
      {items.map((f, i) => (
        <AccordionItem key={i} value={`f${i}`} className="surface border px-5 md:px-6">
          <AccordionTrigger className="min-h-14 text-left text-base font-semibold hover:no-underline [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-primary">{f.q}</AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function CtaBand() {
  return (
    <section className="section-y">
      <div className="container-x">
        <Reveal className="surface grid items-center gap-10 p-8 md:grid-cols-2 md:p-14">
          <div>
            <Item><p className="eyebrow mb-4">Free estimates</p></Item>
            <Item><h2 className="text-5xl md:text-7xl">Get your free quote</h2></Item>
            <Item><p className="mt-4 text-muted-foreground">Tell us about your driveway or lot. We'll get back to you fast with a clear, written estimate.</p></Item>
            <Item className="mt-6"><CallButton /></Item>
          </div>
          <Item><QuickQuote /></Item>
        </Reveal>
      </div>
    </section>
  );
}

export { SectionHead };
