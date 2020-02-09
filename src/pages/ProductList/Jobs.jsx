import React, { Component } from 'react';
import {MDBCard,MDBCardBody,MDBCardHeader,MDBCardTitle, MDBCardText,MDBBtn, MDBCardFooter} from 'mdbreact'
import { LoremIpsum } from "lorem-ipsum";
import {connect} from 'react-redux'
import LoadingPage from './../../components/LoadingPage'
import Axios from 'axios';
import moment from 'moment'
import { koneksi } from '../../environment';
import { getHeaderAuth } from '../../helper/service';
import { formatRupiah } from '../../helper/functions';

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

const DataForInfluencer = (title, user,datePosted,location,description,categories,priceFrom,priceTo,minFollower,minEngagementRate,numOfBid) => {
    return{
        title,user,datePosted,location,description,categories,priceFrom,priceTo,minFollower,minEngagementRate,numOfBid
    }
}


const data_for_influencer = [
    DataForInfluencer('Dicari Cowok Ganteng','Siapptn','3','Bandung',lorem.generateSentences(3),'makanan',10000,15000,null,null,0),
    DataForInfluencer('Ngiklanin Product Chicken Panas','PT . Ruangguru','10','Jakarta',lorem.generateSentences(3),'makanan',15000,20000,2000,1,0),
    DataForInfluencer('Saya Butuh Cewek Berhijab Cantik','Fikri Collections','1','Tangerang',lorem.generateSentences(3),'fashion',10000,15000,1500,0.8,0),
    DataForInfluencer(lorem.generateWords(4),lorem.generateWords(1),'1','Purwokerto',lorem.generateSentences(3),'fashion',40000,45000,1500,0.8,0),
    DataForInfluencer(lorem.generateWords(3),lorem.generateWords(1),'1','Cilacap',lorem.generateSentences(3),'fashion',10000,15000,1500,0.8,0),
    DataForInfluencer(lorem.generateWords(5),lorem.generateWords(1),'1','Semarang',lorem.generateSentences(3),'fashion',3000,10000,1500,0.8,0),
]
/* 
0:
ads_creator: "m zulfikar meylendra" // user
age_ads: "{"min":15,"max":45}" // 
category_name: "Makanan Berat" // categories
created_ads: "2020-02-08T07:33:59.000Z" // datePosted
description: "ya kerupuuk" // description
email_creator: "fikar@siapptn.com" // user_email
estimation_ads: "{"min":"200000","max":"400000"}" // priceFrom and priceTo
file: "test.jpg"
id: 8
id_user: 11
location_ads: "1" // loction
sex_ads: 3 
status_ads: 0
upload_at: 3

*/

class productList extends Component {
    state ={
        data : null,
        filteredData : null,
        priceFrom: 0,
        priceTo : 0, 
        locations : [],
        categories : [],
        minInstagram : 0,
        minEngagementRate : 0
    }
    /* 
0:
ads_creator: "m zulfikar meylendra" // user
age_ads: "{"min":15,"max":45}" // 
category_name: "Makanan Berat" // categories
created_ads: "2020-02-08T07:33:59.000Z" // datePosted
description: "ya kerupuuk" // description
email_creator: "fikar@siapptn.com" // user_email
estimation_ads: "{"min":"200000","max":"400000"}" // priceFrom and priceTo
file: "test.jpg"
id: 8
id_user: 11
location_ads: "1" // loction
sex_ads: 3 
status_ads: 0
upload_at: 3

*/
    
    componentDidMount(){
        Axios.get(koneksi + '/project/get-all-ads-ongoing',getHeaderAuth())
        .then((res) => {
            let data;
            data = res.data.map((val) => {
                return{
                    title : val.product_name,
                    user : val.ads_creator,
                    categories : val.category_name,
                    dataPosted : val.created_ads,
                    description : val.description,
                    age_ads : val.age_ads,
                    user_email : val.email_creator,
                    priceFrom : JSON.parse(val.estimation_ads).min,
                    priceTo : JSON.parse(val.estimation_ads).max,
                    file : val.file,
                    id : val.id,
                    id_user : val.id_user,
                    location : val.location_ads,
                    sex_ads : val.sex_ads,
                    status_ads : val.status_ads,
                    upload_at : val.upload_at
                }
            })
            console.log(data)
            this.setState({data : data , filteredData : data})
        })
    }

