import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/primitives";
import { CtaBand, ServiceGrid } from "@/components/site/sections";
import { IMAGES } from "@/data/images";
import { SITE } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  head: () => ({ meta: seo(`Asphalt Paving Services ${SITE.city} | ${SITE.name}`, `Driveways, parking lots, sealcoating, repairs, crack sealing and base work in ${SITE.city}. Free estimates.`) }),
  component: () => (
    <>
      <PageHero eyebrow="Services" title="Asphalt paving services" text={`Everything your asphalt needs, from base to finish, across ${SITE.city} and nearby towns.`} image={IMAGES.services.driveway} />
      <section className="container-x pb-10"><ServiceGrid /></section>
      <CtaBand />
    </>
  ),
});
