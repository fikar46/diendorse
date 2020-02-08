import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    createAds=()=>{
        if(this.props.user.role == "business"){
            return(
                <div className="text-right mb-2">
                    <Link className="btn btn-primary" to="/create-ads">Create Ads</Link>
                </div>
            )
        }
    }
    render() {
        return (
            <div className="pt-4 container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card mb-3">
                            <div className='text-center mt-5'>
                                <img src="https://storage.siapptn.com/image/ava/avatar.png" alt="avatar" class="rounded-circle" width="48" height="48"/>
                                <p>{this.props.user.fullname}<br/>
                                {this.props.user.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        {this.createAds()}
                        <div className="card p-2">
                            <p>Ongoing ads</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        user : state.user.user
    }
  }
  
  export default connect(mapStateToProps) (Dashboard);