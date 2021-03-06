import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { MDBTable, MDBTableBody, MDBTableHead, MDBIcon } from 'mdbreact';
import Axios from 'axios';
import { koneksi } from '../../environment';
import {getHeaderAuth} from '../../helper/service'
import LoadingPage from '../../components/LoadingPage';
class BusinessPage extends Component {
    state={
        ongoing:[],
        history:[],
        loadingOngoing:false,
        loadingHistory:false
    }
    componentDidMount(){
        this.getOngoingAds()
        this.getHistoryAds()
    }
    getOngoingAds=()=>{
        this.setState({loadingOngoing:true})
        Axios.get(koneksi + '/project/get-all-bids',getHeaderAuth())
        .then((bids) => {
            // console.log(bids.data)
            Axios.get(`${koneksi}/project/get-ongoing-ads/${this.props.user.id}`,getHeaderAuth())
            .then((res)=>{
                let data = [];
                res.data.forEach((val) =>{
                    var obj = val
                    obj['bid'] = bids.data.data.filter((bid) => {
                        return bid.id_project_ads == val.id
                    }).length
                    data.push(obj)
                })

                // console.log(data)

                this.setState({ongoing:data,loadingOngoing:false})
            }).catch((err)=>{
                console.log(err)
                this.setState({loadingOngoing:false})
            })
        })
    }
    getHistoryAds=()=>{
        this.setState({loadingHistory:true})
        Axios.get(`${koneksi}/project/get-history-ads/${this.props.user.id}`,getHeaderAuth())
        .then((res)=>{
            console.log(res.data)
            this.setState({history:res.data,loadingHistory:false})
        }).catch((err)=>{
            console.log(err)
            this.setState({loadingHistory:false})
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
    onGoingMapData=()=>{
        
       if(this.state.ongoing.length>0){
        var data = this.state.ongoing.map((item)=>{
            var status;
            if(item.status_ads == 0){
                status = "On Bidding"
            }else if(item.status_ads == 1){
                status = "On Progress"
            }else if(item.status_ads == 2){
                status = "On Review"
            }else if(item.status_ads == 3){
                status = "On Review by Diendorse"
            }else if(item.status_ads == 4){
                status = "Pending"
            }
            var date = new Date(item.created_ads)
            date.setHours(date.getHours()+8)
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return(
                <tr>
                    <td>{item.product_name}</td>
                    <td>{date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</td>
                    <td>{status}</td>
                    <td>{item.bid} Bidding</td>
                    <td><Link to={`/ongoing-ads?ads=${item.id}`}><MDBIcon icon="chevron-right" /></Link></td>
                </tr>
            )
        })
        return data
       }else{
            return(
                <tr>
                    <td colSpan="5" className="text-center">No Data</td>
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
                    <td colSpan="5" className="text-center">No Data</td>
                </tr>
            )
        }
     }
    
    render() {
        if(this.state.loadingOngoing || this.state.loadingHistory){
            return(
                <LoadingPage/>
            )
        }
        var historyView=()=>{
            if(this.state.history.length>0){
                return(
                    <small className="d-block text-right mt-3">
                                  <Link to="/history-ads">View All</Link>
                            </small>
                )
            }
        }
        var ongoingView=()=>{
            if(this.state.ongoing.length>0){
                return(
                    <small className="d-block text-right mt-3">
                                  <Link to="/ongoing-ads">View All</Link>
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
                    <div className="col-md-8">
                        {this.createAds()}
                        <div className="mb-3 p-3 bg-white rounded shadow-sm">
                        <p className="font-weight-bold pt-3">On Going</p>
                        <MDBTable hover>
                            <MDBTableHead style={{}}>
                                <tr>
                                    <th>Product</th>
                                    <th>Date created</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {this.onGoingMapData()}
                            </MDBTableBody>
                            </MDBTable>
                            {ongoingView()}
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
                                    <th>Status</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {this.historyMapData()}
                            </MDBTableBody>
                            </MDBTable>
                            {historyView()}
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
export default connect(mapStateToProps) (BusinessPage);