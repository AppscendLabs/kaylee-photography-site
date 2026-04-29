export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#F8F8F6] px-6 md:px-12 py-6">
      <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs font-light tracking-widest uppercase text-[#F8F8F6]/50">
          © {new Date().getFullYear()} Kaylee Light Photography
        </p>
        <a
          href="https://www.appscendlabs.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-light tracking-widest uppercase text-[#F8F8F6]/50 hover:text-[#F8F8F6] transition-colors border-b border-transparent hover:border-[#F8F8F6]/50"
        >
          Powered by Appscend Labs, LLC
        </a>
      </div>
    </footer>
  );
}
