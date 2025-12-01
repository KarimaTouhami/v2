export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-neutral-200 dark:border-neutral-800 border-t-black dark:border-t-white rounded-full animate-spin" />
        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">Loading...</p>
      </div>
    </div>
  );
}
