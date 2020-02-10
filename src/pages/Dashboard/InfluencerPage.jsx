import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { MDBTable, MDBTableBody, MDBTableHead, MDBIcon } from 'mdbreact';
import Axios from 'axios';
import { koneksi } from '../../environment';
import {getHeaderAuth} from '../../helper/service'
class InfluencerPage extends Component {
    state={
        onbidding:[],
        history:[],
        ongoing:[]
    }
    componentDidMount(){
        // this.getOngoingAds()
        // this.getHistoryAds()
        this.getOnbiddingAds()
    }
    getOnbiddingAds=()=>{
        Axios.get(`${koneksi}/project/get-onbidding-by-id/${this.props.user.id}`,getHeaderAuth())
        .then((res)=>{
            this.setState({onbidding:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    getOngoingAds=()=>{
        Axios.get(`${koneksi}/project/get-ongoing-ads/${this.props.user.id}`,getHeaderAuth())
        .then((res)=>{
            console.log(res.data)
            this.setState({ongoing:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    getHistoryAds=()=>{
        Axios.get(`${koneksi}/project/get-history-ads/${this.props.user.id}`,getHeaderAuth())
        .then((res)=>{
            console.log(res.data)
            this.setState({history:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    createAds=()=>{
        if(this.props.user.role == "business"){
            return(
                <div className="float-right text-right mb-2">
                    <Link className="btn btn-primary" to="/create-ads">Create Ads</Link>
                </div>
            )
        }
    }
    endorseIncomeData=()=>{
        
       if(this.state.endroseIncome.length>0){
        var data = this.state.endroseIncome.map((item)=>{
            var date = new Date(item.created_ads)
            date.setHours(date.getHours()+8)
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return(
                <tr>
                    <td>{item.product_name}</td>
                    <td>{date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</td>
                    <td></td>
                    <td>0 Bidding</td>
                    <td><Link to={`/ongoing-ads?ads=${item.id}`}><MDBIcon icon="chevron-right" /></Link></td>
                </tr>
            )
        })
        return data
       }else{
            return(
                <tr>
                    <td colSpan="6" className="text-center">No Data</td>
                </tr>
            )
       }
    }
    onBiddingMapData=()=>{
        
        if(this.state.onbidding.length>0){
         var data = this.state.onbidding.map((item)=>{
             var status;
             if(item.status_bidding == 0){
                 status = "Pending"
             }
             var date = new Date(item.createdAt)
             date.setHours(date.getHours()+8)
             var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
             return(
                 <tr>
                     <td>{item.product_name}</td>
                     <td>{date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</td>
                     <td>{status}</td>
                     <td><Link to={`/project-detail/${item.id}`}><MDBIcon icon="chevron-right" /></Link></td>
                 </tr>
             )
         })
         return data
        }else{
            return(
                <tr>
                    <td colSpan="4" className="text-center">No Bidding</td>
                </tr>
            )
        }
     }
    historyMapData=()=>{
        
        if(this.state.history.length>0){
         var data = this.state.history.map((item)=>{
             var status;
             if(item.status_ads == 5){
                 status = "Done"
             }
             var date = new Date(item.created_ads)
             date.setHours(date.getHours()+8)
             var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
             return(
                 <tr>
                     <td>{item.product_name}</td>
                     <td>{date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</td>
                     <td>{status}</td>
                     <td>0 Bidding</td>
                     <td><Link to={`/ongoing-ads?ads=${item.id}`}><MDBIcon icon="chevron-right" /></Link></td>
                 </tr>
             )
         })
         return data
        }else{
            return(
                <tr>
                    <td colSpan="4" className="text-center">No Data</td>
                </tr>
            )
        }
     }
    
    render() {
        var onBidding =()=>{
            if(this.state.onbidding.length>0){
                return(
                    <small className="d-block text-right mt-3">
                                      <Link to="/on-bidding">View All</Link>
                                </small>
                )
            }
        }
        return (
            <div className="pt-4 container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card mb-3">
                            <div className='mt-5  text-center'>
                                <img src="https://storage.siapptn.com/image/ava/avatar.png" alt="avatar" class="rounded-circle" width="48" height="48"/>
                                <p><span className="font-weight-bold">{this.props.user.fullname}</span><br/>
                                {this.props.user.email}</p>
                                {/* <div className="row"> */}
                                    <p className="font-weight-bold">Account Balance</p>
                                    <p>Rp 2.500.000,00</p>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-md-8">
                        {this.createAds()}
                        <div className="mb-3 p-3 bg-white rounded shadow-sm">
                        <p className="font-weight-bold pt-3">Endorse Income</p>
                        <MDBTable hover>
                            <MDBTableHead style={{}}>
                                <tr>
                                    <th>Product</th>
                                    <th>Date created</th>
                                    <th>Owner</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {this.endorseIncomeData()}
                            </MDBTableBody>
                            </MDBTable>
                            <small className="d-block text-right mt-3">
                                  <Link to="/ongoing-ads">View All</Link>
                            </small>
                         </div>
                    </div> */}
                    <div className="col-md-8">
                        <div className="mb-3 p-3 bg-white rounded shadow-sm">
                        <p className="font-weight-bold pt-3">On Bidding</p>
                        <MDBTable hover>
                            <MDBTableHead style={{}}>
                                <tr>
                                    <th>Product</th>
                                    <th>Owner</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {this.onBiddingMapData()}
                            </MDBTableBody>
                            </MDBTable>
                            {onBidding()}
                         </div>
                    </div>
                    <div className="col-md-12">
                        <div className="mb-3 p-3 bg-white rounded shadow-sm">
                        <p className="font-weight-bold pt-3">On Going</p>
                        <MDBTable hover>
                            <MDBTableHead style={{}}>
                                <tr>
                                    <th>Product</th>
                                    <th>Date created</th>
                                    <th>Owner</th>
                                    <th></th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {this.historyMapData()}
                            </MDBTableBody>
                            </MDBTable>
                            <small className="d-block text-right mt-3">
                                  <Link to="/history-ads">View All</Link>
                            </small>
                         </div>
                    </div>
                    <div className="col-md-12">
                        <div className="mb-3 p-3 bg-white rounded shadow-sm">
                        <p className="font-weight-bold pt-3">History</p>
                        <MDBTable hover>
                            <MDBTableHead style={{}}>
                                <tr>
                                    <th>Product</th>
                                    <th>Date created</th>
                                    <th>Owner</th>
                                    <th></th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {this.historyMapData()}
                            </MDBTableBody>
                            </MDBTable>
                            <small className="d-block text-right mt-3">
                                  <Link to="/history-ads">View All</Link>
                            </small>
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
export default connect(mapStateToProps) (InfluencerPage);