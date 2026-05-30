"use client";

import * as React from "react";
import Image from "next/image";
import {
  NotebookPen,
  Layers,
  BookHeart,
  Tag,
  CalendarDays,
  Sparkles,
  ChevronDown,
  Grid2x2,
} from "lucide-react";

type ServiceId =
  | "custom-notes"
  | "custom-flashcards"
  | "custom-storybook"
  | "custom-nametag"
  | "custom-weekly-plan";

type ServiceTheme = {
  accentText: string;
  glow: string;
  iconBg: string;
  iconRing: string;
  iconText: string;
  pillBg: string;
  pillText: string;
  tooltipGradient: string;
  tooltipBorder: string;
  imageGlow: string;
};

type ServiceItem = {
  id: ServiceId;
  title: string;
  icon: React.ElementType;
  tooltipTitle: string;
  tooltipText: string;
  tooltipImage: string;
  badge?: string;
  theme: ServiceTheme;
};

const THEMES: Record<ServiceId, ServiceTheme> = {
  "custom-notes": {
    accentText: "text-rose-700",
    glow: "bg-rose-300/40",
    iconBg: "bg-rose-50",
    iconRing: "ring-rose-200/70",
    iconText: "text-rose-700",
    pillBg: "bg-rose-50",
    pillText: "text-rose-800",
    tooltipGradient: "from-rose-50 via-white to-amber-50",
    tooltipBorder: "border-rose-400/70",
    imageGlow: "shadow-[0_10px_30px_rgba(244,63,94,0.15)]",
  },
  "custom-flashcards": {
    accentText: "text-fuchsia-700",
    glow: "bg-fuchsia-300/40",
    iconBg: "bg-fuchsia-50",
    iconRing: "ring-fuchsia-200/70",
    iconText: "text-fuchsia-700",
    pillBg: "bg-fuchsia-50",
    pillText: "text-fuchsia-800",
    tooltipGradient: "from-fuchsia-50 via-white to-rose-50",
    tooltipBorder: "border-fuchsia-400/70",
    imageGlow: "shadow-[0_10px_30px_rgba(217,70,239,0.15)]",
  },
  "custom-storybook": {
    accentText: "text-amber-800",
    glow: "bg-amber-300/40",
    iconBg: "bg-amber-50",
    iconRing: "ring-amber-200/70",
    iconText: "text-amber-800",
    pillBg: "bg-amber-50",
    pillText: "text-amber-900",
    tooltipGradient: "from-amber-50 via-white to-orange-50",
    tooltipBorder: "border-amber-400/70",
    imageGlow: "shadow-[0_10px_30px_rgba(245,158,11,0.15)]",
  },
  "custom-nametag": {
    accentText: "text-emerald-800",
    glow: "bg-emerald-300/40",
    iconBg: "bg-emerald-50",
    iconRing: "ring-emerald-200/70",
    iconText: "text-emerald-800",
    pillBg: "bg-emerald-50",
    pillText: "text-emerald-900",
    tooltipGradient: "from-emerald-50 via-white to-teal-50",
    tooltipBorder: "border-emerald-400/70",
    imageGlow: "shadow-[0_10px_30px_rgba(16,185,129,0.15)]",
  },
  "custom-weekly-plan": {
    accentText: "text-sky-800",
    glow: "bg-sky-300/40",
    iconBg: "bg-sky-50",
    iconRing: "ring-sky-200/70",
    iconText: "text-sky-800",
    pillBg: "bg-sky-50",
    pillText: "text-sky-900",
    tooltipGradient: "from-sky-50 via-white to-indigo-50",
    tooltipBorder: "border-sky-400/70",
    imageGlow: "shadow-[0_10px_30px_rgba(14,165,233,0.15)]",
  },
};

