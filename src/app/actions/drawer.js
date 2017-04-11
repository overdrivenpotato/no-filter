// @flow

import { DrawerLayoutAndroid } from 'react-native'

import { Actions } from 'app/reducers/drawer'

import type { Action } from 'app/reducers/drawer'

export const drawerTitle = (title: string): Action => ({
  type: Actions.TITLE,
  title,
})
