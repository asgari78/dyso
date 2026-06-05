import { useMemo } from "react"
import { Template } from "@/components/main/body/nametag/types/nametag.types"

interface Props {
  templates: Template[]
  search: string
  category: string | null
}

export const useTemplateFilters = ({
  templates,
  search,
  category,
}: Props) => {
  const filtered = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch =
        template.name.toLowerCase().includes(search.toLowerCase()) ||
        template.tags?.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        )

      const matchesCategory =
        !category || template.category === category

      return matchesSearch && matchesCategory
    })
  }, [templates, search, category])

  return filtered
}
