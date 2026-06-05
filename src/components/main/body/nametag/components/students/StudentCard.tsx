"use client"

import { Student } from "../../types/nametag.types"
import { useNametagBuilder } from "../../hooks/useNametagBuilder"

interface Props {
  student: Student
}

export default function StudentCard({ student }: Props) {
  const { deleteStudent } = useNametagBuilder()

  return (
    <div className="border rounded-xl p-4 flex items-center justify-between">

      <div className="flex items-center gap-4">

        {student.photoUrl ? (
          <img
            src={student.photoUrl}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200" />
        )}

        <div>
          <p className="font-medium">
            {student.firstName} {student.lastName}
          </p>

          <p className="text-xs text-gray-500">
            {student.className}
          </p>
        </div>

      </div>

      <button
        onClick={() => deleteStudent(student.id)}
        className="text-red-500 text-sm"
      >
        حذف
      </button>

    </div>
  )
}
