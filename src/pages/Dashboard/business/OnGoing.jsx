import React, { Component } from 'react'
import {connect} from 'react-redux';
import queryString from 'query-string';
import ViewAllOnGoing from './ViewAllOnGoing';
import OnGoingDetail from './OnGoingDetail';

class OnGoingBusiness extends Component {
    render() {
        var params = queryString.parse(this.props.location.search)
        var ads = params.ads
        if(ads == undefined){
            return <ViewAllOnGoing/>
        }else{
            return <OnGoingDetail id_project={ads}/>
        }
    }
}
const mapStateToProps = (state) => {
    return{
        user : state.user.user
    }
  }
  
  export default connect(mapStateToProps) (OnGoingBusiness);