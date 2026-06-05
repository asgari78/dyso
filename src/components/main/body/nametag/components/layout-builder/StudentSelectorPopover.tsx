"use client"

import { useNametagBuilder } from "../../hooks/useNametagBuilder"
import { useA4Layout } from "../../hooks/useA4Layout"

interface Props {
  sheetId: string
  itemId: string
  onClose: () => void
}

export default function StudentSelectorPopover({
  sheetId,
  itemId,
  onClose,
}: Props) {
  const { builder } = useNametagBuilder()
  const { assignStudent } = useA4Layout()

  const handleSelect = (studentId: string) => {
    assignStudent(sheetId, itemId, studentId)
    onClose()
  }

  return (
    <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-lg p-3 w-64 z-50">

      <div className="text-sm font-medium mb-2">
        انتخاب دانش‌آموز
      </div>

      <div className="max-h-60 overflow-auto space-y-1">
        {builder.students.map((student) => (
          <button
            key={student.id}
            onClick={() => handleSelect(student.id)}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
          >
            {student.firstName} {student.lastName}
          </button>
        ))}
      </div>

    </div>
  )
}
