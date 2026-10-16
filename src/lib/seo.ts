import { SITE } from "@/data/site";

export function seo(title: string, description: string) {
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
}

export const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: SITE.name,
  telephone: SITE.phone,
  email: SITE.email,
  url: SITE.url,
  address: { "@type": "PostalAddress", addressLocality: SITE.city, addressRegion: SITE.state, addressCountry: "US" },
  areaServed: SITE.city,
};

export const ldScript = (data: object) => ({ type: "application/ld+json", children: JSON.stringify(data) });
