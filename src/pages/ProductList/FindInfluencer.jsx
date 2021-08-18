import React, { Component } from 'react';
import {MDBCard,MDBCardBody,MDBCardHeader,MDBCardTitle, MDBCardText,MDBBtn,MDBModalHeader,MDBModalBody,MDBModalFooter, MDBCardFooter,MDBRow,MDBCol,MDBPagination,MDBPageItem,MDBPageNav, MDBModal} from 'mdbreact'
import { LoremIpsum } from "lorem-ipsum";
import {connect} from 'react-redux'
import LoadingPage from './../../components/LoadingPage'
import Axios from 'axios';
import moment from 'moment'
import { koneksi } from '../../environment';
import { getHeaderAuth } from '../../helper/service';
import { formatRupiah } from '../../helper/functions';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });




class productList extends Component {
    state ={
        data : null,
        filteredData : null,
        priceFrom: 0,
        priceTo : 0, 
        locations : [],
        categories : [],
        minInstagram : 0,
        minEngagementRate : 0,
        limit : 10,
        dataCategory : [],
        kabupaten : 
        [
            {nama : "Jakarta"},
            {nama : "Bandung"},
            {nama : "Semarang"},
            {nama : "Surabaya"},
        ],
        openFile : false,
        priceLimit : null,
        putPrice : "",
        id_selected : null

    }


    
    componentDidMount(){
        this.getData(10,{})
    }
    


