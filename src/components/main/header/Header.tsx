"use client";

import Logo from "./Logo";
import DesktopServices from "./DesktopServices";
import SearchInput from "./SearchInput";
import UserAuth from "./UserAuth";
import Cart from "./Cart";
import MobileBottomNav from "./MobileBottomNav";

// تعریف تایپ برای Props دریافتی از page.tsx
export type ServiceId =
  | "custom-notes"
  | "custom-flashcards"
  | "custom-storybook"
  | "custom-nametag"
  | "custom-weekly-plan";

type HeaderProps = {
  activeService: string; // یا به صورت دقیق‌تر ServiceId
  setActiveService: (serviceId: string) => void;
};

export default function Header({ activeService, setActiveService }: HeaderProps) {
  return (
    <>
      <div className="md:hidden">
        {/* پاس دادن وضعیت به ناوبری موبایل */}
        <MobileBottomNav 
          activeServiceId={activeService as ServiceId} 
          onSelect={setActiveService} 
        />
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

          {/* Services */}
          <div className="hidden min-w-0 md:flex md:shrink xl:shrink-0">
            {/* پاس دادن وضعیت به منوی دسکتاپ */}
            <DesktopServices 
              activeServiceId={activeService as ServiceId} 
              onSelect={setActiveService} 
            />
          </div>

          {/* Search */}
          <div className="min-w-0 flex-1">
            <SearchInput />
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-0.5 md:gap-1">
            <div className="hidden md:block h-6 w-px bg-slate-200" />
            <Cart />
            <UserAuth />
          </div>
        </div>
      </header>
    </>
  );
}
