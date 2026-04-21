"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { PACKAGES } from "@/lib/constants";

interface BookingFormProps {
  selectedDate: Date;
  selectedTime: string;
  isSubmitting: boolean;
  submitError: string | null;
  onBack: () => void;
  onSubmit: (formData: FormData) => void;
}

export default function BookingForm({
  selectedDate,
  selectedTime,
  isSubmitting,
  submitError,
  onBack,
  onSubmit,
}: BookingFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
    >
      <div className="mb-4">
        <h3 className="text-xl font-serif mb-2">Your Details</h3>
        <p className="text-sm font-light text-neutral-500">
          Requesting a session on {format(selectedDate, "MMMM d, yyyy")} at {selectedTime}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-xs uppercase tracking-widest text-neutral-500">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            required
            type="text"
            autoComplete="given-name"
            className="border-b border-neutral-300 bg-transparent py-2 focus:outline-none focus:border-black transition-colors font-light"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="text-xs uppercase tracking-widest text-neutral-500">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            required
            type="text"
            autoComplete="family-name"
            className="border-b border-neutral-300 bg-transparent py-2 focus:outline-none focus:border-black transition-colors font-light"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-xs uppercase tracking-widest text-neutral-500">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          required
          type="email"
          autoComplete="email"
          className="border-b border-neutral-300 bg-transparent py-2 focus:outline-none focus:border-black transition-colors font-light"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="sessionType" className="text-xs uppercase tracking-widest text-neutral-500">
          Session Type
        </label>
        <select
          id="sessionType"
          name="sessionType"
          required
          className="border-b border-neutral-300 bg-transparent py-2 focus:outline-none focus:border-black transition-colors font-light appearance-none rounded-none"
          defaultValue=""
        >
          <option value="" disabled>
            Select an option
          </option>
          {PACKAGES.map((pkg) => (
            <option key={pkg.name} value={pkg.name.toLowerCase().replace(/\s+/g, "-")}>
              {pkg.name} ({pkg.price})
            </option>
          ))}
          <option value="custom">Custom / Other</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="vision" className="text-xs uppercase tracking-widest text-neutral-500">
          Tell me about your vision
        </label>
        <textarea
          id="vision"
          name="vision"
          required
          rows={4}
          className="border-b border-neutral-300 bg-transparent py-2 focus:outline-none focus:border-black transition-colors font-light resize-none"
        />
      </div>

      {submitError && (
        <p className="text-sm text-red-600 font-light" role="alert">
          {submitError}
        </p>
      )}

      <div className="mt-8 flex justify-between items-center">
        <button
          type="button"
          onClick={onBack}
          className="text-xs uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white px-8 py-4 uppercase tracking-widest text-xs hover:bg-neutral-800 transition-colors flex items-center gap-3 disabled:opacity-70"
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </motion.form>
  );
}
