"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Search, Clock, TrendingUp, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

const RECENT_SEARCHES_KEY = "recent_searches";
const MAX_RECENTS = 8;

function safeJsonParse<T>(value: string | null, fallback: T): T {
  try {
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function getRecents(): string[] {
  if (typeof window === "undefined") return [];
  return safeJsonParse<string[]>(
    window.localStorage.getItem(RECENT_SEARCHES_KEY),
    []
  );
}

function setRecents(items: string[]) {
  window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(items));
}

function addRecent(query: string) {
  const q = query.trim();
  if (!q) return getRecents();

  const current = getRecents();
  const updated = [q, ...current.filter((x) => x !== q)].slice(0, MAX_RECENTS);
  setRecents(updated);
  return updated;
}

function removeRecent(query: string) {
  const current = getRecents();
  const updated = current.filter((x) => x !== query);
  setRecents(updated);
  return updated;
}

function clearRecents() {
  window.localStorage.removeItem(RECENT_SEARCHES_KEY);
}

export default function SearchInput() {
  const router = useRouter();

  const trending = useMemo(() => ["کتاب داستان", "جزوه درسی", "فلش کارت"], []);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recents, setRecentsState] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    setRecentsState(getRecents());
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const submit = (override?: string) => {
    const finalQuery = (override ?? query).trim();

    if (finalQuery.length < 2) return;

    const updated = addRecent(finalQuery);
    setRecentsState(updated);

    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(finalQuery)}`);
  };

  const portal =
    isOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="mx-auto mt-16 w-full max-w-2xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl p-2 flex items-center gap-2 shadow-2xl mb-3 border border-blue-100">
                <Search className="mr-3 text-gray-400" size={20} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  placeholder="جستجوی نام کتاب، نویسنده و..."
                  className="flex-1 py-1 text-md outline-none"
                />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                  aria-label="بستن"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-4 space-y-6">
                  {recents.length > 0 && (
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xs font-bold text-gray-400 flex items-center gap-1">
                          <Clock size={12} /> جستجوهای اخیر
                        </h3>
                        <button
                          type="button"
                          onClick={() => {
                            clearRecents();
                            setRecentsState([]);
                          }}
                          className="text-[10px] text-red-500 hover:underline"
                        >
                          پاک کردن
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {recents.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-1 px-3 py-1 bg-gray-50 rounded-lg border text-xs text-gray-600"
                          >
                            <button
                              type="button"
                              className="text-right"
                              onClick={() => submit(item)}
                            >
                              {item}
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setRecentsState(removeRecent(item))
                              }
                              className="hover:text-red-500"
                              aria-label="حذف از اخیر"
                            >
                              <X size={10} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-xs font-bold text-gray-400 mb-3 flex items-center gap-1">
                      <TrendingUp size={12} /> پرجستجوها
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {trending.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => submit(item)}
                          className="px-3 py-1 text-xs text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-[11px] text-gray-400">
                    برای جستجو حداقل ۲ کاراکتر وارد کنید و Enter بزنید.
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

return (
  <>
    <div className="min-w-0 w-full max-w-full xl:max-w-md">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center rounded-xl border border-transparent bg-gray-100 px-3 py-2 text-xs text-gray-400 transition-all hover:border-gray-300 hover:bg-gray-200 md:rounded-full md:px-4 md:py-2.5 md:text-sm"
      >
        <Search className="h-4 w-4 shrink-0 text-gray-400" />
        <span className="mr-2 flex-1 truncate text-right">
          جستجو در محصولات...
        </span>
      </button>
    </div>

    {portal}
  </>
);

}
