import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { MDBTable, MDBTableBody, MDBTableHead, MDBIcon } from 'mdbreact';
import BusinessPage from './BusinessPage';
import InfluencerPage from './InfluencerPage';

class Dashboard extends Component {
    render() {
        if(this.props.user.role == "business"){
           return <BusinessPage/>
        }else if(this.props.user.role == "influencer"){
            return <InfluencerPage/>
        }
    }
}
const mapStateToProps = (state) => {
    return{
        user : state.user.user
    }
  }
  
  export default connect(mapStateToProps) (Dashboard);