export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/201505097193"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-white/20 bg-[#25D366] px-5 py-3.5 font-bold text-white shadow-[0_12px_35px_rgba(37,211,102,0.28)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-[0_18px_40px_rgba(37,211,102,0.35)]"
    >
      <span className="text-lg">💬</span>
      <span>WhatsApp</span>
    </a>
  );
}