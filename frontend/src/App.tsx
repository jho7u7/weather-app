import { useState } from 'react'
import './App.css'
import { getWeather, type Weather } from './services/weatherService'
import CitySearch from './components/CitySearch'
import WeatherCard from './components/WeatherCard'
import CommentSection from './components/CommentSection'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState<Weather | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    const cityName = city.trim()

    if (!cityName) {
      setError('Por favor, escribe una ciudad.')
      setWeather(null)
      return
    }

    setLoading(true)
    setError('')

    try {
      const data = await getWeather(cityName)
      setWeather(data)
    } catch {
      setWeather(null)
      setError('No se pudo encontrar la ciudad o consultar el clima.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🌤️ Weather App</h1>
        <p>Consulta el clima de tu ciudad</p>
      </header>

      <main className="container">
  
        <CitySearch
          city={city}
          loading={loading}
          onCityChange={setCity}
          onSearch={handleSearch}
        />

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {loading && (
          <div className="loading">
            Consultando el clima... 🌤️
          </div>
        )}

        {weather && !loading && <WeatherCard weather={weather} />}

        <CommentSection />
      </main>
    </div>
  )
}

export default App