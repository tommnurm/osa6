const initialState = ''

const notificationReducer = (state = initialState, action) => {

    switch (action.type) {
      case 'NEW_NOTIFICATION':
        return `${action.data}`
      case 'CLEAR_NOTIFICATION':
        return ''
      default: 
      return state
    }
    
  }

export const setNotification = (string, seconds) => {
    const number = seconds*1000
    return async dispatch => {
      await dispatch({
        type: 'NEW_NOTIFICATION',
        data: string
      })
      setTimeout(() => {
        dispatch(
          clearNotification()
        )
      }, number)
    }
  }

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
    data: {}
  }
}

  export default notificationReducer