export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a14]">
      <div className="flex flex-col items-center">
        <div className="text-[#00a3ff] text-2xl font-bold mb-4">QuestHub</div>
        <div className="w-12 h-12 border-4 border-[#00a3ff] border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  )
}
