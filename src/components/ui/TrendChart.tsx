/**
 * @file Trend Chart Component
 * @description SVG-based line chart for OKR progress trends with refined aesthetics
 */

'use client'

import { useLanguageStore } from '@/stores/useLanguageStore'
import { mockCurrentWeek } from '@/lib/mock-data'

interface DataPoint {
  weekNumber: number
  progress: number
}

interface TrendLine {
  id: string
  name: string
  data: DataPoint[]
  color: string
}

interface TrendChartProps {
  lines: TrendLine[]
  height?: number
  className?: string
}

export function TrendChart({ lines, height = 200, className = '' }: TrendChartProps) {
  const { t } = useLanguageStore()

  const padding = { top: 20, right: 20, bottom: 30, left: 40 }
  const width = 600
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  // Fixed 8 weeks for bi-monthly period
  const weeks = [1, 2, 3, 4, 5, 6, 7, 8]

  const xScale = (week: number) => padding.left + ((week - 1) / 7) * chartWidth
  const yScale = (progress: number) => padding.top + chartHeight - (progress / 100) * chartHeight

  // Generate path for a line
  const generatePath = (data: DataPoint[]): string => {
    if (data.length === 0) return ''

    const sortedData = [...data].sort((a, b) => a.weekNumber - b.weekNumber)

    return sortedData
      .map((point, i) => {
        const x = xScale(point.weekNumber)
        const y = yScale(point.progress)
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
      })
      .join(' ')
  }

  // Generate area path for gradient fill
  const generateAreaPath = (data: DataPoint[]): string => {
    if (data.length === 0) return ''

    const sortedData = [...data].sort((a, b) => a.weekNumber - b.weekNumber)
    const linePath = generatePath(data)
    const lastX = xScale(sortedData[sortedData.length - 1].weekNumber)
    const firstX = xScale(sortedData[0].weekNumber)
    const bottomY = padding.top + chartHeight

    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`
  }

  return (
    <div className={`w-full ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ maxHeight: height }}
      >
        <defs>
          {/* Gradient for area fill */}
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.12)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((value) => (
          <g key={value}>
            <line
              x1={padding.left}
              y1={yScale(value)}
              x2={width - padding.right}
              y2={yScale(value)}
              stroke="white"
              strokeOpacity={0.06}
              strokeDasharray={value === 0 ? '0' : '2,4'}
            />
            <text
              x={padding.left - 8}
              y={yScale(value)}
              textAnchor="end"
              dominantBaseline="middle"
              fill="rgba(255, 255, 255, 0.3)"
              fontSize="10"
            >
              {value}%
            </text>
          </g>
        ))}

        {/* Week labels */}
        {weeks.map((week) => (
          <text
            key={week}
            x={xScale(week)}
            y={height - 8}
            textAnchor="middle"
            fill={week <= mockCurrentWeek ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)'}
            fontSize="10"
          >
            W{week}
          </text>
        ))}

        {/* Current week indicator */}
        <line
          x1={xScale(mockCurrentWeek)}
          y1={padding.top}
          x2={xScale(mockCurrentWeek)}
          y2={padding.top + chartHeight}
          stroke="rgba(59, 130, 246, 0.2)"
          strokeWidth="1"
          strokeDasharray="3,3"
        />

        {/* Lines */}
        {lines.map((line) => (
          <g key={line.id}>
            {/* Area fill */}
            <path
              d={generateAreaPath(line.data)}
              fill="url(#areaGradient)"
            />

            {/* Line path */}
            <path
              d={generatePath(line.data)}
              fill="none"
              stroke="rgba(59, 130, 246, 0.4)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {line.data.map((point) => (
              <circle
                key={`${line.id}-${point.weekNumber}`}
                cx={xScale(point.weekNumber)}
                cy={yScale(point.progress)}
                r="3"
                fill="rgba(59, 130, 246, 0.5)"
                stroke="var(--color-bg-card)"
                strokeWidth="1.5"
              />
            ))}
          </g>
        ))}
      </svg>

      {/* Legend */}
      {lines.length > 1 && (
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          {lines.map((line) => (
            <div key={line.id} className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: 'rgba(59, 130, 246, 0.5)' }}
              />
              <span className="text-[var(--text-xs)] text-[var(--color-text-disabled)]">
                {line.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Simple single-line mini chart for OKR cards
interface MiniTrendChartProps {
  data: DataPoint[]
  width?: number
  height?: number
  className?: string
}

export function MiniTrendChart({ data, width = 100, height = 32, className = '' }: MiniTrendChartProps) {
  if (data.length === 0) return null

  const sortedData = [...data].sort((a, b) => a.weekNumber - b.weekNumber)
  const padding = 3
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const xScale = (week: number) => padding + ((week - 1) / 7) * chartWidth
  const yScale = (progress: number) => padding + chartHeight - (progress / 100) * chartHeight

  const path = sortedData
    .map((point, i) => {
      const x = xScale(point.weekNumber)
      const y = yScale(point.progress)
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  // Area fill path
  const areaPath = `${path} L ${xScale(sortedData[sortedData.length - 1].weekNumber)} ${padding + chartHeight} L ${xScale(sortedData[0].weekNumber)} ${padding + chartHeight} Z`

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
    >
      <defs>
        <linearGradient id="miniAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
        </linearGradient>
      </defs>

      {/* Area fill */}
      <path
        d={areaPath}
        fill="url(#miniAreaGradient)"
      />

      {/* Line */}
      <path
        d={path}
        fill="none"
        stroke="rgba(59, 130, 246, 0.35)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Latest point */}
      {sortedData.length > 0 && (
        <circle
          cx={xScale(sortedData[sortedData.length - 1].weekNumber)}
          cy={yScale(sortedData[sortedData.length - 1].progress)}
          r="2.5"
          fill="rgba(59, 130, 246, 0.5)"
        />
      )}
    </svg>
  )
}
