import { createContext, useContext, useState, type ReactNode } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SERVICES } from "@/data/services";

const Ctx = createContext<{ open: () => void }>({ open: () => {} });
export const useEstimate = () => useContext(Ctx);

export function EstimateProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [err, setErr] = useState<Record<string, string>>({});

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const errors: Record<string, string> = {};
    if (!d.name?.trim()) errors.name = "Please enter your name.";
    if ((d.phone ?? "").replace(/\D/g, "").length < 10) errors.phone = "Enter a valid phone number.";
    setErr(errors);
    if (Object.keys(errors).length) return;
    setState("loading");
    // TODO: connect to email/SMS service.
    setTimeout(() => setState("done"), 900);
  }

  return (
    <Ctx.Provider value={{ open: () => { setState("idle"); setErr({}); setOpen(true); } }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="border-border bg-card sm:max-w-md">
          {state === "done" ? (
            <div className="py-6 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-primary" aria-hidden />
              <DialogTitle className="mt-4 text-3xl">Request received</DialogTitle>
              <DialogDescription className="mt-2">We'll call you to confirm your estimate time.</DialogDescription>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl">Book a free estimate</DialogTitle>
                <DialogDescription>Pick a time that works. We'll confirm by phone.</DialogDescription>
              </DialogHeader>
              <form onSubmit={submit} noValidate className="grid gap-3">
                <label className="grid gap-1 text-sm">Name<input name="name" className="field" autoComplete="name" aria-invalid={!!err.name} />{err.name && <span className="text-destructive">{err.name}</span>}</label>
                <label className="grid gap-1 text-sm">Phone<input name="phone" type="tel" className="field" autoComplete="tel" aria-invalid={!!err.phone} />{err.phone && <span className="text-destructive">{err.phone}</span>}</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="grid gap-1 text-sm">Preferred day
                    <select name="day" className="field">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <option key={d}>{d}</option>)}</select>
                  </label>
                  <label className="grid gap-1 text-sm">Time
                    <select name="time" className="field"><option>Morning</option><option>Afternoon</option><option>Evening</option></select>
                  </label>
                </div>
                <label className="grid gap-1 text-sm">Service
                  <select name="service" className="field">{SERVICES.map((s) => <option key={s.slug}>{s.name}</option>)}</select>
                </label>
                <button disabled={state === "loading"} className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary font-semibold text-primary-foreground">
                  {state === "loading" && <Loader2 className="h-4 w-4 animate-spin" />} Request estimate
                </button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}
