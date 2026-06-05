import { Template, SelectedTemplate } from "@/components/main/body/nametag/types/nametag.types"

/* ===============================
   Count Selected For Template
================================ */

export const countSelectedForTemplate = (
  selected: SelectedTemplate[],
  templateId: string
) => {
  return selected.filter((t) => t.templateId === templateId).length
}

/* ===============================
   Get Selected Items For Template
================================ */

export const getSelectedForTemplate = (
  selected: SelectedTemplate[],
  templateId: string
) => {
  return selected.filter((t) => t.templateId === templateId)
}

/* ===============================
   Pin Selected Templates
================================ */

export const sortTemplatesPinnedFirst = (
  templates: Template[],
  selected: SelectedTemplate[]
) => {
  const selectedIds = new Set(selected.map((t) => t.templateId))

  const pinned = templates.filter((t) => selectedIds.has(t.id))
  const rest = templates.filter((t) => !selectedIds.has(t.id))

  return [...pinned, ...rest]
}

/* ===============================
   Extract Categories
================================ */

export const extractCategories = (templates: Template[]) => {
  const set = new Set<string>()

  templates.forEach((t) => {
    if (t.category) set.add(t.category)
  })

  return Array.from(set)
}
