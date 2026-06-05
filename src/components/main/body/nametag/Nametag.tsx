"use client"

import NametagStepper from "./components/stepper/NametagStepper"

import StepTemplates from "./components/steps/templates/StepTemplates"
import StepStudents from "./components/steps/StepStudents"
import StepLayout from "./components/steps/StepLayout"
// اگر بعداً ساختی:
// import StepCheckout from "./components/steps/StepCheckout"

import { useNametagBuilder } from "./hooks/useNametagBuilder"

export default function Nametag() {
  const { builder } = useNametagBuilder()

  const renderStep = () => {
    switch (builder.step) {
      case 1:
        return <StepTemplates />
      case 2:
        return <StepStudents />
      case 3:
        return <StepLayout />
      // case 4:
      //   return <StepCheckout />
      default:
        return <StepTemplates />
    }
  }

  return (
    <div className="w-full h-full flex flex-col">

      {/* Stepper */}
      <div className="z-10 bg-gray-50">
        <NametagStepper />
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        {renderStep()}
      </div>

    </div>
  )
}
