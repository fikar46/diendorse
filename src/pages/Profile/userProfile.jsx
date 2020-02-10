import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import {koneksi} from './../../environment/index'
import LoadingPage from '../../components/LoadingPage';
import { MDBCard,MDBCardBody,MDBCardText,MDBCardHeader,MDBIcon, MDBBtn,MDBModal,MDBModalBody,MDBModalFooter,MDBModalHeader} from 'mdbreact'
import { getHeaderAuth } from '../../helper/service';
import moment from 'moment'
import { formatRupiah } from './../../helper/functions'

function mapStateToProps(state) {
    return {
        user : state.user.user
    };
}

class UserProfile extends Component {
    state = {
        data : null
    }

    componentDidMount(){
        var params = this.props.match.params
        var id = params.id
        this.getData(id)
    }

    getData = (id) => {
        Axios.get(koneksi + '/auth/getuserbyid/' + id,getHeaderAuth())
        .then((res) => {
            if(!res.data.error){
                console.log(res.data.data)
                this.setState({data:res.data.data[0]})
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        if(this.state.data === null){
            return(
                <LoadingPage/>
            )
        }
        /*
        birth: "2019-05-27T17:00:00.000Z"
created_at: "2020-02-04T02:59:49.000Z"
description: "work hard, pray hard, because life is hard, merdekaa"
email: "jamesfikrii@gmail.com"
engagement_ig: "0.5"
followers_ig: 12000
fullname: "Jamaludin Fikri"
id: 1
id_user: "10"
password: "e751306d0739f9b147563739fe09ddbc970cc1bef816064e82a1dba02b8527e9"
place: "1"
price: "{"feed":5000,"story":5000,"both":7000}"
role: "influencer"
tagline: "human With something cool "
username_ig: "fikrijamaludin"
verified: 0
        */
        return (
            <div className='container my-5'>
            <div className='row'>
                 <div className='col-md-9'>
                 <MDBCard>
                     <MDBCardBody>
                         <div className='row'>
                             <div className='col-md-4'>
                                 <img src='https://storage.siapptn.com/image/ava/avatar.png' width='100%'>
                                 </img>
                                 <div style={{color:"grey",textAlign:'left'}} className='p-2'>
                                     <div className="ml-2">
                                         {/* <MDBIcon icon="dollar-sign" /> */}
                                             <small>Instagram Post = <span style={{color :'#2E9DFF'}}>{this.state.price ? formatRupiah( String(JSON.parse(this.state.data.price).feed) , 'Rp') : null}</span></small><br/>
                                             <small>Instagram Story = <span style={{color :'#2E9DFF'}}>{this.state.price ? formatRupiah( String(JSON.parse(this.state.data.price).story) , 'Rp') : null}</span></small> <br/>
                                             <small>Both = <span style={{color :'#2E9DFF'}}>{this.state.price ? formatRupiah( String(JSON.parse(this.state.data.price).both) , 'Rp') : null}</span></small>
                                         
                                     </div>
                                 </div>
                             </div>
                             <div className='col-md-8'>
                                 <h1>{this.state.data.fullname ? this.state.data.fullname : null} <span style={{fontSize:'18px',color :"#AAA",fontStyle:'italic',textTransform:'capitalize'}}> {this.state.data.role} </span> </h1>
                                 <h5>{this.state.data.tagline ? this.state.data.tagline : '-'}</h5>
                                 
                                 <MDBCardText>
                                 <div>
                                     <MDBIcon icon="map-marker-alt" /> 
                                     <span className='ml-2'>
                                     {this.state.data.place ? `${JSON.parse(this.state.data.place).kec} , ${JSON.parse(this.state.data.place).kab} , ${JSON.parse(this.state.data.place).prov}`  : '-'}
                                     </span>
                                 </div>

                                 <div>
                                     <MDBIcon icon="clock" />
                                     <span className='ml-2'>
                                         {/* {console.log(this.props.user.created_at)} */}
                                     Joined Since { moment(this.state.data.created_at.split('T')[0], "YYYY-MM-DD").fromNow()}
                                     </span>
                                 </div>

                                 <div>
                                     <MDBIcon icon="calendar-alt" />
                                     <span className='ml-2'>
                                     {this.state.data.birth ? moment(this.state.data.birth).format("MMM Do YY") + ' (' + (2020 - this.state.data.birth.split('-')[0]) + ' Years old)' : '-'}
                                     </span>
                                 </div>

                                 <div>
                                     <MDBIcon fab icon="instagram" />
                                     <span className='ml-2'>
                                     {this.state.data.followers_ig ? this.state.data.followers_ig : '-'} Followers , {this.state.data.engagement_ig ? this.state.data.engagement_ig + '%' : '-'} Engagement Rate
                                     </span>
                                 </div>
                                 </MDBCardText>
                                 <p>
                                     {this.state.data.description ? this.state.data.description  : '-'}
                                 </p>
                             </div>


                         </div>
                     </MDBCardBody>
                 </MDBCard>
                 </div>
                 <div className='col-md-3'>
                     <MDBCard>
                         <MDBCardHeader>
                             <MDBCardText className='py-4'>
                                 <div className='row justify-content-center align-items-center'>
                                     <div style={{color:'#AAA',fontSize:'28px'}} className='col-md-1'>
                                         0
                                     </div>
                                     <div  className='col-md-10'>
                                         Completed Job
                                     </div>
                                     
                                 </div>

                                 <div className='row justify-content-center align-items-center'>
                                     <div style={{color:'#AAA',fontSize:'28px'}} className='col-md-1'>
                                         0
                                     </div>
                                     <div  className='col-md-10'>
                                         Ongoing Job
                                     </div>
                                     
                                 </div>
                             </MDBCardText>
                             
                         </MDBCardHeader>
                     </MDBCard>
                 </div>
             </div>
         </div>
           
        );
    }
}

export default connect(
    mapStateToProps,
)(UserProfile);