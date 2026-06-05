"use client"

import { Template, TemplateSize } from "../../../types/nametag.types"

interface Props {
  template: Template
  onClose: () => void
  onAddSize: (size: TemplateSize) => void
}

export default function TemplateSizeModal({
  template,
  onClose,
  onAddSize,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 space-y-4">

        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">
            انتخاب سایز - {template.name}
          </h3>

          <button onClick={onClose}>✕</button>
        </div>

        <div className="space-y-3">

          {template.sizes.map((size) => (
            <div
              key={size.id}
              className="flex items-center justify-between border rounded-xl p-3"
            >
              <div>
                <p className="font-medium">{size.label}</p>

                <p className="text-xs text-gray-500">
                  {size.widthMm} × {size.heightMm} mm
                </p>
              </div>

              <button
                onClick={() => onAddSize(size)}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700"
              >
                افزودن
              </button>
            </div>
          ))}

        </div>

      </div>
    </div>
  )
}
