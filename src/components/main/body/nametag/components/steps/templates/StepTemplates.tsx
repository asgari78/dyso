"use client"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

import { mockTemplates } from "../../../data/mockTemplates"
import { Template, TemplateSize, SelectedTemplate } from "../../../types/nametag.types"

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

  /* filters */

  const filtered = useTemplateFilters({
    templates: mockTemplates,
    search,
    category,
  })

  const sorted = sortTemplatesPinnedFirst(
    filtered,
    selectedTemplates
  )

  /* pagination */

  const { totalPages, paginatedItems } =
    useTemplatePagination({
      items: sorted,
      page,
      pageSize: PAGE_SIZE,
    })

  const categories = extractCategories(mockTemplates)

  /* handlers */

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

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          انتخاب قالب
        </h2>

        <span className="text-sm text-gray-500">
          {selectedTemplates.length} مورد انتخاب شده
        </span>
      </div>

      {/* Search */}

      <div className="flex gap-4">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجو..."
          className="px-4 py-2 rounded-xl"
        />

        <select
          value={category ?? ""}
          onChange={(e) =>
            setCategory(e.target.value || null)
          }
          className="px-4 py-2 rounded-xl"
        >
          <option value="">همه</option>

          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

      </div>

      {/* Grid */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

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

      {/* Pagination */}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">

          {Array.from({ length: totalPages }).map(
            (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded-lg
                ${
                  page === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }
                `}
              >
                {i + 1}
              </button>
            )
          )}

        </div>
      )}

      {/* Size Modal */}

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
