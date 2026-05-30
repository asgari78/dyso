"use client";

import Image from "next/image";
import Link from "next/link";
import logoImg from "../../../../public/assets/logo/logo.png";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="صفحه اصلی"
      className="flex h-14 items-center select-none md:h-17 2xl:h-20"
    >
      <span className="relative block h-full w-[66px] sm:w-[78px] md:w-[70px] lg:w-[85px] xl:w-[102px]">
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
