import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeather, fetchWeatherByCity, clearError } from './store/weatherSlice'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import WeatherChart from './components/WeatherChart'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const { data, loading, error, locationName } = useSelector((state) => state.weather)

  useEffect(() => {
    if (!navigator.geolocation) {
      dispatch(fetchWeatherByCity('London'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        dispatch(fetchWeather({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }))
      },
      () => dispatch(fetchWeatherByCity('London'))
    )
  }, [dispatch])

  const handleSearch = (query) => {
    if (!query.trim()) return
    dispatch(fetchWeatherByCity(query.trim()))
  }

  return (
    <div className="app">
      <header className="header">
        <h1>What’s it like out?</h1>
        <div className="header-search">
          <SearchBar onSearch={handleSearch} disabled={loading} />
        </div>
      </header>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button type="button" onClick={() => dispatch(clearError())}>Dismiss</button>
        </div>
      )}

      <main className="main">
        {loading && !data && (
          <div className="loading">Loading weather…</div>
        )}
        {data && !loading && (
          <div className="main-content">
            <div className="current-weather-wrap">
              <CurrentWeather
                current={data.current}
                locationName={locationName}
                timezone={data.timezone}
              />
            </div>
            <div className="forecast-wrap">
              <Forecast daily={data.daily} />
            </div>
          </div>
        )}
        {data && !loading && data.daily?.time?.length >= 5 && (
          <WeatherChart daily={data.daily} />
        )}
      </main>
      <footer className="footer">
        <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo</a>
      </footer>
    </div>
  )
}

export default App
