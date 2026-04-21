"use client";

import { useBooking } from "@/hooks/useBooking";
import StepIndicator from "./StepIndicator";
import BookingCalendar from "./BookingCalendar";
import BookingForm from "./BookingForm";
import BookingSuccess from "./BookingSuccess";

export default function BookingWizard() {
  const {
    step,
    selectedDate,
    selectedTime,
    isSubmitting,
    isSuccess,
    submitError,
    canAdvance,
    setSelectedDate,
    setSelectedTime,
    nextStep,
    prevStep,
    reset,
    submit,
  } = useBooking();

  return (
    <div className="bg-white p-8 md:p-16 border border-neutral-200">
      {isSuccess ? (
        <BookingSuccess onReset={reset} />
      ) : (
        <>
          <StepIndicator currentStep={step} />
          {step === 1 && (
            <BookingCalendar
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              canAdvance={canAdvance}
              onSelectDate={setSelectedDate}
              onSelectTime={setSelectedTime}
              onNext={nextStep}
            />
          )}
          {step === 2 && selectedDate && selectedTime && (
            <BookingForm
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              isSubmitting={isSubmitting}
              submitError={submitError}
              onBack={prevStep}
              onSubmit={submit}
            />
          )}
        </>
      )}
    </div>
  );
}
