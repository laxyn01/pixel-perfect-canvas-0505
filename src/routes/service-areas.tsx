import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { Item, PageHero, Reveal } from "@/components/site/primitives";
import { CtaBand } from "@/components/site/sections";
import { AREAS } from "@/data/content";
import { IMAGES } from "@/data/images";
import { SITE } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/service-areas")({
  head: () => ({ meta: seo(`Service Areas | Asphalt Paving ${SITE.city}`, `Asphalt paving in ${SITE.city}, ${AREAS.map((a) => a.name).join(", ")}. Free estimates.`) }),
  component: () => (
    <>
      <PageHero eyebrow="Service areas" title={`${SITE.city} & surrounding towns`} text={`We pave, seal and repair asphalt across ${SITE.city} and these nearby communities.`} image={IMAGES.gallery.rural} />
      <section className="container-x pb-10">
        <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((a) => (
            <Item key={a.name}>
              <article id={a.name.toLowerCase().replace(/\s/g, "-")} className="surface scroll-mt-40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary">
                <MapPin className="h-7 w-7 text-primary" aria-hidden />
                <h2 className="mt-5 text-3xl">Asphalt paving services in {a.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">Driveways, lots, sealcoating and repairs. ZIP {a.zips.join(", ")}.</p>
                <div className="mt-5 flex gap-4 text-sm font-semibold">
                  <a href={SITE.phoneHref} className="inline-flex min-h-12 items-center gap-2 hover:text-primary"><Phone className="h-4 w-4" /> Call</a>
                  <Link to="/contact" className="inline-flex min-h-12 items-center text-primary">Free quote →</Link>
                </div>
              </article>
            </Item>
          ))}
        </Reveal>
      </section>
      <CtaBand />
    </>
  ),
});
