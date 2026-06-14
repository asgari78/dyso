import {
  Template,
  TemplateCategory,
  TemplateId,
  SelectedTemplate,
} from "../types/nametag.types"

/* ===============================
   Count Selected For Template
================================ */

export const countSelectedForTemplate = (
  selected: readonly SelectedTemplate[],
  templateId: TemplateId
): number => selected.reduce((acc, item) => acc + (item.templateId === templateId ? 1 : 0), 0)

/* ===============================
   Get Selected Items For Template
================================ */

export const getSelectedForTemplate = (
  selected: readonly SelectedTemplate[],
  templateId: TemplateId
): SelectedTemplate[] => selected.filter((item) => item.templateId === templateId)

/* ===============================
   Pin Selected Templates
================================ */

export const sortTemplatesPinnedFirst = (
  templates: readonly Template[],
  selected: readonly SelectedTemplate[]
): Template[] => {
  if (templates.length <= 1 || selected.length === 0) return [...templates]

  const selectedIds = new Set<TemplateId>(selected.map((item) => item.templateId))

  return [...templates].sort((a, b) => {
    const aPinned = selectedIds.has(a.id) ? 1 : 0
    const bPinned = selectedIds.has(b.id) ? 1 : 0

    // پین‌شده‌ها اول
    if (aPinned !== bPinned) return bPinned - aPinned

    // ترتیب پایدار و قابل پیش‌بینی برای UX بهتر
    return a.name.localeCompare(b.name)
  })
}

/* ===============================
   Extract Categories
================================ */

export const extractCategories = (
  templates: readonly Template[]
): TemplateCategory[] => {
  const set = new Set<TemplateCategory>()

  for (const template of templates) {
    set.add(template.category) // category الان اجباری است
  }

  return Array.from(set)
}
