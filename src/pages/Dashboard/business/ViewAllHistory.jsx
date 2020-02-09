import React, { Component } from 'react'
import { MDBTable, MDBTableBody, MDBTableHead, MDBIcon } from 'mdbreact';
import { koneksi } from '../../../environment';
import { getHeaderAuth } from '../../../helper/service';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingPage from '../../../components/LoadingPage';


class ViewAllHistory extends Component {
    state={
        history:[]
    }
    componentDidMount(){
        this.getHistoryAds()
    }
    getHistoryAds=()=>{
        Axios.get(`${koneksi}/project/get-history-ads-all/${this.props.user.id}`,getHeaderAuth())
        .then((res)=>{
            console.log(res.data)
            this.setState({history:res.data})
        }).catch((err)=>{
            console.log(err)
        })
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
        if(this.state.history.length == 0){
            return (
                <LoadingPage/>
            )
        }
        return (
            <div className="container pt-5">
                <p className="h3">History Ads</p>
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
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        user : state.user.user
    }
  }
export default connect(mapStateToProps) (ViewAllHistory);