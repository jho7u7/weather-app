import { useState } from 'react'
import { login, register } from '../services/authService'

interface AuthFormProps {
  onLogin: () => void
}

function AuthForm({ onLogin }: AuthFormProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError('')

    if (!email.trim() || !password) {
      setError('Completa el correo y la contraseña.')
      return
    }

    if (mode === 'register') {
      if (!name.trim()) {
        setError('Ingresa tu nombre.')
        return
      }

      if (password.length < 8) {
        setError('La contraseña debe tener al menos 8 caracteres.')
        return
      }

      if (password !== passwordConfirmation) {
        setError('Las contraseñas no coinciden.')
        return
      }
    }

    setLoading(true)

    try {
      if (mode === 'register') {
        await register(
          name.trim(),
          email.trim(),
          password,
          passwordConfirmation
        )
      } else {
        await login(email.trim(), password)
      }

      onLogin()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Ocurrió un error. Inténtalo nuevamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-card">
      <div className="auth-tabs">
        <button
          className={mode === 'login' ? 'active' : ''}
          onClick={() => {
            setMode('login')
            setError('')
          }}
        >
          Iniciar sesión
        </button>

        <button
          className={mode === 'register' ? 'active' : ''}
          onClick={() => {
            setMode('register')
            setError('')
          }}
        >
          Crear cuenta
        </button>
      </div>

      <h2>
        {mode === 'login' ? 'Bienvenido 👋' : 'Crear una cuenta'}
      </h2>

      <p className="auth-description">
        {mode === 'login'
          ? 'Inicia sesión para agregar comentarios.'
          : 'Regístrate para poder participar en los comentarios.'}
      </p>

      {mode === 'register' && (
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      )}

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <div className="password-field">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={
            showPassword
              ? 'Ocultar contraseña'
              : 'Mostrar contraseña'
          }
        >
          {showPassword ? '👁️‍🗨️' : '👁️'}
        </button>
      </div>

      {mode === 'register' && (
        <div className="password-field">
          <input
            type={showPasswordConfirmation ? 'text' : 'password'}
            placeholder="Confirmar contraseña"
            value={passwordConfirmation}
            onChange={(event) =>
              setPasswordConfirmation(event.target.value)
            }
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() =>
              setShowPasswordConfirmation(!showPasswordConfirmation)
            }
            aria-label={
              showPasswordConfirmation
                ? 'Ocultar contraseña'
                : 'Mostrar contraseña'
            }
          >
            {showPasswordConfirmation ? '👁️‍🗨️' : '👁️'}
          </button>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      <button
        className="auth-submit"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading
          ? 'Procesando...'
          : mode === 'login'
            ? 'Iniciar sesión'
            : 'Crear cuenta'}
      </button>
    </section>
  )
}

export default AuthForm