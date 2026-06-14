"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { v4 as uuidv4 } from "uuid"

import { mockTemplates } from "../../../data/mockTemplates"
import {
  Template,
  TemplateSize,
  SelectedTemplate,
} from "../../../types/nametag.types"

import { useNametagBuilder } from "../../../hooks/useNametagBuilder"

import TemplateCard from "./TemplateCard"
import TemplateSizeModal from "./TemplateSizeModal"
import SelectedTemplateSizesModal from "./SelectedTemplateSizesModal"

import { useTemplateFilters } from "../../../hooks/useTemplateFilters"
import { useTemplatePagination } from "../../../hooks/useTemplatePagination"

import {
  countSelectedForTemplate,
  sortTemplatesPinnedFirst,
  extractCategories,
} from "../../../utils/templateHelpers"

const PAGE_SIZE = 12

type ViewState = "ready" | "empty-dataset" | "no-results"

export default function StepTemplates() {
const { builder, addTemplateToSelection, removeTemplateFromSelection } = useNametagBuilder()




  const selectedTemplates = builder.selectedTemplates

  /** ---------------- Local UI State ---------------- */
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  // مودال انتخاب سایز (افزودن)
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(null)

  // مودال مدیریت انتخاب‌های ثبت شده
  const [selectedManageTemplate, setSelectedManageTemplate] =
    useState<Template | null>(null)

  /** ---------------- Data Source ---------------- */
  const templates = mockTemplates

  /** ---------------- Derived Data ---------------- */
  const categories = useMemo(() => extractCategories(templates), [templates])

  const filtered = useTemplateFilters({
    templates,
    search,
    category,
  })

  const sorted = useMemo(
    () => sortTemplatesPinnedFirst(filtered, selectedTemplates),
    [filtered, selectedTemplates]
  )

  const { totalPages, paginatedItems } = useTemplatePagination({
    items: sorted,
    page,
    pageSize: PAGE_SIZE,
  })

  const viewState: ViewState = useMemo(() => {
    if (templates.length === 0) return "empty-dataset"
    if (sorted.length === 0) return "no-results"
    return "ready"
  }, [templates.length, sorted.length])

  /** ---------------- Guards ---------------- */
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  /** ---------------- Builders ---------------- */
  const buildSelectedTemplate = useCallback(
    (template: Template, size: TemplateSize): SelectedTemplate => ({
      id: uuidv4(),
      templateId: template.id,
      templateName: template.name,
      sizeId: size.id,
      widthMm: size.widthMm,
      heightMm: size.heightMm,
      previewImage: size.previewImage || template.previewImage,
    }),
    []
  )

  /** ---------------- Handlers ---------------- */
  const handleAddSize = useCallback(
    (template: Template, size: TemplateSize) => {
      const selected = buildSelectedTemplate(template, size)
      addTemplateToSelection(selected)
    },
    [addTemplateToSelection, buildSelectedTemplate]
  )

  /**
   * کلیک روی کل کارت:
   * اگر یک سایز داشت => مستقیم اضافه شود
   * اگر چند سایز داشت => مودال انتخاب سایز باز شود
   */
  const handleOpenTemplate = useCallback(
    (template: Template) => {
      if (template.sizes.length === 1) {
        handleAddSize(template, template.sizes[0])
        return
      }
      setActiveTemplate(template)
    },
    [handleAddSize]
  )

  /**
   * کلیک روی فوتر انتخاب‌ها در کارت:
   * مودال مدیریت انتخاب‌های همان قالب باز شود
   */
  const handleOpenSelected = useCallback((template: Template) => {
    setSelectedManageTemplate(template)
  }, [])

  const handleCloseSelected = useCallback(() => {
    setSelectedManageTemplate(null)
  }, [])

const handleRemoveSelected = useCallback(
  (selectedTemplateId: string) => {
    removeTemplateFromSelection(selectedTemplateId)
  },
  [removeTemplateFromSelection]
)




  const getSelectedForTemplate = useCallback(
    (templateId: string) =>
      selectedTemplates.filter((item) => item.templateId === templateId),
    [selectedTemplates]
  )

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
    setPage(1)
  }, [])

  const handleCategoryChange = useCallback((value: string) => {
    setCategory(value || null)
    setPage(1)
  }, [])

  const handleResetFilters = useCallback(() => {
    setSearch("")
    setCategory(null)
    setPage(1)
  }, [])

  /** ---------------- UI ---------------- */
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr] lg:gap-10">
        {/* ================= Sidebar ================= */}
        <aside className="h-fit space-y-5 md:sticky md:top-[140px]">
          {/* Selected Count */}
          <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 text-center shadow-sm">
            <p className="mb-1 text-xs text-gray-500">قالب‌های انتخاب‌شده</p>
            <div className="text-2xl font-bold text-blue-600">
              {selectedTemplates.length}
            </div>
          </div>

          {/* Search */}
          <div className="w-full space-y-3 rounded-xl border bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700">جستجو</h3>
            <input
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="نام قالب را وارد کنید..."
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500"
              aria-label="جستجوی قالب"
            />
          </div>

          {/* Category */}
          <div className="w-full space-y-3 rounded-xl border bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700">دسته‌بندی</h3>
            <select
              value={category ?? ""}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm transition focus:ring-2 focus:ring-blue-500"
              aria-label="فیلتر دسته‌بندی قالب"
            >
              <option value="">همه دسته‌ها</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleResetFilters}
              className="w-full rounded-lg bg-gray-100 py-2 text-sm text-gray-700 transition hover:bg-gray-200"
            >
              پاک کردن فیلترها
            </button>
          </div>
        </aside>

        {/* ================= Templates Section ================= */}
        <section className="space-y-6">
          {/* Top Summary */}
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-800 md:text-lg">
              انتخاب قالب
            </h2>
            <p className="text-xs text-gray-500 md:text-sm">
              {sorted.length} قالب یافت شد
            </p>
          </div>

          {/* Empty dataset */}
          {viewState === "empty-dataset" && (
            <div className="rounded-xl border bg-white py-20 text-center text-gray-500">
              هیچ قالبی برای نمایش وجود ندارد.
            </div>
          )}

          {/* No results */}
          {viewState === "no-results" && (
            <div className="space-y-2 rounded-xl border bg-white py-20 text-center text-gray-500">
              <p>قالبی مطابق فیلتر شما یافت نشد.</p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
              >
                بازنشانی فیلترها
              </button>
            </div>
          )}

          {/* Grid */}
          {viewState === "ready" && (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {paginatedItems.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    selectedCount={countSelectedForTemplate(
                      selectedTemplates,
                      template.id
                    )}
                    onOpenSizes={handleOpenTemplate}
                    onOpenSelected={handleOpenSelected}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 pt-2 md:pt-4">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNumber = i + 1
                    const isActive = page === pageNumber

                    return (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() => setPage(pageNumber)}
                        className={`h-[36px] min-w-[36px] rounded-lg text-sm transition-all duration-200 ${
                          isActive
                            ? "scale-105 bg-blue-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        aria-label={`رفتن به صفحه ${pageNumber}`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {pageNumber}
                      </button>
                    )
                  })}
                </div>
              )}
            </>
          )}
        </section>
      </div>

      {/* ================= Modal: Add Size ================= */}
      {activeTemplate && (
        <TemplateSizeModal
          template={activeTemplate}
          onClose={() => setActiveTemplate(null)}
          onAddSize={(size) => handleAddSize(activeTemplate, size)}
        />
      )}

      {/* ================= Modal: Manage Selected Sizes ================= */}
      {selectedManageTemplate && (
        <SelectedTemplateSizesModal
          template={selectedManageTemplate}
          selectedItems={getSelectedForTemplate(selectedManageTemplate.id)}
          onClose={handleCloseSelected}
          onRemove={handleRemoveSelected}
        />
      )}
    </div>
  )
}