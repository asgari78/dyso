"use client";

import { useState } from "react";
import Header from "../components/main/header/Header";
import Body from "../components/main/body/Body";

export default function Home() {
  const [activeService, setActiveService] = useState("custom-nametag");

  return (
    <main className="flex flex-col min-h-screen">
      <Header activeService={activeService} setActiveService={setActiveService} />
      <Body activeService={activeService} />
    </main>
  );
}
