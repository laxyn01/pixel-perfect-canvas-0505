import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { AreaChecker, ContactForm } from "@/components/site/forms";
import { ImageReveal, Item, Reveal } from "@/components/site/primitives";
import { IMAGES } from "@/data/images";
import { CITY_STATE, SITE } from "@/data/site";
import { ldScript, localBusinessLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: seo(`Free Quote | Asphalt Paving ${SITE.city}`, `Request a free asphalt paving quote in ${SITE.city}. Call ${SITE.phone} or send the form. Fast response.`),
    scripts: [ldScript(localBusinessLd)],
  }),
  component: () => (
    <>
      <section className="container-x grid gap-12 pb-20 pt-36 md:pt-52 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <Item><p className="eyebrow mb-5">Contact</p></Item>
          <Item><h1 className="text-5xl md:text-8xl">Get your free quote</h1></Item>
          <Item><p className="mt-6 text-lg text-muted-foreground">Tell us about your project. We'll call you back fast.</p></Item>
          <Item className="mt-8 grid gap-4">
            <a href={SITE.phoneHref} className="flex min-h-12 items-center gap-3 text-xl font-semibold hover:text-primary"><Phone className="h-5 w-5 text-primary" /> {SITE.phone}</a>
            <a href={`mailto:${SITE.email}`} className="flex min-h-12 items-center gap-3 hover:text-primary"><Mail className="h-5 w-5 text-primary" /> {SITE.email}</a>
            <p className="flex items-center gap-3 text-muted-foreground"><MapPin className="h-5 w-5 text-primary" /> Serving {CITY_STATE} and nearby</p>
          </Item>
          <Item className="mt-10 hidden lg:block"><ImageReveal src={IMAGES.contact} alt="Asphalt driveway at night" className="aspect-[4/3]" /></Item>
        </Reveal>
        <ContactForm />
      </section>
      <section className="container-x pb-24"><AreaChecker /></section>
    </>
  ),
});
