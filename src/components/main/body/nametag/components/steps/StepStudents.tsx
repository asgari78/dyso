"use client"

import { useState } from "react"
import AddStudentModal from "../students/AddStudentModal"
import StudentList from "../students/StudentList"

export default function StepStudents() {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          دانش‌آموزان
        </h2>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          افزودن دانش‌آموز
        </button>

      </div>

      <StudentList />

      {openModal && (
        <AddStudentModal
          onClose={() => setOpenModal(false)}
        />
      )}

    </div>
  )
}
