/* =========================================
   Base Units
========================================= */

export type Mm = number

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

  /* ابعاد واقعی برچسب */
  widthMm: Mm
  heightMm: Mm

  /* تصویر پیش نمایش */
  previewImage: string
}

/* =========================================
   Template
========================================= */

export interface Template {
  id: string

  name: string

  previewImage: string

  category?: string

  tags?: string[]

  /* سایزهایی که این قالب دارد */
  sizes: TemplateSize[]
}

/* =========================================
   Selected Template
   (قالبی که کاربر انتخاب کرده)
========================================= */

export interface SelectedTemplate {
  id: string

  templateId: string

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

  teacherName?: string

  schoolName?: string

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

/*
این Grid کمک می‌کند
جای خالی برای Drop شدن برچسب‌ها
را محاسبه کنیم
*/

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

  /* آیا قابل قرار دادن برچسب هست */
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

  templateId: string

  templateSizeId: TemplateSizeId

  selectedTemplateId: string

  /* دانش آموزی که روی برچسب چاپ می‌شود */
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

  /* grid برای نمایش drop zones */
  grid?: GridCell[]
}

/* =========================================
   Layout Preview State
========================================= */

export interface LayoutPreviewState {
  draggingTemplate?: SelectedTemplate

  /* Drop zone هایی که هنگام drag نشان داده می‌شوند */
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
