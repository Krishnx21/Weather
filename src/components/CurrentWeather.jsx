import { getWeatherInfo } from '../utils/weatherCodes'
import './CurrentWeather.css'

export default function CurrentWeather({ current, locationName, timezone }) {
  if (!current) return null

  const temp = Math.round(current.temperature_2m)
  const unit = current.temperature_2m === current.temperature_2m ? '°C' : ''
  const { icon, label } = getWeatherInfo(current.weather_code)
  const location = locationName || (timezone ? timezone.split('/').pop().replace('_', ' ') : 'Current location')

  return (
    <section className="current-weather card">
      <div className="location">{location}</div>
      <div className="temp-row">
        <span className="icon-big">{icon}</span>
        <div>
          <span className="temp">{temp}{unit}</span>
          <span className="condition">{label}</span>
        </div>
      </div>
      <div className="details">
        <div className="detail">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{current.relative_humidity_2m}%</span>
        </div>
        <div className="detail">
          <span className="detail-label">Wind</span>
          <span className="detail-value">{current.wind_speed_10m} km/h</span>
        </div>
        {current.precipitation != null && (
          <div className="detail">
            <span className="detail-label">Precip</span>
            <span className="detail-value">{current.precipitation} mm</span>
          </div>
        )}
      </div>
    </section>
  )
}
