import type { Weather } from '../services/weatherService'

interface WeatherCardProps {
  weather: Weather
}

function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <section className="weather-card">
      <h2>{weather.ciudad}</h2>

      <div className="weather-info">
        <span className="weather-icon">🌤️</span>

        <span className="temperature">
          {Number(weather.temperatura).toFixed(1)}°C
        </span>
      </div>

      <p>
        <strong>Humedad:</strong> {weather.humedad}%
      </p>

      <p>
        <strong>Condición:</strong>{' '}
        {weather.condicion_clima}
      </p>

      <p>
        <strong>Temperatura:</strong>{' '}
        {Number(weather.temp_fahrenheit).toFixed(1)}°F
      </p>
    </section>
  )
}

export default WeatherCard