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

/**
 * =================================================================================
 * SERVICE DEFINITIONS & THEMES
 * =================================================================================
 */

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
    tooltipText: "برای هر پایه آموزشی و درس مورد نظرت جزوه مخصوص خودت را داشته باش",
    tooltipImage: "/assets/categoryToltips/custom-notes.png",
    badge: "Personal Notes",
    theme: THEMES["custom-notes"],
  },
  {
    id: "custom-flashcards",
    title: "فلش‌کارت سفارشی",
    icon: Layers,
    tooltipTitle: "طراحی فلش کارت سفارشی",
    tooltipText: "میتونی برای هر موضوع درسی یا کنکوری، فلش کارت های متنوع ای داشته باشی",
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
    tooltipText: "با انتخاب طرح مورد علاقه ات اطلاعات و عکس خودت را روی برچسب اسم طراحی کن",
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

/**
 * =================================================================================
 * HELPERS
 * =================================================================================
 */

/**
 * Conditionally join CSS classes for cleaner code.
 */
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Splits a title into two lines, essential for compact Persian text layout.
 * Ensures strict wrapping behavior for RTL consistency.
 */
function splitTitleForCompact(title: string): React.ReactNode {
  const words = title.split(" ");
  if (words.length <= 1) return title;
  
  return (
    <span className="flex flex-col items-start leading-[1.15]">
      <span>{words[0]}</span>
      <span className="whitespace-nowrap">{words.slice(1).join(" ")}</span>
    </span>
  );
}

/**
 * =================================================================================
 * SUB-COMPONENTS
 * =================================================================================
 */

/**
 * Decorative shine effect for button interaction.
 */
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

/**
 * The floating tooltip component.
 * Positioned relative to the parent button, handling RTL alignment.
 */
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
        "absolute top-[calc(100%+12px)] right-1/2 translate-x-1/2 z-[100]",
        "border rounded-2xl w-[280px]",
        t.tooltipBorder,
        "bg-white/90 backdrop-blur-md shadow-2xl",
        "transition-all duration-300 ease-out",
        open
          ? "visible opacity-100 translate-y-0 scale-100"
          : "invisible opacity-0 -translate-y-2 scale-[0.95]"
      )}
    >
      {/* Arrow */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2">
        <div
          className={cn(
            "h-4 w-4 rotate-45 border-t border-l rounded-[2px]",
            t.tooltipBorder,
            "bg-white"
          )}
        />
      </div>

      <div className="relative overflow-hidden rounded-2xl p-3">
        {/* Background Gradient */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 opacity-40",
            "bg-gradient-to-br",
            t.tooltipGradient
          )}
        />

        <div className="relative flex items-start gap-3">
          {/* Content */}
          <div className="min-w-0 flex-1">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                "border border-white/60 bg-white/70 backdrop-blur",
                t.pillBg,
                t.pillText
              )}
            >
              <Sparkles className="h-3 w-3" />
              {item.badge ?? "Premium"}
            </span>

            <h4 className="mt-1.5 text-[13px] font-extrabold tracking-tight text-slate-900">
              {item.tooltipTitle}
            </h4>

            <p className="mt-1 text-[11px] leading-5 text-slate-600">
              {item.tooltipText}
            </p>
          </div>

          {/* Image */}
          <div className="relative w-[70px] h-[70px] shrink-0">
            <div
              className={cn(
                "relative h-full w-full overflow-hidden rounded-xl",
                "ring-1 ring-white/60 bg-white/50",
                t.imageGlow
              )}
            >
              <Image
                src={item.tooltipImage}
                alt={item.tooltipTitle}
                fill
                className="object-cover"
                sizes="70px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * =================================================================================
 * MAIN COMPONENT
 * =================================================================================
 */

type DesktopServicesProps = {
  onSelect?: (serviceId: ServiceId) => void;
};

export default function DesktopServices({ onSelect }: DesktopServicesProps) {
  const [hoveredId, setHoveredId] = React.useState<ServiceId | null>(null);
  const closeTimer = React.useRef<number | null>(null);

  const handleEnter = React.useCallback((id: ServiceId) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setHoveredId(id);
  }, []);

  const handleLeave = React.useCallback(() => {
    closeTimer.current = window.setTimeout(() => setHoveredId(null), 150);
  }, []);

  return (
    <nav
      dir="rtl"
      className={cn(
        "relative flex items-center justify-start select-none",
        "w-full h-full", // Ensure parent container takes available space
        "gap-1 md:gap-2",
        "lg:px-4"
      )}
      aria-label="سرویس‌های اختصاصی"
      onMouseLeave={handleLeave}
    >
      {SERVICES.map((service) => {
        const Icon = service.icon;
        const t = service.theme;
        const open = hoveredId === service.id;
        const tooltipId = `service-tooltip-${service.id}`;

        return (
          <div
            key={service.id}
            className="relative"
            onMouseEnter={() => handleEnter(service.id)}
          >
            <button
              type="button"
              onClick={() => onSelect?.(service.id)}
              aria-describedby={open ? tooltipId : undefined}
              className={cn(
                "group relative flex items-center gap-2",
                "h-12 px-3 rounded-xl transition-all duration-300",
                "cursor-pointer bg-transparent hover:bg-slate-50",
                "border border-transparent hover:border-slate-100",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20"
              )}
            >
              <ShineLayer />

              {/* Icon */}
              <div
                className={cn(
                  "relative flex items-center justify-center shrink-0",
                  "h-9 w-9 rounded-lg transition-all duration-300",
                  "ring-1",
                  t.iconBg,
                  t.iconRing,
                  open ? "scale-105 shadow-sm" : "scale-100"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 -z-10 rounded-lg blur-lg opacity-0 transition-opacity duration-300",
                    open ? "opacity-100" : "opacity-0",
                    t.glow
                  )}
                />
                <Icon className={cn("h-4 w-4", t.iconText)} />
              </div>

              {/* Text */}
              <div
                className={cn(
                  "hidden lg:flex items-center text-right whitespace-nowrap transition-colors duration-300",
                  "text-[13px] font-bold tracking-tight",
                  open ? t.accentText : "text-slate-700 group-hover:text-slate-900"
                )}
              >
                {service.title}
              </div>
            </button>

            <TooltipPanel item={service} open={open} id={tooltipId} />
          </div>
        );
      })}
    </nav>
  );
}
