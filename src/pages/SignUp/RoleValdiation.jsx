import React, { Component } from 'react'
import {getHeaderAuth} from '../../helper/service'
import { MDBBtn, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
import Axios from 'axios';
import {koneksi} from '../../environment'
export default class RoleValdiation extends Component {
  state={
    roleUpdate:false,
    role:null
  }
  componentDidMount(){
   
  }
  updateRole=(role)=>{
    Axios.post(`${koneksi}/auth/updateroleuser`,{
      id:8,email:"fikar@siapptn.com",role
    },getHeaderAuth())
    .then((res)=>{
      this.setState({
        roleUpdate:true,role
      })
      setTimeout(() => {
        window.location="/jobs"
      }, 2000);
    }).catch((err)=>{
      this.setState({
        roleUpdate:false,role
      })
    })
  }
  bodyPageValidation=()=>{
    if(!this.state.roleUpdate){
      return(
        <form>
        <p className="h4 text-center">Select account type</p>
        <p className="text-center">Don’t worry, this can be changed later.</p>
        <div className="text-center">
          <MDBBtn className="btn btn-outline-blue" type="button" onClick={()=>this.updateRole("influencer")}>
            Influencer
            <MDBIcon far icon="paper-plane" className="ml-2" />
          </MDBBtn>
          <MDBBtn className="btn btn-outline-blue" type="button" onClick={()=>this.updateRole("business")}>
            Business
            <MDBIcon far icon="paper-plane" className="ml-2" />
          </MDBBtn>
        </div>
      </form>
      )
    }else{
      return(
        <div className="text-center">
        <p className="h4">Selamat kamu telah terdaftar sebagai</p>
        <h3 className="">{this.state.role}</h3>
        </div>
      )
    }
  }
    render() {
        return (
            <div className='container'>
            <div className='row justify-content-center pt-5 mt-5'>
                <MDBCard className='col-md-4'>
              <MDBCardBody>
                 {this.bodyPageValidation()}
            </MDBCardBody>
          </MDBCard>
          </div>
          </div>
        )
    }
}
