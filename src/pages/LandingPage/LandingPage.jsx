import React, { Component } from 'react';
import img_1 from './../../support/assets/images/landingPage/img_1.jpg'
import img_2 from './../../support/assets/images/landingPage/img_2.png'
import img_3 from './../../support/assets/images/landingPage/img_3.png'
import img_4 from './../../support/assets/images/landingPage/img_4.png'
import { MDBBtn } from 'mdbreact';
class LandingPage extends Component {
    render() {
        return (
            <div className="container">

        <div className="row">
          <div className="col-md-6">
            <br />
            <br />
            <h1  style={{paddingLeft: '1rem',fontSize:"48px" , color:'#4b4b4b'}}>Connect Influencer</h1> 
            <h1  style={{paddingLeft: '1rem',fontSize:"48px" , color:'#4b4b4b'}}>And Small Business</h1>
            <h1  style={{paddingLeft: '1rem',fontSize:"48px" , color:'#4b4b4b'}}>In One Click</h1>
            <br />
            <h3 style={{paddingLeft: '1rem',fontSize:'20px',color:'#9f9f9f'}}>Are you influencer? or you have a business? </h3>
            <h3 style={{paddingLeft: '1rem',fontSize:'20px',color:'#9f9f9f'}}> Accelerate your product now!</h3>
            <br />
            <MDBBtn color='#F29C13' style={{borderRadius: '100px',paddingLeft: '1rem', marginLeft: '10px',textTransform:'capitalize',backgroundColor : "#2E9DFF" , color: "white"}}>Find Influencer </MDBBtn>            
            {/* <a href="#" className="btn btn-primary" style={{paddingLeft: '1rem', marginLeft: '10px'}}>Find Influencer </a> */}
            <MDBBtn color='#F29C13' style={{borderRadius: '100px',paddingLeft: '1rem', marginLeft: '20px',textTransform:'capitalize',backgroundColor : "#F29C13" , color: "white"}}>Find Project </MDBBtn>
          </div>
          <div className="col-md-6">
            <br />
            <img src={img_1} alt="" style={{width: '600px', height: '400px'}} />
          </div>
          <div className="col-md-12">
            <br />
            <br />
            <br />
            <h2 style={{textAlign: 'center'}}>How you get additional income?</h2>
            <br /><br /><br />
          </div>
          <div className="col-md-4">
            <img className="icon-lp" src={img_3} alt="ads" />
            <br />
            <h3 className="subtitle" style={{textAlign: 'center'}}>Post Advertisement</h3>
            <br />
            <p className="subtitle">are you an Businessmen? if you want your product to be sought by influencers, you can promote your products. influencers will find your product and will bid</p>
          </div>
          <div className="col-md-4">
            <img className="icon-lp" src={img_2} alt="findbusinessmen" />
            <br />
            <h3 className="subtitle" style={{textAlign: 'center'}}>Find Influencer</h3>
            <br />
            <p className="subtitle">besides advertising, businessmen can also look for influencers to promote their products on influencers' social media. The influencer can also reject or accept incoming advertising offers</p>
          </div>
          <div className="col-md-4">
            <img className="icon-lp" src={img_4} alt="findInfluencer" />
            <br />
            <h3 className="subtitle" style={{textAlign: 'center'}}>Find Projects</h3>
            <br />
            <p className="subtitle">not only Businessmen can look for influencers, as influencers you can also bid on products that have been advertised by Businessmen. They would choose which influencers are in line with their budget</p>
          </div>
        </div>
      </div>
        );
    }
}

export default LandingPage;