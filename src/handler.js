const { nanoid } = require('nanoid')
const notes = require('./notes')

const addNoteHandler = (req, h) => {
  const { title, tags, body } = req.payload

  const id = nanoid(16)
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  const newNote = {
    title, tags, body, id, createdAt, updatedAt
  }

  notes.push(newNote)

  const isSuccess = notes.filter((note) => note.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Note added successfully',
      data: {
        noteId: id
      }
    })
    response.code(201)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Note not added'
  })
  response.code(500)
  return response
}

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes
  }
})

const getNoteFromID = (req, h) => {
  const { id } = req.params

  const note = notes.filter((n) => n.id === id)[0]

  if (note) {
    const response = h.response({
      status: 'success',
      data: {
        note
      }
    })
    response.code(200)
  }

  const response = h.response({
    status: 'fail',
    message: 'Note not found'
  })
  response.code(500)
  return response
}

module.exports = { addNoteHandler, getAllNotesHandler, getNoteFromID }
