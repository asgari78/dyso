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
            <div className="flex md:hidden">
          <MobileBottomNav />
        </div>
    <header className="sticky top-0 z-[100] border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="2xl:container mx-auto flex h-16 items-center justify-between px-4 md:h-20 md:px-6 lg:px-8">
        <div className="flex-shrink-0 p-0 m-0">
          <Logo />
        </div>

        <div className="hidden md:flex">
          <DesktopServices />
        </div>

        <div className="mx-3 flex-1 max-w-md">
          <SearchInput />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:block mx-1 h-6 w-px bg-slate-200" />
          <Cart />
          <UserAuth />
        </div>
      </div>
    </header>
    </>
  );
}
