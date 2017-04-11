import { Actions } from 'app/reducers/navigation'

export const updateNavigation = (navigation: any) => ({
  type: Actions.UPDATE,
  navigation,
})
