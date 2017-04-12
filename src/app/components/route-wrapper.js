// @flow

import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import { drawerTitle } from 'app/actions/drawer'
import { updateNavigation } from 'app/actions/navigation'
import Toolbar from './toolbar'

const styles = {
  component: {
    flexGrow: 1,
  },
}

type InProps = {
  component: any,
  id?: string | any => string,
  showTitle: boolean,
  inProps: any,
}

type DispatchProps = {
  updateTitle: string => void,
  updateNavigation: any => void,
}

class Component extends React.Component {
  props: InProps & DispatchProps

  componentWillMount () {
    const { id, updateTitle, updateNavigation, inProps } = this.props

    console.log('asdf')
    console.log(inProps.navigation)
    updateNavigation(inProps.navigation)

    if (typeof id === 'string') {
      updateTitle(id)
    } else if (typeof id === 'function') {
      updateTitle(id(inProps.navigation.state.params))
    }
  }

  componentWillReceiveProps (nextProps: any) {
    console.log(nextProps)
    this.props.updateNavigation(nextProps.navigation)
  }

  render () {
    const { component: Component, id, inProps, showTitle } = this.props

    return (
      <View style={styles.component}>
        {
          showTitle && typeof id !== 'undefined' ? <Toolbar /> : null
        }
        <Component {...inProps} />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  updateTitle: location => dispatch(drawerTitle(location)),
  updateNavigation: navigation => dispatch(updateNavigation(navigation)),
})

export default (component: any, id?: string | any => string, showTitle?: boolean = true) => {
  const Wrapper = connect(null, mapDispatchToProps)(Component)

  return (props: any) => (
    <Wrapper component={component} id={id} showTitle={!!showTitle} inProps={props} />
  )
}
