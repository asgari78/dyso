"use client"

import { Check } from "lucide-react"
import { useNametagBuilder } from "../../hooks/useNametagBuilder"

type StepKey = "templates" | "students" | "layout" | "checkout"

const steps: { key: StepKey; label: string }[] = [
  { key: "templates", label: "قالب‌ها" },
  { key: "students", label: "دانش‌آموزان" },
  { key: "layout", label: "چیدمان" },
  { key: "checkout", label: "پرداخت" },
]

export default function NametagStepper() {
  const { step, goToStep, selectedTemplates, students, sheets } = useNametagBuilder()
  const currentIndex = steps.findIndex((s) => s.key === (step as StepKey))

  const isStepCompleted = (key: StepKey) => {
    if (key === "templates") return selectedTemplates.length > 0
    if (key === "students") return students.length > 0
    if (key === "layout") return sheets.some((s) => s.items.length > 0)
    return false
  }

  const canNavigateTo = (targetIndex: number) => {
    if (targetIndex <= currentIndex) return true
    for (let i = 0; i < targetIndex; i++) {
      if (!isStepCompleted(steps[i].key)) return false
    }
    return true
  }

  return (
    <div className="sticky top-[54px] md:top-[65px] z-30 w-full border-b border-slate-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 py-1.5 sm:py-2">
        <div className="relative">
          <div className="absolute left-0 right-0 top-3 sm:top-3.5 h-px bg-slate-200" />

          <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
            {steps.map((item, index) => {
              const active = index === currentIndex
              const completed = index < currentIndex
              const clickable = canNavigateTo(index)

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => clickable && goToStep(item.key)}
                  disabled={!clickable}
                  className={`flex flex-col items-center gap-1 rounded-md py-0.5 transition ${
                    clickable ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                  }`}
                >
                  <span
                    className={`z-10 flex items-center justify-center rounded-full border transition
                    h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-[10px] sm:text-xs
                    ${
                      completed
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : active
                        ? "border-sky-600 bg-sky-600 text-white"
                        : "border-slate-300 bg-white text-slate-500"
                    }`}
                  >
                    {completed ? <Check className="h-3 w-3" /> : index + 1}
                  </span>

                  <span
                    className={`text-[9px] sm:text-[10px] md:text-xs leading-none whitespace-nowrap ${
                      active ? "font-semibold text-sky-700" : "text-slate-500"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
