import { useEffect, useState } from 'react'
import {
  createComment,
  deleteComment,
  getComments,
  type Comment,
} from '../services/commentService'

interface CommentSectionProps {
  climaId: number
}

function CommentSection({ climaId }: CommentSectionProps) {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<Comment[]>([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingComments, setLoadingComments] = useState(true)

  useEffect(() => {
    const loadComments = async () => {
      setLoadingComments(true)
      setError('')

      try {
        const data = await getComments(climaId)
        setComments(data)
      } catch {
        setError('No se pudieron cargar los comentarios.')
      } finally {
        setLoadingComments(false)
      }
    }

    loadComments()
  }, [climaId])

  const handleSubmit = async () => {
    const text = comment.trim()

    if (!text) {
      setError('Escribe un comentario antes de enviarlo.')
      setSuccess('')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const newComment = await createComment({
        clima_id: climaId,
        comentario: text,
      })

      setComments((current) => [newComment, ...current])
      setComment('')
      setSuccess('Comentario guardado correctamente.')
    } catch {
      setError('No se pudo guardar el comentario. Inténtalo nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteComment(id)

      setComments((current) =>
        current.filter((item) => item.id !== id)
      )

      setSuccess('Comentario eliminado correctamente.')
      setError('')
    } catch {
      setError('No se pudo eliminar el comentario.')
      setSuccess('')
    }
  }

  return (
    <section className="comments">
      <h2>💬 Comentarios</h2>

      <textarea
        placeholder="Escribe tu comentario..."
        value={comment}
        onChange={(event) => {
          setComment(event.target.value)
          setError('')
          setSuccess('')
        }}
        aria-label="Comentario"
      />

      {error && <p className="error-message">{error}</p>}

      {success && <p className="success-message">{success}</p>}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Guardando...' : 'Agregar comentario'}
      </button>

      <div className="comments-list">
        {loadingComments ? (
          <p className="loading-comments">
            Cargando comentarios...
          </p>
        ) : comments.length === 0 ? (
          <p className="no-comments">
            Aún no hay comentarios. ¡Sé el primero! 💬
          </p>
        ) : (
          comments.map((item) => (
            <article className="comment-item" key={item.id}>
              <div className="comment-content">
                <p>{item.comentario}</p>

                <span>
                  {new Date(item.created_at).toLocaleString('es-EC')}
                </span>
              </div>

              <button
                className="delete-comment"
                onClick={() => handleDelete(item.id)}
              >
                Eliminar
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default CommentSection