import React, { Component } from 'react'
import Navbar from './components/Navbar'
import {Route,Switch} from 'react-router-dom'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import Jobs from './pages/ProductList/Jobs'
import RoleValdiation from './pages/SignUp/RoleValdiation'
import { localStorageKey } from './helper/constant'
import LoadingPage from './components/LoadingPage'
import { connect} from 'react-redux'
import {onRegisterSuccess} from './redux/actions'
import EmailVerification from './pages/SignUp/EmailVerification'
import FindInfluencer from './pages/ProductList/FindInfluencer'


class App extends Component {
  state = {
    checked : false
  }
  componentDidMount(){
    this.keepLogin()
  }

  keepLogin = () => {
    const dataLocalStorage = JSON.parse(localStorage.getItem(localStorageKey))
    if(dataLocalStorage){
      this.props.onRegisterSuccess(dataLocalStorage)
      this.setState({checked : true})
    }else{
      this.setState({checked:true})
    }
  }



  render() {
    
    return (
      <div>
        <Navbar />
        {
          this.state.checked === false?
          <LoadingPage /> :
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp} />
            <Route path='/role' component={RoleValdiation} />
            <Route path='/find-business' component={Jobs} />
             <Route path='/find-influencer' component={FindInfluencer} />
            <Route path='/email-verification' component={EmailVerification} />
          </Switch>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    user : state.user.user
  }
}

export default connect(mapStateToProps,{onRegisterSuccess})(App);
