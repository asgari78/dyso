import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import {
  NametagStep,
  SelectedTemplate,
  Student,
  Sheet,
  SheetItem,
  LayoutPreviewState,
  OrderSummary,
} from "../../components/main/body/nametag/types/nametag.types"

interface NametagBuilderState {
  step: NametagStep

  selectedTemplates: SelectedTemplate[]

  students: Student[]

  sheets: Sheet[]

  activeSheetId: string | null

  layoutPreview: LayoutPreviewState

  orderSummary: OrderSummary | null
}

const initialState: NametagBuilderState = {
  step: "templates",

  selectedTemplates: [],

  students: [],

  sheets: [],

  activeSheetId: null,

  layoutPreview: {
    draggingTemplate: undefined,
    availableDropZones: [],
  },

  orderSummary: null,
}

const nametagBuilderSlice = createSlice({
  name: "nametagBuilder",

  initialState,

  reducers: {
    /* =========================
       Stepper
    ========================= */

    setStep(state, action: PayloadAction<NametagStep>) {
      state.step = action.payload
    },

    nextStep(state) {
      const steps: NametagStep[] = [
        "templates",
        "students",
        "layout",
        "checkout",
      ]

      const currentIndex = steps.indexOf(state.step)

      if (currentIndex < steps.length - 1) {
        state.step = steps[currentIndex + 1]
      }
    },

    prevStep(state) {
      const steps: NametagStep[] = [
        "templates",
        "students",
        "layout",
        "checkout",
      ]

      const currentIndex = steps.indexOf(state.step)

      if (currentIndex > 0) {
        state.step = steps[currentIndex - 1]
      }
    },

    /* =========================
       Selected Templates
    ========================= */

    addSelectedTemplate(state, action: PayloadAction<SelectedTemplate>) {
      state.selectedTemplates.push(action.payload)
    },

    removeSelectedTemplate(state, action: PayloadAction<string>) {
      state.selectedTemplates = state.selectedTemplates.filter(
        (t) => t.id !== action.payload
      )
    },

    clearSelectedTemplates(state) {
      state.selectedTemplates = []
    },

    /* =========================
       Students
    ========================= */

    addStudent(state, action: PayloadAction<Student>) {
      state.students.push(action.payload)
    },

    updateStudent(state, action: PayloadAction<Student>) {
      const index = state.students.findIndex(
        (s) => s.id === action.payload.id
      )

      if (index !== -1) {
        state.students[index] = action.payload
      }
    },

    removeStudent(state, action: PayloadAction<string>) {
      state.students = state.students.filter(
        (s) => s.id !== action.payload
      )
    },

    clearStudents(state) {
      state.students = []
    },

    /* =========================
       Sheets
    ========================= */

    createSheet(state, action: PayloadAction<{ id: string; name: string }>) {
      const newSheet: Sheet = {
        id: action.payload.id,
        name: action.payload.name,
        items: [],
      }

      state.sheets.push(newSheet)

      if (!state.activeSheetId) {
        state.activeSheetId = newSheet.id
      }
    },

    deleteSheet(state, action: PayloadAction<string>) {
      state.sheets = state.sheets.filter(
        (sheet) => sheet.id !== action.payload
      )

      if (state.activeSheetId === action.payload) {
        state.activeSheetId = state.sheets[0]?.id || null
      }
    },

    setActiveSheet(state, action: PayloadAction<string>) {
      state.activeSheetId = action.payload
    },

    clearSheets(state) {
      state.sheets = []
      state.activeSheetId = null
    },

    /* =========================
       Sheet Items (Labels)
    ========================= */

    addSheetItem(
      state,
      action: PayloadAction<{ sheetId: string; item: SheetItem }>
    ) {
      const sheet = state.sheets.find(
        (s) => s.id === action.payload.sheetId
      )

      if (!sheet) return

      sheet.items.push(action.payload.item)
    },

    updateSheetItem(
      state,
      action: PayloadAction<{
        sheetId: string
        itemId: string
        updates: Partial<SheetItem>
      }>
    ) {
      const sheet = state.sheets.find(
        (s) => s.id === action.payload.sheetId
      )

      if (!sheet) return

      const item = sheet.items.find(
        (i) => i.id === action.payload.itemId
      )

      if (!item) return

      Object.assign(item, action.payload.updates)
    },

    removeSheetItem(
      state,
      action: PayloadAction<{ sheetId: string; itemId: string }>
    ) {
      const sheet = state.sheets.find(
        (s) => s.id === action.payload.sheetId
      )

      if (!sheet) return

      sheet.items = sheet.items.filter(
        (item) => item.id !== action.payload.itemId
      )
    },

    clearSheetItems(state, action: PayloadAction<string>) {
      const sheet = state.sheets.find(
        (s) => s.id === action.payload
      )

      if (!sheet) return

      sheet.items = []
    },

    /* =========================
       Layout Drag Preview
    ========================= */

    startDraggingTemplate(
      state,
      action: PayloadAction<SelectedTemplate>
    ) {
      state.layoutPreview.draggingTemplate = action.payload
    },

    stopDraggingTemplate(state) {
      state.layoutPreview.draggingTemplate = undefined
      state.layoutPreview.availableDropZones = []
    },

    setAvailableDropZones(state, action) {
      state.layoutPreview.availableDropZones = action.payload
    },

    /* =========================
       Order Summary
    ========================= */

    generateOrderSummary(state, action: PayloadAction<OrderSummary>) {
      state.orderSummary = action.payload
    },

    clearOrderSummary(state) {
      state.orderSummary = null
    },

    /* =========================
       Reset Builder
    ========================= */

    reremoveTemplateFromSelection() {
      return initialState
    },
  },
})

export const {
  setStep,
  nextStep,
  prevStep,

  addSelectedTemplate,
  removeSelectedTemplate,
  clearSelectedTemplates,

  addStudent,
  updateStudent,
  removeStudent,
  clearStudents,

  createSheet,
  deleteSheet,
  setActiveSheet,
  clearSheets,

  addSheetItem,
  updateSheetItem,
  removeSheetItem,
  clearSheetItems,

  startDraggingTemplate,
  stopDraggingTemplate,
  setAvailableDropZones,

  generateOrderSummary,
  clearOrderSummary,

  reremoveTemplateFromSelection,
} = nametagBuilderSlice.actions

export default nametagBuilderSlice.reducer
