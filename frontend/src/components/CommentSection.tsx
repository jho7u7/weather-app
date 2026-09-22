import { useState } from 'react'

function CommentSection() {
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    if (!comment.trim()) {
      return
    }

    console.log('Comentario:', comment)
    setComment('')
  }

  return (
    <section className="comments">
      <h2>💬 Comentarios</h2>

      <textarea
        placeholder="Escribe tu comentario..."
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />

      <button onClick={handleSubmit}>
        Agregar comentario
      </button>
    </section>
  )
}

export default CommentSection