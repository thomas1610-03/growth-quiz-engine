export function FooterSection() {
  return (
    <footer className="bg-[#2C3E50] py-8 px-5">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[13px] text-white/40 mb-3">
          Made with care for your wellness.
        </p>
        <div className="flex items-center justify-center gap-4 text-[12px] text-white/30">
          <a href="#" className="hover:text-white/50 transition-colors">Imprint</a>
          <span>&middot;</span>
          <a href="#" className="hover:text-white/50 transition-colors">Privacy</a>
          <span>&middot;</span>
          <span>&copy; {new Date().getFullYear()} Your Company</span>
        </div>
      </div>
    </footer>
  )
}