    componentDidUpdate(prevProps,prevState){

        var {priceFrom,priceTo,locations,categories,minInstagram,minEngagementRate} = this.state
       
        
        if(prevState.priceFrom != priceFrom || prevState.priceTo != this.state.priceTo || prevState.locations.length != this.state.locations.length || this.state.categories.length !== prevState.categories.length){
            if(locations.length === 0){
                locations = 'all'
            }
            if(categories.length === 0){
                categories = 'all'
            }
            if(priceFrom == null || priceTo == null || priceFrom == '' || priceTo == ''){
                priceFrom = 'all'
            }
            if(minInstagram == 0){
                minInstagram = 'all'
            }
            if(minEngagementRate == 0){
                minEngagementRate = 'all'
            }
            console.log(locations)
            let filteredData = this.state.data.filter((val) => {
                return (((val.priceFrom >= priceFrom) && (val.priceFrom <= priceTo)) || priceFrom === 'all' ) && (categories.includes(val.categories.toLowerCase()) || categories === 'all') && (locations.includes(val.location.toLowerCase()) || locations === 'all' ) 
            })
            this.setState({filteredData})
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

    handleCheckboxCategories = e => {
        if(e.target.checked){
            this.setState({categories : [...this.state.categories,e.target.value]})
        }else{
            this.setState({categories : this.state.categories.filter((val) => val !== e.target.value)})
        }
    }

    renderData = () => {
        if(this.state.filteredData.length == 0){
            return <h1>Data Not Found</h1>
        }

        if(this.state.data )
        return this.state.filteredData.map((val) => {
            return(
                <MDBCard>
                    <MDBCardBody>
                        <div className='row justify-content-between'>
                            <div className='col-8'>
                                <h6 style={{display:'inline',fontWeight:'bold'}}>{val.title}</h6> <span className='ml-2' style={{fontSize:'12px', fontWeight:'lighter',color:'#1f2836',fontStyle:'italic'}}>{ moment(val.dataPosted.split('T')[0], "YYYY-MM-DD").fromNow()}</span>
                                <MDBCardText>
                                    <div>
                                        <span style={{color : '#1f2836',fontSize:12,fontStyle:'italic',textDecoration:'underline',cursor:'pointer'}}>
                                            {val.user}
                                        </span>
                                        <span className='ml-2' style={{color : 'black',fontSize:12}}>
                                            {val.location}
                                        </span>
                                        <MDBBtn className='ml-2' style={{padding:3,fontSize:10,textTransform:'capitalize'}} gradient="aqua">{val.categories}</MDBBtn>
                                    </div>
                                    {val.description}

                                </MDBCardText>
                                
                            </div>
                            <div className='col-4'>
                                <h6 style={{fontWeight:'bold'}}>
                                   {formatRupiah(val.priceFrom , 'Rp')} - {formatRupiah(val.priceTo,'Rp')}
                                </h6>
                                <MDBCardText>
                                    N/A Bids
                                </MDBCardText>
                                <MDBBtn gradient="aqua" style={{padding:'10px',margin: '0px',}}>Bid Now</MDBBtn>
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

        return (
            <div className='container-fluid pt-5 pb-5'>
                <h1 className='container'>Find Jobs</h1>
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
                            {/* <MDBCard className='mt-3'>
                                <MDBCardHeader>
                                    Metrics : 
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBCardText>
                                        Min. Instagram Follower :
                                        <input placeholder='ex. 20000' name='followers' className='form-control mb-3'></input>
                                        Min. Engagement Rate : 
                                        <input placeholder='ex. 0.5' name='engagement' className='form-control'></input>
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard> */}

                             {/* Filter By Location */}
                             <MDBCard className='mt-3'>
                                <MDBCardHeader>
                                    Location : 
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBCardText>
                                    <form action="">
                                        <div className='form-check'>
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
                                        </div>
                                    </form>
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>

                             {/* Filter By Categories */}
                             <MDBCard className='mt-3'>
                                <MDBCardHeader>
                                    Categories : 
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBCardText>
                                        <div className='form-check'>
                                            <input onChange={this.handleCheckboxCategories} value='makanan' type="checkbox" className="form-check-input" id="makanan"/>
                                            <label className="form-check-label" for="makanan">Makanan</label>
                                        </div>
                                        <div className='form-check'>
                                            <input onChange={this.handleCheckboxCategories} value='fashion' type="checkbox" className="form-check-input" id="fashion"/>
                                            <label className="form-check-label" for="fashion">Fashion</label>
                                        </div>
                                        <div className='form-check'>
                                            <input onChange={this.handleCheckboxCategories} value='travel' type="checkbox" className="form-check-input" id="travel"/>
                                            <label className="form-check-label" for="travel">Travel</label>
                                        </div>
                                        <div className='form-check'>
                                            <input onChange={this.handleCheckboxCategories} value='technology' type="checkbox" className="form-check-input" id="technology"/>
                                            <label className="form-check-label" for="technology">Technology</label>
                                        </div>
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