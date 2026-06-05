"use client"

import { useNametagBuilder } from "../../hooks/useNametagBuilder"
import StudentCard from "./StudentCard"

export default function StudentList() {
  const { builder } = useNametagBuilder()

  if (builder.students.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        هنوز دانش‌آموزی اضافه نشده
      </div>
    )
  }

  return (
    <div className="space-y-3">

      {builder.students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
        />
      ))}

    </div>
  )
}
