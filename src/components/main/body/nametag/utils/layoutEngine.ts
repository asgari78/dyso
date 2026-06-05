import { SheetItem, Sheet } from "../types/nametag.types"
import { v4 as uuidv4 } from "uuid"

export const createEmptySheet = (index: number = 1): Sheet => ({
  id: uuidv4(),
  name: `Sheet ${index}`,
  items: [],
})


export const addItemToSheet = (
  sheet: Sheet,
  item: Omit<SheetItem, "id">
): Sheet => {
  const newItem: SheetItem = {
    id: uuidv4(),
    ...item,
  }

  return {
    ...sheet,
    items: [...sheet.items, newItem],
  }
}

export const removeItemFromSheet = (
  sheet: Sheet,
  itemId: string
): Sheet => {
  return {
    ...sheet,
    items: sheet.items.filter((i) => i.id !== itemId),
  }
}

export const assignStudentToItem = (
  sheet: Sheet,
  itemId: string,
  studentId: string
): Sheet => {
  return {
    ...sheet,
    items: sheet.items.map((item) =>
      item.id === itemId
        ? { ...item, studentId }
        : item
    ),
  }
}