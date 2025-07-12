export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      <p className="mb-4">This is a simple test page to check if routing works correctly.</p>
      <div className="flex gap-4">
        <a href="/home" className="px-4 py-2 bg-teal-500 text-white rounded">
          Go to Home
        </a>
        <a href="/dashboard" className="px-4 py-2 bg-teal-500 text-white rounded">
          Try Dashboard
        </a>
      </div>
    </div>
  )
}
