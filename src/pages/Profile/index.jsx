import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyProfile from './MyProfile';
import MyProfileBusiness from './MyProfileBusiness';

function mapStateToProps(state) {
    return {
        user : state.user.user
    };
}

class Profile extends Component {
    render() {
        if(this.props.user.role == 'influencer'){
            return(
                <MyProfile/>
            )
        }
        if(this.props.user.role == 'business'){
            return(
                <MyProfileBusiness/>
            )
        }
    }
}

export default connect(
    mapStateToProps,
)(Profile);