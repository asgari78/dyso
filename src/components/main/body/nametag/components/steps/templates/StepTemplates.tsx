"use client"

import { useState } from "react"
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

import { useTemplateFilters } from "../../../hooks/useTemplateFilters"
import { useTemplatePagination } from "../../../hooks/useTemplatePagination"

import {
  countSelectedForTemplate,
  sortTemplatesPinnedFirst,
  extractCategories,
} from "../../../utils/templateHelpers"

const PAGE_SIZE = 8

export default function StepTemplates() {
  const { builder, addTemplateToSelection } = useNametagBuilder()
  const selectedTemplates = builder.selectedTemplates

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [activeTemplate, setActiveTemplate] =
    useState<Template | null>(null)

  /* ---------------- Filters ---------------- */

  const filtered = useTemplateFilters({
    templates: mockTemplates,
    search,
    category,
  })

  const sorted = sortTemplatesPinnedFirst(
    filtered,
    selectedTemplates
  )

  /* ---------------- Pagination ---------------- */

  const { totalPages, paginatedItems } =
    useTemplatePagination({
      items: sorted,
      page,
      pageSize: PAGE_SIZE,
    })

  const categories = extractCategories(mockTemplates)

  /* ---------------- Handlers ---------------- */

  const handleAddSize = (
    template: Template,
    size: TemplateSize
  ) => {
    const selected: SelectedTemplate = {
      id: uuidv4(),
      templateId: template.id,
      templateName: template.name,
      sizeId: size.id,
      widthMm: size.widthMm,
      heightMm: size.heightMm,
      previewImage: size.previewImage,
    }

    addTemplateToSelection(selected)
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10">

        {/* ================= Sidebar ================= */}

        <aside className="space-y-6 md:sticky md:top-[140px] h-fit">

          {/* Selected Count Badge */}

          <div className="rounded-xl p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-sm text-center">

            <p className="text-xs text-gray-500 mb-1">
              قالب‌های انتخاب‌شده
            </p>

            <div className="text-2xl font-bold text-blue-600">
              {selectedTemplates.length}
            </div>

          </div>

          {/* Search */}

          <div className="w-full bg-white border rounded-xl p-4 space-y-3 shadow-sm">

            <h3 className="text-sm font-semibold text-gray-700">
              جستجو
            </h3>

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder="نام قالب را وارد کنید..."
              className="w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

          </div>

          {/* Category */}

          <div className="w-full bg-white border rounded-xl p-4 space-y-3 shadow-sm">

            <h3 className="text-sm font-semibold text-gray-700">
              دسته‌بندی
            </h3>

            <select
              value={category ?? ""}
              onChange={(e) => {
                setCategory(e.target.value || null)
                setPage(1)
              }}
              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">همه دسته‌ها</option>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

          </div>

        </aside>

        {/* ================= Templates Section ================= */}

        <section className="space-y-8">

          {/* Grid */}

          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            2xl:grid-cols-4
            gap-6
            "
          >
            {paginatedItems.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                selectedCount={countSelectedForTemplate(
                  selectedTemplates,
                  template.id
                )}
                onOpenSizes={setActiveTemplate}
              />
            ))}
          </div>

          {/* Empty State */}

          {paginatedItems.length === 0 && (
            <div className="text-center py-20 text-gray-400 text-sm">
              قالبی مطابق فیلتر شما یافت نشد
            </div>
          )}

          {/* Pagination */}

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-6">

              {Array.from({ length: totalPages }).map((_, i) => {

                const isActive = page === i + 1

                return (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`
                    min-w-[36px] h-[36px]
                    text-sm rounded-lg
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md scale-105"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }
                    `}
                  >
                    {i + 1}
                  </button>
                )
              })}

            </div>
          )}

        </section>

      </div>

      {/* ================= Modal ================= */}

      {activeTemplate && (
        <TemplateSizeModal
          template={activeTemplate}
          onClose={() => setActiveTemplate(null)}
          onAddSize={(size) =>
            handleAddSize(activeTemplate, size)
          }
        />
      )}

    </div>
  )
}
