"use client";

import { useState } from "react";
import Header from "../components/main/header/Header";
import Body from "../components/main/body/Body";

export default function Home() {
  // تعریف وضعیت تب فعال (به صورت پیش‌فرض روی custom-nametag)
  const [activeService, setActiveService] = useState("custom-nametag");

  return (
    <main className="flex flex-col min-h-screen">
      {/* پاس دادن وضعیت و تابع تغییر آن به هدر */}
      <Header activeService={activeService} setActiveService={setActiveService} />
      
      {/* پاس دادن وضعیت فعلی به بادی برای نمایش محتوای مربوطه */}
      <Body activeService={activeService} />
    </main>
  );
}
