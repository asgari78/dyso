"use client"

import { memo, useMemo } from "react"
import Image from "next/image"
import { Ruler, Layers3, ListChecks } from "lucide-react"

import { Template } from "../../../types/nametag.types"

interface Props {
  template: Template
  selectedCount: number
  onOpenSizes: (template: Template) => void
  onOpenSelected: (template: Template) => void
}

function TemplateCardBase({
  template,
  selectedCount,
  onOpenSizes,
  onOpenSelected,
}: Props) {
  const isSelected = selectedCount > 0
  const hasSingleSize = template.sizes.length === 1

  const sizeLabel = useMemo(() => {
    if (hasSingleSize) {
      const s = template.sizes[0]
      return `${s.widthMm} × ${s.heightMm} میلی‌متر`
    }
    return `${template.sizes.length} سایز مختلف`
  }, [hasSingleSize, template.sizes])

  return (
    <article
      onClick={() => onOpenSizes(template)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onOpenSizes(template)
        }
      }}
      className={[
        "group relative cursor-pointer overflow-hidden rounded-2xl border bg-white p-3 md:p-4",
        "transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-lg",
        "focus-within:ring-2 focus-within:ring-blue-500",
        isSelected
          ? "border-blue-500 ring-2 ring-blue-100"
          : "border-gray-200 hover:border-gray-300",
      ].join(" ")}
      aria-label={`قالب ${template.name}`}
    >
      {/* Preview */}
      <div className="relative mb-3 h-44 w-full overflow-hidden rounded-xl bg-gray-50">
        <Image
          src={template.previewImage}
          alt={`پیش‌نمایش قالب ${template.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          priority={false}
        />
      </div>

      {/* Content */}
      <div className="space-y-2 text-right">
        <h3 className="line-clamp-1 text-sm md:text-base font-semibold text-gray-900">
          {template.name}
        </h3>

        <div className="flex items-center justify-between text-xs text-gray-600">
          <span className="inline-flex items-center gap-1">
            {hasSingleSize ? (
              <Ruler className="h-3.5 w-3.5" />
            ) : (
              <Layers3 className="h-3.5 w-3.5" />
            )}
            {sizeLabel}
          </span>

          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-700">
            {template.category}
          </span>
        </div>
      </div>

      {/* Footer-like floating selected action (does NOT change card height) */}
      {isSelected && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onOpenSelected(template)
          }}
          className={[
            "absolute bottom-3 left-3 right-3 z-10",
            "inline-flex items-center justify-center gap-2 rounded-xl",
            "bg-blue-600/95 px-3 py-2 text-xs md:text-sm font-medium text-white shadow-md backdrop-blur-sm",
            "transition hover:bg-blue-700",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
          ].join(" ")}
          aria-label={`مدیریت ${selectedCount} انتخاب برای قالب ${template.name}`}
        >
          <ListChecks className="h-4 w-4" />
          {selectedCount} انتخاب‌شده 
        </button>
      )}
    </article>
  )
}

const TemplateCard = memo(TemplateCardBase)
export default TemplateCard
