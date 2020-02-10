import React, { Component } from 'react'
import { MDBTable, MDBTableBody, MDBTableHead, MDBIcon } from 'mdbreact';
import { koneksi } from '../../../environment';
import { getHeaderAuth } from '../../../helper/service';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingPage from '../../../components/LoadingPage';


class ViewAllOnGoing extends Component {
    state={
        ongoing:[]
    }
    componentDidMount(){
        this.getOngoingAds()
    }
    getOngoingAds=()=>{
        Axios.get(koneksi + '/project/get-all-bids',getHeaderAuth())
        .then((bids) => {
            Axios.get(`${koneksi}/project/get-ongoing-ads-all/${this.props.user.id}`,getHeaderAuth())
            .then((res)=>{
                let data = [];
                res.data.forEach((val) =>{
                    var obj = val
                    obj['bid'] = bids.data.data.filter((bid) => {
                        return bid.id_project_ads == val.id
                    }).length
                    data.push(obj)
                })

                console.log(data)
                this.setState({ongoing:data})
            }).catch((err)=>{
                console.log(err)
            })
        })
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
    render() {
        if(this.state.ongoing.length == 0){
            return (
                <LoadingPage/>
            )
        }
        return (
            <div className="container pt-5">
                <p className="h3">Ongoing Ads</p>
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
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        user : state.user.user
    }
  }
export default connect(mapStateToProps) (ViewAllOnGoing);