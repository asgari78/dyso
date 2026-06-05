"use client"

import { Check, ChevronLeft, ChevronRight, Circle } from "lucide-react"

import { useNametagBuilder } from "../../hooks/useNametagBuilder"

type StepKey = "templates" | "students" | "layout" | "checkout"

interface StepItem {
  key: StepKey
  label: string
  description: string
}

const steps: StepItem[] = [
  {
    key: "templates",
    label: "قالب‌ها",
    description: "انتخاب قالب مناسب برای برچسب‌ها",
  },
  {
    key: "students",
    label: "دانش‌آموزان",
    description: "ثبت و مدیریت اطلاعات دانش‌آموزان",
  },
  {
    key: "layout",
    label: "چیدمان",
    description: "قرار دادن برچسب‌ها روی برگه A4",
  },
  {
    key: "checkout",
    label: "تسویه حساب",
    description: "بررسی نهایی و پرداخت",
  },
]

function getStepIndex(step: StepKey) {
  return steps.findIndex((item) => item.key === step)
}

export default function NametagStepper() {
  const { step, goToStep } = useNametagBuilder()

  const currentStepIndex = getStepIndex(step as StepKey)

  const handleStepClick = (stepKey: StepKey) => {
    const targetIndex = getStepIndex(stepKey)
    if (targetIndex <= currentStepIndex) {
      goToStep(stepKey)
    }
  }

  return (
    <section className="w-full flex items-center flex-col p-4 sm:p-6">

      {/* Desktop Stepper */}
      <div className="hidden w-full md:block justify-center">
        <div className="relative w-full flex justify-center">
          <div className="absolute left-0 right-0 top-5 h-0.5 w-full bg-slate-200" />

          <div className="relative w-full xl:w-max z-10 grid grid-cols-4 gap-4">
            {steps.map((item, index) => {
              const isActive = item.key === step
              const isCompleted = index < currentStepIndex
              const isClickable = index <= currentStepIndex

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleStepClick(item.key)}
                  disabled={!isClickable}
                  className={`group flex flex-col items-center text-center transition ${
                    isClickable ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                      isCompleted
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : isActive
                          ? "border-sky-600 bg-sky-600 text-white shadow-md shadow-sky-200"
                          : "border-slate-300 bg-white text-slate-400"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Circle className="h-3 w-3" />
                    )}
                  </span>

                  <span className="mt-3 text-sm font-semibold text-slate-900">
                    {item.label}
                  </span>

                  <span className="mt-1 max-w-[180px] text-xs leading-5 text-slate-500">
                    {item.description}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile Stepper */}
      <div className="space-y-3 md:hidden w-full">
        {steps.map((item, index) => {
          const isActive = item.key === step
          const isCompleted = index < currentStepIndex
          const isClickable = index <= currentStepIndex

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => handleStepClick(item.key)}
              disabled={!isClickable}
              className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-right transition ${
                isActive
                  ? "border-sky-500 bg-sky-50"
                  : isCompleted
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-slate-200 bg-white"
              } ${isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-60"}`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                  isCompleted
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : isActive
                      ? "border-sky-600 bg-sky-600 text-white"
                      : "border-slate-300 bg-white text-slate-400"
                }`}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Circle className="h-2.5 w-2.5" />
                )}
              </span>

              <span className="flex-1">
                <span className="block text-sm font-semibold text-slate-900">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  {item.description}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
