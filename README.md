# Weather App

A React + Redux weather application using the free [Open-Meteo](https://open-meteo.com/) API (no API key required).

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Features

- **Current location** – Uses browser geolocation on first load (falls back to London if denied).
- **City search** – Search by city name to see weather anywhere.
- **Current weather** – Temperature, condition, humidity, wind, precipitation.
- **5-day forecast** – Daily high/low and conditions.

## Tech

- **React 18** + **Vite**
- **Redux Toolkit** – Async thunks for fetching weather and geocoding
- **Open-Meteo** – Forecast and geocoding APIs

## Scripts

- `npm run dev` – Start dev server
- `npm run build` – Production build
- `npm run preview` – Preview production build
