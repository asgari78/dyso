"use client"

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { v4 as uuidv4 } from "uuid"

import {
  createSheet,
  deleteSheet,
  setActiveSheet,
  addSheetItem,
  updateSheetItem,
  removeSheetItem,
} from "../../../../../store/slices/nametagBuilderSlice"

import { SheetItem } from "../types/nametag.types"

export const useA4Layout = () => {
  const dispatch = useDispatch()

  const { sheets, activeSheetId } = useSelector(
    (state: RootState) => state.nametagBuilder
  )

  /* =========================
     Sheet Management
  ========================= */

  const addSheet = () => {
    const id = uuidv4()

    dispatch(
      createSheet({
        id,
        name: `Sheet ${sheets.length + 1}`,
      })
    )
  }

  const removeSheet = (sheetId: string) => {
    dispatch(deleteSheet(sheetId))
  }

  const setActive = (sheetId: string) => {
    dispatch(setActiveSheet(sheetId))
  }

  /* =========================
     Item Management
  ========================= */

  const addItem = (
    sheetId: string,
    item: Omit<SheetItem, "id">
  ) => {
    dispatch(
      addSheetItem({
        sheetId,
        item: {
          ...item,
          id: uuidv4(),
        },
      })
    )
  }

  const updateItem = (
    sheetId: string,
    itemId: string,
    updates: Partial<SheetItem>
  ) => {
    dispatch(
      updateSheetItem({
        sheetId,
        itemId,
        updates,
      })
    )
  }

  const removeItem = (sheetId: string, itemId: string) => {
    dispatch(
      removeSheetItem({
        sheetId,
        itemId,
      })
    )
  }

  return {
    sheets,
    activeSheetId,

    addSheet,
    removeSheet,
    setActive,

    addItem,
    updateItem,
    removeItem,
  }
}
