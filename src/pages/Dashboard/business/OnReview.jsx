import React, { Component } from 'react'
import Axios from 'axios'
import { koneksi } from '../../../environment'
import { connect } from 'react-redux'

class OnReview extends Component {
    approve=()=>{
        Axios.post(`${koneksi}/payment/aprove-influencer`,{
            id_project:this.props.id_project,id_user:this.props.user.id
        }).then((res)=>{
            console.log(res.data)
        })
    }
    render() {
        return (
            <div className="container mt-5 text-center">
                    <h3>Please check your ad in influencer instagram and approve their post here after you review their instagram or this will automatically aprove after 10 days</h3>

                    <button className="btn btn-success" onClick={this.approve}>Approve here</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user : state.user.user
    }
  }
export default connect(mapStateToProps) (OnReview);