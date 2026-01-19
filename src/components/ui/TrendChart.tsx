/**
 * @file Trend Chart Component
 * @description SVG-based line chart for OKR progress trends with hover tooltips
 */

'use client'

import { useState } from 'react'
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
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; week: number; progress: number } | null>(null)

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
    <div className={`w-full relative ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ maxHeight: height }}
        onMouseLeave={() => setHoveredPoint(null)}
      >
        <defs>
          {/* Gradient for area fill */}
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0.25)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
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
          stroke="#22d3ee"
          strokeWidth="1"
          strokeDasharray="3,3"
          strokeOpacity={0.4}
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
              stroke="#22d3ee"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points with hover */}
            {line.data.map((point) => (
              <g key={`${line.id}-${point.weekNumber}`}>
                {/* Larger invisible hit area */}
                <circle
                  cx={xScale(point.weekNumber)}
                  cy={yScale(point.progress)}
                  r="12"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint({
                    x: xScale(point.weekNumber),
                    y: yScale(point.progress),
                    week: point.weekNumber,
                    progress: point.progress,
                  })}
                />
                {/* Visible point */}
                <circle
                  cx={xScale(point.weekNumber)}
                  cy={yScale(point.progress)}
                  r={hoveredPoint?.week === point.weekNumber ? 6 : 4}
                  fill="#22d3ee"
                  stroke="var(--color-bg-card)"
                  strokeWidth="2"
                  className="transition-all duration-150 pointer-events-none"
                />
              </g>
            ))}
          </g>
        ))}

        {/* Tooltip */}
        {hoveredPoint && (
          <g>
            {/* Tooltip background */}
            <rect
              x={hoveredPoint.x - 28}
              y={hoveredPoint.y - 32}
              width="56"
              height="22"
              rx="4"
              fill="rgba(0, 0, 0, 0.85)"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
            {/* Tooltip text */}
            <text
              x={hoveredPoint.x}
              y={hoveredPoint.y - 18}
              textAnchor="middle"
              fill="white"
              fontSize="11"
              fontWeight="500"
            >
              W{hoveredPoint.week}: {hoveredPoint.progress}%
            </text>
          </g>
        )}
      </svg>

      {/* Legend */}
      {lines.length > 1 && (
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          {lines.map((line) => (
            <div key={line.id} className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: '#22d3ee' }}
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

// Simple single-line mini chart for OKR cards with hover tooltip
interface MiniTrendChartProps {
  data: DataPoint[]
  width?: number
  height?: number
  className?: string
}

export function MiniTrendChart({ data, width = 100, height = 32, className = '' }: MiniTrendChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; week: number; progress: number } | null>(null)

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
    <div className="relative">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className={className}
        onMouseLeave={() => setHoveredPoint(null)}
      >
        <defs>
          <linearGradient id="miniAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0.2)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
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
          stroke="#22d3ee"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points with hover */}
        {sortedData.map((point) => (
          <g key={point.weekNumber}>
            {/* Larger invisible hit area */}
            <circle
              cx={xScale(point.weekNumber)}
              cy={yScale(point.progress)}
              r="8"
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPoint({
                x: xScale(point.weekNumber),
                y: yScale(point.progress),
                week: point.weekNumber,
                progress: point.progress,
              })}
            />
            {/* Visible point */}
            <circle
              cx={xScale(point.weekNumber)}
              cy={yScale(point.progress)}
              r={hoveredPoint?.week === point.weekNumber ? 3.5 : 2}
              fill="#22d3ee"
              className="transition-all duration-150 pointer-events-none"
            />
          </g>
        ))}
      </svg>

      {/* Tooltip - positioned above the chart */}
      {hoveredPoint && (
        <div
          className="absolute px-2 py-1 text-[10px] font-medium text-white bg-black/90 rounded border border-white/10 whitespace-nowrap pointer-events-none z-10"
          style={{
            left: hoveredPoint.x,
            top: -4,
            transform: 'translate(-50%, -100%)',
          }}
        >
          W{hoveredPoint.week}: {hoveredPoint.progress}%
        </div>
      )}
    </div>
  )
}
