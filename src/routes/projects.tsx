import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/site/primitives";
import { CtaBand, GalleryTile, Lightbox } from "@/components/site/sections";
import { PROJECTS } from "@/data/content";
import { IMAGES } from "@/data/images";
import { SERVICES } from "@/data/services";
import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: seo(`Asphalt Paving Projects ${SITE.city} | ${SITE.name}`, `Sample asphalt paving, sealcoating and repair projects showing the work we do around ${SITE.city}.`) }),
  component: Projects,
});

function Projects() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState<"new" | "old">("new");
  const [idx, setIdx] = useState<number | null>(null);
  const list = useMemo(
    () => PROJECTS.filter((p) => filter === "all" || p.service === filter).sort((a, b) => (sort === "new" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date))),
    [filter, sort],
  );
  const chips = [{ slug: "all", name: "All" }, ...SERVICES];
  return (
    <>
      <PageHero eyebrow="Projects" title="Sample projects" text="Example photos of the asphalt work we do. Real job photos will be added before launch." image={IMAGES.gallery.paver} />
      <section className="container-x pb-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by service">
            {chips.map((c) => (
              <button key={c.slug} aria-pressed={filter === c.slug} onClick={() => setFilter(c.slug)} className={cn("min-h-12 rounded-full border px-4 text-sm transition-colors", filter === c.slug ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary")}>{c.name}</button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">Sort
            <select value={sort} onChange={(e) => setSort(e.target.value as "new" | "old")} className="field w-auto"><option value="new">Newest</option><option value="old">Oldest</option></select>
          </label>
        </div>
        <motion.div layout className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35 }}>
                <GalleryTile p={p} onOpen={() => setIdx(i)} className="aspect-square" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && <p className="text-muted-foreground">No sample projects for this service yet.</p>}
        <Lightbox items={list} index={idx} onClose={() => setIdx(null)} onIndex={setIdx} />
      </section>
      <CtaBand />
    </>
  );
}
