import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/primitives";
import { CtaBand, ReviewsSection } from "@/components/site/sections";
import { SITE } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/reviews")({
  head: () => ({ meta: seo(`Reviews | ${SITE.name} Asphalt Paving`, `Read what customers say about ${SITE.name}, asphalt paving in ${SITE.city}.`) }),
  component: () => (
    <>
      <PageHero eyebrow="Reviews" title="Customer reviews" text="Real feedback from local customers." />
      <section className="container-x pb-10"><ReviewsSection /></section>
      <CtaBand />
    </>
  ),
});
