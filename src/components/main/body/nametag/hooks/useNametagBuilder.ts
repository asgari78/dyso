"use client"

import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "../../../../../store/store"

import {
  setStep,
  nextStep,
  prevStep,

  addSelectedTemplate,
  removeSelectedTemplate,
  clearSelectedTemplates,

  addStudent,
  updateStudent,
  removeStudent,

  createSheet,
  deleteSheet,
  setActiveSheet,

  addSheetItem,
  removeSheetItem,
  updateSheetItem,

  generateOrderSummary,
} from "../../../../../store/slices/nametagBuilderSlice"

import {
  SelectedTemplate,
  Student,
  SheetItem,
  NametagStep,
} from "../types/nametag.types"

export const useNametagBuilder = () => {
  const dispatch = useDispatch<AppDispatch>()

  const builder = useSelector(
    (state: RootState) => state.nametagBuilder
  )

  /* =====================
     Stepper
  ===================== */

  const goToStep = (step: NametagStep) => {
    dispatch(setStep(step))
  }

  const next = () => dispatch(nextStep())

  const prev = () => dispatch(prevStep())

  /* =====================
     Templates
  ===================== */

  const addTemplateToSelection = (template: SelectedTemplate) => {
    dispatch(addSelectedTemplate(template))
  }

  const removeTemplateFromSelection = (id: string) => {
    dispatch(removeSelectedTemplate(id))
  }

  const clearTemplates = () => {
    dispatch(clearSelectedTemplates())
  }

  
  /* =====================
     Students
  ===================== */

  const addNewStudent = (student: Student) => {
    dispatch(addStudent(student))
  }

  const updateStudentInfo = (student: Student) => {
    dispatch(updateStudent(student))
  }

  const deleteStudent = (id: string) => {
    dispatch(removeStudent(id))
  }

  /* =====================
     Sheets
  ===================== */

  const createNewSheet = (id: string, name: string) => {
    dispatch(createSheet({ id, name }))
  }

  const setActiveSheetId = (id: string) => {
    dispatch(setActiveSheet(id))
  }

  const deleteSheetById = (id: string) => {
    dispatch(deleteSheet(id))
  }

  /* =====================
     Sheet Items
  ===================== */

  const addLabelToSheet = (sheetId: string, item: SheetItem) => {
    dispatch(addSheetItem({ sheetId, item }))
  }

  const removeLabelFromSheet = (sheetId: string, itemId: string) => {
    dispatch(removeSheetItem({ sheetId, itemId }))
  }

  const updateLabelInSheet = (
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

  /* =====================
     Order Summary
  ===================== */

  const setOrderSummary = (summary: any) => {
    dispatch(generateOrderSummary(summary))
  }

  return {
    builder,

    step: builder.step,

    selectedTemplates: builder.selectedTemplates,

    students: builder.students,

    sheets: builder.sheets,

    activeSheetId: builder.activeSheetId,

    orderSummary: builder.orderSummary,

    goToStep,
    next,
    prev,

    addTemplateToSelection,
    removeTemplateFromSelection,
    clearTemplates,

    addNewStudent,
    updateStudentInfo,
    deleteStudent,

    createNewSheet,
    setActiveSheetId,
    deleteSheetById,

    addLabelToSheet,
    removeLabelFromSheet,
    updateLabelInSheet,

    setOrderSummary,
  }
}
