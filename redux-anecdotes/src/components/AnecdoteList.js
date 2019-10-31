import React from 'react';
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const votedAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.updateAnecdote(id)
    dispatch({
      type: 'VOTE',
      data: {
        id: id
      }
    })
    }
}

const AnecdoteList = (props) => {

  const vote = (id) => {
    props.votedAnecdote(id)
    const anecdote = props.anecdotes.find(an => an.id === id)
    props.setNotification(`you voted ${anecdote.content}`, 5)
  }

  return (
  <div>
    {props.anecdotesToShow.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
    )}
  </div>
  )
}

const anecdotesToShow = (state) => {
  if (state.filter === '') {
    return state.anecdotes
  } else {
    const filterLowerCase = state.filter.toLowerCase()
    return state.anecdotes.filter(an => an.content.toLowerCase().includes(filterLowerCase))
  }
}


const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    anecdotesToShow: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  votedAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)
export default ConnectedAnecdoteList