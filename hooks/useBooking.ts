"use client";

import { useState } from "react";
import type { BookingStep } from "@/types";

export function useBooking() {
  const [step, setStep] = useState<BookingStep>(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function nextStep() {
    setStep(2);
  }

  function prevStep() {
    setStep(1);
  }

  function reset() {
    setStep(1);
    setSelectedDate(undefined);
    setSelectedTime(null);
    setIsSuccess(false);
    setSubmitError(null);
  }

  async function submit(formData: FormData) {
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          sessionDate: selectedDate.toISOString(),
          sessionTime: selectedTime,
          sessionType: formData.get("sessionType"),
          message: formData.get("vision"),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setIsSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const canAdvance = Boolean(selectedDate && selectedTime);

  return {
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
  };
}
