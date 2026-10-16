import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/primitives";
import { CtaBand, FaqList } from "@/components/site/sections";
import { FAQS } from "@/data/content";
import { SITE } from "@/data/site";
import { ldScript, seo } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: seo(`Asphalt Paving FAQ | ${SITE.name} ${SITE.city}`, `Answers to common asphalt paving questions: timing, sealcoating, repairs and more in ${SITE.city}.`),
    scripts: [ldScript({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) })],
  }),
  component: () => (
    <>
      <PageHero eyebrow="FAQ" title="Questions, answered" text="Straight answers about asphalt paving. Don't see yours? Just call." />
      <section className="container-x max-w-4xl pb-10"><FaqList items={FAQS} /></section>
      <CtaBand />
    </>
  ),
});
