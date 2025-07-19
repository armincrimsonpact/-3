import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function AdminLoginLoading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner />
        <p className="text-gray-400 mt-4">Loading admin login...</p>
      </div>
    </div>
  )
}
