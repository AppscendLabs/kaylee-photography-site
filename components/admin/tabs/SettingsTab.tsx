export default function SettingsTab() {
  return (
    <div>
      <h2 className="text-3xl font-serif mb-8">Platform Settings</h2>
      <div className="bg-white p-8 border border-neutral-200">
        <h3 className="text-xl font-serif mb-6">Payment Integrations</h3>
        <div className="flex items-center justify-between p-4 border border-neutral-200 mb-8 bg-neutral-50">
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 bg-[#635BFF] rounded-md flex items-center justify-center text-white font-bold text-xl"
              aria-hidden="true"
            >
              S
            </div>
            <div>
              <h4 className="font-medium">Stripe Payments</h4>
              <p className="text-xs text-neutral-500">Not connected. Connect to accept deposits.</p>
            </div>
          </div>
          <button className="px-4 py-2 border border-black text-black text-xs uppercase tracking-widest hover:bg-neutral-100 transition-colors">
            Connect
          </button>
        </div>

        <h3 className="text-xl font-serif mb-6">Database Configuration</h3>
        <p className="text-sm font-light text-neutral-600 mb-4">
          A backend database is required to persistently store clients, bookings, and your
          customized schedule.
        </p>
      </div>
    </div>
  );
}
