import React, { Component } from 'react'
import './App.scss'
import { Route, Link } from 'react-router-dom'
import Flash from './Flash'
import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import TaskIndex from './tasks/components/TaskIndex'
import Home from './home/Home'
class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      message: '',
      type: null,
      reloadToggle: true
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  setFlash = (message, type='success') => {
    this.setState({ message, type, reloadToggle: !this.state.reloadToggle })
  }

  render () {
    const { reloadToggle, message, type, user } = this.state

    return (
      <React.Fragment>
        <Flash
          key={reloadToggle}
          message={message}
          type={type} />

        <Header user={user} />
        
        <main className="container">
          <Route exact path='/' render={() => (
            <Home setFlash={this.setFlash} setUser={this.setUser} />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp setFlash={this.setFlash} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn setFlash={this.setFlash} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut setFlash={this.setFlash} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword setFlash={this.setFlash} user={user} />
          )} />
          <AuthenticatedRoute user={ user } path='/tasks' render={() => (
            <TaskIndex setFlash={this.setFlash} user={ user } />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
