"use client";

import { useTransition, useState } from "react";
import { format } from "date-fns";
import { Calendar, CheckCircle2, Clock, Mail, XCircle } from "lucide-react";
import { approveBooking, declineBooking, sendDepositLink } from "@/app/actions/bookings";
import type { BookingRequest } from "@/types";
import { cn } from "@/lib/utils";
import { formatCents } from "@/lib/stripe";

interface RequestsTabProps {
  bookings: BookingRequest[];
}

const STATUS_STYLES: Record<BookingRequest["status"], string> = {
  PENDING: "bg-amber-100 text-amber-800",
  APPROVED: "bg-green-100 text-green-800",
  DECLINED: "bg-red-100 text-red-800",
};

const PAYMENT_STYLES: Record<BookingRequest["paymentStatus"], string> = {
  UNPAID: "text-neutral-400",
  DEPOSIT_PENDING: "text-amber-600",
  DEPOSIT_PAID: "text-green-600",
  FULLY_PAID: "text-green-700 font-medium",
  REFUNDED: "text-red-500",
};

export default function RequestsTab({ bookings }: RequestsTabProps) {
  const [isPending, startTransition] = useTransition();
  const [actionId, setActionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, string>>({});

  function handleAction(id: string, fn: () => Promise<{ error?: string }>) {
    setActionId(id);
    startTransition(async () => {
      const result = await fn();
      if (result?.error) {
        setFeedback((prev) => ({ ...prev, [id]: result.error! }));
      } else {
        setFeedback((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
      }
      setActionId(null);
    });
  }

  return (
    <div>
      <h2 className="text-3xl font-serif mb-8">Booking Requests</h2>

      {bookings.length === 0 ? (
        <div className="text-center py-12 text-neutral-500 font-light border border-dashed border-neutral-300">
          No booking requests yet.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {bookings.map((req) => {
            const isLoading = isPending && actionId === req.id;
            return (
              <div
                key={req.id}
                className="bg-white p-6 border border-neutral-200 flex flex-col gap-4 transition-all hover:border-black/20"
              >
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  {/* Left: Info */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-medium">
                        {req.firstName} {req.lastName}
                      </h3>
                      <span
                        className={cn(
                          "text-[10px] uppercase tracking-wider px-2 py-1 rounded-full",
                          STATUS_STYLES[req.status]
                        )}
                      >
                        {req.status.toLowerCase()}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] uppercase tracking-wider",
                          PAYMENT_STYLES[req.paymentStatus]
                        )}
                      >
                        {req.paymentStatus.replace("_", " ").toLowerCase()}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(new Date(req.sessionDate), "MMM d, yyyy")}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {req.sessionTime}
                      </span>
                    </div>

                    <p className="text-sm font-light text-neutral-600">
                      {req.sessionType} &nbsp;·&nbsp;
                      <span className="text-neutral-400">{req.email}</span>
                    </p>

                    <p className="text-xs text-neutral-400 font-light">
                      Deposit: {formatCents(req.depositAmount)}
                    </p>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col gap-2 w-full md:w-auto items-end">
                    {req.status === "PENDING" && (
                      <div className="flex gap-2 w-full md:w-auto">
                        <button
                          onClick={() =>
                            handleAction(req.id, () => approveBooking(req.id))
                          }
                          disabled={isLoading}
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-black text-white text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {isLoading ? "..." : "Approve"}
                        </button>
                        <button
                          onClick={() =>
                            handleAction(req.id, () => declineBooking(req.id))
                          }
                          disabled={isLoading}
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-neutral-300 text-neutral-600 text-xs uppercase tracking-widest hover:bg-neutral-50 transition-colors disabled:opacity-50"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Decline
                        </button>
                      </div>
                    )}

                    {req.status === "APPROVED" && req.paymentStatus === "UNPAID" && (
                      <button
                        onClick={() =>
                          handleAction(req.id, () => sendDepositLink(req.id))
                        }
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 py-2 border border-black text-black text-xs uppercase tracking-widest hover:bg-neutral-50 transition-colors disabled:opacity-50"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        {isLoading ? "Sending..." : "Send Deposit Link"}
                      </button>
                    )}

                    {req.status === "APPROVED" && req.paymentStatus === "DEPOSIT_PAID" && (
                      <span className="text-xs text-green-600 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Deposit Paid
                      </span>
                    )}
                  </div>
                </div>

                {/* Message preview */}
                {req.message && (
                  <p className="text-sm font-light text-neutral-500 border-t border-neutral-100 pt-3 italic line-clamp-2">
                    &ldquo;{req.message}&rdquo;
                  </p>
                )}

                {feedback[req.id] && (
                  <p className="text-xs text-red-600" role="alert">
                    {feedback[req.id]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
