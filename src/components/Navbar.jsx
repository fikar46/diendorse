import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse} from "mdbreact";
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
  if(window.confirm('Are You Sure Want To Logout?')){
    localStorage.removeItem(localStorageKey)
    this.props.onLogout()
    alert('You Are Successfully Logout')
    window.location = '/'
    this.setState({isLogout : true})
    
  }
}
render() {

  if(this.props.user !== null){
    return (
      <MDBNavbar color="default-color" dark expand="md" className='px-5'>
        <MDBNavbarBrand href='/' style={{cursor:'pointer'}}>
          <strong className="white-text">Navbar</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink to="/login">{this.props.user.fullname}</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <span onClick={this.onLogoutCilck}>
                <MDBNavLink to='#'>
                  Log Out
                </MDBNavLink>
              </span>
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