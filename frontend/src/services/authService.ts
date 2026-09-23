const API_URL = 'http://localhost:8000'

interface User {
  id: number
  name: string
  email: string
}

function getXsrfToken(): string {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN='))

  return cookie ? decodeURIComponent(cookie.split('=')[1]) : ''
}

export async function getCsrfCookie() {
  const response = await fetch(`${API_URL}/sanctum/csrf-cookie`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('No se pudo obtener el token CSRF.')
  }
}

export async function register(
  name: string,
  email: string,
  password: string,
  password_confirmation: string
): Promise<User> {
  await getCsrfCookie()

  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-XSRF-TOKEN': getXsrfToken(),
    },
    body: JSON.stringify({
      name,
      email,
      password,
      password_confirmation,
    }),
  })

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new Error(data?.message || 'No se pudo crear la cuenta.')
  }

  const user = await getCurrentUser()

  if (!user) {
    throw new Error('No se pudo obtener el usuario después del registro.')
  }
  
  return user
}

export async function login(
  email: string,
  password: string
): Promise<User> {
  await getCsrfCookie()

  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-XSRF-TOKEN': getXsrfToken(),
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new Error(data?.message || 'Correo o contraseña incorrectos.')
  }

  const user = await getCurrentUser()

    if (!user) {
    throw new Error('No se pudo obtener el usuario después del inicio de sesión.')
    }

    return user
}

export async function getCurrentUser(): Promise<User | null> {
  const response = await fetch(`${API_URL}/api/user`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
  })

  if (response.status === 401) {
    return null
  }

  if (!response.ok) {
    throw new Error('No se pudo obtener el usuario.')
  }

  return response.json()
}

export async function logout() {
  await getCsrfCookie()

  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'X-XSRF-TOKEN': getXsrfToken(),
    },
  })

  if (!response.ok) {
    throw new Error('No se pudo cerrar sesión.')
  }
}