"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ClipboardList,
  Heart,
  LogIn,
  LogOut,
  MapPin,
  MessageSquareText,
  User2,
} from "lucide-react";
import { supabase } from "../../../lib/supabase/supabaseClient";

type AuthUser = {
  id: string;
  phone?: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    name?: string;
  };
};

type MenuItem = {
  id: string;
  label: string;
  href?: string;
  icon: React.ElementType;
  danger?: boolean;
  action?: () => void;
};

export default function UserAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;

    const getSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const currentUser = data.session?.user as AuthUser | undefined;

        if (mounted) {
          setUser(currentUser ?? null);
          setLoading(false);
        }
      } catch (error) {
        if (mounted) {
          setUser(null);
          setLoading(false);
        }
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user as AuthUser | undefined;
      setUser(currentUser ?? null);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setOpenMenu(false);
    } catch (error) {
      console.error("logout error:", error);
    }
  };

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.phone ||
    user?.email ||
    "کاربر دی‌سو";

  const menuItems: MenuItem[] = [
    {
      id: "orders",
      label: "سفارش‌ها",
      href: "/profile?tab=orders",
      icon: ClipboardList,
    },
    {
      id: "addresses",
      label: "آدرس‌ها",
      href: "/profile?tab=addresses",
      icon: MapPin,
    },
    {
      id: "favorites",
      label: "لیست مورد علاقه‌ها",
      href: "/profile?tab=favorites",
      icon: Heart,
    },
    {
      id: "comments",
      label: "دیدگاه‌ها و پرسش‌ها",
      href: "/profile?tab=comments",
      icon: MessageSquareText,
    },
    {
      id: "logout",
      label: "خروج از حساب کاربری",
      icon: LogOut,
      danger: true,
      action: handleLogout,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="h-10 w-10 animate-pulse rounded-full bg-slate-100" />
      </div>
    );
  }

  // حالت مهمان
  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="relative flex px-4 h-12 w-max items-center justify-center rounded-full bg-white text-slate-700 transition-all hover:bg-blue-50 hover:text-blue-600"
      >
        <LogIn className="h-4 w-4" />
        <span className="hidden sm:inline">ورود / ثبت‌نام</span>
      </Link>
    );
  }

  // حالت کاربر لاگین شده
  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpenMenu((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
        aria-label="منوی کاربر"
      >
        <User2 className="h-5 w-5" />
      </button>

      <div
className={[
  "absolute left-0 top-full z-[120] mt-3 w-72 max-w-[calc(100vw-24px)] rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_50px_rgba(15,23,42,0.12)] transition-all duration-200",
  openMenu
    ? "visible translate-y-0 opacity-100"
    : "invisible -translate-y-1 opacity-0",
].join(" ")}
      >
        {/* هدر کارت */}
        <Link
          href="/profile"
          onClick={() => setOpenMenu(false)}
          className="flex items-center justify-between rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-slate-50"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-700">
              <User2 className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-800">
                {displayName}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                مشاهده پروفایل
              </p>
            </div>
          </div>

          <ChevronLeft className="h-4 w-4 text-slate-400" />
        </Link>

        <div className="my-2 h-px bg-slate-100" />

        {/* آیتم‌ها */}
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            if (item.action) {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.action}
                  className={[
                    "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-right transition-colors duration-200",
                    item.danger
                      ? "text-rose-600 hover:bg-rose-50"
                      : "text-slate-700 hover:bg-slate-50",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </button>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href || "/profile"}
                onClick={() => setOpenMenu(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-slate-700 transition-colors duration-200 hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <ChevronLeft className="h-4 w-4 text-slate-300" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
