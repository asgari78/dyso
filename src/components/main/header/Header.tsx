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

<header className="sticky top-0 z-[100] border-b border-slate-100 bg-white/90 backdrop-blur-md">
  <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
    <div className="hidden md:flex h-14 md:h-16 min-w-0 items-center gap-2">
      <div className="shrink-0">
        <Logo />
      </div>

      <div className="hidden min-w-0 md:flex items-center md:shrink xl:shrink-0">
        <DesktopServices
          activeServiceId={activeService as ServiceId}
          onSelect={setActiveService}
        />
      </div>

      <div className="min-w-0 flex-1 md:max-w-115 lg:max-w-140 flex items-center">
        <SearchInput />
      </div>

      <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
        <div className="hidden md:block h-6 w-px me-2 bg-slate-200" />
        <Cart />
        <UserAuth />
      </div>
    </div>
  </div>
</header>

    </>
  );
}
