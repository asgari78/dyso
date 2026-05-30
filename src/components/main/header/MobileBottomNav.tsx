"use client";

import * as React from "react";
import {
  NotebookPen,
  Layers,
  BookHeart,
  Tag,
  CalendarDays,
} from "lucide-react";

export type ServiceId =
  | "custom-notes"
  | "custom-flashcards"
  | "custom-storybook"
  | "custom-nametag"
  | "custom-weekly-plan";

type NavItem = {
  id: ServiceId;
  label: string;
  icon: React.ElementType;
};

const NAV_ITEMS: NavItem[] = [
  { id: "custom-notes", label: "جزوه", icon: NotebookPen },
  { id: "custom-flashcards", label: "فلش کارت", icon: Layers },
  { id: "custom-storybook", label: "کتاب داستان", icon: BookHeart },
  { id: "custom-nametag", label: "برچسب اسم", icon: Tag },
  { id: "custom-weekly-plan", label: "برنامه هفتگی", icon: CalendarDays },
];

type MobileBottomNavProps = {
  activeServiceId: ServiceId;
  onSelect: (serviceId: ServiceId) => void;
};

export default function MobileBottomNav({
  activeServiceId,
  onSelect,
}: MobileBottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] flex h-16 items-center justify-around border-t border-slate-200 bg-white/95 px-2 pb-1 pt-2 backdrop-blur-lg md:hidden">
      {NAV_ITEMS.map((item) => {
        const isActive = activeServiceId === item.id;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            aria-current={isActive ? "true" : undefined}
            className={[
              "flex flex-col items-center justify-center gap-1 transition-colors",
              isActive ? "text-blue-600" : "text-slate-400",
            ].join(" ")}
          >
            <Icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
