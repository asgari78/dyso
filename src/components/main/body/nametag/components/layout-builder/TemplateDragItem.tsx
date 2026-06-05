"use client"

import { useDraggable } from "@dnd-kit/core"

interface Props {
  templateId: string
  name: string
}

export default function TemplateDragItem({
  templateId,
  name,
}: Props) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: templateId,
    })

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="border rounded-lg p-3 bg-white cursor-grab shadow-sm"
    >
      {name}
    </div>
  )
}
