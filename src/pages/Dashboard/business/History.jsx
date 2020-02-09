import React, { Component } from 'react'
import {connect} from 'react-redux';
import queryString from 'query-string';
import ViewAllHistory from './ViewAllHistory';

class HistoryBusiness extends Component {
    render() {
        var params = queryString.parse(this.props.location.search)
        var ads = params.ads
        if(ads == undefined){
            return <ViewAllHistory/>
        }
    }
}
const mapStateToProps = (state) => {
    return{
        user : state.user.user
    }
  }
  
  export default connect(mapStateToProps) (HistoryBusiness);