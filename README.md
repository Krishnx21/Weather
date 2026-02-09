# 🌤️ Weather App

A modern, elegant weather application built with React and Redux that provides real-time weather information and forecasts for any location worldwide.

![Weather App](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.0.1-purple?logo=redux)
![Vite](https://img.shields.io/badge/Vite-5.0.8-yellow?logo=vite)

## ✨ Features

- 🌍 **Location-Based Weather**: Automatically detects your current location and displays local weather
- 🔍 **City Search**: Search for weather information in any city worldwide
- 📊 **Weather Charts**: Visual representation of temperature and weather trends
- 📅 **7-Day Forecast**: Detailed daily weather forecasts
- 🎨 **Modern UI**: Clean, responsive design with beautiful typography
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and production builds
- 🌡️ **Detailed Metrics**: Temperature, humidity, wind speed, and more

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Krishnx21/Weather.git
   cd Weather
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📦 Build for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.2.0** - Modern UI library with hooks
- **React DOM 18.2.0** - React rendering for web

### State Management
- **Redux Toolkit 2.0.1** - Simplified Redux state management
- **React Redux 9.0.4** - Official React bindings for Redux

### Build Tool
- **Vite 5.0.8** - Next-generation frontend tooling
- **@vitejs/plugin-react 4.2.1** - Official React plugin for Vite

### Styling
- Custom CSS with modern design principles
- Google Fonts (DM Sans & Instrument Serif)

### API
- **Open-Meteo API** - Free weather API for real-time weather data

## 📁 Project Structure

```
Weather/
├── src/
│   ├── components/          # React components
│   │   ├── CurrentWeather.jsx
│   │   ├── CurrentWeather.css
│   │   ├── Forecast.jsx
│   │   ├── Forecast.css
│   │   ├── SearchBar.jsx
│   │   ├── SearchBar.css
│   │   ├── WeatherChart.jsx
│   │   └── WeatherChart.css
│   ├── store/              # Redux store and slices
│   │   └── weatherSlice.js
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main App component
│   ├── App.css             # App styles
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── package.json            # Project dependencies
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

## 🎯 Key Components

### SearchBar
Allows users to search for weather in any city. Features a clean input design with search functionality.

### CurrentWeather
Displays the current weather conditions including:
- Temperature
- Weather description
- Location name
- Local time

### Forecast
Shows a 7-day weather forecast with daily high/low temperatures and weather conditions.

### WeatherChart
Visual chart representation of weather data trends over time.

## 🔧 Configuration

### Vite Configuration
The project uses Vite with React plugin. Configuration can be modified in `vite.config.js`.

### Redux Store
State management is handled through Redux Toolkit. The weather slice manages:
- Weather data fetching
- Loading states
- Error handling
- Location information

## 🌐 API Integration

This app uses the [Open-Meteo API](https://open-meteo.com/) for weather data:
- No API key required
- Free and open-source
- Reliable weather forecasts
- Global coverage

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- 💻 Desktop computers
- 📱 Mobile phones
- 📲 Tablets

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Krishnx21**
- GitHub: [@Krishnx21](https://github.com/Krishnx21)

## 🙏 Acknowledgments

- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- Icons and design inspiration from modern weather applications
- Built with ❤️ using React and Redux

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

**Made with ☀️ and ❄️ by Krishnx21**
