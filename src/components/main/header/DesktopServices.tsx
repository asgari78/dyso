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
} from "lucide-react";


type ServiceId =
  | "custom-notes"
  | "custom-flashcards"
  | "custom-storybook"
  | "custom-nametag"
  | "custom-weekly-plan";

type ServiceTheme = {
  accentText: string;
  accentTextSoft: string;
  glow: string;
  iconBg: string;
  iconRing: string;
  iconText: string;
  pillBg: string;
  pillText: string;
  tooltipGradient: string;
  tooltipBorder: string;
  imageGlow: string;
  arrowBg: string;
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
    accentTextSoft: "text-rose-700/90",
    glow: "bg-rose-300/40",
    iconBg: "bg-rose-50",
    iconRing: "ring-rose-200/70",
    iconText: "text-rose-700",
    arrowBg: "bg-rose-100",
    pillBg: "bg-rose-50",
    pillText: "text-rose-800",
    tooltipGradient: "from-rose-50 via-white to-amber-50",
    tooltipBorder: "border-rose-400/70",
    imageGlow: "shadow-[0_10px_30px_rgba(244,63,94,0.15)]",
  },
  "custom-flashcards": {
    accentText: "text-fuchsia-700",
    accentTextSoft: "text-fuchsia-700/90",
    glow: "bg-fuchsia-300/40",
    iconBg: "bg-fuchsia-50",
    iconRing: "ring-fuchsia-200/70",
    iconText: "text-fuchsia-700",
    arrowBg: "bg-fuchsia-100",
    pillBg: "bg-fuchsia-50",
    pillText: "text-fuchsia-800",
    tooltipGradient: "from-fuchsia-50 via-white to-rose-50",
    tooltipBorder: "border-fuchsia-400/70",
    imageGlow: "shadow-[0_10px_30px_rgba(217,70,239,0.15)]",
  },
  "custom-storybook": {
    accentText: "text-amber-800",
    accentTextSoft: "text-amber-800/90",
    glow: "bg-amber-300/40",
    iconBg: "bg-amber-50",
    iconRing: "ring-amber-200/70",
    iconText: "text-amber-800",
    arrowBg: "bg-amber-100",
    pillBg: "bg-amber-50",
    pillText: "text-amber-900",
    tooltipGradient: "from-amber-50 via-white to-orange-50",
    tooltipBorder: "border-amber-400/70",
    imageGlow: "shadow-[0_10px_30px_rgba(245,158,11,0.15)]",
  },
  "custom-nametag": {
    accentText: "text-emerald-800",
    accentTextSoft: "text-emerald-800/90",
    glow: "bg-emerald-300/40",
    iconBg: "bg-emerald-50",
    iconRing: "ring-emerald-200/70",
    iconText: "text-emerald-800",
    arrowBg: "bg-emerald-100",
    pillBg: "bg-emerald-50",
    pillText: "text-emerald-900",
    tooltipGradient: "from-emerald-50 via-white to-teal-50",
    tooltipBorder: "border-emerald-400/70",
    imageGlow: "shadow-[0_10px_30px_rgba(16,185,129,0.15)]",
  },
  "custom-weekly-plan": {
    accentText: "text-sky-800",
    accentTextSoft: "text-sky-800/90",
    glow: "bg-sky-300/40",
    iconBg: "bg-sky-50",
    iconRing: "ring-sky-200/70",
    iconText: "text-sky-800",
    arrowBg: "bg-sky-100",
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
    tooltipText:
      "برای هر پایه آموزشی و درس مورد نظرت جزوه مخصوص خودت را داشته باش",
    tooltipImage: "/assets/categoryToltips/custom-notes.png",
    badge: "Personal Notes",
    theme: THEMES["custom-notes"],
  },
  {
    id: "custom-flashcards",
    title: "فلش‌کارت سفارشی",
    icon: Layers,
    tooltipTitle: "طراحی فلش کارت سفارشی",
    tooltipText:
      "میتونی برای هر موضوع درسی یا کنکوری، فلش کارت های متنوع ای داشته باشی مثلا با میم های خنده دار یا عکس های مرتبط",
    tooltipImage: "/assets/categoryToltips/custom-flashcards.jpg",
    badge: "Fun & Smart",
    theme: THEMES["custom-flashcards"],
  },
  {
    id: "custom-storybook",
    title: "کتاب داستان",
    icon: BookHeart,
    tooltipTitle: "طراحی کتاب داستان سفارشی",
    tooltipText:
      "میتونی با گفتن علاقه مندی ها، نام و عکس های فرزند عزیزت کتاب داستان مخصوص خودش را با کارکتر های انیمیشنی مورد علاقش یا شخصیت های سینمایی مورد علاقش را داشته باشی",
    tooltipImage: "/assets/categoryToltips/custom-storybook.jpg",
    badge: "Kids Story",
    theme: THEMES["custom-storybook"],
  },
  {
    id: "custom-nametag",
    title: "برچسب اسم",
    icon: Tag,
    tooltipTitle: "طراحی برچسب اسم اختصاصی",
    tooltipText:
      "با انتخاب طرح مورد علاقه ات اطلاعات و عکس خودت را روی برچسب اسم در هر سایزی طراحی کن. تا هر شخصی با دیدن لوازم التحریر و کتاب و دفتر هایت صاحبش را بشناسد",
    tooltipImage: "/assets/categoryToltips/custom-nametag.jpg",
    badge: "Name Label",
    theme: THEMES["custom-nametag"],
  },
  {
    id: "custom-weekly-plan",
    title: "برنامه هفتگی",
    icon: CalendarDays,
    tooltipTitle: "طراحی برنامه هفتگی اختصاصی",
    tooltipText: "با انتخاب طرح مورد علاقه ات عکس و اسمت را روی برنامه هفتگی ات چاپ کن",
    tooltipImage: "/assets/categoryToltips/custom-weekly-plan.jpg",
    badge: "Weekly Plan",
    theme: THEMES["custom-weekly-plan"],
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function ShineLayer() {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-xl",
        "opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      )}
    >
      <span
        className={cn(
          "absolute -left-10 -top-10 h-20 w-20 rounded-full blur-2xl",
          "bg-gradient-to-br from-white/60 via-white/20 to-transparent"
        )}
      />
      <span
        className={cn(
          "absolute -bottom-12 -right-10 h-24 w-24 rounded-full blur-2xl",
          "bg-gradient-to-br from-white/50 via-white/15 to-transparent"
        )}
      />
    </span>
  );
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
        `absolute top-full border ${item.theme.tooltipBorder} rounded-2xl left-1/2 -translate-x-1/2`,
        "hidden lg:flex",
        // smaller tooltip
        "mt-2 w-[290px]",
        "z-50",
        "origin-top",
        "transition-all duration-200",
        open
          ? "pointer-events-auto opacity-100 translate-y-0 scale-100"
          : "pointer-events-none opacity-0 -translate-y-1 scale-[0.985]"
      )}
    >
      {/* arrow (smaller) */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2">
        <div
          className={cn(
            "h-6 w-6 rotate-45 rounded-[3px]",
            `border ${item.theme.tooltipBorder}`,
            `${item.theme.arrowBg} backdrop-blur-md`
          )}
        />
      </div>

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "bg-white/0 backdrop-blur-xl",
          // smaller padding
          "p-3",
          t.tooltipBorder,
        )}
      >
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 opacity-80",
            "bg-gradient-to-br",
            t.tooltipGradient
          )}
        />

        <div className="relative flex items-start gap-3">
          <div className="min-w-0 flex-1">
            {/* Keep the nice badge, remove "فقط توضیح" line and other CTAs */}
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                "border border-white/60 bg-white/70 backdrop-blur",
                t.pillBg,
                t.pillText
              )}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {item.badge ?? "Premium"}
            </span>

            <h4 className={cn("mt-1 text-[12.5px] font-extrabold tracking-tight text-slate-900")}>
              {item.tooltipTitle}
            </h4>

