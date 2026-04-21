import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Deposit Confirmed",
  description: "Your photography session deposit has been received.",
  robots: { index: false, follow: false },
};

export default function PaySuccessPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F6] flex items-center justify-center px-6 py-24">
      <div className="text-center max-w-md">
        <CheckCircle2 className="w-16 h-16 text-green-700 mx-auto mb-6" strokeWidth={1} />

        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">
          Kaylee Light Photography
        </p>
        <h1 className="text-4xl md:text-5xl font-serif mb-6">Deposit Confirmed</h1>
        <p className="font-light text-neutral-600 leading-relaxed mb-10">
          Thank you! Your deposit has been received and your session is officially locked in.
          You&apos;ll receive a confirmation email shortly. I can&apos;t wait to work with you!
        </p>

        <p className="text-sm font-light text-neutral-500 mb-2">Questions or changes?</p>
        <a
          href="mailto:hello@kayleelight.com"
          className="text-sm border-b border-black pb-0.5 hover:text-neutral-500 transition-colors"
        >
          hello@kayleelight.com
        </a>

        <div className="mt-12 border-t border-neutral-200 pt-8">
          <Link
            href="/"
            className="text-xs uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
          >
            Return to Site
          </Link>
        </div>
      </div>
    </div>
  );
}
