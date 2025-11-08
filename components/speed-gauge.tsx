"use client"

export function SpeedGauge({
  speed,
  maxSpeed = 500,
  color = "blue",
}: { speed: number; maxSpeed?: number; color?: string }) {
  const percentage = (speed / maxSpeed) * 100
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const colorMap = {
    blue: "#2563eb",
    red: "#dc2626",
    green: "#16a34a",
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width="140" height="140" className="transform -rotate-90">
        {/* Background circle */}
        <circle cx="70" cy="70" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
        {/* Progress circle */}
        <circle
          cx="70"
          cy="70"
          r="45"
          fill="none"
          stroke={colorMap[color as keyof typeof colorMap]}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-2xl font-bold text-neutral-900">{speed}</div>
        <div className="text-xs text-neutral-600">Mbps</div>
      </div>
    </div>
  )
}
