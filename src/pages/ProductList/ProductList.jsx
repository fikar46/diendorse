import React, { Component } from 'react';
import {MDBCard,MDBCardBody,MDBCardHeader,MDBCardTitle, MDBCardText,MDBBtn} from 'mdbreact'

const DataForInfluencer = (title, datePosted,verified,description,categories,priceRange,minFollower,minEngagementRate,numOfBid) => {
    return{
        title,datePosted,verified,description,categories,priceRange,minFollower,minEngagementRate,numOfBid
    }
}


const data_for_influencer = [
    DataForInfluencer('Dicari Cowok Ganteng','3','1','Ini Adalah Deskripsi Untuk Tawaran ini dan dan dan dan dan dan dan dan dan','makanan','10.000 - 15. 000',null,null,0),
    DataForInfluencer('Ngiklanin Product Chicken Panas','10','1','Ini Adalah Deskripsi Untuk Tawaran ini dan dan dan dan dan dan dan dan dan','makanan','15.000 - 25. 000',2000,1,0),
    DataForInfluencer('Saya Butuh Cewek Berhijab Cantik','1','1','Ini Adalah Deskripsi Untuk Tawaran ini dan dan dan dan dan dan dan dan dan','fashion','10.000 - 15. 000',1500,0.8,0),
]


class productList extends Component {
    renderData = () => {
        return data_for_influencer.map((val) => {
            return(
                <MDBCard>
                    <MDBCardBody>
                        <div className='row justify-content-between'>
                            <div className='col-9'>
                                <h6 style={{display:'inline',fontWeight:'bold'}}>{val.title}</h6> <span className='ml-2' style={{fontSize:'12px', fontWeight:'lighter',color:'#1f2836',fontStyle:'italic'}}>{val.datePosted} Hari Yang Lalu</span>
                                <MDBCardText>
                                    {val.description}
                                </MDBCardText>
                            </div>
                            <div className='col-3'>
                                <h6 style={{fontWeight:'bold'}}>
                                    {val.priceRange}
                                </h6>
                                <MDBCardText>
                                    {val.numOfBid} Bids
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
        return (
            <div className='container-fluid pt-5' style={{backgroundColor:'#f0f0f0'}}>
                <h1 className='container'>Find Jobs</h1>
                <div className='container'>
                    <div className='row'>
                        {/* ====================== FILTERING SECTIONS ========================= */}
                        <div className='col-md-3'> 
                            <MDBCard>
                                <MDBCardHeader>
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
                                        <input className='form-control mb-3'></input>
                                        To : 
                                        <input className='form-control'></input>
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
                                        <input className='form-control mb-3'></input>
                                        Min. Engagement Rate : 
                                        <input className='form-control'></input>
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
                                        <input className='form-control mb-3'></input>
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
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                            <label className="form-check-label" for="exampleCheck1">Makanan</label>
                                        </div>
                                        <div className='form-check'>
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                            <label className="form-check-label" for="exampleCheck1">Fashion</label>
                                        </div>
                                        <div className='form-check'>
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                            <label className="form-check-label" for="exampleCheck1">Travel</label>
                                        </div>
                                        <div className='form-check'>
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                            <label className="form-check-label" for="exampleCheck1">Technology</label>
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

export default productList;