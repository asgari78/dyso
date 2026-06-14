"use client"

import { useEffect, useMemo } from "react"
import Image from "next/image"
import { X, Trash2, ListChecks, Ruler } from "lucide-react"

import {
  Template,
  SelectedTemplate,
  TemplateSize,
} from "../../../types/nametag.types"

interface Props {
  template: Template
  selectedItems: SelectedTemplate[]
  onClose: () => void
  onRemove: (selectedTemplateId: string) => void
}

export default function SelectedTemplateSizesModal({
  template,
  selectedItems,
  onClose,
  onRemove,
}: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleEsc)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener("keydown", handleEsc)
    }
  }, [onClose])

  const sizeMap = useMemo(() => {
    const map = new Map<string, TemplateSize>()
    for (const s of template.sizes) {
      map.set(s.id, s)
    }
    return map
  }, [template.sizes])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="بستن مودال"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b px-5 py-4 md:px-6">
          <div>
            <h3 className="text-base md:text-lg font-bold text-gray-900 inline-flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-blue-600" />
              مدیریت سایزهای انتخاب‌شده
            </h3>
            <p className="mt-1 text-xs md:text-sm text-gray-500">
              قالب:{" "}
              <span className="font-medium text-gray-700">{template.name}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition"
            aria-label="بستن"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto p-5 md:p-6">
          {selectedItems.length === 0 ? (
            <div className="rounded-xl border border-dashed p-10 text-center text-sm text-gray-500">
              هنوز سایزی از این قالب انتخاب نشده است.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {selectedItems.map((item) => {
                const size = sizeMap.get(item.sizeId)
                const previewSrc =
                  item.previewImage || size?.previewImage || template.previewImage
                const sizeLabel = size?.label ?? item.sizeId

                return (
                  <article
                    key={item.id}
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                  >
                    <div className="relative h-44 w-full bg-gray-50">
                      <Image
                        src={previewSrc}
                        alt={`${template.name} - ${sizeLabel}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    </div>

                    <div className="space-y-3 p-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">
                          {sizeLabel}
                        </h4>
                        <p className="mt-1 inline-flex items-center gap-1 text-xs text-gray-600">
                          <Ruler className="h-3.5 w-3.5" />
                          {item.widthMm} × {item.heightMm} میلی‌متر
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                        حذف این سایز
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
