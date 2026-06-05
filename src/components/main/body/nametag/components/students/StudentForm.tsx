"use client"

import { useState } from "react"
import { Student } from "@/components/main/body/nametag/types/nametag.types"

interface Props {
  initialData?: Partial<Student>
  onSubmit: (data: Omit<Student, "id">) => void
  onCancel: () => void
}

export default function StudentForm({
  initialData,
  onSubmit,
  onCancel,
}: Props) {
  const [firstName, setFirstName] = useState(initialData?.firstName ?? "")
  const [lastName, setLastName] = useState(initialData?.lastName ?? "")
  const [className, setClassName] = useState(initialData?.className ?? "")
  const [teacher, setTeacher] = useState(initialData?.teacher ?? "")
  const [school, setSchool] = useState(initialData?.school ?? "")
  const [photoUrl, setPhotoUrl] = useState(initialData?.photoUrl ?? "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!firstName || !lastName) return

    onSubmit({
      firstName,
      lastName,
      className,
      teacher,
      school,
      photoUrl,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div className="grid grid-cols-2 gap-4">
        <input
          placeholder="نام"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />

        <input
          placeholder="نام خانوادگی"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />
      </div>

      <input
        placeholder="کلاس"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full"
      />

      <input
        placeholder="نام معلم"
        value={teacher}
        onChange={(e) => setTeacher(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full"
      />

      <input
        placeholder="نام مدرسه"
        value={school}
        onChange={(e) => setSchool(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full"
      />

      <input
        placeholder="آدرس عکس (اختیاری)"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full"
      />

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-gray-200"
        >
          انصراف
        </button>

        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white"
        >
          ذخیره
        </button>
      </div>

    </form>
  )
}
