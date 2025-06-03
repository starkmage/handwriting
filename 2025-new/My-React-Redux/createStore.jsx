import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

/*
参考：
https://yuanbao.tencent.com/chat/naQivTmsDa/2e6ae3ed-920c-4c4c-a0a6-52ada3b752d4?projectId=2f13020843e3426ab5f1fc84dfe2aa87
*/

const createStore = (reducer, initialState) => {
  let state = initialState
  const listeners = new Set()

  const getState = () => {
    return state
  }

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())

    return action
  }

  const subscribe = (listener) => {
    listeners.add(listener)

    return () => {
      listeners.delete(listener)
    }
  }

  dispatch({ type: '@@INIT' })

  return {
    getState,
    dispatch,
    subscribe
  }
}

const ReactReduxContext = createContext(null)

const Provider = ({ store, children }) => {
  const contextValue = useMemo(() => {
    return { store }
  }, [store])

  return (
    <ReactReduxContext.Provider value={contextValue}>
      {children}
    </ReactReduxContext.Provider>
  )
}

const useSelector = (selector, compareFn = (a, b) => a === b) => {
  const {store} = useContext(ReactReduxContext)
  const [selectedState, setSelectedState] = useState(
    () => selector(store.getState())
  )

  useEffect(() => {
    let hasUnmounted = false

    const checkForUpdates = () => {
      if (hasUnmounted) {
        return
      }

      const newSelectedState = selector(store.getState())

      if (!compareFn(selectedState, newSelectedState)) {
        setSelectedState(newSelectedState)
      }
    }

    const unsubscribe = store.subscribe(checkForUpdates)

    checkForUpdates()

    return () => {
      hasUnmounted = true
      unsubscribe()
    }
  }, [store, selector, compareFn, selectedState])

  return selectedState
}

const useDispatch = () => {
  const {store} = useContext(ReactReduxContext)

  return store.dispatch
}

export {
  createStore,
  Provider,
  useSelector,
  useDispatch
}