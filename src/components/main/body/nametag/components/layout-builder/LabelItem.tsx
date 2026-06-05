"use client"

import { useDraggable } from "@dnd-kit/core"
import { SheetItem } from "../../types/nametag.types"
import { CSS } from "@dnd-kit/utilities"

interface Props {
  item: SheetItem
  sheetId: string
}

export default function LabelItem({ item }: Props) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: item.id,
    })

  const style = {
    position: "absolute" as const,
    left: item.position.xMm,
    top: item.position.yMm,
    width: item.position.widthMm,
    height: item.position.heightMm,
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-blue-100 border rounded-md flex items-center justify-center cursor-move"
    >
      Label
    </div>
  )
}
