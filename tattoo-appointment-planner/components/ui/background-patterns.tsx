"use client"

export function BackgroundPatterns() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-30">
      {/* Static subtle patterns */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-teal-500/5 blur-3xl" />
      <div className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-teal-500/3 blur-2xl" />
      <div className="absolute top-2/3 left-1/2 w-20 h-20 rounded-full bg-teal-500/4 blur-xl" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 194, 176, 0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  )
}
