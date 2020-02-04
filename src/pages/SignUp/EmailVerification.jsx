import React, { Component } from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import Axios from 'axios';
import {koneksi} from '../../environment'
class EmailVerification extends Component {
    state={
        loading:false
    }
    componentDidMount(){
        Axios.post(`${koneksi}/auth/email-verification`,{
            email:"fikar@siapptn.com"
          }).then((res)=>{
            this.setState({loading:true
            })
            setTimeout(() => {
                if(this.props.user.role == 'business'){
                    return window.location="/business"
                }else if(this.props.user.role == 'influencer'){
                    return window.location="/influencers";
                }else if(this.props.user.role=='user'){
                    return window.location="/influencers";
                }else if(this.props.user.role == "admin"){
                    return window.location="/admin";
                }else{
                    return window.location="/";
                }
            }, 2000);
          }).catch((err)=>{
            this.setState({
                loading:false
            })
          })
    }
    pageLoad=()=>{        
        if(this.state.loading){
            return(
                <div className="text-center">
                                    <h3>Selamat email kamu telah terverifikasi</h3>
                                    <p>Kamu akan ter-redirect kehalaman utama</p>
                                </div>

            )
        }else{
            return(
                <div className="text-center">
                    <h4>Halaman sedang diload</h4>
                    <div  style={{color:"black"}} className="spinner-border mx-4" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            )
        }
    }
    render() {
        
        return (
            <div>
                 <div className='container'>
                    <div className='row justify-content-center pt-5 mt-5'>
                        <MDBCard className='col-md-4'>
                            <MDBCardBody>
                            {this.pageLoad()}
                            </MDBCardBody>
                        </MDBCard>
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

export default connect(mapStateToProps) (EmailVerification);