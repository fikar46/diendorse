import React, { Component } from 'react';
import { connect } from 'react-redux';
import {MDBCard,MDBCardBody,MDBCardHeader,MDBCardFooter, MDBCardTitle, MDBCardText,MDBTable,MDBTableHead,MDBTableBody, MDBBtn , MDBModal,MDBModalHeader,MDBModalFooter,MDBModalBody} from 'mdbreact'
import Axios from 'axios';
import { koneksi } from '../../environment';
import { getHeaderAuth } from '../../helper/service';
import LoadingPage from '../../components/LoadingPage';
import moment from 'moment'
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
    }

    componentDidMount(){
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
        Axios.post(`${koneksi}/project/bid-now`,{
            id_user:this.props.user.id,id_project_ads:id_ads,status_bidding:0
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
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                       {
                                           this.state.dataUserBidding.length > 0 ?
                                           this.state.dataUserBidding.map((val,index) => {
                                               return(
                                                   <tr>
                                                       <td>{index +1}</td>
                                                       <td>{val.fullname}</td>
                                                       <td>{val.email}</td>
                                                       <td>{val.username_ig}</td>
                                                       <td>{val.followers_ig}</td>
                                                       <td>{val.engagement_ig}</td>
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
                        <MDBBtn className='mt-5' onClick={() => this.bidNow(this.state.data.id)}>Bid Now</MDBBtn>
                    </div>
                    
                </div>
                
            
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(JobDetail);









