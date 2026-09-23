export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="h-4 w-40 animate-pulse rounded-full bg-secondary" />
      <div className="mt-6 h-12 w-2/3 max-w-xl animate-pulse rounded-lg bg-secondary" />
      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-[4/5] animate-pulse rounded-xl bg-secondary" />
            <div className="mt-4 h-4 w-3/4 animate-pulse rounded-full bg-secondary" />
          </div>
        ))}
      </div>
    </div>
  )
}
