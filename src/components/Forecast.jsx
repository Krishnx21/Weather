import { getWeatherInfo, formatDay } from '../utils/weatherCodes'
import './Forecast.css'

export default function Forecast({ daily }) {
  if (!daily?.time?.length) return null

  return (
    <section className="forecast card">
      <h2 className="forecast-title">5-day forecast</h2>
      <ul className="forecast-list">
        {daily.time.map((dateStr, i) => (
          <li key={dateStr} className="forecast-item">
            <span className="forecast-day">{formatDay(dateStr)}</span>
            <span className="forecast-icon">{getWeatherInfo(daily.weather_code[i]).icon}</span>
            <span className="forecast-high">{Math.round(daily.temperature_2m_max[i])}°</span>
            <span className="forecast-low">{Math.round(daily.temperature_2m_min[i])}°</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
