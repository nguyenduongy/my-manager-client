import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

const initialState = {
  sidebarShow: true,
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const loggerMiddleware = createLogger()

let middleWares = [thunk]
if (process.env.NODE_ENV === 'development') {
  middleWares.push(loggerMiddleware)
}

const store = createStore(changeState, applyMiddleware(...middleWares))

export default store
