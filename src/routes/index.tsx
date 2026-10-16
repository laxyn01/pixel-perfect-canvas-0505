import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BadgeCheck, Clock, Hammer, MessageSquare, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useState } from "react";
import { AreaChecker, QuickQuote } from "@/components/site/forms";
import { btn, CallButton, EstimateButton, Item, Reveal, SectionHead } from "@/components/site/primitives";
import { CtaBand, GalleryTile, Lightbox, Marquee, Process, ReviewsSection, ServiceGrid } from "@/components/site/sections";
import { AREAS, PROJECTS } from "@/data/content";
import { IMAGES } from "@/data/images";
import { SERVICES } from "@/data/services";
import { SITE } from "@/data/site";
import { ldScript, localBusinessLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: seo(
      `Asphalt Paving ${SITE.city} | ${SITE.name}`,
      `Asphalt paving in ${SITE.city}, ${SITE.state}: driveways, parking lots, sealcoating and repairs. Free estimates, fast response. Call today.`,
    ),
    scripts: [ldScript(localBusinessLd)],
  }),
  component: Home,
});

const LINES = [`${SITE.city}'s`, "Asphalt Paving", "Experts. Done Right."];

function Home() {
  const [idx, setIdx] = useState<number | null>(null);
  const gallery = PROJECTS.slice(0, 6);
  return (
    <>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-36 md:pb-24">
        <img src={IMAGES.hero} alt={`Freshly paved asphalt driveway in ${SITE.city}`} width={1920} height={1088} fetchPriority="high" className="animate-kenburns absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="container-x relative grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h1 className="text-[3.4rem] leading-[0.9] sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              {LINES.map((l, i) => (
                <span key={l} className="block overflow-hidden">
                  <motion.span className={i === 2 ? "block text-primary" : "block"} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>{l}</motion.span>
                </span>
              ))}
            </h1>
            <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } } }}>
              <motion.p variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }} className="mt-6 max-w-xl text-lg text-muted-foreground">
                Local asphalt paving in {SITE.city} for driveways, parking lots and repairs. Built on a solid base, finished clean, quoted in writing.
              </motion.p>
              <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }} className="mt-8 flex flex-wrap gap-3">
                <CallButton label={`Call ${SITE.phone}`} />
                <EstimateButton />
              </motion.div>
              <motion.ul variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {[{ i: BadgeCheck, t: "Free Estimates" }, { i: Zap, t: "Fast Response" }, { i: Sparkles, t: "Clean Job Sites" }].map(({ i: I, t }) => (
                  <li key={t} className="flex items-center gap-2"><I className="h-4 w-4 text-primary" aria-hidden /> {t}</li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}>
            <QuickQuote />
          </motion.div>
        </div>
      </section>

      <Marquee />

      <section className="section-y container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead eyebrow="Services" title="Asphalt paving services in Columbus" text="From new driveways to quick repairs, one local crew handles it." />
          <Link to="/services" className={`${btn.outline} mb-12`}>All services</Link>
        </div>
        <ServiceGrid items={SERVICES.slice(0, 6)} />
      </section>

      <section className="section-y border-t border-border">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHead eyebrow="Recent work" title="Sample projects" text="Example photos showing the kind of work we do." />
            <Link to="/projects" className={`${btn.outline} mb-12`}>View all projects</Link>
          </div>
          <Reveal className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {gallery.map((p, i) => (
              <Item key={p.id} className={i === 0 ? "col-span-2 row-span-2 md:col-span-2" : ""}>
                <GalleryTile p={p} onOpen={() => setIdx(i)} className={i === 0 ? "aspect-square md:aspect-auto md:h-full" : "aspect-square"} />
              </Item>
            ))}
          </Reveal>
          <Lightbox items={gallery} index={idx} onClose={() => setIdx(null)} onIndex={setIdx} />
        </div>
      </section>

      <section className="section-y container-x">
        <SectionHead eyebrow="Why us" title="Simple. Reliable. Done right." />
        <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: Hammer, t: "Base first", d: "We build the foundation right so the surface lasts." },
            { i: MessageSquare, t: "Straight answers", d: "Clear written quotes. No surprise add-ons." },
            { i: Clock, t: "On schedule", d: "We show up when we say and keep you updated." },
            { i: ShieldCheck, t: "Clean sites", d: "We protect your property and leave it tidy." },
          ].map(({ i: I, t, d }) => (
            <Item key={t} className="group surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary">
              <I className="h-8 w-8 text-primary transition-transform duration-300 group-hover:-translate-y-1" aria-hidden />
              <h3 className="mt-6 text-3xl">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </Item>
          ))}
        </Reveal>
      </section>

      <section className="section-y border-t border-border">
        <div className="container-x">
          <SectionHead eyebrow="How it works" title="Three steps to new asphalt" />
          <Process steps={[
            { title: "Call or request", text: "Tell us about your project. We'll set a time to look." },
            { title: "Free estimate", text: "We measure, explain options and give a written quote." },
            { title: "We pave", text: "Our crew does the work and cleans up after." },
          ]} />
        </div>
      </section>

      <section className="section-y container-x"><AreaChecker /></section>

      <section className="section-y border-t border-border"><div className="container-x"><ReviewsSection /></div></section>

      <section className="section-y container-x">
        <SectionHead eyebrow="Service areas" title={`${SITE.city} & nearby`} />
        <Reveal className="flex flex-wrap gap-3">
          {[SITE.city, ...AREAS.map((a) => a.name)].map((n) => (
            <Item key={n}><Link to="/service-areas" className="inline-flex min-h-12 items-center rounded-full border border-border px-5 font-display text-xl font-bold uppercase transition-colors hover:border-primary hover:text-primary">{n}</Link></Item>
          ))}
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
