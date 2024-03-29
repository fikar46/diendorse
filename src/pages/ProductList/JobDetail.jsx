import React, { Component } from 'react';
import { connect } from 'react-redux';
import {MDBCard,MDBCardBody,MDBCardHeader,MDBCardFooter, MDBCardTitle, MDBCardText,MDBTable,MDBTableHead,MDBTableBody, MDBBtn , MDBModal,MDBModalHeader,MDBModalFooter,MDBModalBody} from 'mdbreact'
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



class JobDetail extends Component {
    state = {
        data : null,
        openFile : false,
        selectedFile : null,
        dataUserBidding : null,
        openPrice:false,
        priceLimit : null,
        putPrice : "",
        id_selected : null
    }

    componentDidMount(){
        if(this.props.user == undefined){
            window.location.href="/login"
        }
        console.log('masuk')
        var param = this.props.match.params
        // console.log(param)
        this.getData(param.id)
        this.getDataUserBidding(param.id)
    }

    getDataUserBidding = (id) => {
        Axios.get(koneksi + '/project/get-data-bid-by-id-project/' + id,getHeaderAuth())
        .then((res) => {
            if(!res.data.error){
                console.log(res.data.data)
                this.setState({dataUserBidding : res.data.data})
            }
        })
    }
    getData = (id) => {
        Axios.get(koneksi + '/project/get-project-ads-by-id/' + id , getHeaderAuth() )
        .then((res) => {
            console.log(res.data)
            if(!res.data.error){
                this.setState({data : res.data.data})
                // console.log(res.data)
            }
        })
    }
    toggleFileModal = () => {
        this.setState({openFile : !this.state.openFile})
    }

    selectData = (file) => {
        this.setState({selectedFile : file,openFile :true})
    }

    bidNow=(id_ads)=>{
        // console.log(this.state.putPrice,JSON.parse(this.state.data.estimation_ads).max,JSON.parse(this.state.data.estimation_ads).min)
        if(parseInt(this.state.putPrice) >parseInt(JSON.parse(this.state.data.estimation_ads).max) || parseInt(this.state.putPrice) < parseInt(JSON.parse(this.state.data.estimation_ads).min)){
            return Swal.fire('Error','Your price out of Limit','error')
        }
        Axios.post(`${koneksi}/project/bid-now`,{
            id_user:this.props.user.id,id_project_ads:id_ads,status_bidding:0,price:this.state.putPrice
        },getHeaderAuth()).then((res)=>{
            Swal.fire(
                'Iklan berhasil dibid',
                'Status bid berada di dashboard!',
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
                console.log(val)
                return val.fullname == this.props.user.fullname
            }).length > 0){
                return(
                    <MDBBtn onClick={() => {this.bidNow(id_ads)}} disabled>You cannot Bid twice</MDBBtn>                    
                )
            }else{
                return(
                    <MDBBtn onClick={() => this.setState({openPrice : true,id_selected:id_ads   })} >Bid Now</MDBBtn>
                )
            }
        }else{
            return(
                <MDBBtn onClick={() => {this.bidNow(id_ads)}}>Bid Now</MDBBtn>
            )
        }
    }
    onChangeHandler = e => {
        this.setState({[e.target.name] : e.target.value})

    }
    togglePrice = () => {
        this.setState({openPrice : !this.state.openPrice,id_selected : null,putPrice: null,priceLimit : null})
    }
    render() {
        if(this.state.data === null || this.state.dataUserBidding === null){
            return(
                <LoadingPage />
            )
        }
       
        return (
            <div className='container my-5'>
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
                        <input onChange={this.onChangeHandler} value={this.state.putPrice} name='putPrice' type="number" placeholder={`Put Your Price From ${formatRupiah(JSON.parse(this.state.data.estimation_ads).min,'Rp')} - ${formatRupiah(JSON.parse(this.state.data.estimation_ads).max,'Rp')}`} ref='price' className='form-control'/>
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
                                <MDBCardTitle>
                                    {this.state.data.product_name}
                                </MDBCardTitle>
                                <MDBCardText>
                                    Posted By {this.state.data.ads_creator} 
                                    <br/>
                                    Posted {moment(this.state.data.created_ads.split('T')[0], "YYYY-MM-DD").fromNow()} Ago
                                    <br/>
                                    Category = {this.state.data.category_name}
                                    <br/>
                                    Age From {`${JSON.parse(this.state.data.age_ads).min} to ${JSON.parse(this.state.data.age_ads).max} `}
                                    <br/>
                                    Price From {`${formatRupiah(JSON.parse(this.state.data.estimation_ads).min,'Rp')} to ${formatRupiah(JSON.parse(this.state.data.estimation_ads).max,'Rp')} / Day`}
                                    <br/>
                                    Target Location {JSON.parse(this.state.data.location_ads).kab}
                                    <br/>
                                    Upload At : {' '}
                                    {
                                        
                                        this.state.data.upload_at == 1 
                                        ? 'Feed' 
                                        : this.state.data.upload_at == 2 ? 'Story'
                                        :
                                        'Both Story And Feed'
                                    }
                                    <br/>
                                    Post Length : {' '} {
                                        this.state.data.days
                                    }
                                    {' '}
                                    Days
                                </MDBCardText>
                                <MDBCardText>
                                    Deskripsi : {this.state.data.description}
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter>
                                {
                                    this.state.data.file == null ? 'No File' :
                                    JSON.parse(this.state.data.file).map((val,index) => {
                                        console.log(koneksi + val.path)
                                        return(
                                            <span onClick={ () => this.selectData(val)} style={{color: "blue",cursor:'pointer',display:'block'}}> File {index + 1} </span> 
                                        )
                                    })
                                }
                            </MDBCardFooter>

                        </MDBCard>
                    </div>
                    <div className='col-md-8'>
                        <MDBCard>
                            <MDBCardBody>
                                <div className="my-4">
                                <h4>Bidders</h4>
                                    <MDBTable>
                                    <MDBTableHead>
                                        <tr>
                                        <th>#</th>
                                        <th>Fullname</th>
                                        <th>Email</th>
                                        <th>Username Ig</th>
                                        <th>Follower Ig</th>
                                        <th>Engagement Ig</th>
                                        <th>Price</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                       {
                                           this.state.dataUserBidding.length > 0 ?
                                           this.state.dataUserBidding.map((val,index) => {
                                               return(
                                                   <tr>
                                                       <td>{index +1}</td>
                                                       <td><Link to={'/user-profile/' + val.id_user }> {val.fullname} </Link></td>
                                                       <td>{val.email}</td>
                                                       <td>{val.username_ig}</td>
                                                       <td>{val.followers_ig}</td>
                                                       <td>{val.engagement_ig}</td>
                                                       <td>{formatRupiah( String(val.price))}</td>
                                                   </tr>
                                               )
                                           })
                                           :
                                           <tr>
                                               <td colSpan={5}> No Data</td>
                                               <td></td>
                                               <td></td>
                                               <td></td>
                                               <td></td>
                                               <td></td>

                                           </tr>
                                       }
                                    </MDBTableBody>
                                    </MDBTable>
                                </div>

                            </MDBCardBody>
                        </MDBCard>
                        {
                            this.renderBtnBidding(this.state.data.id)
                        }
                    </div>
                    
                </div>
                
            
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(JobDetail);









