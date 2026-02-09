import { useMemo } from 'react'
import { getWeatherInfo } from '../utils/weatherCodes'
import './WeatherChart.css'

const DAYS = [
  { i: 0, label: '2 days ago' },
  { i: 1, label: 'Yesterday' },
  { i: 3, label: 'Tomorrow' },
  { i: 4, label: 'In 2 days' },
]

const TEMP_MIN = -5
const TEMP_MAX = 40

function SnapTile({ day, tempMax, tempMin, code, precip, wind, humidity, ringProgress }) {
  const { icon } = getWeatherInfo(code ?? 0)

  const precipPct = Math.min(100, (precip ?? 0) * 10)
  const windPct = Math.min(100, (wind ?? 0) * 2)
  const humidityPct = humidity ?? 0

  return (
    <div className="snap-tile">
      <span className="snap-label">{day}</span>
      <div className="snap-ring-wrap">
        <svg className="snap-ring" viewBox="0 0 64 64" aria-hidden="true">
          <circle
            className="snap-ring-bg"
            cx="32"
            cy="32"
            r="28"
            fill="none"
            strokeWidth="5"
          />
          <circle
            className="snap-ring-fill"
            cx="32"
            cy="32"
            r="28"
            fill="none"
            strokeWidth="5"
            strokeDasharray={`${ringProgress * 175} 175`}
            strokeLinecap="round"
          />
        </svg>
        <span className="snap-emoji">{icon}</span>
      </div>
      <div className="snap-temp">
        <span>{Math.round(tempMax)}°</span>
        <span className="snap-temp-min"> / {Math.round(tempMin)}°</span>
      </div>
      <div className="snap-vitals">
        <div className="snap-vital" title="Precipitation">
          <span className="snap-vital-icon">💧</span>
          <div className="snap-vital-bar-wrap">
            <div className="snap-vital-bar snap-vital-precip" style={{ width: `${precipPct}%` }} />
          </div>
          <span className="snap-vital-val">{(precip ?? 0).toFixed(1)}</span>
        </div>
        <div className="snap-vital" title="Wind">
          <span className="snap-vital-icon">🍃</span>
          <div className="snap-vital-bar-wrap">
            <div className="snap-vital-bar snap-vital-wind" style={{ width: `${windPct}%` }} />
          </div>
          <span className="snap-vital-val">{Math.round(wind ?? 0)}</span>
        </div>
        <div className="snap-vital" title="Humidity">
          <span className="snap-vital-icon">〰</span>
          <div className="snap-vital-bar-wrap">
            <div className="snap-vital-bar snap-vital-humid" style={{ width: `${humidityPct}%` }} />
          </div>
          <span className="snap-vital-val">{Math.round(humidityPct)}%</span>
        </div>
      </div>
    </div>
  )
}

export default function WeatherChart({ daily }) {
  const tiles = useMemo(() => {
    if (!daily?.time?.length || daily.time.length < 5) return null

    const tempRange = TEMP_MAX - TEMP_MIN

    return DAYS.map(({ i, label }) => {
      const max = daily.temperature_2m_max?.[i]
      const min = daily.temperature_2m_min?.[i]
      const progress = max != null
        ? Math.min(1, Math.max(0, (max - TEMP_MIN) / tempRange))
        : 0.5
      return {
        label,
        tempMax: max ?? 0,
        tempMin: min ?? 0,
        code: daily.weather_code?.[i],
        precip: daily.precipitation_sum?.[i] ?? 0,
        wind: daily.wind_speed_10m_max?.[i] ?? 0,
        humidity: daily.relative_humidity_2m_mean?.[i] ?? 0,
        ringProgress: progress,
      }
    })
  }, [daily])

  if (!tiles?.length) return null

  return (
    <section className="weather-chart card weather-chart-entrance">
      <h2 className="weather-chart-title">Day snapshots</h2>
      <p className="weather-chart-subtitle">Temp · Rain · Wind · Humidity</p>
      <div className="snap-grid">
        {tiles.map((t, i) => (
          <SnapTile
            key={t.label}
            day={t.label}
            tempMax={t.tempMax}
            tempMin={t.tempMin}
            code={t.code}
            precip={t.precip}
            wind={t.wind}
            humidity={t.humidity}
            ringProgress={t.ringProgress}
          />
        ))}
      </div>
    </section>
  )
}
