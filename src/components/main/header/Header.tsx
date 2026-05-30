"use client";

import Logo from "./Logo";
import DesktopServices from "./DesktopServices";
import SearchInput from "./SearchInput";
import UserAuth from "./UserAuth";
import Cart from "./Cart";
import MobileBottomNav from "./MobileBottomNav";

export default function Header() {
  return (
    <>
      <div className="md:hidden">
        <MobileBottomNav />
      </div>

      <header className="sticky top-0 z-[100] border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div
          className="
            mx-auto flex h-16 w-full items-center gap-2 px-3
            md:h-20 md:px-4
            lg:px-6
            2xl:container
          "
        >
          {/* Logo */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* Services:
             - hidden on mobile
             - compact mode in md..xl handled inside component
             - full mode in 2xl handled inside component
          */}
          <div className="hidden min-w-0 md:flex md:shrink xl:shrink-0">
            <DesktopServices />
          </div>

          {/* Search */}
          <div className="min-w-0 flex-1">
            <SearchInput />
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-.5 md:gap-1">
            <div className="hidden md:block h-6 w-px bg-slate-200" />
            <Cart />
            <UserAuth />
          </div>
        </div>
      </header>
    </>
  );
}
