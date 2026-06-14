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
  activeService: string; // یا دقیق‌تر: ServiceId
  setActiveService: (serviceId: string) => void;
};

export default function Header({ activeService, setActiveService }: HeaderProps) {
  return (
    <>
      {/* ناوبری پایین موبایل */}
      <div className="md:hidden">
        <MobileBottomNav
          activeServiceId={activeService as ServiceId}
          onSelect={setActiveService}
        />
      </div>

      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
          {/* نکته: این خط دیگر hidden نیست */}
          <div className="h-14 md:h-16 min-w-0 flex items-center gap-2 md:gap-3">
            {/* لوگو */}
            <div className="shrink-0">
              <Logo />
            </div>

            {/* سرویس‌ها فقط از md به بالا */}
            <div className="hidden md:flex min-w-0 items-center shrink">
              <DesktopServices
                activeServiceId={activeService as ServiceId}
                onSelect={setActiveService}
              />
            </div>

            {/* جستجو: در موبایل فضای باقی‌مانده را بگیرد */}
            <div className="min-w-0 flex-1 flex items-center md:max-w-[460px] lg:max-w-[560px]">
              <SearchInput />
            </div>

            {/* اکشن‌ها */}
            <div className="shrink-0 flex items-center gap-1.5 md:gap-2">
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
