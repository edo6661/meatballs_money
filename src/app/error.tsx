'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <>
      <h1>Global Error Page</h1>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
      <pre>{error.message}</pre>
    </>
  )
}