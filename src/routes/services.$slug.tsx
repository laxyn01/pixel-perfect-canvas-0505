import { createFileRoute, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { ImageReveal, Item, PageHero, Reveal, SectionHead } from "@/components/site/primitives";
import { CtaBand, FaqList, GalleryTile, Lightbox, Process, ServiceGrid } from "@/components/site/sections";
import { PROJECTS } from "@/data/content";
import { getService, SERVICES } from "@/data/services";
import { SITE } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? seo(`${loaderData.service.name} ${SITE.city} | ${SITE.name}`, `${loaderData.service.short} Serving ${SITE.city} and nearby. Free estimates.`)
      : [{ title: "Service not found" }, { name: "robots", content: "noindex" }],
  }),
  component: ServicePage,
});

function ServicePage() {
  const { service: s } = Route.useLoaderData();
  const [idx, setIdx] = useState<number | null>(null);
  const gallery = [...PROJECTS.filter((p) => p.service === s.slug), ...PROJECTS.filter((p) => p.service !== s.slug)].slice(0, 3);
  return (
    <>
      <PageHero eyebrow="Service" title={`${s.name} in ${SITE.city}`} text={s.intro} image={s.image} />

      <section className="section-y container-x grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <SectionHead eyebrow="What we do" title={`Our ${s.name.toLowerCase()} work`} />
          <Reveal as="ul" className="grid gap-3">
            {s.what.map((w) => <Item key={w} className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />{w}</Item>)}
          </Reveal>
        </div>
        <ImageReveal src={s.image} alt={`${s.name} work`} className="aspect-[4/3]" />
      </section>

      <section className="section-y border-t border-border container-x">
        <SectionHead eyebrow="Benefits" title="Why it matters" />
        <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {s.benefits.map((b) => (
            <Item key={b.title} className="surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary">
              <h3 className="text-3xl">{b.title}</h3><p className="mt-2 text-muted-foreground">{b.text}</p>
            </Item>
          ))}
        </Reveal>
      </section>

      <section className="section-y border-t border-border container-x">
        <SectionHead eyebrow="Process" title="How the job goes" />
        <Process steps={s.steps} />
      </section>

      <section className="section-y border-t border-border container-x">
        <SectionHead eyebrow="Gallery" title="Sample projects" />
        <Reveal className="grid gap-4 sm:grid-cols-3">
          {gallery.map((p, i) => <Item key={p.id}><GalleryTile p={p} onOpen={() => setIdx(i)} className="aspect-[4/3]" /></Item>)}
        </Reveal>
        <Lightbox items={gallery} index={idx} onClose={() => setIdx(null)} onIndex={setIdx} />
      </section>

      <section className="section-y border-t border-border container-x max-w-4xl">
        <SectionHead eyebrow="FAQ" title={`${s.name} questions`} />
        <FaqList items={s.faqs} />
      </section>

      <section className="section-y border-t border-border container-x">
        <SectionHead eyebrow="Related" title="Other services" />
        <ServiceGrid items={SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3)} />
      </section>

      <CtaBand />
    </>
  );
}
