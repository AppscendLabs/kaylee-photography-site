"use client";

import { useState, useTransition } from "react";
import { updatePackageDeposit, updatePackagePrice } from "@/app/actions/bookings";
import type { PackageSetting } from "@/types";
import { cn } from "@/lib/utils";

interface PackageSettingsTabProps {
  settings: PackageSetting[];
}

type FieldKey = "price" | "deposit";

export default function PackageSettingsTab({ settings }: PackageSettingsTabProps) {
  const [isPending, startTransition] = useTransition();

  const [values, setValues] = useState<Record<string, Record<FieldKey, string>>>(
    Object.fromEntries(
      settings.map((s) => [
        s.packageKey,
        {
          price: (s.priceCents / 100).toFixed(2),
          deposit: (s.depositCents / 100).toFixed(2),
        },
      ])
    )
  );
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  function handleChange(packageKey: string, field: FieldKey, raw: string) {
    setValues((prev) => ({ ...prev, [packageKey]: { ...prev[packageKey], [field]: raw } }));
    setSaved((prev) => ({ ...prev, [`${packageKey}-${field}`]: false }));
  }

  function handleSave(packageKey: string, field: FieldKey) {
    const key = `${packageKey}-${field}`;
    const dollars = parseFloat(values[packageKey][field]);
    if (isNaN(dollars) || dollars < 1) {
      setFeedback((prev) => ({ ...prev, [key]: "Enter a valid amount (min $1.00)." }));
      return;
    }
    const cents = Math.round(dollars * 100);

    startTransition(async () => {
      const result = field === "price"
        ? await updatePackagePrice(packageKey, cents)
        : await updatePackageDeposit(packageKey, cents);

      if (result?.error) {
        setFeedback((prev) => ({ ...prev, [key]: result.error! }));
      } else {
        setFeedback((prev) => ({ ...prev, [key]: "" }));
        setSaved((prev) => ({ ...prev, [key]: true }));
      }
    });
  }

  return (
    <div>
      <h2 className="text-3xl font-serif mb-3">Package Pricing</h2>
      <p className="text-sm font-light text-neutral-500 mb-10">
        Set the full price and deposit amount for each package. The packages page updates immediately.
      </p>

      <div className="flex flex-col gap-4">
        {settings.map((setting) => (
          <div key={setting.packageKey} className="bg-white border border-neutral-200 p-6">
            <div className="mb-5">
              <h3 className="font-medium text-sm">{setting.label}</h3>
              <p className="text-xs text-neutral-400 font-light mt-0.5">Key: {setting.packageKey}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(["price", "deposit"] as FieldKey[]).map((field) => {
                const key = `${setting.packageKey}-${field}`;
                return (
                  <div key={field}>
                    <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">
                      {field === "price" ? "Full Price" : "Deposit"}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">$</span>
                        <input
                          type="number"
                          min="1"
                          step="0.01"
                          value={values[setting.packageKey][field]}
                          onChange={(e) => handleChange(setting.packageKey, field, e.target.value)}
                          className={cn(
                            "w-full pl-7 pr-4 py-2 border text-sm font-light focus:outline-none focus:border-black transition-colors",
                            feedback[key] ? "border-red-400" : "border-neutral-300"
                          )}
                        />
                      </div>
                      <button
                        onClick={() => handleSave(setting.packageKey, field)}
                        disabled={isPending}
                        className="px-4 py-2 bg-black text-white text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50 whitespace-nowrap"
                      >
                        {saved[key] ? "✓ Saved" : "Save"}
                      </button>
                    </div>
                    {feedback[key] && (
                      <p className="text-xs text-red-600 mt-1" role="alert">{feedback[key]}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-xs text-neutral-400 font-light">
        Existing bookings retain the deposit amount set at the time of booking.
      </p>
    </div>
  );
}
