/* =========================================
   Base Units
========================================= */

export type Mm = number

/* =========================================
   Template Domain
========================================= */

export type TemplateId = string

export type TemplateCategory =
  | "kids"
  | "sports"
  | "fantasy"
  | "minimal"
  | "modern"
  | "science"
  | "nature"

export type TemplateTag = string

/* =========================================
   Template Sizes
========================================= */

export type TemplateSizeId =
  | "pencil"
  | "notebook"
  | "book"
  | "bottle"
  | "bag"

export interface TemplateSize {
  id: TemplateSizeId
  label: string

  /** ابعاد واقعی برچسب */
  widthMm: Mm
  heightMm: Mm

  /** تصویر پیش‌نمایش مخصوص همین سایز */
  previewImage: string
}

/* =========================================
   Template
========================================= */

export interface Template {
  id: TemplateId
  name: string

  /** تصویر کاور اصلی قالب */
  previewImage: string

  category: TemplateCategory
  tags: TemplateTag[]

  /** سایزهای قابل انتخاب برای این قالب */
  sizes: TemplateSize[]
}

/* =========================================
   Selected Template
   (قالبی که کاربر انتخاب کرده)
========================================= */

export interface SelectedTemplate {
  id: string
  templateId: TemplateId
  templateName: string
  sizeId: TemplateSizeId
  widthMm: Mm
  heightMm: Mm
  previewImage: string
}

/* =========================================
   Students
========================================= */

export interface Student {
  id: string
  firstName: string
  lastName: string
  className?: string
  teacher?: string
  school?: string
  photoUrl?: string
}

/* =========================================
   A4 Sheet
========================================= */

export interface SheetSize {
  widthMm: Mm
  heightMm: Mm
}

export const A4_SIZE: SheetSize = {
  widthMm: 210,
  heightMm: 297,
}

/* =========================================
   Grid System For A4 Layout
========================================= */

export interface GridCell {
  row: number
  col: number
  xMm: Mm
  yMm: Mm
  widthMm: Mm
  heightMm: Mm
  isOccupied: boolean
}

/* =========================================
   Drop Zone
========================================= */

export interface DropZone {
  id: string
  xMm: Mm
  yMm: Mm
  widthMm: Mm
  heightMm: Mm
  isAvailable: boolean
}

/* =========================================
   Sheet Item (Label on A4)
========================================= */

export interface SheetItemPosition {
  xMm: Mm
  yMm: Mm
  widthMm: Mm
  heightMm: Mm
}

export interface SheetItem {
  id: string
  templateId: TemplateId
  templateSizeId: TemplateSizeId
  selectedTemplateId: string
  studentId?: string
  position: SheetItemPosition
}

/* =========================================
   Sheet
========================================= */

export interface Sheet {
  id: string
  name: string
  items: SheetItem[]
  grid?: GridCell[]
}

/* =========================================
   Layout Preview State
========================================= */

export interface LayoutPreviewState {
  draggingTemplate?: SelectedTemplate
  availableDropZones: DropZone[]
}

/* =========================================
   Pricing
========================================= */

export interface PricingBreakdown {
  sheetCount: number
  labelCount: number
  pricePerSheet: number
  totalPrice: number
}

/* =========================================
   Order Summary
========================================= */

export interface OrderSummary {
  selectedTemplates: SelectedTemplate[]
  students: Student[]
  sheets: Sheet[]
  pricing: PricingBreakdown
}

/* =========================================
   Stepper
========================================= */

export type NametagStep =
  | "templates"
  | "students"
  | "layout"
  | "checkout"
