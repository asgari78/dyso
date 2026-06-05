"use client"

import { Template } from "@/components/main/body/nametag/types/nametag.types"

interface Props {
  template: Template
  selectedCount: number
  onOpenSizes: (template: Template) => void
}

export default function TemplateCard({
  template,
  selectedCount,
  onOpenSizes,
}: Props) {
  const isPinned = selectedCount > 0

  return (
    <div
      className={`relative border rounded-2xl p-4 bg-white transition hover:shadow-md
      ${isPinned ? "border-blue-500" : "border-gray-200"}
      `}
    >
      {isPinned && (
        <span className="absolute top-2 right-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
          {selectedCount} انتخاب
        </span>
      )}

      <img
        src={template.previewImage}
        alt={template.name}
        className="w-full h-40 object-cover rounded-xl mb-4"
      />

      <h3 className="font-semibold mb-3">{template.name}</h3>

      <button
        onClick={() => onOpenSizes(template)}
        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
      >
        انتخاب سایز
      </button>
    </div>
  )
}
