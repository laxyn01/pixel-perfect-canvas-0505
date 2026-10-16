import { useState } from "react";
import { CheckCircle2, Loader2, MapPin, Search } from "lucide-react";
import { checkArea } from "@/data/content";
import { SERVICES } from "@/data/services";
import { btn, CallButton, QuoteLink } from "./primitives";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "done";

function useSubmit() {
  const [status, setStatus] = useState<Status>("idle");
  const fire = () => {
    setStatus("loading");
    // TODO: connect to email/SMS service.
    setTimeout(() => setStatus("done"), 1000);
  };
  return { status, fire };
}

function Success({ text }: { text: string }) {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-8 text-center">
      <CheckCircle2 className="h-12 w-12 text-primary" aria-hidden />
      <p className="font-display text-3xl uppercase">Thanks!</p>
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}

const validPhone = (p: string) => p.replace(/\D/g, "").length >= 10;

export function QuickQuote({ className }: { className?: string }) {
  const { status, fire } = useSubmit();
  const [err, setErr] = useState<Partial<Record<"name" | "phone" | "email" | "location", string>>>({});
  if (status === "done") return <div className={cn("surface p-6", className)}><Success text="We'll call you back shortly." /></div>;
  return (
    <form
      noValidate
      className={cn("surface grid gap-3 p-5 md:p-6", className)}
      onSubmit={(e) => {
        e.preventDefault();
        const d = Object.fromEntries(new FormData(e.currentTarget)) as Partial<Record<"name" | "phone" | "email" | "location", string>>;
        const x: Partial<Record<"name" | "phone" | "email" | "location", string>> = {};
        if (!(d.name ?? "").trim()) x.name = "Enter your name.";
        if (!validPhone(d.phone ?? "")) x.phone = "Enter a valid phone.";
        setErr(x);
        if (!Object.keys(x).length) fire();
      }}
    >
      <p className="font-display text-2xl uppercase">Quick free quote</p>
      <label className="sr-only" htmlFor="qq-name">Name</label>
      <input id="qq-name" name="name" placeholder="Name" className="field" autoComplete="name" aria-invalid={!!err.name} />
      {err.name && <span className="text-sm text-destructive">{err.name}</span>}
      <label className="sr-only" htmlFor="qq-phone">Phone</label>
      <input id="qq-phone" name="phone" type="tel" placeholder="Phone" className="field" autoComplete="tel" aria-invalid={!!err.phone} />
      {err.phone && <span className="text-sm text-destructive">{err.phone}</span>}
      <label className="sr-only" htmlFor="qq-service">Service</label>
      <select id="qq-service" name="service" className="field">
        {SERVICES.map((s) => <option key={s.slug}>{s.name}</option>)}
      </select>
      <button disabled={status === "loading"} className={btn.primary}>
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Get my free quote
      </button>
    </form>
  );
}

export function AreaChecker() {
  const [q, setQ] = useState("");
  const [res, setRes] = useState<ReturnType<typeof checkArea>>(null);
  return (
    <div className="surface p-6 md:p-10">
      <MapPin className="h-8 w-8 text-primary" aria-hidden />
      <h2 className="mt-4 text-4xl md:text-5xl">Do we serve your area?</h2>
      <form
        className="mt-6 flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => { e.preventDefault(); setRes(checkArea(q)); }}
      >
        <label htmlFor="area-q" className="sr-only">Town or ZIP</label>
        <input id="area-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Enter town or ZIP" className="field" />
        <button className={cn(btn.primary, "shrink-0")}><Search className="h-4 w-4" aria-hidden /> Check</button>
      </form>
      <div aria-live="polite" className="mt-5">
        {res && (
          <div className="rounded-lg border border-primary/50 p-4">
            <p className="font-semibold">Yes! We serve {res.name}.</p>
            <div className="mt-3 flex flex-wrap gap-3"><CallButton label="Call Now" /><QuoteLink /></div>
          </div>
        )}
        {res === false && (
          <div className="rounded-lg border border-border p-4">
            <p className="font-semibold">Call us to confirm, we may still be able to help.</p>
            <div className="mt-3"><CallButton /></div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ContactForm() {
  const { status, fire } = useSubmit();
  const [err, setErr] = useState<Partial<Record<"name" | "phone" | "email" | "location", string>>>({});
  if (status === "done") return <div className="surface p-8"><Success text="Your request is in. We'll reach out within one business day." /></div>;
  const f = (name: string, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className="grid gap-1.5 text-sm font-medium">
      {label}
      <input name={name} className="field" aria-invalid={!!err[name as "name"]} {...props} />
      {err[name as "name"] && <span className="font-normal text-destructive">{err[name as "name"]}</span>}
    </label>
  );
  return (
    <form
      noValidate
      className="surface grid gap-4 p-6 md:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        const d = Object.fromEntries(new FormData(e.currentTarget)) as Partial<Record<"name" | "phone" | "email" | "location", string>>;
        const x: Partial<Record<"name" | "phone" | "email" | "location", string>> = {};
        if (!(d.name ?? "").trim()) x.name = "Enter your name.";
        if (!validPhone(d.phone ?? "")) x.phone = "Enter a valid phone number.";
        if (d.email && !/^\S+@\S+\.\S+$/.test(d.email)) x.email = "Enter a valid email.";
        if (!(d.location ?? "").trim()) x.location = "Enter your city or ZIP.";
        setErr(x);
        if (!Object.keys(x).length) fire();
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {f("name", "Name *", { autoComplete: "name" })}
        {f("phone", "Phone *", { type: "tel", autoComplete: "tel" })}
        {f("email", "Email", { type: "email", autoComplete: "email" })}
        {f("location", "City / ZIP *")}
      </div>
      <label className="grid gap-1.5 text-sm font-medium">Service
        <select name="service" className="field">{SERVICES.map((s) => <option key={s.slug}>{s.name}</option>)}<option>Not sure</option></select>
      </label>
      <label className="grid gap-1.5 text-sm font-medium">Message
        <textarea name="message" rows={4} className="field" placeholder="Tell us about the project" />
      </label>
      <label className="grid gap-1.5 text-sm font-medium">Photo (optional)
        <input name="photo" type="file" accept="image/*" className="field file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-1 file:text-foreground" />
      </label>
      <button disabled={status === "loading"} className={btn.primary}>
        {status === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : "Send my free quote request"}
      </button>
    </form>
  );
}
