import React, { Component } from 'react'
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn,MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBListGroup, MDBListGroupItem} from 'mdbreact';
import { connect } from 'react-redux';
import Axios from 'axios';
import { koneksi } from '../../../../environment';
import { getHeaderAuth } from '../../../../helper/service';
import Swal from 'sweetalert2';
import {formatRupiah} from './../../../../helper/functions'
import { Link } from 'react-router-dom'


class OnBiddingComponent extends Component {
    state={
        onbidding:[],
        influencers : [],
        modal: false
    }
    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }      
    componentDidMount(){
        this.getDataUserOnbidding()
        this.getMyInfluencer()
    }
    getDataUserOnbidding=()=>{
        Axios.get(`${koneksi}/project/get-data-user-onbidding/${this.props.id_project}`,getHeaderAuth())
        .then((res)=>{
            this.setState({onbidding:res.data})
        }).catch((err)=>{

            console.log(err)
        })
    }
    onAcceptBtnClick = (id,status) => {
        Axios.post(`${koneksi}/project/update-ads-status`,{status,id : id},getHeaderAuth())
        .then((res) => {
            if(!res.data.error){
                Swal.fire('Success',res.data.message,'success')
                this.getDataUserOnbidding()
                this.getMyInfluencer()
            }
        })
    }

    getMyInfluencer = () => {
        Axios.post(`${koneksi}/project/get-data-bid-with-status-and-id-ads`,{status : 1,id_ads : this.props.id_project},getHeaderAuth())
        .then((res) => {
            if(!res.data.error){
                console.log(res.data.data)
                this.setState({influencers : res.data.data})
            }
        })
    }

    CancelClick = (id,status) => {
        Axios.post(`${koneksi}/project/update-ads-status`,{status,id : id},getHeaderAuth())
        .then((res) => {
            if(!res.data.error){
                Swal.fire('Success',res.data.message,'success')
                this.getDataUserOnbidding()
                this.getMyInfluencer()
            }
        })
    }
    renderAcceptedBidders =() => {
        if(this.state.influencers.length == 0){
            return(
                <tr className="text-center">
                    <td colSpan={9}> No Data</td>
                    
                </tr>
            )
        }
        return this.state.influencers.map((item,i) =>{
            console.log(item)
            var place = JSON.parse(item.place)
            return(
                <tr>
                    <td>{i+1}</td>
                    <td> <Link to={'/user-profile/' + item.id_user} style={{color:"blue",textDecoration:'underline',fontStyle:'italic'}}> {item.fullname} </Link></td>
                    <td>{item.username_ig}</td>
                    <td>{item.followers_ig}</td>
                    <td>{item.engagement_ig}</td>
                    <td>{ place.kec},{place.kab},{place.prov}</td>
                    <td>{ formatRupiah(String(item.price) , 'Rp')}</td>
                    <td><button style={{fontSize:'12px',padding:'10px',textTransform:'capitalize'}} onClick={() => this.CancelClick(item.id_biding,0)} className="btn btn-danger">Cancel</button></td>
                </tr>
            )

        } )
    }
    
    mapOnBidding=()=>{
        if(this.state.onbidding.length == 0){
            return(
                <tr>
                    <td colSpan={9}> No Data</td>
                    
                </tr>
            )
        }
        var data = this.state.onbidding.map((item,i)=>{
            // console.log(item.id_biding)
            var place = JSON.parse(item.place)
            return(
                <tr>
                        <td>{i+1}</td>
                        <td> <Link to={'/user-profile/' + item.id_user} style={{color:"blue",textDecoration:'underline',fontStyle:'italic'}}> {item.fullname} </Link></td>
                        <td>{item.username_ig}</td>
                        <td>{item.followers_ig}</td>
                        <td>{item.engagement_ig}</td>
                        {/* <td>{place ? place.kec : null},{place.kab?  place.kab : null},{place.prov ? place.prov : null}</td> */}
                        <td>{ formatRupiah(String(item.price) , 'Rp')}</td>
                        <td><button style={{fontSize:'12px',padding:'10px',textTransform:'capitalize'}} onClick={() => this.onAcceptBtnClick(item.id_biding,3)} className="btn btn-danger">reject</button></td>
                        <td><button style={{fontSize:'12px',padding:'10px',textTransform:'capitalize'}} onClick={() => this.onAcceptBtnClick(item.id_biding,1)} className="btn btn-success">Accept</button></td>
                    </tr>
            )
        })
        return data;
    }

    renderTotalHarga = () => {
        var total = 0
        this.state.influencers.forEach((val) => {
            total += val.price
        })
        return formatRupiah( String(total),'Rp') 
    }
    checkOut=()=>{
        var total = 0
        this.state.influencers.forEach((val) => {
            total += val.price
        })
        Axios.post(`${koneksi}/payment/get-information`,{
            user:this.props.user,amount:total,id_project:this.props.id_project
        })
        .then((res)=>{
            console.log(res.data)
            return window.location = `/payment?ads=${this.props.id_project}`
        }).catch((err)=>{
            console.log(err.response)
        })
    }
    render() {
        return (
            <div className=" mt-5">
               <div className="my-4">
               <h4>Bidders</h4>
                <MDBTable className="text-center">
                <MDBTableHead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Instagram</th>
                        <th>Followers</th>
                        <th>Engagment Instagram</th>
                        <th>Location</th>
                        <th>Price</th>
                        <th></th>
                        <th></th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {this.mapOnBidding()}
                    
                </MDBTableBody>
                </MDBTable>
               </div>
               <div className="my-4">
               <h4>Your Influencer (Accepted Bidders)</h4>
                <MDBTable>
                <MDBTableHead>
                    <tr>
                    <th>No</th>
                        <th>Name</th>
                        <th>Instagram</th>
                        <th>Followers</th>
                        <th>Engagment Instagram</th>
                        <th>Location</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {this.renderAcceptedBidders()}
                </MDBTableBody>
                </MDBTable>

                <div style={{fontWeight:'bolder'}} className='text-center mt-5'>
                    Total Price {this.renderTotalHarga()}
                </div>
                <div className='text-center'>
                    <MDBBtn color='blue' onClick={this.toggle}>Checkout Now</MDBBtn>                
                </div>                
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                        <MDBModalHeader toggle={this.toggle}>Choose payment</MDBModalHeader>
                        <MDBModalBody>
                        <MDBListGroup >
                            <MDBListGroupItem onClick={this.checkOut} href="#">Briva</MDBListGroupItem>
                        </MDBListGroup>
                        </MDBModalBody>
                            <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                            {/* <MDBBtn color="primary">Checkout</MDBBtn> */}
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
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
  
  export default connect(mapStateToProps) (OnBiddingComponent);
