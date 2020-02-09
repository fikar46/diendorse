import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        user : state.user.user
    };
}


class JobDetail extends Component {
    
    render() {
        return (
            <div>
                <h1>Ini Job Detail Guys</h1>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(JobDetail);