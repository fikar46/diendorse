import React, { Component } from 'react'
import Navbar from './components/Navbar'
import {Route,Switch} from 'react-router-dom'
import Login from './pages/Login/Login'

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path='/login' component={Login} />
        </Switch>
      </div>
    )
  }
}
