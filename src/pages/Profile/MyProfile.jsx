import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBCard,MDBCardBody,MDBCardText,MDBCardHeader,MDBIcon, MDBBtn,MDBModal,MDBModalBody,MDBModalFooter,MDBModalHeader} from 'mdbreact'
import moment from 'moment'
import Axios from 'axios';
import { koneksi } from '../../environment';
import { getHeaderAuth } from '../../helper/service';


function mapStateToProps(state) {
    return {
        user : state.user.user
    };
}

class MyProfile extends Component {
    state = {
        dataDetail : {
            tagline : '',
            description :'',
            place : '',
            birth :'',
            followers_ig : '',
            engagement_ig : '',
            price :'',
            username_ig :''
        },
        isOpenModal : false,
        loading : false
        
    }

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        Axios.get(koneksi + '/auth/getuserdetail/' + this.props.user.id,getHeaderAuth())
        .then((res) => {
            if(!res.data.error){
                this.setState({dataDetail: res.data.data})
            }
        })
    }

    toogle = () => {
        this.setState({isOpenModal: !this.state.isOpenModal})
    }

    onSaveClick = () => {
        this.setState({loading:true})
        var keys = 'tagline,description,place,birth,followers_ig,engagement_ig,username_ig,fullname'.split(',')
        var list_prices = ['feed','story','both']
        var prices_data = {}        
        var data = {}
        
        keys.forEach((val) => {
            var item = this.refs[val].value
            if(item){
                data[val] = item 
            }
        })

        if(data.fullname  == this.props.user.fullname){
            data.fullname = ''
        }



        list_prices.forEach((val) => {
            prices_data[val] = Number(this.refs[val].value)
        })

        data['price'] = JSON.stringify(prices_data)

        Axios.post(koneksi + '/auth/completeprofile/' + this.props.user.id ,data,getHeaderAuth())
        .then((res) => {
            if(!res.data.error){
                this.setState({loading :false , isOpenModal : false,dataDetail : res.data.data})
                return alert('Edit Data Success')

            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        var {tagline,description,place,birth,followers_ig,engagement_ig,price,username_ig} = this.state.dataDetail
        console.log(this.props.user)
        return (
            <div className='container py-5'>
                {/* ========= MODAL EDIT PROFILE ================ */}

                <MDBModal toggle={this.toogle} isOpen={this.state.isOpenModal}>
                    <MDBModalHeader toggle={this.toogle}>Edit Your Data</MDBModalHeader>
                    <MDBModalBody>
                        <label htmlFor="fullname" className="grey-text">
                            Your Fullname
                        </label>
                        <input type="text" defaultValue={this.props.user.fullname ? this.props.user.fullname : ""} id="fullname" ref='fullname' className="form-control" />

                        <label htmlFor="place" className="grey-text mt-3">
                            Your Place
                        </label>
                        <select defaultValue={place ? place : ""} id="place" ref='place' className="form-control" >
                            <option value="1">Purwokerto</option>
                            <option value="1">Purwokerto</option>
                            <option value="1">Purwokerto</option>
                            <option value="1">Purwokerto</option>
                            <option value="1">Purwokerto</option>
                            <option value="1">Purwokerto</option>
                        </select>

                        <label htmlFor="birth" className="grey-text mt-3">
                            Your Birthday
                        </label>
                        <input type="date" defaultValue={birth ? birth : ""} id="birth" ref='birth' className="form-control" />

                        <label htmlFor="username_ig" className="grey-text mt-3">
                            Your Instagram Username
                        </label>
                        <input type="text" defaultValue={username_ig ? username_ig : ""} id="username_ig" ref='username_ig' placeholder='ex . fikrijamaludin' className="form-control" />

                        <label htmlFor="followers_ig" className="grey-text mt-3">
                            Your Instagram Followers Count
                        </label>
                        <input type="number" defaultValue={followers_ig ? followers_ig : ""} id="followers_ig" ref='followers_ig' placeholder='ex . 15000' className="form-control" />

                        <label htmlFor="engagement_ig" className="grey-text mt-3">
                            Your Instagram <a href='https://phlanx.com/engagement-calculator' target='_blank' style={{fontStyle:'italic' ,textDecoration:'underline' , cursor:'pointer',color:'#AAA'}}> Engagement Rate </a>
                        </label>
                        <input type="number" defaultValue={engagement_ig ? engagement_ig : ""} id="engagement_ig" ref='engagement_ig' placeholder='ex . 1.3' className="form-control" />

                        <label htmlFor="price" className="grey-text mt-3">
                            Your Price Expectation For Endorse
                        </label>
                        <div className='row px-3'>
                           <input type='number' ref='feed' placeholder='feed' className='col-3 form-control'  />
                           <input type='number' ref='story' placeholder='story' className='col-3 form-control mx-2'  />
                           <input type='number' ref='both' placeholder='both' className='col-3 form-control'  />
                        </div>

                        <label htmlFor="tagline" className="grey-text mt-3">
                            Your Tagline
                        </label>
                        <textarea  defaultValue={tagline ? tagline : ""} id="tagline" ref='tagline' placeholder='ex . im music influencer' className="form-control" />

                        <label htmlFor="description" className="grey-text mt-3">
                            Your Description
                        </label>
                        <textarea  defaultValue={description ? description : ""} id="description" ref='description' placeholder='ex . im work as a gitarist at one famous band in my province' className="form-control" />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn onClick={this.onSaveClick} color='primary'>
                        {
                            this.state.loading ?
                            <div  style={{color:"white",fontSize:'10px'}} className="spinner-border mx-4" role="status">
                                <span className="sr-only"></span>
                            </div>
                            :
                            "Save"
                        }
                        </MDBBtn>
                        <MDBBtn onClick={this.toogle} color='warning'>Cancel</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

                {/* ========= MODAL EDIT PROFILE ================ */}
                <div className='row'>
                    <div className='col-md-9'>
                    <MDBCard>
                        <MDBCardBody>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <img src='https://storage.siapptn.com/image/ava/avatar.png' width='100%'>
                                    </img>
                                    <div style={{backgroundColor:'#4fb55d',color:"white",textAlign:'center'}} className='p-2'>
                                        <div>
                                            <MDBIcon icon="dollar-sign" />
                                            <span className='ml-2'>Avg. Price = {price ? Math.round((JSON.parse(price).feed +  JSON.parse(price).story  + JSON.parse(price).both)/3)  : '-'} / Item</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-8'>
                                    <h1>{this.props.user.fullname} <span style={{fontSize:'18px',color :"#AAA",fontStyle:'italic',textTransform:'capitalize'}}> {this.props.user.role} </span> </h1>
                                    <h5>{tagline ? tagline : '-'}</h5>
                                    
                                    <MDBCardText>
                                    <div>
                                        <MDBIcon icon="map-marker-alt" /> 
                                        <span className='ml-2'>
                                        {place ? place : '-'}
                                        </span>
                                    </div>

                                    <div>
                                        <MDBIcon icon="clock" />
                                        <span className='ml-2'>
                                            {console.log(this.props.user.created_at)}
                                        Joined Since {moment(this.props.user.created_at.split('T')[0], "YYYY-MM-DD").fromNow()}
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
                                        {followers_ig ? followers_ig : '-'} Followers , {engagement_ig ? engagement_ig : '-'} Engagement Rate
                                        </span>
                                    </div>
                                    </MDBCardText>
                                    <p>
                                        {description ? description  : '-'}
                                    </p>
                                </div>


                            </div>
                        </MDBCardBody>
                    </MDBCard>
                    </div>
                    <div className='col-md-3'>
                        <MDBCard>
                            <MDBCardHeader>
                                <MDBBtn onClick={this.toogle} style={{width:'100%'}} color='primary'>
                                    EDIT PROFILE
                                </MDBBtn>
                                <MDBBtn style={{width:'100%'}} color='success'>
                                    EDIT PASSWORD
                                </MDBBtn>
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
                                            Clients
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
)(MyProfile);