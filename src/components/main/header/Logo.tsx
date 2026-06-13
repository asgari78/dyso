// src/components/main/header/Logo.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import logoImg from "../../../../public/assets/logo/logo.png";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="صفحه اصلی"
      className="flex h-12 items-center select-none md:h-14 2xl:h-16"
    >
      <span className="relative block h-full w-[66px] sm:w-[78px] md:w-[70px] lg:w-[70px] xl:w-[70px]">
        <Image
          src={logoImg}
          alt="Dyso Logo"
          fill
          priority
          className="object-contain object-right"
        />
      </span>
    </Link>
  );
}
