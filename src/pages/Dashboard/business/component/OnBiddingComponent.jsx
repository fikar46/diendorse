import React, { Component } from 'react'
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import Axios from 'axios';
import { koneksi } from '../../../../environment';
import { getHeaderAuth } from '../../../../helper/service';
import Swal from 'sweetalert2';
import {formatRupiah} from './../../../../helper/functions'



class OnBiddingComponent extends Component {
    state={
        onbidding:[],
        influencers : []
    }
    componentDidMount(){
        this.getDataUserOnbidding()
        this.getMyInfluencer()
    }
    getDataUserOnbidding=()=>{
        Axios.get(`${koneksi}/project/get-data-user-onbidding/${this.props.id_project}`,getHeaderAuth())
        .then((res)=>{
            console.log(res.data)
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
                <tr>
                    <td colSpan={3}> No Data</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            )
        }
        return this.state.influencers.map((item,i) =>{
            var place = JSON.parse(item.place)
            return(
                <tr>
                    <td>{i+1}</td>
                    <td>{item.fullname}</td>
                    <td>{item.username_ig}</td>
                    <td>{item.followers_ig}</td>
                    <td>{item.engagement_ig}</td>
                    <td>{place.kec},{place.kab},{place.prov}</td>
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
                    <td colSpan={3}> No Data</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            )
        }
        var data = this.state.onbidding.map((item,i)=>{
            console.log(item.id_biding)
            var place = JSON.parse(item.place)
            return(
                <tr>
                        <td>{i+1}</td>
                        <td>{item.fullname}</td>
                        <td>{item.username_ig}</td>
                        <td>{item.followers_ig}</td>
                        <td>{item.engagement_ig}</td>
                        <td>{place.kec},{place.kab},{place.prov}</td>
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
                    <MDBBtn color='blue'>Checkout Now</MDBBtn>                
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
  
  export default connect(mapStateToProps) (OnBiddingComponent);
