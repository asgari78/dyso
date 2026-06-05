"use client"

import SheetWorkspace from "../layout-builder/SheetWorkspace"
import SheetToolbar from "../layout-builder/SheetToolbar"

export default function StepLayout() {
  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold">
        چیدمان روی برگه A4
      </h2>

      <SheetToolbar />

      <div className="overflow-auto border rounded-xl p-6 bg-gray-50">
        <SheetWorkspace />
      </div>

    </div>
  )
}
