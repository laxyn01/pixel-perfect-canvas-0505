import { IMAGES } from "./images";
import { SITE } from "./site";

export const AREAS = [
  { name: "Dublin", zips: ["43016", "43017"] },
  { name: "Westerville", zips: ["43081", "43082"] },
  { name: "Hilliard", zips: ["43026"] },
  { name: "Grove City", zips: ["43123"] },
  { name: "Gahanna", zips: ["43230"] },
  { name: "Worthington", zips: ["43085"] },
];
export const MAIN_AREA = { name: SITE.city, zips: ["43215", "43201", "43202", "43206", "43214"] };

export function checkArea(input: string) {
  const q = input.trim().toLowerCase();
  if (!q) return null;
  const all = [MAIN_AREA, ...AREAS];
  return all.find((a) => a.name.toLowerCase() === q || a.zips.includes(q)) ?? false;
}

export const FAQS = [
  { q: "How much does a new asphalt driveway cost?", a: "It depends on size, base condition, access and thickness. Contact us for exact pricing. Estimates are free." },
  { q: "How long does asphalt paving take?", a: "Most residential driveways are paved in one to two days, plus prep. We'll give you a timeline with your quote." },
  { q: "How soon can I drive on new asphalt?", a: "Usually after a few days. Heat and sun affect curing, so we'll tell you exact timing for your job." },
  { q: "Should I repair or replace my driveway?", a: "If the base is sound, repairs or an overlay may be enough. If it's sinking or broken everywhere, replacement is usually smarter. We'll be straight with you." },
  { q: "How often should asphalt be sealcoated?", a: "Typically every few years, depending on traffic and sun exposure. We'll recommend a schedule for your surface." },
  { q: "What time of year do you pave?", a: "Asphalt needs warm, dry conditions. We pave through the warmer months and can schedule estimates year-round." },
  { q: "Do you handle commercial lots?", a: "Yes. We pave, resurface, repair and stripe small and mid-size lots, and can work around your business hours." },
  { q: "Do I need to be home during the work?", a: "Not usually. We'll confirm access, move-car timing and walk through the finished job with you." },
];

export type Project = { id: number; title: string; service: string; image: string; date: string };
export const PROJECTS: Project[] = [
  { id: 1, title: "Residential driveway", service: "driveway-paving", image: IMAGES.services.driveway, date: "2026-09-20" },
  { id: 2, title: "Business lot striping", service: "parking-lot-paving", image: IMAGES.services.parking, date: "2026-09-02" },
  { id: 3, title: "Driveway sealcoat", service: "sealcoating", image: IMAGES.services.sealcoat, date: "2026-08-18" },
  { id: 4, title: "Pothole patch", service: "asphalt-repair", image: IMAGES.services.repair, date: "2026-08-05" },
  { id: 5, title: "Stone base prep", service: "grading-and-base", image: IMAGES.services.grading, date: "2026-07-22" },
  { id: 6, title: "Crack fill", service: "crack-sealing", image: IMAGES.services.crack, date: "2026-07-10" },
  { id: 7, title: "Long rural driveway", service: "driveway-paving", image: IMAGES.gallery.rural, date: "2026-06-28" },
  { id: 8, title: "Sealed driveway, aerial", service: "sealcoating", image: IMAGES.gallery.aerial, date: "2026-06-12" },
  { id: 9, title: "Hot-mix laydown", service: "driveway-paving", image: IMAGES.gallery.paver, date: "2026-05-30" },
];

export type Review = { name: string; source: "google" | "facebook"; time: string; rating: number; text: string; photo?: string };
// Paste real reviews here. While empty, clearly-labeled placeholder cards render.
export const REVIEWS: Review[] = [];
