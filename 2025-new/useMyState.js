import { useReducer } from 'react'

const useMyState = (initialState) => {
  const reducer = (state, action) => {
    return typeof action === 'function' ? action(state) : action
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const setState = (newValue) => {
    dispatch(newValue)
  }

  return [state, setState]
}

export default useMyState