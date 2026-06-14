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
      aria-label={`قالب ${template.name}`}
      className={[
        "group relative cursor-pointer overflow-hidden rounded-2xl border bg-white",
        "border-gray-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        // بدون hover border/shadow
      ].join(" ")}
    >
      {/* تصویر تمام عرض، بدون padding، با ارتفاع یکسان */}
      <div className="relative w-full h-28 xs:h-32 sm:h-36 md:h-40 bg-gray-100">
        <Image
          src={template.previewImage}
          alt={`پیش‌نمایش قالب ${template.name}`}
          fill
          // در گرید 2 ستونه موبایل، هر کارت تقریبا نصف ویوپورت است
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center"
          priority={false}
          quality={90}
        />

        {/* در حالت انتخاب‌شده، عنوان روی عکس پایین قرار می‌گیرد */}
        {isSelected && (
          <div className="absolute inset-x-0 bottom-0 px-2 py-1.5 bg-gradient-to-t from-black/55 to-transparent">
            <h3 className="line-clamp-1 text-[12px] sm:text-sm font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)]">
              {template.name}
            </h3>
          </div>
        )}
      </div>

      {/* محتوای متنی */}
      <div
        className={[
          "p-2.5 sm:p-3 text-right",
          // اگر selected باشد، جا برای دکمه کف کارت باز می‌کنیم
          isSelected ? "pb-12 sm:pb-14" : "",
        ].join(" ")}
      >
        {/* وقتی selected نیست عنوان اینجا نمایش داده می‌شود */}
        {!isSelected && (
          <h3 className="line-clamp-1 text-[12px] sm:text-sm md:text-base font-semibold text-gray-900 mb-1.5">
            {template.name}
          </h3>
        )}

        {/* توضیحات همیشه دیده شوند (حتی در selected) */}
        <div className="flex flex-col gap-1.5">
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] sm:text-[11px] text-gray-700">
            {template.category}
          </span>

          <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-gray-600">
            {hasSingleSize ? (
              <Ruler className="h-3.5 w-3.5 shrink-0" />
            ) : (
              <Layers3 className="h-3.5 w-3.5 shrink-0" />
            )}
            <span className="line-clamp-1">{sizeLabel}</span>
          </span>
        </div>
      </div>

      {/* دکمه انتخاب‌ها: پایین‌ترین بخش کارت، تمام عرض، بدون فاصله از اطراف */}
      {isSelected && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onOpenSelected(template)
          }}
          className={[
            "absolute bottom-0 left-0 right-0 z-10",
            "h-10 sm:h-11",
            "hover:bg-blue-800 hover:cursor-pointer transition-all",
            "inline-flex items-center justify-center gap-1.5",
            "rounded-none", // بدون گردی برای چسبیدن کامل
            "bg-blue-600 text-white text-[11px] sm:text-xs font-medium",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-inset",
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
