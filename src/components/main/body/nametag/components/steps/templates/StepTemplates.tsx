"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

import { mockTemplates } from "../../../data/mockTemplates"
import {
  Template,
  TemplateSize,
  SelectedTemplate,
} from "../../../types/nametag.types"
import { useNametagBuilder } from "../../../hooks/useNametagBuilder"
import { useTemplateFilters } from "../../../hooks/useTemplateFilters"
import { useTemplatePagination } from "../../../hooks/useTemplatePagination"
import {
  countSelectedForTemplate,
  extractCategories,
  sortTemplatesPinnedFirst,
} from "../../../utils/templateHelpers"

import TemplateCard from "./TemplateCard"
import TemplateSizeModal from "./TemplateSizeModal"
import SelectedTemplateSizesModal from "./SelectedTemplateSizesModal"

const PAGE_SIZE = 12

export default function StepTemplates() {
  const { builder, addTemplateToSelection, removeTemplateFromSelection } =
    useNametagBuilder()

  const selectedTemplates = builder.selectedTemplates
  const templates = mockTemplates

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const [activeTemplate, setActiveTemplate] = useState<Template | null>(null)
  const [selectedManageTemplate, setSelectedManageTemplate] =
    useState<Template | null>(null)
  const [showCategoryMenu, setShowCategoryMenu] = useState(false)

  const categories = useMemo(() => extractCategories(templates), [templates])

  const filtered = useTemplateFilters({ templates, search, category })

  const sorted = useMemo(
    () => sortTemplatesPinnedFirst(filtered, selectedTemplates),
    [filtered, selectedTemplates]
  )

  const { totalPages, paginatedItems } = useTemplatePagination({
    items: sorted,
    page,
    pageSize: PAGE_SIZE,
  })

  useEffect(() => {
    if (page > totalPages && totalPages > 0) setPage(totalPages)
  }, [page, totalPages])

  const buildSelectedTemplate = (
    template: Template,
    size: TemplateSize
  ): SelectedTemplate => ({
    id: uuidv4(),
    templateId: template.id,
    templateName: template.name,
    sizeId: size.id,
    widthMm: size.widthMm,
    heightMm: size.heightMm,
    previewImage: size.previewImage || template.previewImage,
  })

  const handleAddSize = (template: Template, size: TemplateSize) => {
    addTemplateToSelection(buildSelectedTemplate(template, size))
  }

  const handleOpenTemplate = (template: Template) => {
    if (template.sizes.length === 1) {
      handleAddSize(template, template.sizes[0])
      return
    }
    setActiveTemplate(template)
  }

  const resetFilters = () => {
    setSearch("")
    setCategory(null)
    setPage(1)
  }

  const selectedForTemplate = (templateId: string) =>
    selectedTemplates.filter((item) => item.templateId === templateId)

  const isEmptyDataset = templates.length === 0
  const isNoResults = !isEmptyDataset && sorted.length === 0

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="sticky top-[98px] md:top-[110px] z-20  bg-white/200 backdrop-blur supports-[backdrop-filter]:bg-white/200">
        <div className="px-3 sm:px-4 md:px-6 py-2">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <div className="h-8 sm:h-9 w-full lg:w-52 rounded-lg bg-slate-900 text-white px-3 flex items-center justify-between shrink-0">
              <span className="text-[11px] sm:text-xs opacity-90">قالب‌های انتخاب‌شده</span>
              <span className="text-sm sm:text-base font-bold tabular-nums">
                {selectedTemplates.length}
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 flex-1">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1)
                  }}
                  placeholder="جستجوی قالب..."
                  className="h-9 w-full rounded-lg bg-slate-50 pr-8 pl-3 text-xs sm:text-sm text-slate-800 outline-none transition focus:bg-white focus:ring-2 focus:ring-slate-200"
                  aria-label="جستجوی قالب"
                />
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCategoryMenu((v) => !v)}
                  className="h-9 w-9 rounded-lg border border-slate-200 bg-white text-slate-600 grid place-items-center hover:bg-slate-50 transition"
                  aria-label="فیلتر دسته‌بندی"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </button>

                {showCategoryMenu && (
                  <div className="absolute left-0 mt-2 min-w-44 rounded-xl border border-slate-200 bg-white shadow-lg p-1 z-30">
                    <button
                      type="button"
                      onClick={() => {
                        setCategory(null)
                        setPage(1)
                        setShowCategoryMenu(false)
                      }}
                      className={`w-full rounded-lg px-3 py-2 text-right text-xs sm:text-sm transition ${
                        category === null
                          ? "bg-slate-100 text-slate-900"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      همه دسته‌ها
                    </button>

                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setCategory(cat)
                          setPage(1)
                          setShowCategoryMenu(false)
                        }}
                        className={`w-full rounded-lg px-3 py-2 text-right text-xs sm:text-sm transition ${
                          category === cat
                            ? "bg-slate-100 text-slate-900"
                            : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {(search || category) && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="h-9 w-9 rounded-lg border border-slate-200 bg-white text-slate-500 grid place-items-center hover:bg-slate-50 transition"
                  aria-label="پاک کردن فیلترها"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 pb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-slate-800">انتخاب قالب</h2>
          <p className="text-[11px] sm:text-xs text-slate-500">{sorted.length} قالب یافت شد</p>
        </div>

        {isEmptyDataset && (
          <div className="rounded-xl border border-slate-200 bg-white py-16 text-center text-sm text-slate-500">
            هیچ قالبی برای نمایش وجود ندارد.
          </div>
        )}

        {isNoResults && (
          <div className="rounded-xl border border-slate-200 bg-white py-16 text-center">
            <p className="text-sm text-slate-500">قالبی مطابق فیلتر شما یافت نشد.</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-xs sm:text-sm text-white hover:bg-slate-800 transition"
            >
              بازنشانی فیلترها
            </button>
          </div>
        )}

        {!isEmptyDataset && !isNoResults && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3.5 lg:gap-4">
              {paginatedItems.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  selectedCount={countSelectedForTemplate(selectedTemplates, template.id)}
                  onOpenSizes={handleOpenTemplate}
                  onOpenSelected={setSelectedManageTemplate}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-5 flex justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const n = i + 1
                  const active = n === page
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setPage(n)}
                      className={`h-8 min-w-8 sm:h-9 sm:min-w-9 rounded-lg text-xs sm:text-sm transition ${
                        active
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                      aria-label={`رفتن به صفحه ${n}`}
                      aria-current={active ? "page" : undefined}
                    >
                      {n}
                    </button>
                  )
                })}
              </div>
            )}
          </>
        )}
      </section>

      {activeTemplate && (
        <TemplateSizeModal
          template={activeTemplate}
          onClose={() => setActiveTemplate(null)}
          onAddSize={(size) => handleAddSize(activeTemplate, size)}
        />
      )}

      {selectedManageTemplate && (
        <SelectedTemplateSizesModal
          template={selectedManageTemplate}
          selectedItems={selectedForTemplate(selectedManageTemplate.id)}
          onClose={() => setSelectedManageTemplate(null)}
          onRemove={removeTemplateFromSelection}
        />
      )}
    </div>
  )
}
