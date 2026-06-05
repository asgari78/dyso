"use client"

import { useA4Layout } from "../../hooks/useA4Layout"

export default function SheetToolbar() {
  const { addSheet } = useA4Layout()

  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={addSheet}
        className="bg-green-600 text-white px-4 py-2 rounded-xl"
      >
        افزودن صفحه A4
      </button>
    </div>
  )
}
