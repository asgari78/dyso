"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X, Ruler, Plus } from "lucide-react"

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
  // بستن با دکمه ESC + قفل اسکرول بک‌گراند
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [onClose])

  const handleAdd = (size: TemplateSize) => {
    onAddSize(size)
    onClose() // ✅ بعد از افزودن، مودال بسته شود
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`انتخاب سایز برای قالب ${template.name}`}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="بستن مودال"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
      />

      {/* Modal Panel */}
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 py-4 md:px-6">
          <div>
            <h3 className="text-base md:text-lg font-bold text-gray-900">
              انتخاب سایز
            </h3>
            <p className="mt-1 text-xs md:text-sm text-gray-500">
              قالب: <span className="font-medium text-gray-700">{template.name}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg  bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition"
            aria-label="بستن"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto p-5 md:p-6">
          {template.sizes.length === 0 ? (
            <div className="rounded-xl border border-dashed p-10 text-center text-sm text-gray-500">
              برای این قالب سایزی تعریف نشده است.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {template.sizes.map((size) => (
                <article
                  key={size.id}
                  className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:border-blue-300 hover:shadow-md"
                >
                  {/* Size Image */}
                  <div className="relative h-44 w-full bg-gray-50">
                    <Image
                      src={size.previewImage || template.previewImage}
                      alt={`${template.name} - ${size.label}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>

                  {/* Info */}
                  <div className="space-y-3 p-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">
                        {size.label}
                      </h4>
                      <p className="mt-1 inline-flex items-center gap-1 text-xs text-gray-600">
                        <Ruler className="h-3.5 w-3.5" />
                        {size.widthMm} × {size.heightMm} میلی‌متر
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAdd(size)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      <Plus className="h-4 w-4" />
                      افزودن این سایز
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}