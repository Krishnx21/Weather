import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const OPEN_METEO = 'https://api.open-meteo.com/v1/forecast'

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async ({ latitude, longitude }, { rejectWithValue }) => {
    try {
      const url = new URL(OPEN_METEO)
      url.searchParams.set('latitude', latitude)
      url.searchParams.set('longitude', longitude)
      url.searchParams.set('current', 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation')
      url.searchParams.set('daily', 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,relative_humidity_2m_mean')
      url.searchParams.set('timezone', 'auto')
      url.searchParams.set('forecast_days', '5')
      url.searchParams.set('past_days', '2')

      const res = await fetch(url.toString())
      if (!res.ok) throw new Error('Failed to fetch weather')
      return res.json()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchWeatherByCity',
  async (query, { rejectWithValue }) => {
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1`
      )
      const geo = await geoRes.json()
      if (!geo.results?.length) {
        return rejectWithValue('Location not found')
      }
      const { latitude, longitude, name } = geo.results[0]
      const url = new URL(OPEN_METEO)
      url.searchParams.set('latitude', latitude)
      url.searchParams.set('longitude', longitude)
      url.searchParams.set('current', 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation')
      url.searchParams.set('daily', 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,relative_humidity_2m_mean')
      url.searchParams.set('timezone', 'auto')
      url.searchParams.set('forecast_days', '5')
      url.searchParams.set('past_days', '2')

      const res = await fetch(url.toString())
      if (!res.ok) throw new Error('Failed to fetch weather')
      const data = await res.json()
      return { ...data, locationName: name }
    } catch (err) {
      return rejectWithValue(err.message || 'Location not found')
    }
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    locationName: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.locationName = null
        state.error = null
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.locationName = action.payload.locationName
        state.error = null
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = weatherSlice.actions
export default weatherSlice.reducer