    getDataKabupaten = () => {
        Axios.get(koneksi + '/project/get-all-kabupaten',getHeaderAuth())
        .then((res) => {
            if(!res.data.error){
                this.setState({kabupaten : res.data.data})
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getData =(limit,dataFilered) => {
        // this.setState({loading : true})
        Axios.post(koneksi + '/influencer/getallinfluencer?limit=' + limit,dataFilered)
        .then((res) => {
            console.log(res.data.data)
            if(!res.data.error){
                this.setState({data : res.data.data,filteredData : res.data.data})
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidUpdate(prevProps,prevState){

        var {priceFrom,priceTo,locations,categories,minInstagram,minEngagementRate} = this.state
       
        
        if(prevState.priceFrom != priceFrom || prevState.priceTo != this.state.priceTo || prevState.locations.length != this.state.locations.length || prevState.minInstagram != this.state.minInstagram || prevState.minEngagementRate != this.state.minEngagementRate){
            this.getData(this.state.limit,{min_price : priceFrom,max_price : priceTo,locations,min_followers : this.state.minInstagram , min_engagement : this.state.minEngagementRate})
        }

    }

    onChangeHandler = e => {
        this.setState({[e.target.name] : e.target.value})

    }

    handleCheckboxLocations = e => {
        if(e.target.checked){
            this.setState({locations : [...this.state.locations,e.target.value]})
        }else{
            this.setState({locations : this.state.locations.filter((val) => val !== e.target.value)})
        }
    }


    bidNow=(id_ads)=>{
        if(this.state.putPrice > this.state.priceLimit[1] || this.state.putPrice < this.state.priceLimit[0]){
            return Swal.fire('Error','Your price out of Limit','error')
        }
        Axios.post(`${koneksi}/project/bid-now`,{
            id_user:this.props.user.id,id_project_ads:id_ads,status_bidding:0,price : this.state.putPrice
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
    togglePrice = () => {
        this.setState({openFile : !this.state.openFile,id_selected : null,putPrice: null,priceLimit : null})
    }

    renderData = () => {
        if(this.state.filteredData.length == 0){
            return <h1>Data Not Found</h1>
        }
/* 
birth: "2020-10-11T13:20:03.000Z"
created_at: "2020-02-08T23:44:41.000Z"
description: "nibh sit amet orci. Ut sagittis lobortis mauris. Suspendisse aliquet molestie tellus. Aenean egestas hendrerit"
email: "Phasellus.at@erosnonenim.org"
engagement_ig: "0.5"
followers_ig: 4000
fullname: "Ava Rosario"
id: 34
id_user: "123"
password: "et"
place: "{"prov":"JAWA BARAT","kab":"KOTA BANDUNG","kec":"KIARACONDONG"}"
price: "{"feed":2000,"story":2000,"both":2000}"
role: "influencer"
tagline: "placerat, augue. Sed molestie."
username_ig: "Ezekiel"
verified: 1

*/

        // if(this.state.data )
        return this.state.filteredData.map((val) => {
            return(
                <MDBCard>
                    <MDBCardBody>
                        <div className='row justify-content-between'>
                            <div className='col-8'>
                                <Link to={'/profile-user/' + val.id_user}>
                                    <h6 style={{display:'inline',fontWeight:'bold' , cursor:'pointer'}}>{val.fullname}</h6> <span className='ml-2' style={{fontSize:'12px', fontWeight:'lighter',color:'#1f2836',fontStyle:'italic'}}>{ moment(val.created_at.split('T')[0], "YYYY-MM-DD").fromNow()}</span>
                                </Link>
                                <MDBCardText>
                                    <div>
                                        <span style={{color : '#1f2836',fontSize:12,fontStyle:'italic',textDecoration:'underline',cursor:'pointer'}}>
                                            {val.username}
                                        </span>
                                        <span className='ml-2' style={{color : 'black',fontSize:12}}>
                                            {val.place ? JSON.parse(val.place).kab.replace('KABUPATEN','').replace('KOTA','') : null}
                                        </span>
                                    </div>
                                    {val.description}

                                </MDBCardText>
                                
                            </div>
                            <div className='col-4'>
                                <h6 style={{fontWeight:'bold'}}>
                                   {formatRupiah( String(JSON.parse(val.price).feed) , 'Rp')} - {formatRupiah( String(JSON.parse(val.price).story) , 'Rp')} / Day
                                </h6>
                                <MDBCardText>
                                    {val.followers_ig} Followers <br/>
                                   {val.engagement_ig}  % Engagement Rate 
                                </MDBCardText>
                                {/* <MDBBtn color='blue' style={{padding:'10px',margin: '0px',}} onClick={()=> this.setState({openFile : true,priceLimit : [val.priceFrom,val.priceTo] , id_selected : val.id})}>Bid Now</MDBBtn> */}
                                <Link to={'/profile-detail/' + val.id_user} >
                                    <MDBBtn color='primary' style={{padding:'10px',margin: '0px',}}>Hire Now</MDBBtn>
                                </Link>
                            </div>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            )
        })
    }
    render() {
        if(this.state.data == null || this.state.filteredData == null){
            return(
                <LoadingPage />
            )
        }
        var {priceFrom,priceTo,locations,categories,minInstagram,minEngagementRate} = this.state

        return (
            
            <div className='container-fluid pt-5 pb-5'>
                {/* ====================+ MODAL HARGA =========================== */}

                <MDBModal isOpen={this.state.openFile} toggle={this.togglePrice}>
                    <MDBModalHeader toggle={this.togglePrice}>Put Your Price</MDBModalHeader>
                    <MDBModalBody>
                        <input onChange={this.onChangeHandler} value={this.state.putPrice} name='putPrice' type="number" placeholder={`Put Your Price From ${this.state.priceLimit !== null ? formatRupiah(this.state.priceLimit[0]) : null} - ${this.state.priceLimit !== null ? formatRupiah(this.state.priceLimit[1]) : null}`} ref='price' className='form-control'/>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn onClick={() =>  this.bidNow (this.state.id_selected !== null ? this.state.id_selected : null)}>Bid</MDBBtn>
                        <MDBBtn onClick={this.togglePrice}>Cancel</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>





                {/* ====================+ MODAL HARGA =========================== */}
                <h1 className='container'>Find Influencer</h1>
                <div className='container'>
                    <div className='row'>
                        {/* ====================== FILTERING SECTIONS ========================= */}
                        <div className='col-md-3'> 
                            <MDBCard>
                                <MDBCardHeader style={{backgroundColor : "white"}}>
                                    <MDBCardTitle>
                                        Filter By :
                                    </MDBCardTitle>
                                </MDBCardHeader>
                            </MDBCard>
                            {/* Filter By Budget */}
                            <MDBCard className='mt-3'>
                                <MDBCardHeader>
                                    Budget : 
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBCardText>
                                        Start From :
                                        <input ref='priceFrom' onChange={this.onChangeHandler} placeholder='ex . 10000' type='number' name='priceFrom' className='form-control mb-3'></input>
                                        To : 
                                        <input ref='priceTo' onChange={this.onChangeHandler} placeholder='ex . 10000' type='number' name='priceTo' className='form-control'></input>
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>


                            {/* Filter By Metrics */}
                            <MDBCard className='mt-3'>
                                <MDBCardHeader>
                                    Metrics : 
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBCardText>
                                        Min. Instagram Follower :
                                        <input placeholder='ex. 20000' onChange={this.onChangeHandler} name='minInstagram' className='form-control mb-3'></input>
                                        Min. Engagement Rate : 
                                        <input placeholder='ex. 0.5' onChange={this.onChangeHandler} name='minEngagementRate' className='form-control'></input>
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>

                             {/* Filter By Location */}
                             <MDBCard className='mt-3'>
                                <MDBCardHeader>
                                    Location : 
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBCardText>
                                    <form action="">
                                        {
                                            this.state.kabupaten.map((val) => {
                                                return(
                                                    <div className='form-check'>
                                                        <input onChange={this.handleCheckboxLocations} type="checkbox" className="form-check-input" value={val.nama} id={val.nama}/>
                                                        <label className="form-check-label" for={val.nama}>{val.nama}</label>
                                                    </div>        
                                                )
                                            })
                                        }
                                        {/* <div className='form-check'>
                                            <input onChange={this.handleCheckboxLocations} type="checkbox" className="form-check-input" value='jabodetabek' id="jabodetabek"/>
                                            <label className="form-check-label" for="jabodetabek">Jabodetabek</label>
                                        </div>
                                        <div className='form-check'>
                                            <input onChange={this.handleCheckboxLocations} type="checkbox" value='bandung' className="form-check-input" id="bandung"/>
                                            <label className="form-check-label"  for="bandung">Bandung</label>
                                        </div>
                                        <div className='form-check'>
                                            <input onChange={this.handleCheckboxLocations} value='surabaya' type="checkbox" className="form-check-input" id="surabaya"/>
                                            <label className="form-check-label" for="surabaya">Surabaya</label>
                                        </div>
                                        <div className='form-check'>
                                            <input onChange={this.handleCheckboxLocations} value='semarang' type="checkbox" className="form-check-input" id="semarang"/>
                                            <label className="form-check-label" for="semarang">Semarang</label>
                                        </div> */}
                                    </form>
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>

                        </div>

                        {/* ++++++++++++++++++++++ END OF FILTERING SECTION +++++++++++++++++++++ */}

                        {/* ===================== PRODUCT LIST SECTION ===================== */}
                        <div className='col-md-9'>
                            {this.renderData()}
                            
                        </div>
                        {/* +++++++++++++++++++++ END OF PRODUCT LIST +++++++++++++++++++++++ */}
                    </div>

                </div>
                {/* ++++++++++++++++++++++ PAGING +++++++++++++++++++++++++++++++++++ */}
                <div className='row justify-content-center my-5'>
                    {
                        this.state.filteredData.length > this.state.limit - 1 ? 
                        <MDBBtn color='blue' style={{textTransform:'capitalize'}} onClick={() => this.getData(this.state.limit + 10,{min_price : priceFrom,max_price : priceTo,locations})} >Load More ...</MDBBtn>
                        :
                        null
                    }
                </div>
                 

                {/* ====================== PAGING ==================================== */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user.user
    }
}


export default connect(mapStateToProps)(productList);