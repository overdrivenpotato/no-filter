import { createStore } from 'redux'

import reducers from './reducers'

export default () => {
  const store = createStore(reducers)

  if (module.hot) {
    module.hot.accept(() => store.replaceReducer(require('./reducers').default))
  }

  return store
}
