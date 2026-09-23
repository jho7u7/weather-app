const API_URL = 'http://localhost:8000/api'

export interface CommentPayload {
  clima_id: number
  comentario: string
}

export interface Comment {
  id: number
  clima_id: number
  comentario: string
  created_at: string
  updated_at: string
}

export async function getComments(climaId: number): Promise<Comment[]> {
  const response = await fetch(
    `${API_URL}/comentarios?clima_id=${climaId}`,
    {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
    }
  )

  if (!response.ok) {
    throw new Error('No se pudieron cargar los comentarios.')
  }

  return response.json()
}

function getXsrfToken(): string {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN='))

  return cookie ? decodeURIComponent(cookie.split('=')[1]) : ''
}

export async function createComment(
  payload: CommentPayload
): Promise<Comment> {
  const response = await fetch(`${API_URL}/comentarios`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-XSRF-TOKEN': getXsrfToken(),
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const data = await response.json().catch(() => null)

    throw new Error(
      data?.message || 'No se pudo guardar el comentario.'
    )
  }

  return response.json()
}

export async function deleteComment(id: number): Promise<void> {
  await fetch(`${API_URL}/comentarios/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'X-XSRF-TOKEN': getXsrfToken(),
    },
  })
}