import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function StudioArtistsLoading() {
  return (
    <div>
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 bg-gray-800 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-800 rounded w-96"></div>
      </div>

      {/* Controls Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="h-10 bg-gray-800 rounded flex-1"></div>
        <div className="flex gap-2">
          <div className="h-10 w-20 bg-gray-800 rounded"></div>
          <div className="h-10 w-24 bg-gray-800 rounded"></div>
          <div className="h-10 w-28 bg-gray-800 rounded"></div>
        </div>
        <div className="h-10 w-32 bg-gray-800 rounded"></div>
      </div>

      {/* Artists Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-800 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-800 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-gray-800 rounded w-24 mb-2"></div>
                  <div className="h-4 bg-gray-800 rounded w-20"></div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="p-3 bg-gray-800 rounded-lg">
                      <div className="h-5 w-5 bg-gray-700 rounded mx-auto mb-1"></div>
                      <div className="h-3 bg-gray-700 rounded mb-1"></div>
                      <div className="h-4 bg-gray-700 rounded"></div>
                    </div>
                  ))}
                </div>
                <div className="h-16 bg-gray-800 rounded"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-8 bg-gray-800 rounded"></div>
                  <div className="h-8 bg-gray-800 rounded"></div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6].map((k) => (
                    <div key={k} className="h-8 w-20 bg-gray-800 rounded"></div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
