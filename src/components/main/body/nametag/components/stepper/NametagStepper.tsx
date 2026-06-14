"use client"

import { Check, Circle } from "lucide-react"
import { useNametagBuilder } from "../../hooks/useNametagBuilder"

type StepKey = "templates" | "students" | "layout" | "checkout"

interface StepItem {
  key: StepKey
  label: string
}

const steps: StepItem[] = [
  {
    key: "templates",
    label: "قالب‌ها"
  },
  {
    key: "students",
    label: "دانش‌آموزان"
  },
  {
    key: "layout",
    label: "چیدمان",
  },
  {
    key: "checkout",
    label: "پرداخت"
  },
]

function getStepIndex(step: StepKey) {
  return steps.findIndex((item) => item.key === step)
}

export default function NametagStepper() {
  const { step, goToStep, selectedTemplates, students, sheets } =
    useNametagBuilder()

  const currentStepIndex = getStepIndex(step as StepKey)

  const isStepCompleted = (stepKey: StepKey) => {
    switch (stepKey) {
      case "templates":
        return selectedTemplates.length > 0

      case "students":
        return students.length > 0

      case "layout":
        return sheets.some((s) => s.items.length > 0)

      default:
        return false
    }
  }

  const canNavigateTo = (targetIndex: number) => {
    if (targetIndex <= currentStepIndex) return true
    const prevStep = steps[targetIndex - 1]
    return isStepCompleted(prevStep.key)
  }

  const handleStepClick = (stepKey: StepKey) => {
    const targetIndex = getStepIndex(stepKey)
    if (canNavigateTo(targetIndex)) {
      goToStep(stepKey)
    }
  }

  return (
    <div className="sticky md:top-[72] top-[65px] z-[20] w-full bg-gray-50">


      {/* connector line full width */}
      <div className="absolute hidden md:flex left-0 right-0 top-7 h-[2px] bg-slate-200" />

      <div className="mx-auto max-w-6xl px-4 pt-3">

        {/* Desktop */}
        <div className="hidden md:block py-1">

          <div className="relative flex items-center justify-between">

            {steps.map((item, index) => {
              const isActive = item.key === step
              const isCompleted = index < currentStepIndex
              const isClickable = canNavigateTo(index)

              return (
                <button
                  key={item.key}
                  onClick={() => handleStepClick(item.key)}
                  disabled={!isClickable}
                  className={`flex flex-col items-center gap-1 transition
                  ${isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
                  `}
                >
                  {/* circle */}
                  <span
                    className={`
                    flex h-6 w-6 items-center justify-center
                    rounded-full border text-[10px]
                    transition
                    ${
                      isCompleted
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : isActive
                        ? "bg-sky-600 border-sky-600 text-white"
                        : "bg-white border-slate-300 text-slate-400"
                    }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Circle className="h-2 w-2" />
                    )}
                  </span>

                  {/* label */}
                  <span
                    className={`text-[11px] whitespace-nowrap
                    ${
                      isActive
                        ? "text-sky-700 font-semibold"
                        : "text-slate-500"
                    }
                    `}
                  >
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-2">

          {steps.map((item, index) => {
            const isActive = item.key === step
            const isCompleted = index < currentStepIndex
            const isClickable = canNavigateTo(index)

            return (
              <button
                key={item.key}
                onClick={() => handleStepClick(item.key)}
                disabled={!isClickable}
                className={`
                flex w-full items-center gap-2 rounded-lg border px-3 py-2 transition
                ${
                  isActive
                    ? "border-sky-500 bg-sky-50"
                    : isCompleted
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-slate-200 bg-white"
                }
                ${isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-60"}
                `}
              >
                <span
                  className={`
                  flex h-6 w-6 items-center justify-center rounded-full border
                  ${
                    isCompleted
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : isActive
                      ? "bg-sky-600 border-sky-600 text-white"
                      : "border-slate-300 text-slate-400"
                  }
                  `}
                >
                  {isCompleted ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Circle className="h-2 w-2" />
                  )}
                </span>

                <span className="flex-1 text-right">
                  <span className="block text-xs font-semibold text-slate-900">
                    {item.label}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
