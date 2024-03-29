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
import CreateProjectAds from './pages/ProductList/CreateProjectAds';
import Dashboard from './pages/Dashboard/Dashboard';
import MyProfile from './pages/Profile/index'
import PageNotFound from './pages/NotFound/PageNotFound'
import LandingPage from './pages/LandingPage/LandingPage'
import OnGoingBusiness from './pages/Dashboard/business/OnGoing'
import HistoryBusiness from './pages/Dashboard/business/History'
import ProjectDetail from './pages/ProductList/JobDetail'
import UserProfile from './pages/Profile/userProfile'
import PaymentPage from './pages/Transaction/Index'
import Footer from './components/Footer'
import CompleteProfile from './pages/Profile/CompleteProfile';
import InfluencerDetail from './pages/ProductList/InfluencerDetail';
import QuickAds from './pages/QuickAds/index'
import QuickAdsDetail from './pages/QuickAds/detail'

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
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/role' component={RoleValdiation} />
            <Route exact path='/profile' component={MyProfile} />
            <Route exact path='/find-business' component={Jobs} />
            <Route exact path='/find-influencer' component={FindInfluencer} />
            <Route exact path='/email-verification' component={EmailVerification} />
            <Route exact path='/create-ads/regular' component={CreateProjectAds} />
            <Route exact path='/create-ads/quick' component={QuickAds} />
            <Route exact path='/quick-ads/detail' component={QuickAdsDetail} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path="/ongoing-ads" component={OnGoingBusiness}/>
            <Route exact path="/user-profile/:id" component={UserProfile}/>
            <Route exact path="/history-ads" component={HistoryBusiness}/>
            <Route exact path="/project-detail/:id" component={ProjectDetail}/>
            <Route exact path="/profile-detail/:id" component={InfluencerDetail}/>
            <Route exact path="/payment" component={PaymentPage}/>
            <Route exact path="/complete-profile" component={CompleteProfile}/>
            <Route path="*" component={PageNotFound} />
          </Switch>
        }
        <Footer/>
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
