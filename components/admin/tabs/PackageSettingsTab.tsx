"use client";

import { useState, useTransition } from "react";
import { updatePackageDeposit } from "@/app/actions/bookings";
import type { PackageSetting } from "@/types";
import { cn } from "@/lib/utils";

interface PackageSettingsTabProps {
  settings: PackageSetting[];
}

export default function PackageSettingsTab({ settings }: PackageSettingsTabProps) {
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(settings.map((s) => [s.packageKey, (s.depositCents / 100).toFixed(2)]))
  );
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  function handleChange(packageKey: string, raw: string) {
    setValues((prev) => ({ ...prev, [packageKey]: raw }));
    setSaved((prev) => ({ ...prev, [packageKey]: false }));
  }

  function handleSave(packageKey: string) {
    const dollars = parseFloat(values[packageKey]);
    if (isNaN(dollars) || dollars < 1) {
      setFeedback((prev) => ({ ...prev, [packageKey]: "Enter a valid amount (min $1.00)." }));
      return;
    }
    const cents = Math.round(dollars * 100);

    startTransition(async () => {
      const result = await updatePackageDeposit(packageKey, cents);
      if (result?.error) {
        setFeedback((prev) => ({ ...prev, [packageKey]: result.error! }));
      } else {
        setFeedback((prev) => ({ ...prev, [packageKey]: "" }));
        setSaved((prev) => ({ ...prev, [packageKey]: true }));
      }
    });
  }

  return (
    <div>
      <h2 className="text-3xl font-serif mb-3">Package Deposit Amounts</h2>
      <p className="text-sm font-light text-neutral-500 mb-10">
        Set the deposit amount collected when a client confirms a session. Changes apply to all new
        bookings immediately.
      </p>

      <div className="flex flex-col gap-4">
        {settings.map((setting) => (
          <div
            key={setting.packageKey}
            className="bg-white border border-neutral-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <h3 className="font-medium text-sm">{setting.label}</h3>
              <p className="text-xs text-neutral-400 font-light mt-0.5">
                Key: {setting.packageKey}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">
                  $
                </span>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={values[setting.packageKey] ?? ""}
                  onChange={(e) => handleChange(setting.packageKey, e.target.value)}
                  className={cn(
                    "pl-7 pr-4 py-2 border text-sm font-light focus:outline-none focus:border-black transition-colors w-32",
                    feedback[setting.packageKey] ? "border-red-400" : "border-neutral-300"
                  )}
                />
              </div>

              <button
                onClick={() => handleSave(setting.packageKey)}
                disabled={isPending}
                className="px-4 py-2 bg-black text-white text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {saved[setting.packageKey] ? "✓ Saved" : "Save"}
              </button>
            </div>

            {feedback[setting.packageKey] && (
              <p className="text-xs text-red-600 sm:col-span-2" role="alert">
                {feedback[setting.packageKey]}
              </p>
            )}
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs text-neutral-400 font-light">
        Existing bookings retain the deposit amount set at the time of booking.
      </p>
    </div>
  );
}
