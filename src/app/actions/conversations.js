// @flow

import { fetch } from 'app/api'

import { Actions } from 'app/reducers/conversations'
import { fetchUser } from 'app/actions/users'

import type { Id, State } from 'app/reducers'
import type { Action } from 'app/reducers/conversations'
import type { Action as UsersAction } from 'app/reducers/users'

export const fetchConversations = (id: Id) =>
  (dispatch: (Action | UsersAction) => void, getState: () => State) => (
    fetch(`/user/${id}/conversations`)
      .then(response => response.json())
      .then(conversations => {
        const state = getState()
        const promises = []

        // Extract users that we need to fetch
        Object.keys(conversations).forEach(key => {
          const conversation = conversations[key]

          // If there are no messages we set an empty array
          if (!conversation.messages) {
            conversation.messages = []
          }

          // Fetch the user profiles of the current chat users
          conversation.users.forEach(user => {
            if (!state.users[user]) {
              promises.push(fetchUser(user)(dispatch))
            }
          })

          // Fetch the user profiles of all people who have chatted in this
          // conversation
          conversation.messages.forEach(message => {
            if (!state.users[message.user]) {
              promises.push(fetchUser(message.user)(dispatch))
            }
          })
        })

        // After we have all the users trigger the conversation reducer
        return Promise.all(promises).then(() => {
          dispatch({
            type: Actions.FETCH_ALL,
            conversations: conversations,
          })
        })
      })
      .catch(err => console.log(err))
  )

export const addByEmail = (email: string) =>
  // FIXME: typing
  (dispatch: (Action | UsersAction | any) => void, getState: () => State) => {
    fetch(`/user-by-email/${email}`)
      .then(response => response.json())
      .then(user => dispatch(newConversation(Object.keys(user)[0])))
      .catch(err => console.log(err))
  }

export const newConversation = (id?: Id) =>
  (dispatch: (Action | UsersAction) => void, getState: () => State) => {
    const state = getState()
    const otherUser = id || state.navigation.state.params.id

    const body = {
      users: [
        state.user,
        otherUser,
      ]
    }

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }

    return fetchUser(otherUser)(dispatch)
      .then(() => fetch(`/conversations`, fetchOptions))
      .then(response => response.json())
      .then(response => {
        state.navigation.navigate('conversations')
        dispatch({
          type: Actions.NEW,
          id: response.id,
          conversation: {
            users: [ otherUser ],
            messages: [],
          }
        })
      })
      .catch(err => console.log(err))
  }

export const updateConversation = (id: Id) =>
  (dispatch: Dispatch) => {
    return fetch(`/conversations/${id}/messages`)
      .then(response => response.json())
      .then(messages => {
        dispatch({
          type: Actions.UPDATE,
          id,
          messages,
        })
      })
      .catch(err => console.log(err))
  }

export const updateText = (id: any, message: any, text: any) =>
  (dispatch: Dispatch, getState: () => State) => {
    const state = getState()

    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(text)
    }

    console.log(id)
    console.log(message)
    console.log(text)

    fetch(`/conversations/${id}/${message}`, fetchOptions)
      .catch(err => console.log(err))
  }
