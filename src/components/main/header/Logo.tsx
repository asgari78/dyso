"use client";

import Image from "next/image";
import Link from "next/link";
import logoImg from "../../../../public/assets/logo/logo.png";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="صفحه اصلی"
      className="flex h-10 w-12 items-center justify-center select-none md:h-12"
    >
      <span className="relative block h-full w-[98px] sm:w-[105px] md:w-[110px] lg:w-[120px]">
        <Image
          src={logoImg}
          alt="Dyso Logo"
          fill
          priority
          className="object-contain object-right"
          sizes="(max-width: 640px) 88px, (max-width: 768px) 96px, (max-width: 1024px) 110px, 120px"
        />
      </span>
    </Link>
  );
}
