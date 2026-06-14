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
    for (const s of template.sizes) map.set(s.id, s)
    return map
  }, [template.sizes])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="بستن مودال"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b px-3 py-3 sm:px-4 sm:py-3.5 md:px-5">
          <div className="min-w-0">
            <h3 className="inline-flex items-center gap-1.5 text-sm sm:text-base md:text-lg font-bold text-gray-900">
              <ListChecks className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              مدیریت سایزهای انتخاب‌شده
            </h3>
            <p className="mt-0.5 text-[11px] sm:text-xs md:text-sm text-gray-500 line-clamp-1">
              قالب:{" "}
              <span className="font-medium text-gray-700">{template.name}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg border bg-white text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
            aria-label="بستن"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[75vh] overflow-y-auto p-3 sm:p-4 md:p-5">
          {selectedItems.length === 0 ? (
            <div className="rounded-xl border border-dashed p-6 sm:p-8 text-center text-xs sm:text-sm text-gray-500">
              هنوز سایزی از این قالب انتخاب نشده است.
            </div>
          ) : (
            <div
              className="
                grid grid-cols-2 gap-2.5
                sm:gap-3
                md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
              "
            >
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
                    {/* تصویر یکدست و مینیمال */}
                    <div className="relative h-24 sm:h-28 md:h-24 lg:h-28 w-full bg-gray-100">
                      <Image
                        src={previewSrc}
                        alt={`${template.name} - ${sizeLabel}`}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                        quality={88}
                      />
                    </div>

                    <div className="space-y-2 p-2.5 sm:p-3">
                      <div className="min-w-0">
                        <h4 className="text-[11px] sm:text-xs md:text-[13px] font-semibold text-gray-900 line-clamp-1">
                          {sizeLabel}
                        </h4>
                        <p className="mt-1 inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-gray-600">
                          <Ruler className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                          <span className="truncate">
                            {item.widthMm} × {item.heightMm} میلی‌متر
                          </span>
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        className="
                          inline-flex w-full items-center justify-center gap-1.5
                          rounded-md bg-red-600 px-2 py-1.5 sm:py-2
                          text-[11px] sm:text-xs font-medium text-white
                          transition hover:bg-red-700
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500
                        "
                      >
                        <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        حذف
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
