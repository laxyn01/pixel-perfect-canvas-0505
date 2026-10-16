import { createFileRoute } from "@tanstack/react-router";
import { Handshake, Ruler, ShieldCheck, Sparkles } from "lucide-react";
import { ImageReveal, Item, PageHero, Reveal, SectionHead } from "@/components/site/primitives";
import { CtaBand } from "@/components/site/sections";
import { IMAGES } from "@/data/images";
import { SITE } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: seo(`About ${SITE.name} | Asphalt Paving ${SITE.city}`, `${SITE.name} is a local asphalt paving company serving ${SITE.city}. Honest quotes, solid work, clean job sites.`) }),
  component: () => (
    <>
      <PageHero eyebrow="About" title="Local crew. Honest work." text={`We're a ${SITE.city} asphalt paving company that does it right the first time.`} image={IMAGES.about} />
      <section className="section-y container-x grid gap-12 md:grid-cols-2 md:items-center">
        <ImageReveal src={IMAGES.about} alt="Work truck and paving tools on a residential street" className="aspect-[4/3]" />
        <Reveal className="space-y-5 text-lg text-muted-foreground">
          <Item><h2 className="text-4xl text-foreground md:text-6xl">Our story</h2></Item>
          <Item><p>We started {SITE.name} to give {SITE.city} homeowners and businesses a paving company they can count on. One that answers the phone, shows up on time and explains the work in plain words.</p></Item>
          <Item><p>We focus on the parts you can't see: digging out, building a solid base and getting drainage right. That's what makes asphalt last.</p></Item>
          <Item><p>[PLACEHOLDER: add the owner's real story, years in business and license details here.]</p></Item>
        </Reveal>
      </section>
      <section className="section-y border-t border-border container-x">
        <SectionHead eyebrow="Values" title="What we stand for" />
        <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: Handshake, t: "Honesty", d: "Real advice, even when it means a smaller job." },
            { i: Ruler, t: "Craft", d: "Proper base, correct slope, clean edges." },
            { i: ShieldCheck, t: "Reliability", d: "We show up and do what we said." },
            { i: Sparkles, t: "Respect", d: "Your property is left cleaner than we found it." },
          ].map(({ i: I, t, d }) => (
            <Item key={t} className="group surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary">
              <I className="h-8 w-8 text-primary transition-transform group-hover:-translate-y-1" aria-hidden />
              <h3 className="mt-6 text-3xl">{t}</h3><p className="mt-2 text-muted-foreground">{d}</p>
            </Item>
          ))}
        </Reveal>
      </section>
      <CtaBand />
    </>
  ),
});
