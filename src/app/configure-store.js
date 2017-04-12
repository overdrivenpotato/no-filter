// @flow

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { AsyncStorage } from 'react-native'

import reducers from './reducers'
import { login } from 'app/actions/user'

declare var module: any

export default () => {
  const store: any = createStore(
    reducers,
    applyMiddleware(thunk),
  )

  /*
  if (module.hot) {
    module.hot.accept(() => store.replaceReducer(require('./reducers').default))
  }
  */

  AsyncStorage.getItem('userId', (error, id) => {
    if (!error && id) {
      store.dispatch(login(id))
    }
  })

  return store
}