const SERVICES: ServiceItem[] = [
  {
    id: "custom-notes",
    title: "جزوه سفارشی",
    icon: NotebookPen,
    tooltipTitle: "طراحی جزوه سفارشی",
    tooltipText: "برای هر پایه و درس مورد نظرت جزوه مخصوص خودت را داشته باش",
    tooltipImage: "/assets/categoryToltips/custom-notes.png",
    badge: "Personal Notes",
    theme: THEMES["custom-notes"],
  },
  {
    id: "custom-flashcards",
    title: "فلش‌کارت سفارشی",
    icon: Layers,
    tooltipTitle: "طراحی فلش کارت سفارشی",
    tooltipText: "برای هر موضوع درسی، فلش کارت های متنوع داشته باش",
    tooltipImage: "/assets/categoryToltips/custom-flashcards.jpg",
    badge: "Fun & Smart",
    theme: THEMES["custom-flashcards"],
  },
  {
    id: "custom-storybook",
    title: "کتاب داستان",
    icon: BookHeart,
    tooltipTitle: "طراحی کتاب داستان سفارشی",
    tooltipText: "کتاب داستان مخصوص با کارکتر های انیمیشنی مورد علاقه فرزندتان",
    tooltipImage: "/assets/categoryToltips/custom-storybook.jpg",
    badge: "Kids Story",
    theme: THEMES["custom-storybook"],
  },
  {
    id: "custom-nametag",
    title: "برچسب اسم",
    icon: Tag,
    tooltipTitle: "طراحی برچسب اسم اختصاصی",
    tooltipText: "برچسب اسم دلخواهت را با اطلاعات و عکس خودت طراحی کن",
    tooltipImage: "/assets/categoryToltips/custom-nametag.jpg",
    badge: "Name Label",
    theme: THEMES["custom-nametag"],
  },
  {
    id: "custom-weekly-plan",
    title: "برنامه هفتگی",
    icon: CalendarDays,
    tooltipTitle: "طراحی برنامه هفتگی اختصاصی",
    tooltipText: "برنامه هفتگی دلخواهت را با اطلاعات و عکس خودت طراحی کن",
    tooltipImage: "/assets/categoryToltips/custom-weekly-plan.jpg",
    badge: "Weekly Plan",
    theme: THEMES["custom-weekly-plan"],
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type TooltipPanelProps = {
  item: ServiceItem;
  open: boolean;
  id: string;
};

function TooltipPanel({ item, open, id }: TooltipPanelProps) {
  const t = item.theme;

  return (
    <div
      id={id}
      role="tooltip"
      aria-hidden={!open}
className={cn(
  // base (md..2xl): tooltip سمت چپ آیتم داخل منوی کشویی
  "pointer-events-none absolute top-1/2 right-full z-[120] w-[280px] -translate-y-1/2 rounded-2xl border bg-white/95 shadow-2xl backdrop-blur-md",
  "mr-3 max-w-[min(280px,calc(100vw-32px))]",

  // 2xl+: tooltip زیر آیتم‌ها در هدر
  "2xl:top-[calc(100%+10px)] 2xl:right-1/2 2xl:mr-0 2xl:translate-x-1/2 2xl:-translate-y-0",

  t.tooltipBorder,
  "transition-all duration-200",
  open
    ? "visible opacity-100 translate-x-0 2xl:translate-y-0"
    : "invisible opacity-0 translate-x-2 2xl:-translate-y-2"
)}

    >
<div className="absolute right-[-8px] top-1/2 -translate-y-1/2 2xl:right-auto 2xl:top--1 2xl:-top-2 2xl:left-1/2 2xl:-translate-x-1/2 2xl:-translate-y-0">
  <div
    className={cn(
      "h-4 w-4 rotate-45 border-t border-r bg-white",
      "2xl:border-r-0 2xl:border-l",
      t.tooltipBorder
    )}
  />
</div>


      <div className="relative overflow-hidden rounded-2xl p-3">
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40", t.tooltipGradient)} />

        <div className="relative flex items-start gap-1">
          <div className="min-w-0 flex-1">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                "border border-white/60 bg-white/80",
                t.pillBg,
                t.pillText
              )}
            >
              <Sparkles className="h-3 w-3" />
              {item.badge ?? "Premium"}
            </span>

            <h4 className="mt-0.5 text-[13px] font-extrabold text-slate-900">
              {item.tooltipTitle}
            </h4>
            <p className="text-[11px] leading-5 text-slate-600">
              {item.tooltipText}
            </p>
          </div>

          <div className="relative h-[80px] w-[80px] shrink-0 overflow-hidden rounded-xl ring-1 ring-white/60">
            <Image
              src={item.tooltipImage}
              alt={item.tooltipTitle}
              fill
              className={cn("object-cover", t.imageGlow)}
              sizes="80px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type DesktopServicesProps = {
  onSelect?: (serviceId: ServiceId) => void;
};

export default function DesktopServices({ onSelect }: DesktopServicesProps) {
  const [hoveredId, setHoveredId] = React.useState<ServiceId | null>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setHoveredId(null);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={wrapperRef} dir="rtl" className="relative min-w-0">
      {/* compact mode: md تا قبل از 2xl */}
      <div className="hidden md:block 2xl:hidden">
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          <Grid2x2 className="h-4 w-4" />
          <span>خدمات</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              menuOpen && "rotate-180"
            )}
          />
        </button>

        <div
          className={cn(
            "absolute right-0 top-[calc(100%+10px)] z-[130] w-[min(92vw,360px)] rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_50px_rgba(15,23,42,0.12)] transition-all duration-200",
            menuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          )}
        >
          <div className="grid grid-cols-1 gap-2">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              const open = hoveredId === service.id;
              const tooltipId = `compact-service-tooltip-${service.id}`;
              const t = service.theme;

              return (
                <div
                  key={service.id}
                  className="relative"
                  onMouseEnter={() => setHoveredId(service.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onSelect?.(service.id);
                      setMenuOpen(false);
                    }}
                    aria-describedby={open ? tooltipId : undefined}
                    className="group flex hover:cursor-pointer w-full items-center gap-3 rounded-xl px-3 py-3 text-right transition hover:bg-slate-50"
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ring-1",
                        t.iconBg,
                        t.iconRing
                      )}
                    >
                      <Icon className={cn("h-4 w-4", t.iconText)} />
                    </div>

                    <span className={cn("text-sm font-bold", open ? t.accentText : "text-slate-700")}>
                      {service.title}
                    </span>
                  </button>

                  <TooltipPanel item={service} open={open} id={tooltipId} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* full desktop mode: فقط 2xl به بالا */}
      <nav
        className="hidden 2xl:flex items-center gap-1"
        aria-label="سرویس‌های اختصاصی"
      >
        {SERVICES.map((service) => {
          const Icon = service.icon;
          const open = hoveredId === service.id;
          const tooltipId = `service-tooltip-${service.id}`;
          const t = service.theme;

          return (
            <div
              key={service.id}
              className="relative"
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <button
                type="button"
                onClick={() => onSelect?.(service.id)}
                aria-describedby={open ? tooltipId : undefined}
                className="group relative hover:cursor-pointer flex h-11 items-center gap-2 rounded-xl px-3 transition hover:bg-slate-50"
              >
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1",
                    t.iconBg,
                    t.iconRing
                  )}
                >
                  <Icon className={cn("h-4 w-4", t.iconText)} />
                </div>

                <span
                  className={cn(
                    "whitespace-nowrap text-[13px] font-bold transition-colors",
                    open ? t.accentText : "text-slate-700"
                  )}
                >
                  {service.title}
                </span>
              </button>

              <TooltipPanel item={service} open={open} id={tooltipId} />
            </div>
          );
        })}
      </nav>
    </div>
  );
}
