import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBCard,MDBCardBody,MDBCardText,MDBCardHeader,MDBIcon, MDBBtn,MDBModal,MDBModalBody,MDBModalFooter,MDBModalHeader} from 'mdbreact'
import moment from 'moment'
import Axios from 'axios';
import { koneksi } from '../../environment';
import { getHeaderAuth } from '../../helper/service';
import LoadingPage from './../../components/LoadingPage'
import Swal from 'sweetalert2';
import { localStorageKey } from '../../helper/constant';
import {onRegisterSuccess} from './../../redux/actions'

const apiUrl = 'https://x.rajaapi.com/MeP7c5ne'
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
            username_ig :'',
            fullname : ''
        },
        isOpenModal : false,
        loading : false,
        got : false,
        kabupatens : null,
        value : '',
        provinsi : [],
        kabupaten : [],
        kecamatan : [],
        loadingKabupaten : false,
        loadingKecamatan : false,

        isOpenPassword : false
        
    }

    componentDidMount(){
        this.getData()
        this.getDataKabupaten()
        this.getDataProvinsi()
    }

    getDataProvinsi = () => {
        Axios.get('https://x.rajaapi.com/poe')
        .then((res) => {
            if(res.data.success){
                this.setState({token : res.data.token})
                Axios.get(`https://x.rajaapi.com/MeP7c5ne${res.data.token}/m/wilayah/provinsi`)
                .then((resData) => {
                    this.setState({provinsi : resData.data.data})
                })
                .catch((err) => {
                   console.log(err)
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getData = () => {
        Axios.get(koneksi + '/auth/getuserdetail/' + this.props.user.id,getHeaderAuth())
        .then((res) => {
            if(!res.data.error){
                if(res.data.data !== undefined){
                    this.setState({dataDetail: res.data.data,got:true})
                }else{
                    this.setState({got : true})
                }
            }
            
        })
        .catch((err) => {
            console.log(err)
            this.setState({got : true})
        })
    }

    getDataKabupaten = () => {
        Axios.get(koneksi + '/auth/getallkabupaten' , getHeaderAuth())
        .then((res) => {
            if(!res.data.error){
                var data = res.data.data.map((val) => {
                    return {id_kab : val.id_kab , label : val.nama}
                })
                this.setState({kabupatens : data})
            }
        })
    }

    toogle = () => {
        this.setState({isOpenModal: !this.state.isOpenModal})
    }

    onSaveClick = () => {
        this.setState({loading:true})
        var keys = 'tagline,description,birth,followers_ig,engagement_ig,username_ig,fullname'.split(',')
        var list_prices = ['feed','story','both']
        console.log(this.refs.prov.value)
        if(this.refs.prov.value != 0 || this.refs.kab.value != 0 || this.refs.kec.value !=0){
            var place = {
                prov : this.state.provinsi.filter((val) => val.id == this.refs.prov.value)[0].name,
                kab : this.state.kabupaten.filter((val) => val.id == this.refs.kab.value)[0].name,
                kec : this.state.kecamatan.filter((val) => val.id == this.refs.kec.value)[0].name
            }
        }else{
            var place = ''
        }
        // console.log(place)
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
        if(place){
            data['place'] = JSON.stringify(place)
        }

        list_prices.forEach((val) => {
            prices_data[val] = Number(this.refs[val].value)
        })

        data['price'] = JSON.stringify(prices_data)

        console.log(data)
        Axios.post(koneksi + '/auth/completeprofile/' + this.props.user.id ,data,getHeaderAuth())
        .then((res) => {
            if(!res.data.error){
                this.setState({loading :false , isOpenModal : false,dataDetail : res.data.data})
                var dataStorage = JSON.parse(localStorage.getItem(localStorageKey))
                console.log(dataStorage)
                console.log(res.data.data)
                dataStorage.fullname = res.data.data.fullname
                localStorage.setItem(localStorageKey , JSON.stringify(dataStorage))
                this.props.onRegisterSuccess(dataStorage)


                return alert('Edit Data Success')

            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
    renderOption = (state) => {
        var jsx =  state.map((val) => {
            return(
                <option key={val.id}  value={val.id} > {val.name} </option>
            )
        })
        return jsx
    }

    onChangeProvHandler = (event) => {
        this.setState({loadingKabupaten : true , kabupaten : [] , kecamatan : []})
        this.refs.kab.value = 0
        Axios.get(`${apiUrl}${this.state.token}/m/wilayah/kabupaten?idpropinsi=${event.target.value}`)
        .then((res) => {
            if(res.data.success){
                this.setState({kabupaten : res.data.data , loadingKabupaten : false})
            }
        })
        .catch((err) => {
            this.setState({modalOpen : true, error : "Pastikan Perangkat Anda Terhubung dengan Internet"})
        })
    }

    onChangeKabHandler = (event) => {
        this.setState({loadingKecamatan : true ,kecamatan : []})
        this.refs.kec.value = 0
        Axios.get(`${apiUrl}${this.state.token}/m/wilayah/kecamatan?idkabupaten=${event.target.value}`)
        .then((res) => {
            if(res.data.success){
                this.setState({kecamatan : res.data.data , loadingKecamatan : false})
            }
        })
        .catch((err) => {
            this.setState({modalOpen : true, error : "Pastikan Perangkat Anda Terhubung dengan Internet"})
        })
    }

    tooglePassword = () => {
        this.setState({isOpenPassword : !this.state.isOpenPassword})
    }

    onSavePasswordClick = () => {
        var newPassword = this.refs.new.value
        var oldPassword = this.refs.old.value
        var confirmPassword = this.refs.confirm.value
        if(newPassword && oldPassword && confirmPassword){
            if(newPassword !== confirmPassword){
                return Swal.fire("Error!" , "Password And Confirm Password Didnt Match")
            }else{
                Axios.post(koneksi + '/auth/changepassword',{old : oldPassword,new : newPassword,id_user : this.props.user.id},getHeaderAuth())
                .then((res) => {
                    if(res.data.error){
                        return Swal.fire("Error!" , res.data.message)
                    }else{
                        Swal.fire('Good job!',
                            res.data.message,
                            'success')
                        this.setState({isOpenPassword : false})
                    }
                })
            }
        }else{
            Swal.fire("Error!", "All Form must be filled");
        }
    }

    render() {
        if(this.state.got == false || this.state.kabupatens == null){
            return <LoadingPage />
        }
        var {tagline,description,place,birth,followers_ig,engagement_ig,price,username_ig} = this.state.dataDetail
        console.log(this.props.user)
        console.log(place)
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
                        <div className='row mx-3'>
                            <select className='form-control col-4' ref='prov' defaultValue={0} onChange={this.onChangeProvHandler}>
                                <option value={0} disabled> {this.state.provinsi.length > 0 ? 'Pilih Provinsi' : 'loading ...'} </option>
                                {this.renderOption(this.state.provinsi)}
                            </select>

                            <select className='form-control col-4' ref='kab' defaultValue={0} onChange={this.onChangeKabHandler} >
                                <option value={0} disabled>{this.state.loadingKabupaten ? 'loading ...' : 'Pilih Kabupaten'}</option>
                                {this.renderOption(this.state.kabupaten)}
                            </select>

                            <select className='form-control col-4' ref='kec'  defaultValue={0}>
                                <option value={0}>{this.state.loadingKecamatan ? 'loading...' : 'Pilih Kecamatan'}</option>
                                {this.renderOption(this.state.kecamatan)}
                            </select>
                        </div>

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
                           <input type='number' defaultValue={this.state.dataDetail.price ? JSON.parse(this.state.dataDetail.price).feed : ''} ref='feed' placeholder='feed' className='col-3 form-control'  />
                           <input type='number'  defaultValue={this.state.dataDetail.price ? JSON.parse(this.state.dataDetail.price).story : ''}  ref='story' placeholder='story' className='col-3 form-control mx-2'  />
                           <input type='number'  defaultValue={this.state.dataDetail.price ? JSON.parse(this.state.dataDetail.price).both : ''}  ref='both' placeholder='both' className='col-3 form-control'  />
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


                {/* ========== MODAL EDIT PASSWORD ============== */}
                <MDBModal toggle={this.tooglePassword} isOpen={this.state.isOpenPassword}>
                    <MDBModalHeader toggle={this.tooglePassword}>
                        Edit Your Password
                    </MDBModalHeader>
                    <MDBModalBody>
                        <input type='password' placeholder='Enter Your Old Password' className='form-control' ref='old' />
                        <input type='password' placeholder='Enter Your New Password' className='form-control my-3' ref='new' />
                        <input type='password' placeholder='Confirm Your New Password' className='form-control' ref='confirm' />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn onClick={this.onSavePasswordClick} color='primary'>
                        {
                            this.state.loading ?
                            <div  style={{color:"white",fontSize:'10px'}} className="spinner-border mx-4" role="status">
                                <span className="sr-only"></span>
                            </div>
                            :
                            "Save"
                        }
                        </MDBBtn>
                        <MDBBtn onClick={this.tooglePassword} color='warning'>Cancel</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
                
                {/* ========== MODAL EDIT PASSWORD ============== */}
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
                                    <h1>{this.state.dataDetail.fullname} <span style={{fontSize:'18px',color :"#AAA",fontStyle:'italic',textTransform:'capitalize'}}> {this.props.user.role} </span> </h1>
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
                                            {/* {console.log(this.props.user.created_at)} */}
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
                                        {followers_ig ? followers_ig : '-'} Followers , {engagement_ig ? engagement_ig + '%' : '-'} Engagement Rate
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
                                <MDBBtn style={{width:'100%'}} onClick={this.tooglePassword} color='success'>
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
    mapStateToProps,{onRegisterSuccess}
)(MyProfile);