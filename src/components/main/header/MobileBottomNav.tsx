"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, GraduationCap, ShoppingBag, Heart, User2 } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "خانه", icon: Home, href: "/" },
    { label: "خدمات", icon: GraduationCap, href: "#services" },
    { label: "سبد", icon: ShoppingBag, href: "/cart" },
    { label: "علاقه", icon: Heart, href: "/favorites" },
    { label: "پروفایل", icon: User2, href: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] flex h-16 items-center justify-around border-t border-slate-200 bg-white/95 px-2 pb-1 pt-2 backdrop-blur-lg md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <button
            key={item.label}
            type="button"
            onClick={() => router.push(item.href)}
            className={`flex flex-col items-center justify-center gap-1 ${
              isActive ? "text-blue-600" : "text-slate-400"
            }`}
          >
            <Icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
