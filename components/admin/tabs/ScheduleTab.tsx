import { Calendar } from "lucide-react";

export default function ScheduleTab() {
  return (
    <div>
      <h2 className="text-3xl font-serif mb-8">Manage Availability</h2>
      <div className="bg-white p-8 border border-neutral-200 text-center">
        <Calendar className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
        <h3 className="text-xl font-serif mb-2">Calendar Integration Required</h3>
        <p className="text-sm font-light text-neutral-500 max-w-md mx-auto mb-8">
          Connect a database to sync your availability, block off dates, and set custom working
          hours.
        </p>
        <button className="px-6 py-3 bg-black text-white text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors">
          Connect Database
        </button>
      </div>
    </div>
  );
}
