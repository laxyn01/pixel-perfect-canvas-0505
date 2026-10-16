import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AREAS } from "@/data/content";
import { SERVICES } from "@/data/services";
import { SHOW_PREVIEW_RIBBON, SITE } from "@/data/site";
import { cn } from "@/lib/utils";
import { btn, CallButton, QuoteLink } from "./primitives";

const NAV = [
  { to: "/reviews", label: "Reviews" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

function NavDrop({ label, to, items }: { label: string; to: string; items: { label: string; href: string }[] }) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="nav-underline inline-flex items-center gap-1 py-2 text-sm text-muted-foreground hover:text-foreground">
        {label} <ChevronDown className="h-3.5 w-3.5" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 border-border bg-card">
        <DropdownMenuItem asChild><a href={to} className="font-semibold">All {label.toLowerCase()}</a></DropdownMenuItem>
        {items.map((i) => (
          <DropdownMenuItem key={i.href} asChild><a href={i.href}>{i.label}</a></DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useLocation({ select: (l) => l.pathname });
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));
  useEffect(() => setOpen(false), [path]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-40 transition-all duration-300", scrolled ? "border-b border-border bg-background/80 backdrop-blur-xl" : "bg-transparent")}>
      <div className={cn("container-x flex items-center justify-between gap-4 transition-all duration-300", scrolled ? "py-3" : "py-5")}>
        <Link to="/" className="min-w-0">
          <span className="block font-display text-2xl font-bold uppercase leading-none md:text-3xl">{SITE.name}</span>
          <span className="mt-1 hidden text-xs text-muted-foreground sm:block">Proudly serving {SITE.city} and surrounding areas</span>
        </Link>
        <div className="hidden items-center gap-3 lg:flex">
          <CallButton />
          <QuoteLink />
        </div>
        <button className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-border lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <nav aria-label="Main" className={cn("hidden justify-center gap-8 border-t border-border/60 transition-all lg:flex", scrolled ? "py-2" : "py-3")}>
        <Link to="/" className="nav-underline py-2 text-sm text-muted-foreground hover:text-foreground data-[status=active]:text-foreground" activeOptions={{ exact: true }}>Home</Link>
        <NavDrop label="Services" to="/services" items={SERVICES.map((s) => ({ label: s.name, href: `/services/${s.slug}` }))} />
        <NavDrop label="Service Areas" to="/service-areas" items={AREAS.map((a) => ({ label: a.name, href: `/service-areas#${a.name.toLowerCase().replace(/\s/g, "-")}` }))} />
        {NAV.map((n) => (
          <Link key={n.to} to={n.to} className="nav-underline py-2 text-sm text-muted-foreground hover:text-foreground data-[status=active]:text-foreground">{n.label}</Link>
        ))}
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background p-6 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-bold uppercase">{SITE.name}</span>
              <button aria-label="Close menu" className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-border" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            <motion.ul initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.04 } } }} className="mt-10 grid gap-1">
              {[{ to: "/", label: "Home" }, { to: "/services", label: "Services" }, { to: "/service-areas", label: "Service Areas" }, ...NAV].map((n) => (
                <motion.li key={n.to} variants={{ h: { opacity: 0, y: 12 }, s: { opacity: 1, y: 0 } }}>
                  <Link to={n.to} className="block py-2 font-display text-4xl font-bold uppercase hover:text-primary">{n.label}</Link>
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-auto grid gap-3 pt-10"><CallButton /><QuoteLink /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function MobileBar() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 500));
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} transition={{ type: "spring", damping: 26 }} className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-border bg-background/90 p-3 backdrop-blur-xl lg:hidden">
          <a href={SITE.phoneHref} className={btn.outline}><Phone className="h-4 w-4" /> Call Now</a>
          <Link to="/contact" className={btn.primary}>Free Quote</Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Ribbon() {
  if (!SHOW_PREVIEW_RIBBON) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed -left-12 bottom-24 z-50 w-48 -rotate-45 bg-primary py-1 text-center text-[11px] font-bold uppercase tracking-widest text-primary-foreground lg:bottom-8">
      Demo Preview
    </div>
  );
}

export function Intro() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("intro")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    sessionStorage.setItem("intro", "1");
    setShow(true);
    const t = setTimeout(() => setShow(false), 950);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div onClick={() => setShow(false)} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="fixed inset-0 z-[60] flex cursor-pointer items-center justify-center bg-background">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="font-display text-5xl font-bold uppercase md:text-7xl">
            {SITE.name}<span className="text-primary">.</span>
          </motion.span>
          <button className="absolute right-6 top-6 text-sm text-muted-foreground" onClick={() => setShow(false)}>Skip</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border pb-28 pt-16 lg:pb-12">
      <div className="container-x grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-display text-3xl font-bold uppercase">{SITE.name}</p>
          <p className="mt-3 text-sm text-muted-foreground">Local {SITE.tradeLower} for driveways, lots and repairs in {SITE.city} and nearby towns.</p>
          <div className="mt-5 grid gap-2 text-sm">
            <a href={SITE.phoneHref} className="inline-flex items-center gap-2 hover:text-primary"><Phone className="h-4 w-4" /> {SITE.phone}</a>
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 hover:text-primary"><Mail className="h-4 w-4" /> {SITE.email}</a>
          </div>
        </div>
        <div>
          <p className="eyebrow mb-4">Services</p>
          <ul className="grid gap-2 text-sm text-muted-foreground">{SERVICES.map((s) => <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-foreground">{s.name}</Link></li>)}</ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Service areas</p>
          <ul className="grid gap-2 text-sm text-muted-foreground"><li>{SITE.city}</li>{AREAS.map((a) => <li key={a.name}><Link to="/service-areas" className="hover:text-foreground">{a.name}</Link></li>)}</ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Quick links</p>
          <ul className="grid gap-2 text-sm text-muted-foreground">
            {[{ to: "/", label: "Home" }, { to: "/services", label: "Services" }, ...NAV].map((n) => <li key={n.to}><Link to={n.to} className="hover:text-foreground">{n.label}</Link></li>)}
          </ul>
        </div>
      </div>
      <p className="container-x mt-12 text-xs text-muted-foreground">© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
    </footer>
  );
}
