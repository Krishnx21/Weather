import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeather, fetchWeatherByCity, clearError } from './store/weatherSlice'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
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
        <h1>Weather</h1>
        <SearchBar onSearch={handleSearch} disabled={loading} />
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
          <>
            <CurrentWeather
              current={data.current}
              locationName={locationName}
              timezone={data.timezone}
            />
            <Forecast daily={data.daily} />
          </>
        )}
      </main>
      <footer className="footer">
        Data by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo</a>
      </footer>
    </div>
  )
}

export default App
