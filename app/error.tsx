'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-lg">
      <div className="text-center space-y-lg max-w-md">
        <div className="text-6xl">😵</div>
        <h2 className="text-xl font-semibold text-textPrimary">
          Something went wrong!
        </h2>
        <p className="text-base text-textSecondary">
          We encountered an error while loading the app.
        </p>
        <button
          onClick={reset}
          className="btn-primary"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
