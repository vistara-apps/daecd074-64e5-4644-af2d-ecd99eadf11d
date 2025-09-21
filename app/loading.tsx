export default function Loading() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="animate-pulse space-y-lg">
        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto"></div>
        <div className="space-y-md">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
