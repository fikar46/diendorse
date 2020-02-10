import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBBtn,MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBDropdown} from "mdbreact";
import {connect} from 'react-redux'
import { localStorageKey } from "../helper/constant";
import {onLogout} from './../redux/actions'
import Logo from './../support/assets/images/landingPage/logo@2x.png'
import './../support/css/LandingPage.css'
class Navbar extends Component {
state = {
  isOpen: false,
  isLogout : false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}
onLogoutCilck =()=> {
  var alert = window.confirm('Are You Sure Want To Logout?');
  if(alert){
    localStorage.removeItem(localStorageKey)
    this.props.onLogout()
    window.location = '/login'
    this.setState({isLogout : true})
    
  }
}
roleBrowse=()=>{
  console.log(this.props.user.role)
  if(this.props.user.role == "influencer"){
    return(
      <MDBNavLink to='/find-business'>
        <strong className="black-text">Find business</strong>
                </MDBNavLink>
    )
  }else if(this.props.user.role == "business"){
    return(
      <MDBNavLink to='/find-influencer'>
      <strong className="black-text">Find Influencer</strong>
              </MDBNavLink>
    )
  }
}
createAds=()=>{
  if(this.props.user.role == "business"){
      return(
        <MDBNavLink to='/create-ads'>
        <strong className="black-text">Create Ads</strong>
                  </MDBNavLink>
      )
  }
}
render() {

  if(this.props.user !== null){
    return (
      <MDBNavbar color="white" light expand="md" className='px-5'>
        <MDBNavbarBrand href='/dashboard' style={{cursor:'pointer'}}>
          <strong className="black-text">Diendorse</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
        <MDBNavbarNav left>
            <MDBNavItem>
                <MDBNavLink to='/dashboard'>
                <strong className="black-text">Dashboard</strong>
                </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
                {this.roleBrowse()}
            </MDBNavItem>
            <MDBNavItem>
              {this.createAds()}
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
            <div className="pt-2">
                  <strong className="black-text ">{this.props.user.fullname}</strong>  
                  <p>{this.props.user.role}</p>
            </div>
            </MDBNavItem>
            <MDBNavItem>
              
            <MDBDropdown>
                
                  <MDBDropdownToggle nav caret >
                  <img src="https://storage.siapptn.com/image/ava/avatar.png" class="rounded-circle" width="40" height="40"/>
                  </MDBDropdownToggle>
                
                
                <MDBDropdownMenu>
                  <MDBDropdownItem href="/profile">Profile</MDBDropdownItem>
                  <span onClick={this.onLogoutCilck}>
                  <MDBDropdownItem href="#">Log out</MDBDropdownItem>
                  </span>
                </MDBDropdownMenu>
              </MDBDropdown>
             
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    )
  }
  return (
    <div className='container'>
        <ul className="nav row justify-content-between">
          <li className="nav-item">
            <a className="nav-link" href="/">
              <img src={Logo} style={{height: '61,95px', width: '130px'}} />
            </a>
          </li>
          <div className='d-flex justify-content-center align-items-center'>
            <li className="nav-item">
              <a className="nav-link" style={{fontSize: '16px', fontFamily: 'Avenir'}} href="/login">Login</a>
            </li>
            <li className="nav-item">
            <MDBBtn href='/signup' color='blue' style={{borderRadius: '100px',paddingLeft: '1rem', marginLeft: '10px',textTransform:'capitalize' , color: "white"}}>Getting Started </MDBBtn>            
            </li>
          </div>
          {/* <li class="nav-item menu">
                                        <a class="nav-link" href="#">Find Influencer</a>
                                      </li>
                      
                        <li class="nav-item list">
                          <a class="nav-link" href="#">Find Business</a>
                        </li>
                        <li class="nav-item list">
                                <a class="nav-link" href="#"></a>
                              </li> */}
      </ul>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    user : state.user.user
  }
}

export default connect(mapStateToProps,{onLogout})(Navbar);