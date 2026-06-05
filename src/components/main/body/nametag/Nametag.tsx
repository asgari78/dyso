"use client"

import NametagStepper from "./components/stepper/NametagStepper"

import StepTemplates from "./components/steps/templates/StepTemplates"
import StepStudents from "./components/steps/StepStudents"
import StepLayout from "./components/steps/StepLayout"

import { useNametagBuilder } from "./hooks/useNametagBuilder"

export default function Nametag() {
  const { builder } = useNametagBuilder()

  const renderStep = () => {
    switch (builder.step) {
      case "templates":
        return <StepTemplates />

      case "students":
        return <StepStudents />

      case "layout":
        return <StepLayout />

      default:
        return null
    }
  }

  return (
    <div className="w-full flex flex-col">

      {/* Stepper */}
      <NametagStepper />

      {/* Step Content */}
      <div className="w-full bg-gray-50 px-6 py-8">
        {renderStep()}
      </div>

    </div>
  )
}
