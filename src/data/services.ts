import { IMAGES } from "./images";

export type Service = {
  slug: string;
  name: string;
  short: string;
  intro: string;
  image: string;
  what: string[];
  benefits: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "driveway-paving",
    name: "Driveway Paving",
    short: "New asphalt driveways built on a solid, well-drained base.",
    intro: "A new driveway starts below the surface. We dig out, build a compacted stone base, then lay and roll hot asphalt for a smooth, even finish.",
    image: IMAGES.services.driveway,
    what: ["Remove old asphalt, gravel or concrete", "Grade for proper water runoff", "Install and compact stone base", "Lay and roll hot-mix asphalt", "Clean edges and final cleanup"],
    benefits: [
      { title: "Built to drain", text: "Correct slope keeps water off the surface and away from your home." },
      { title: "Smooth finish", text: "Machine-laid and rolled for a clean, even surface." },
      { title: "Clean edges", text: "Neat borders along lawns, walks and garage aprons." },
      { title: "Clear quote", text: "Written estimate before any work begins." },
    ],
    steps: [
      { title: "Free estimate", text: "We measure, check drainage and talk through options." },
      { title: "Prep & base", text: "Excavate, grade and compact a stone base." },
      { title: "Pave & roll", text: "Lay hot asphalt and roll it to a tight finish." },
      { title: "Walkthrough", text: "We review the job with you and clean up." },
    ],
    faqs: [
      { q: "How soon can I drive on a new driveway?", a: "Usually after a few days. We'll give you exact timing for your job and the weather." },
      { q: "Can you pave over my old driveway?", a: "Sometimes. If the base is sound, an overlay can work. We'll tell you honestly after we look." },
      { q: "How much does a new driveway cost?", a: "It depends on size, base condition and access. Contact us for exact pricing." },
    ],
  },
  {
    slug: "parking-lot-paving",
    name: "Parking Lot Paving",
    short: "Paving, resurfacing and striping for small business lots.",
    intro: "We pave and resurface parking lots for local businesses, churches and HOAs, and work around your hours to keep you open.",
    image: IMAGES.services.parking,
    what: ["New lot construction", "Mill and overlay resurfacing", "Line striping and layout", "Drainage corrections", "Phased work to keep lots open"],
    benefits: [
      { title: "Less downtime", text: "We plan phases and timing around your business." },
      { title: "Clear layout", text: "Fresh striping for safe, organized parking." },
      { title: "Fixes drainage", text: "We correct low spots where water pools." },
      { title: "One contact", text: "One crew, one point of contact, start to finish." },
    ],
    steps: [
      { title: "Site visit", text: "We walk the lot and note traffic and drainage." },
      { title: "Plan", text: "Written scope and a schedule that fits your hours." },
      { title: "Pave", text: "Resurface or rebuild, section by section." },
      { title: "Stripe", text: "Lines, stalls and arrows laid out cleanly." },
    ],
    faqs: [
      { q: "Can you work nights or weekends?", a: "Often, yes. Tell us your hours and we'll plan around them." },
      { q: "Do you do striping only?", a: "Yes, we can restripe an existing lot." },
      { q: "What does lot paving cost?", a: "Every lot is different. Contact us for exact pricing." },
    ],
  },
  {
    slug: "sealcoating",
    name: "Sealcoating",
    short: "Protect asphalt from sun, water and oil, and restore its deep black look.",
    intro: "Sealcoating adds a protective layer to your asphalt. It slows wear from sun, water and oil and brings back that fresh black finish.",
    image: IMAGES.services.sealcoat,
    what: ["Surface cleaning and edging", "Oil spot treatment", "Crack filling before sealing", "Even squeegee or spray application", "Area blocked off while curing"],
    benefits: [
      { title: "Longer life", text: "Helps protect the surface from weather and UV." },
      { title: "Like-new look", text: "Restores a rich, uniform black color." },
      { title: "Easy upkeep", text: "Sealed surfaces are easier to sweep and clean." },
      { title: "Fast job", text: "Most driveways are done in a single visit." },
    ],
    steps: [
      { title: "Clean", text: "Blow off debris and treat oil spots." },
      { title: "Fill cracks", text: "Seal cracks so the coating lasts." },
      { title: "Seal", text: "Apply an even coat edge to edge." },
      { title: "Cure", text: "We block it off and tell you when it's ready." },
    ],
    faqs: [
      { q: "How often should I sealcoat?", a: "Typically every few years, depending on traffic and sun. We'll advise after a look." },
      { q: "How long before I can use it?", a: "Usually within a day or two, weather depending." },
      { q: "What does sealcoating cost?", a: "Contact us for exact pricing based on your surface." },
    ],
  },
  {
    slug: "asphalt-repair",
    name: "Asphalt Repair",
    short: "Pothole patching and section repairs that blend in and hold up.",
    intro: "Potholes and broken sections only get worse. We cut out damaged areas, rebuild the base where needed and patch with hot asphalt.",
    image: IMAGES.services.repair,
    what: ["Pothole patching", "Saw-cut section replacement", "Sunken area repair", "Edge repair", "Utility cut patching"],
    benefits: [
      { title: "Stops spreading", text: "Fixes damage before it grows into a bigger job." },
      { title: "Safer surface", text: "Removes trip hazards and tire-eaters." },
      { title: "Cost smart", text: "Repair when you can, replace only when you need to." },
      { title: "Honest advice", text: "We'll tell you if repair is the right call." },
    ],
    steps: [
      { title: "Assess", text: "Find the cause, not just the hole." },
      { title: "Cut out", text: "Remove broken asphalt with clean edges." },
      { title: "Patch", text: "Rebuild base and compact hot asphalt." },
    ],
    faqs: [
      { q: "Do cold patches work?", a: "Short term. Hot asphalt patches with a proper base last much longer." },
      { q: "Can you repair just one area?", a: "Yes. Small repairs are welcome." },
      { q: "How much is a repair?", a: "Contact us for exact pricing after we see the damage." },
    ],
  },
  {
    slug: "crack-sealing",
    name: "Crack Sealing",
    short: "Hot rubberized sealant to keep water out of your pavement.",
    intro: "Water in cracks is what breaks asphalt down. We clean out cracks and fill them with hot rubberized sealant that flexes with the seasons.",
    image: IMAGES.services.crack,
    what: ["Crack cleaning and blow-out", "Hot-pour rubberized sealant", "Routing wider cracks", "Pairs well with sealcoating"],
    benefits: [
      { title: "Keeps water out", text: "Stops freeze-thaw damage at the source." },
      { title: "Flexible seal", text: "Moves with the pavement through hot and cold." },
      { title: "Low cost", text: "One of the cheapest ways to protect asphalt." },
      { title: "Quick", text: "Most jobs take a few hours." },
    ],
    steps: [
      { title: "Clean", text: "Blow out dirt and debris from every crack." },
      { title: "Fill", text: "Apply hot sealant into and over the crack." },
      { title: "Finish", text: "Smooth and let it set." },
    ],
    faqs: [
      { q: "When is the best time for crack sealing?", a: "Dry weather in spring or fall is ideal, but we can advise for your schedule." },
      { q: "Will the cracks be visible?", a: "Sealed cracks show as lines. Sealcoating afterward blends them in." },
      { q: "What does it cost?", a: "Contact us for exact pricing." },
    ],
  },
  {
    slug: "grading-and-base",
    name: "Grading & Base Work",
    short: "Excavation, grading and stone base for driveways and pads.",
    intro: "Most asphalt failures start with a weak base. We excavate, grade and compact stone so your pavement has the foundation it needs.",
    image: IMAGES.services.grading,
    what: ["Excavation and soil removal", "Grading for drainage", "Crushed stone base installation", "Compaction", "Gravel driveways"],
    benefits: [
      { title: "Solid foundation", text: "A compacted base helps prevent sinking and cracking." },
      { title: "Better drainage", text: "Water flows where it should." },
      { title: "Ready to pave", text: "Done right the first time, ready for asphalt." },
      { title: "Own equipment", text: "We bring what the job needs." },
    ],
    steps: [
      { title: "Survey", text: "Check soil, slope and runoff." },
      { title: "Excavate", text: "Remove soft soil and old material." },
      { title: "Build base", text: "Lay and compact crushed stone in lifts." },
    ],
    faqs: [
      { q: "Do I need a new base?", a: "If your current surface is sinking or heaving, probably. We'll check." },
      { q: "Can you do gravel only?", a: "Yes, we can install a gravel driveway." },
      { q: "How is base work priced?", a: "Depends on depth and area. Contact us for exact pricing." },
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
