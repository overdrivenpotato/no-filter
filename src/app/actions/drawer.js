import { DrawerLayoutAndroid } from 'react-native'

import { Actions } from 'app/reducers/drawer'

export const show = (dispatch) => {
  // This will crash, the app drawer needs to be extended and we need to call
  // this function as `this.openDrawer()`.
  //
  // DrawerLayoutAndroid.openDrawer()

  dispatch({ type: Actions.SHOW })
}
