import React, { Component } from 'react';
import { connect } from 'react-redux';
import {MDBCard,MDBCardBody,MDBCardHeader,MDBCardFooter, MDBCardTitle,MDBIcon, MDBCardText,MDBTable,MDBTableHead,MDBTableBody, MDBBtn , MDBModal,MDBModalHeader,MDBModalFooter,MDBModalBody} from 'mdbreact'
import Axios from 'axios';
import { koneksi } from '../../environment';
import { getHeaderAuth } from '../../helper/service';
import LoadingPage from '../../components/LoadingPage';
import moment from 'moment'
import { Link } from 'react-router-dom'
import { formatRupiah } from '../../helper/functions';
import Swal from 'sweetalert2'

function mapStateToProps(state) {
    return {
        user : state.user.user
    };
}



class InfluencerDetail extends Component {
    state = {
        data : null,
        openFile : false,
        selectedFile : null,
        dataUserBidding : null,
        openPrice:false,
        priceLimit : null,
        putPrice : "",
        id_selected : null,
        dataDetail : {
            tagline : '',
            description :'',
            place : '',
            birth :'',
            followers_ig : '',
            engagement_ig : '',
            price :'',
            username_ig :'',
            fullname : '',
            id_user:null
        },
        ongoing:[]
    }

    componentDidMount(){
        var param = this.props.match.params
        // console.log(param)
        this.getData(param.id)
        this.getOngoingAds()
        // this.getDataUserBidding(param.id)
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
    // getDataUserBidding = (id) => {
    //     Axios.get(koneksi + '/project/get-data-bid-by-id-project/' + id,getHeaderAuth())
    //     .then((res) => {
    //         if(!res.data.error){
    //             this.setState({dataUserBidding : res.data.data})
    //         }
    //     })
    // }
    getData = (id) => {
        Axios.get(koneksi + '/auth/getuserdetail/' + id,getHeaderAuth())
        .then((res) => {
            if(!res.data.error){
                this.setState({dataDetail: res.data.data})
            }
            
        })
        .catch((err) => {
            console.log(err)
        })
    }
    toggleFileModal = () => {
        this.setState({openFile : !this.state.openFile})
    }

    selectData = (file) => {
        this.setState({selectedFile : file,openFile :true})
    }

    bidNow=(id_ads,upload_at)=>{
        var param = this.props.match.params
        var id_user = param.id
        var harga = JSON.parse(this.state.dataDetail.price)
        var price;
        if(upload_at == "1"){
            price = harga.feed
        }else if(upload_at == "2"){
            price = harga.story
        }else if(upload_at == "3"){
            price = harga.both
        }
        Axios.post(`${koneksi}/project/hire-now`,{
            id_user,id_project_ads:id_ads,status_bidding:1,price
        },getHeaderAuth()).then((res)=>{
            Swal.fire(
                'Success',
                'Influencer berhasil dihire',
                'success'
              ).then((result)=>{
                if(result.value){
                  window.location="/dashboard"
                }
              })
        }).catch((err)=>{
            if(err.response.status == 409){
                alert(err.response.data.message)
            }
        })
    }

    renderBtnBidding = (id_ads) => {
        if(this.state.dataUserBidding.length > 0){
            if(this.state.dataUserBidding.filter((val) => {
                return val.fullname == this.props.user.fullname
            }).length > 0){
                return(
                    <MDBBtn onClick={() => {this.bidNow(id_ads)}} disabled>You cannot Bid twice</MDBBtn>                    
                )
            }else{
                return(
                    <MDBBtn onClick={() => {this.bidNow(id_ads)}}>Bid Now</MDBBtn>
                )
            }
        }else{
            return(
                <MDBBtn onClick={() => {this.bidNow(id_ads)}}>Bid Now</MDBBtn>
            )
        }
    }
    togglePrice = () => {
        this.setState({openFile : !this.state.openFile,id_selected : null,putPrice: null,priceLimit : null})
    }
    onGoingMapData=()=>{
        
        if(this.state.ongoing.length>0){
         var data = this.state.ongoing.map((item,i)=>{
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
                     <td>{i+1}</td>
                     <td>{item.product_name}</td>
                     <td>{date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</td>
                     <td>{status}</td>
                     <td>{item.bid} Bidding</td>
                     <td><button className="btn btn-success" onClick={()=>this.bidNow(item.id,item.upload_at)}>Hire for this project</button></td>
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
        console.log(this.state.dataDetail)
        var {tagline,description,place,birth,followers_ig,engagement_ig,price,username_ig} = this.state.dataDetail
        if(this.state.dataDetail === null){
            return(
                <LoadingPage />
            )
        }
        console.log(price)
        return (
            <div className='container my-5'>
            <h2 className="text-dark mb-5">Hire this Influencer for your product</h2>
                {/* ============================== MODAL PHTO IMAGE ===================== */}
                    <MDBModal isOpen={this.state.openFile} toggle={this.toggleFileModal}>
                        <MDBModalHeader toggle={this.toggleFileModal}>Open File</MDBModalHeader>
                        <MDBModalBody>
                            <img src={this.state.selectedFile !== null ? koneksi + "/" + this.state.selectedFile.path : null} width='100%' alt=""/>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn onClick={this.toggleFileModal}>Exit</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>

                {/* ============================== MODAL PHTO IMAGE ===================== */}


                {/* ============================= MODAL BID ============================== */}

                <MDBModal isOpen={this.state.openPrice} toggle={this.togglePrice}>
                    <MDBModalHeader toggle={this.togglePrice}>Put Your Price</MDBModalHeader>
                    <MDBModalBody>
                        <input onChange={this.onChangeHandler} value={this.state.putPrice} name='putPrice' type="number" placeholder={`Put Your Price From ${this.state.priceLimit !== null ? formatRupiah(this.state.priceLimit[0]) : null} - ${this.state.priceLimit !== null ? formatRupiah(this.state.priceLimit[1]) : null}`} ref='price' className='form-control'/>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn onClick={() =>  this.bidNow (this.state.id_selected !== null ? this.state.id_selected : null)}>Bid</MDBBtn>
                        <MDBBtn onClick={this.togglePrice}>Cancel</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

                {/* ============================= MODAL BID ============================== */}
                
                <div className='row'>
                    <div className='col-md-4'>
                    <MDBCard>
                        <MDBCardBody>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <img src='https://storage.siapptn.com/image/ava/avatar.png' width='100%'>
                                    </img>
                                   
                                </div>
                                <div className='col-md-8'>
                                    <h1>{this.state.dataDetail.fullname} <span style={{fontSize:'18px',color :"#AAA",fontStyle:'italic',textTransform:'capitalize'}}> Influencer </span> </h1>
                                    <h5>{tagline ? tagline : '-'}</h5>
                                    
                                    <MDBCardText>
                                    <div>
                                        <MDBIcon icon="map-marker-alt" /> 
                                        <span className='ml-2'>
                                        {place ? `${JSON.parse(place).kec} , ${JSON.parse(place).kab} , ${JSON.parse(place).prov}`  : '-'}
                                        </span>
                                    </div>

                                    <div>
                                        <MDBIcon icon="clock" />
                                        <span className='ml-2'>
                                        Joined Since { moment(this.props.user.created_at.split('T')[0], "YYYY-MM-DD").fromNow()}
                                        </span>
                                    </div>

                                    <div>
                                        <MDBIcon icon="calendar-alt" />
                                        <span className='ml-2'>
                                        {birth ? moment(birth).format("MMM Do YY") + ' (' + (2020 - birth.split('-')[0]) + ' Years old)' : '-'}
                                        </span>
                                    </div>

                                    <div>
                                        <MDBIcon fab icon="instagram" />
                                        <span className='ml-2'>
                                        username: {username_ig} <br/>Followers: {followers_ig ? followers_ig : '-'}  <br/> Engagement Rate:{engagement_ig ? engagement_ig + '%' : '-'} 
                                        </span>
                                    </div>
                                    </MDBCardText>
                                    <p>
                                        {description ? description  : '-'}
                                    </p>
                                    <div style={{color:"grey",textAlign:'left'}} className=''>
                                        <div className="mt-2">
                                            {/* <MDBIcon icon="dollar-sign" /> */}
                                            {/* {String(JSON.parse(price).story)} */}
                                              {
                                                  (()=>{
                                                  if(price != ""){
                                                    return(
                                                        <div>
                                                             <small>Instagram Post = <span style={{color :'#2E9DFF'}}>{formatRupiah( String(JSON.parse(price).feed) , 'Rp')}</span></small><br/>
                                               <small>Instagram Story = <span style={{color :'#2E9DFF'}}>{formatRupiah( String(JSON.parse(price).story) , 'Rp')}</span></small> <br/>
                                               <small>Both = <span style={{color :'#2E9DFF'}}>{formatRupiah( String(JSON.parse(price).both) , 'Rp')}</span></small>
                                                        </div>
                                                     )
                                                  }
                                                })()
                                              }
                                            
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </MDBCardBody>
                    </MDBCard>
                    </div>
                    <div className='col-md-8'>
                        <MDBCard>
                            <MDBCardBody>
                                <div className="my-4">
                                <h4>Your product ads</h4>
                                    <MDBTable>
                                    <MDBTableHead>
                                        <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Date created</th>
                                        <th>Status</th>
                                        <th>Total Bidders</th>
                                        <th></th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                     {this.onGoingMapData()}
                                    </MDBTableBody>
                                    </MDBTable>
                                </div>

                            </MDBCardBody>
                        </MDBCard>
                        {
                            // this.renderBtnBidding(this.state.data.id)
                        }
                    </div>
                    
                </div>
                
            
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(InfluencerDetail);









