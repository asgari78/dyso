"use client";

import { ReactNode } from "react";
import ReduxProvider from "./redux-provider";
import QueryProvider from "./query-provider";

type Props = {
  children: ReactNode;
};

export default function AppProvider({ children }: Props) {
  return (
    <ReduxProvider>
      <QueryProvider>{children}</QueryProvider>
    </ReduxProvider>
  );
}
