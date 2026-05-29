"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search, Clock, TrendingUp, X, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { createPortal } from "react-dom";

// --- Types ---
type Mode = "inline" | "modal";
type SearchStatus = "idle" | "loading" | "success" | "error";

interface SearchResult {
  id: string;
  title: string;
  type: "product" | "category" | "brand";
  price?: string;
}

// --- Helpers ---
const RECENT_SEARCHES_KEY = "recent_searches";

const getRecentSearches = (): string[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
  return stored ? JSON.parse(stored) : [];
};

const addRecentSearch = (query: string) => {
  const current = getRecentSearches();
  const filtered = current.filter((item) => item !== query);
  const updated = [query, ...filtered].slice(0, 8);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  return updated;
};

const removeRecentSearch = (query: string) => {
  const current = getRecentSearches();
  const updated = current.filter((item) => item !== query);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  return updated;
};

// --- Sub-Components ---

function SearchPanel({
  mode,
  query,
  status,
  results,
  recentSearches,
  onRemoveRecent,
  setRecent,
  onSubmit,
  onSelectQuery,
}: {
  mode: Mode;
  query: string;
  status: SearchStatus;
  results: SearchResult[];
  recentSearches: string[];
  onRemoveRecent: (item: string) => void;
  setRecent: (items: string[]) => void;
  onSubmit: () => void;
  onSelectQuery: (q: string) => void;
}) {
  const trending = ["کتاب داستان", "جزوه درسی", "فلش کارت"];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
      {status === "idle" && query.length < 2 && (
        <div className="p-4 space-y-6">
          {recentSearches.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold text-gray-400 flex items-center gap-1">
                  <Clock size={12} /> جستجوهای اخیر
                </h3>
                <button 
                  onClick={() => { localStorage.removeItem(RECENT_SEARCHES_KEY); setRecent([]); }} 
                  className="text-[10px] text-red-500 hover:underline"
                >
                  پاک کردن
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((item) => (
                  <div key={item} className="flex items-center gap-1 px-3 py-1 bg-gray-50 rounded-lg border text-xs text-gray-600">
                    <span className="cursor-pointer" onClick={() => onSelectQuery(item)}>{item}</span>
                    <button onClick={() => onRemoveRecent(item)} className="hover:text-red-500"><X size={10} /></button>
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
                  onClick={() => onSelectQuery(item)} 
                  className="px-3 py-1 text-xs text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {status === "loading" && (
        <div className="p-8 flex justify-center items-center">
          <Loader2 className="animate-spin text-blue-500" size={24} />
        </div>
      )}

      {status === "success" && query.length >= 2 && (
        <div className="p-2">
          {results.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {results.map((r) => (
                <button key={r.id} onClick={onSubmit} className="w-full text-right p-3 hover:bg-gray-50 transition flex items-center justify-between">
                  <span className="text-sm text-gray-700">{r.title}</span>
                  <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500">{r.type}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-gray-400">موردی یافت نشد!</div>
          )}
          <button onClick={onSubmit} className="w-full mt-2 p-3 text-sm text-blue-600 font-medium hover:bg-blue-50">
            مشاهده همه نتایج
          </button>
        </div>
      )}
    </div>
  );
}

// --- Main Component ---

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false); // مدیریت وضعیت باز بودن برای هر دو حالت

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
    setRecentSearches(getRecentSearches());
  }, [searchParams]);

  useEffect(() => {
    if (query.length < 2) {
      setStatus("idle");
      return;
    }
    const timeout = setTimeout(async () => {
      setStatus("loading");
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setResults([
          { id: "1", title: `نتیجه برای ${query}`, type: "product" },
          { id: "2", title: `دسته بندی ${query}`, type: "category" },
        ]);
        setStatus("success");
      } catch (err) { setStatus("error"); }
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSearch = (overrideQuery?: string) => {
    const finalQuery = overrideQuery || query;
    if (finalQuery.trim().length >= 2) {
      addRecentSearch(finalQuery);
      setRecentSearches(getRecentSearches());
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(finalQuery)}`);
    }
  };

  // محتوای پورتال که در هر دو حالت دسکتاپ و موبایل نمایش داده می‌شود
  const SearchPortal = isOpen && typeof document !== 'undefined' && createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex flex-col items-center" onClick={() => setIsOpen(false)}>
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="w-full max-w-2xl mt-16 px-4"
      >
        <div className="bg-white rounded-2xl p-2 flex items-center gap-2 shadow-2xl mb-4 border border-blue-100">
          <Search className="mr-3 text-gray-400" size={20} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="جستجوی نام کتاب، نویسنده و..."
            className="flex-1 py-1 text-md outline-none"
          />
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X size={24} />
          </button>
        </div>

        <SearchPanel
          mode="modal"
          query={query}
          status={status}
          results={results}
          recentSearches={recentSearches}
          onRemoveRecent={(item) => setRecentSearches(removeRecentSearch(item))}
          setRecent={setRecentSearches}
          onSelectQuery={(q) => { setQuery(q); handleSearch(q); }}
          onSubmit={() => handleSearch()}
        />
      </div>
    </div>,
    document.body
  );

  return (
    <>
      {/* دسکتاپ: اینپوت ظاهری (فقط برای باز کردن پورتال) */}
      <div className="hidden xl:block w-full max-w-md relative">
        <div 
          onClick={() => setIsOpen(true)}
          className="flex items-center w-full py-2.5 px-4 bg-gray-100 rounded-full text-sm text-gray-400 cursor-text hover:bg-gray-200 transition-colors"
        >
          <Search className="mr-auto h-4 w-4 text-gray-400" />
          <span className="flex-1 text-right mr-2">جستجو در محصولات...</span>
        </div>
      </div>

      {/* موبایل: دکمه جستجو */}
      <button 
        onClick={() => setIsOpen(true)} 
        className="xl:hidden p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
      >
        <Search className="h-5 w-5 text-gray-600" />
      </button>

      {/* نمایش پورتال */}
      {SearchPortal}
    </>
  );
}
