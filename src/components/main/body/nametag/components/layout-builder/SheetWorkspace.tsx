"use client"

import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core"
import { Sheet } from "../../types/nametag.types"
import { useA4Layout } from "../../hooks/useA4Layout"
import SheetA4 from "./SheetA4"
export default function SheetWorkspace() {
  const { sheets, addItem } = useA4Layout()

  const sensors = useSensors(
    useSensor(PointerSensor)
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const templateId = active.id as string
    const sheetId = over.id as string

    // پیش‌فرض اندازه ثابت (بعداً dynamic می‌کنیم)
addItem(sheetId, {
  templateId,
  templateSizeId: "pencil",
  selectedTemplateId: templateId,

  position: {
    xMm: 50,
    yMm: 50,
    widthMm: 120,
    heightMm: 60,
  },
})
  }

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6">

{sheets.map((sheet: Sheet) => (
  <SheetA4
    key={sheet.id}
    sheet={sheet}
  />
))}


      </div>
    </DndContext>
  )
}
