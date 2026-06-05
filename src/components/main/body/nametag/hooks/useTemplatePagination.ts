import { useMemo } from "react"

interface Props<T> {
  items: T[]
  page: number
  pageSize: number
}

export const useTemplatePagination = <T>({
  items,
  page,
  pageSize,
}: Props<T>) => {
  const totalPages = Math.ceil(items.length / pageSize)

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize
    return items.slice(start, start + pageSize)
  }, [items, page, pageSize])

  return {
    totalPages,
    paginatedItems,
  }
}
