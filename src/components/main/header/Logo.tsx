"use client";

import Image from "next/image";
import Link from "next/link";
import logoImg from "../../../../public/assets/logo/logo.png";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="صفحه اصلی"
      className={[
        "flex justify-center items-center transition-all",
        "hover:scale-[1.03]",
        "origin-left",
        "select-none",
      ].join(" ")}
    >
      {/* قاب مستطیلی ثابت */}
      <span className="relative block h-15 flex justify-center items-center w-26">
        <Image
          src={logoImg}
          alt="Dyso Logo"
          fill
          priority
          className="object-contain"
          sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 220px"
        />
      </span>
    </Link>
  );
}
