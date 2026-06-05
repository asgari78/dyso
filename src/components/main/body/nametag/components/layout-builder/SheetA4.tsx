"use client"

import { useDroppable } from "@dnd-kit/core"
import { Sheet } from "../../types/nametag.types"
import LabelItem from "./LabelItem"

interface Props {
  sheet: Sheet
}

export default function SheetA4({ sheet }: Props) {
  const { setNodeRef } = useDroppable({
    id: sheet.id,
  })

  return (
    <div
      ref={setNodeRef}
      className="relative bg-white shadow-xl border"
      style={{
        width: 794,
        height: 1123,
      }}
    >
      {sheet.items.map((item) => (
        <LabelItem
          key={item.id}
          item={item}
          sheetId={sheet.id}
        />
      ))}
    </div>
  )
}
