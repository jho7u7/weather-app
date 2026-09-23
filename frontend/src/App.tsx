import { useEffect, useState } from 'react'
import './App.css'
import { getWeather, type Weather } from './services/weatherService'
import {
  getCurrentUser,
  logout,
} from './services/authService'
import CitySearch from './components/CitySearch'
import WeatherCard from './components/WeatherCard'
import CommentSection from './components/CommentSection'
import AuthForm from './components/AuthForm'

interface User {
  id: number
  name: string
  email: string
}

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState<Weather | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then((currentUser) => {
        setUser(currentUser)
      })
      .catch(() => {
        setUser(null)
      })
      .finally(() => {
        setCheckingAuth(false)
      })
  }, [])

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

  const handleLogout = async () => {
    try {
      await logout()
      setUser(null)
    } catch {
      setError('No se pudo cerrar sesión.')
    }
  }

  const handleLogin = async () => {
    const currentUser = await getCurrentUser()
    setUser(currentUser)
  }

  if (checkingAuth) {
    return (
      <div className="app">
        <div className="loading">
          Cargando aplicación... 🌤️
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>🌤️ Weather App</h1>
          <p>Consulta el clima de tu ciudad</p>
        </div>

        {user && (
          <div className="user-bar">
            <span>Hola, {user.name} 👋</span>

            <button onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        )}
      </header>

      <main className="container">
        {!user && <AuthForm onLogin={handleLogin} />}

        <section className="city-suggestions">
          <h2>Explora una ciudad</h2>

          <div className="city-grid">

            <button
              className="city-card"
              onClick={() => setCity('Quito')}
            >
              <img
                src="/public/quito.jpg"
                alt="Quito"
                className="city-image"
              />
              <span>Quito</span>
            </button>

            <button
              className="city-card"
              onClick={() => setCity('Guayaquil')}
            >
              <img
                src="/public/guayaquil.jpg"
                alt="Guayaquil"
                className="city-image"
              />
              <span>Guayaquil</span>
            </button>

            <button
              className="city-card"
              onClick={() => setCity('Cuenca')}
            >
              <img
                src="/public/cuenca.jpg"
                alt="Cuenca"
                className="city-image"
              />
              <span>Cuenca</span>
            </button>

            <button
              className="city-card"
              onClick={() => setCity('Loja')}
            >
              <img
                src="/public/puyo.jpg"
                alt="Puyo"
                className="city-image"
              />
              <span>Puyo</span>
            </button>

          </div>
        </section>

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
            <span className="loading-spinner" aria-hidden="true"></span>
            Consultando el clima...
          </div>
        )}

        {weather && !loading && (
          <WeatherCard weather={weather} />
        )}

        {weather && !loading && user && (
          <CommentSection climaId={weather.id} />
        )}

        {weather && !loading && !user && (
          <p className="auth-hint">
            🔐 Inicia sesión para poder agregar comentarios.
          </p>
        )}
      </main>
    </div>
  )
}

export default App