<p className={cn("mt-1 text-[10px] leading-4 text-slate-700")}>
  {item.tooltipText.split(" ").length > 12
    ? `${item.tooltipText.split(" ").slice(0, 12).join(" ")}...`
    : item.tooltipText}
</p>
          </div>

          {/* smaller image */}
          <div className="relative w-[92px] shrink-0">
            <div
              className={cn(
                "relative h-[86px] overflow-hidden rounded-xl",
                "ring-1 ring-white/60 bg-white/50",
                t.imageGlow
              )}
            >
              <Image
                src={item.tooltipImage}
                alt={item.tooltipTitle}
                fill
                className="object-cover"
                sizes="92px"
                priority={false}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/25"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type DesktopServicesProps = {
  onSelect?: (serviceId: ServiceId) => void;
  debug?: boolean;
};

export default function DesktopServices({ onSelect, debug = false }: DesktopServicesProps) {
  const [hoveredId, setHoveredId] = React.useState<ServiceId | null>(null);
  const closeTimer = React.useRef<number | null>(null);

  const handleSelect = React.useCallback(
    (serviceId: ServiceId) => {
      if (debug) console.log("selected service:", serviceId);
      onSelect?.(serviceId);
    },
    [onSelect, debug]
  );

  const handleEnter = React.useCallback((id: ServiceId) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setHoveredId(id);
  }, []);

  const handleLeave = React.useCallback(() => {
    closeTimer.current = window.setTimeout(() => setHoveredId(null), 90);
  }, []);

  return (
    <nav
      className={cn(
        "relative flex items-center",
        // a bit tighter spacing
        "gap-0  xl:gap-1",
        "select-none"
      )}
      aria-label="سرویس‌های اختصاصی"
      onMouseLeave={handleLeave}
    >
      {SERVICES.map((service) => {
        const Icon = service.icon;
        const t = service.theme;
        const open = hoveredId === service.id;
        const tooltipId = `desktop-service-tooltip-${service.id}`;

        return (
          <div key={service.id} className="relative" onMouseEnter={() => handleEnter(service.id)}>
            <button
              type="button"
              onClick={() => handleSelect(service.id)}
              aria-describedby={open ? tooltipId : undefined}
              className={cn(
                "group relative",
                // icon beside title (row)
                "flex items-center justify-center gap-2",
                // compact
                "h-9 lg:h-10",
                "px-0.5 md:px-1 lg:px-3",
                "rounded-xl",
                "transition-colors duration-200",
                "cursor-pointer",
                "bg-transparent",
                "hover:bg-white/55 hover:backdrop-blur",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300/70",
              )}
            >
              <ShineLayer />

              {/* Icon chip (smaller) */}
              <div
                className={cn(
                  "relative",
                  "flex h-5 w-5 lg:h-8 lg:w-8 items-center justify-center",
                  "rounded-lg",
                  "transition-transform duration-200",
                  // keep ring for icon chip, not the whole button
                  "ring-1",
                  t.iconBg,
                  t.iconRing,
                  open ? "scale-[1.03]" : "scale-100"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 -z-10 rounded-lg blur-xl opacity-0 transition-opacity duration-200",
                    open ? "opacity-100" : "opacity-0",
                    t.glow
                  )}
                />
                <Icon className={cn("h-4 w-4 lg:h-[15px] lg:w-[15px]", t.iconText)} />
              </div>

              {/* Title */}
              <span
                className={cn(
                  "text-[10px] lg:text-[12px]",
                  "font-extrabold tracking-tight whitespace-nowrap",
                  "transition-colors duration-200",
                  open ? t.accentText : "text-slate-700"
                )}
              >
                {service.title}
              </span>

              {/* active indicator dot removed (not requested, also adds visual noise/overflow risk) */}
            </button>

            <TooltipPanel item={service} open={open} id={tooltipId} />
          </div>
        );
      })}
    </nav>
  );
}
