import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBDropdown} from "mdbreact";
import {connect} from 'react-redux'
import { localStorageKey } from "../helper/constant";
import {onLogout} from './../redux/actions'

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
    alert('You Are Successfully Logout')
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
      <strong className="black-text">Find influencer</strong>
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
          <strong className="black-text">Navbar</strong>
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
                  <MDBDropdownItem href="/"><span onClick={this.onLogoutCilck}>Log out</span></MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
             
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    )
  }
  return (
      <MDBNavbar color="default-color" dark expand="md" className='px-5'>
        <MDBNavbarBrand href='/' style={{cursor:'pointer'}}>
          <strong className="white-text">Navbar</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink to="/login">Log In</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/signup">Sign Up</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    user : state.user.user
  }
}

export default connect(mapStateToProps,{onLogout})(Navbar);