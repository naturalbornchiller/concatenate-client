import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signOut } from '../api'
import messages from '../messages'

class SignOut extends Component {
  componentDidMount () {
    const { setFlash, history, clearUser, user } = this.props

    signOut(user)
      .then(() => setFlash(messages.signOutSuccess, 'success'))
      .catch(() => setFlash(messages.signOutFailure, 'error'))
      .finally(() => history.push('/'))
      .finally(() => clearUser())
  }

  render () {
    return ''
  }
}

export default withRouter(SignOut)
