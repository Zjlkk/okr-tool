/**
 * @file Trend Chart Component
 * @description SVG-based line chart for OKR progress trends
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

  return (
    <div className={`w-full ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ maxHeight: height }}
      >
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((value) => (
          <g key={value}>
            <line
              x1={padding.left}
              y1={yScale(value)}
              x2={width - padding.right}
              y2={yScale(value)}
              stroke="var(--color-border)"
              strokeDasharray={value === 0 ? '0' : '4,4'}
              strokeOpacity={0.5}
            />
            <text
              x={padding.left - 8}
              y={yScale(value)}
              textAnchor="end"
              dominantBaseline="middle"
              className="text-[10px] fill-[var(--color-text-disabled)]"
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
            className={`text-[10px] ${week <= mockCurrentWeek ? 'fill-[var(--color-text-secondary)]' : 'fill-[var(--color-text-disabled)]'}`}
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
          stroke="var(--color-primary)"
          strokeWidth="1"
          strokeDasharray="4,4"
          strokeOpacity={0.5}
        />

        {/* Lines */}
        {lines.map((line) => (
          <g key={line.id}>
            {/* Line path */}
            <path
              d={generatePath(line.data)}
              fill="none"
              stroke={line.color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {line.data.map((point) => (
              <circle
                key={`${line.id}-${point.weekNumber}`}
                cx={xScale(point.weekNumber)}
                cy={yScale(point.progress)}
                r="4"
                fill={line.color}
                stroke="var(--color-bg-card)"
                strokeWidth="2"
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
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: line.color }}
              />
              <span className="text-[var(--text-xs)] text-[var(--color-text-secondary)]">
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

export function MiniTrendChart({ data, width = 120, height = 40, className = '' }: MiniTrendChartProps) {
  if (data.length === 0) return null

  const sortedData = [...data].sort((a, b) => a.weekNumber - b.weekNumber)
  const padding = 4
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
      {/* Area fill */}
      <path
        d={areaPath}
        fill="var(--color-primary)"
        fillOpacity={0.1}
      />

      {/* Line */}
      <path
        d={path}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Latest point */}
      {sortedData.length > 0 && (
        <circle
          cx={xScale(sortedData[sortedData.length - 1].weekNumber)}
          cy={yScale(sortedData[sortedData.length - 1].progress)}
          r="3"
          fill="var(--color-primary)"
        />
      )}
    </svg>
  )
}
