"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Plus,
  Minus,
  ChevronLeft,
  Truck,
  ShoppingCart,
  ShieldCheck,
  Zap,
} from "lucide-react";

import imgexam from "../../../../public/assets/logo/logo.png";

interface CartItem {
  id: number;
  name: string;
  price: number;
  discount: number;
  image?: string;
  variant: string;
  quantity: number;
  deliveryMethod: string;
}

const MOCK_DATA: CartItem[] = [
  {
    id: 1,
    name: "گوشی موبایل سامسونگ مدل Galaxy S24 Ultra دو سیم کارت ظرفیت 256 گیگابایت",
    price: 72000000,
    discount: 2500000,
    variant: "رنگ خاکستری تیتانیوم",
    quantity: 1,
    deliveryMethod: "ارسال سریع دی‌سو",
  },
  {
    id: 2,
    name: "هدفون بی‌سیم سونی مدل WH-1000XM5",
    price: 18500000,
    discount: 900000,
    variant: "گارانتی ۱۸ ماهه پارسه",
    quantity: 2,
    deliveryMethod: "ارسال از ۲ روز آینده",
  },
];

export default function Cart() {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>(MOCK_DATA);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1280); // xl
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const totals = useMemo(() => {
    const totalRawPrice = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const totalProfit = items.reduce(
      (acc, item) => acc + item.discount * item.quantity,
      0
    );

    return {
      payable: totalRawPrice - totalProfit,
      profit: totalProfit,
    };
  }, [items]);

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = Math.max(0, item.quantity + delta);
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (isMobile) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  const handleCartClick = () => {
    if (isMobile) {
      router.push("/cart");
      return;
    }

    setIsOpen((prev) => !prev);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => {
        if (!isMobile) setIsOpen(true);
      }}
      onMouseLeave={() => {
        if (!isMobile) setIsOpen(false);
      }}
    >
      {/* آیکون سبد خرید */}
<button
  type="button"
  onClick={handleCartClick}
  className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600 sm:h-9 sm:w-9"
  aria-label="سبد خرید"
>
  <ShoppingCart className="h-[18px] w-[18px] sm:h-[19px] sm:w-[19px]" strokeWidth={1.9} />

  {totalItems > 0 && (
    <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold leading-none text-white ring-2 ring-white sm:h-[14px] sm:min-w-[14px] sm:text-[10px]">
      {totalItems > 99 ? "99+" : totalItems}
    </span>
  )}
</button>


      {/* dropdown فقط در دسکتاپ */}
      {!isMobile && (
        <div
className={`absolute left-0 top-full z-2 mt-3 w-[min(92vw,400px)] max-w-[calc(100vw-24px)] origin-top-left rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-300 ${
  isOpen
    ? "visible translate-y-0 opacity-100"
    : "invisible -translate-y-2 opacity-0"
}`}
        >
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
              <ShoppingCart className="mb-4 h-16 w-16 text-slate-200" />
              <p className="text-sm font-bold text-slate-700">
                سبد خرید شما خالی است!
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <span className="text-[11px] font-medium text-slate-500">
                  {totalItems} کالا در سبد خرید شماست
                </span>
                <Link
                  href="/cart"
                  className="flex items-center text-[11px] font-bold text-blue-600"
                >
                  مشاهده سبد خرید <ChevronLeft className="h-4 w-4" />
                </Link>
              </div>

              {totals.profit > 0 && (
                <div className="bg-rose-50/50 px-5 py-2">
                  <p className="flex items-center gap-1 text-[10px] font-bold text-rose-500">
                    <Zap className="h-3 w-3 fill-rose-500" />
                    شما در این خرید {totals.profit.toLocaleString("fa-IR")} تومان سود
                    می‌کنید.
                  </p>
                </div>
              )}

              <div className="custom-scrollbar max-h-[380px] overflow-y-auto px-5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col border-b border-slate-100 py-5 last:border-0"
                  >
                    <div className="flex gap-4">
                      <div className="relative h-24 w-24 flex-shrink-0 rounded-xl border border-slate-100 p-1">
                        <Image
                          src={imgexam}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>

                      <div className="flex flex-1 flex-col">
                        <h4 className="line-clamp-2 text-[13px] font-bold leading-6 text-slate-800">
                          {item.name}
                        </h4>

                        <div className="mt-2 space-y-1.5">
                          <div className="flex items-center gap-2 text-[11px] text-slate-500">
                            <ShieldCheck className="h-3.5 w-3.5 text-slate-400" />
                            <span>{item.variant}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500">
                            <Truck className="h-3.5 w-3.5 text-slate-400" />
                            <span>{item.deliveryMethod}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-4 rounded-lg border border-slate-200 px-3 py-1.5 shadow-sm">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-blue-600 transition-colors hover:text-blue-700"
                        >
                          <Plus className="h-4 w-4" />
                        </button>

                        <span className="min-w-[20px] text-center text-sm font-black text-slate-800">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            item.quantity === 1
                              ? removeItem(item.id)
                              : updateQuantity(item.id, -1)
                          }
                          className="text-rose-500 transition-colors hover:text-rose-600"
                        >
                          {item.quantity === 1 ? (
                            <Trash2 className="h-4 w-4" />
                          ) : (
                            <Minus className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      <div className="text-left">
                        {item.discount > 0 && (
                          <div className="mb-1 flex items-center justify-end gap-1">
                            <span className="text-[11px] text-slate-400 line-through decoration-rose-400/50">
                              {(item.price * item.quantity).toLocaleString("fa-IR")}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-1 font-black text-slate-800">
                          <span className="text-lg">
                            {((item.price - item.discount) * item.quantity).toLocaleString("fa-IR")}
                          </span>
                          <span className="text-[10px] font-normal">تومان</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between rounded-b-2xl border-t border-slate-100 bg-slate-50/80 p-5">
                <div>
                  <span className="block text-[10px] text-slate-500">
                    مبلغ قابل پرداخت
                  </span>
                  <div className="flex items-center gap-1 font-black text-slate-900">
                    <span className="text-base">
                      {totals.payable.toLocaleString("fa-IR")}
                    </span>
                    <span className="text-[10px] font-normal">تومان</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="rounded-xl bg-blue-600 px-6 py-3 text-[13px] font-bold text-white shadow-md shadow-blue-200 transition-all hover:bg-blue-700 active:scale-95"
                >
                  ثبت سفارش
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
