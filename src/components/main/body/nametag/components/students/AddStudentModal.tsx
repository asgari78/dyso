"use client"

import { v4 as uuidv4 } from "uuid"
import StudentForm from "./StudentForm"
import { useNametagBuilder } from "../../hooks/useNametagBuilder"

interface Props {
  onClose: () => void
}

export default function AddStudentModal({ onClose }: Props) {
  const { addNewStudent } = useNametagBuilder()

  const handleSubmit = (data: any) => {
    addNewStudent({
      id: uuidv4(),
      ...data,
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-6 w-full max-w-lg">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">افزودن دانش‌آموز</h2>

          <button onClick={onClose}>✕</button>
        </div>

        <StudentForm
          onSubmit={handleSubmit}
          onCancel={onClose}
        />

      </div>

    </div>
  )
}
