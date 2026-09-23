import type { Weather } from '../services/weatherService'

interface WeatherCardProps {
  weather: Weather
}
// emojis de clima
function getWeatherIcon(condition: string): string {
    const value = condition.toLowerCase()
  
    if (value.includes('tormenta')) {
      return '⛈️'
    }
  
    if (value.includes('lluvia')) {
      return '🌧️'
    }
  
    if (value.includes('nublado')) {
      return '☁️'
    }
  
    if (value.includes('nube')) {
      return '🌤️'
    }
  
    if (value.includes('despejado')) {
      return '☀️'
    }
  
    if (value.includes('noche')) {
      return '🌙'
    }
  
    return '🌤️'
  }

  function getWeatherTheme(condition: string): string {
    const value = condition.toLowerCase()
  
    if (value.includes('tormenta')) {
      return 'weather-storm'
    }
  
    if (value.includes('lluvia')) {
      return 'weather-rain'
    }
  
    if (value.includes('nublado')) {
      return 'weather-cloudy'
    }
  
    if (value.includes('despejado')) {
      return 'weather-sunny'
    }
  
    if (value.includes('noche')) {
      return 'weather-night'
    }
  
    return 'weather-partly-cloudy'
  }

function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <section className={`weather-card ${getWeatherTheme(weather.condicion_clima)}`}>
      <div className="weather-card-header">
        <div>
          <span className="weather-label">CLIMA ACTUAL</span>
          <h2>{weather.ciudad}</h2>
        </div>

        <span className="weather-status">● Actualizado</span>
      </div>

      <div className="weather-main">
        <div className="weather-icon" aria-hidden="true">
            {getWeatherIcon(weather.condicion_clima)}
         </div>

        <div>
          <span className="temperature">
            {Number(weather.temperatura).toFixed(1)}°C
          </span>

          <p className="weather-condition">
            {weather.condicion_clima}
          </p>
        </div>
      </div>

      <div className="weather-details">
        <div className="weather-detail">
          <span className="detail-icon">💧</span>
          <div>
            <span>Humedad</span>
            <strong>{weather.humedad}%</strong>
          </div>
        </div>

        <div className="weather-detail">
          <span className="detail-icon">🌡️</span>
          <div>
            <span>Temperatura</span>
            <strong>
              {Number(weather.temp_fahrenheit).toFixed(1)}°F
            </strong>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WeatherCard