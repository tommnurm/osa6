import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(an => an.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      let newState = state.map(anecdote => 
        anecdote.id !== id ? anecdote: votedAnecdote
      )
      newState = newState.sort((a,b) => b.votes - a.votes)
      return newState
    case 'NEW_ANECDOTE':
      const newAnecdote = asObject(action.data.content)
      return [...state, newAnecdote]
    case 'INIT_ANECDOTES':
      return action.data
    default: 
    return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer