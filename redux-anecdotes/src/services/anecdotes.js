import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = { content: content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
  }

const updateAnecdote = async (id) => {
  const anecdotes = await getAll()
  const newAnecdote = anecdotes.find(an => an.id === id)
  const response = await axios.put(`${baseUrl}/${id}`, {
    ...newAnecdote, votes: newAnecdote.votes + 1
  })
  return response.data
}

export default { getAll, createNew, updateAnecdote }