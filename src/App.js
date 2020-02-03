import React, { Component } from 'react'
import Navbar from './components/Navbar'
import {Route,Switch} from 'react-router-dom'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import ProductList from './pages/ProductList/ProductList'

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <Route path='/product-list' component={ProductList} />
        </Switch>
      </div>
    )
  }
}
