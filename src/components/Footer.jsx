import React, {Component} from 'react'
import './Footer.css'
class Footer extends Component{
    render(){
        return(
            <footer className="ftco-footer ftco-section mt-5">
            <div className="container">
              <div className="row ">
                <div className="col-md">
                  <div className="ftco-footer-widget mb-4">
                    <h2 className="ftco-heading-2">About Diendorse</h2>
                    <p>Diendorse is a platfom to connect influencer and small business to growth their business
                    </p>
                    <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                      <li className=""><a href="https://line.me/R/ti/p/%40sdf2355y"><span className="fab fa-line" /></a></li>
                      <li className=""><a href="https://www.facebook.com/siapptn"><span className="icon-facebook" /></a></li>
                      <li className=""><a href="https://www.instagram.com/siapptn/"><span className="icon-instagram" /></a></li>
                    </ul>
                  </div>
                </div>
              
                <div className="col-md">
                  <div className="ftco-footer-widget mb-4">
                    <h2 className="ftco-heading-2">Features</h2>
                    <ul className="list-unstyled">
                      <li><a href="/find-influencer"><span className=" mr-2" />Find Influencer</a></li>
                    </ul>
                    <ul className="list-unstyled">
                      <li><a href="/find-business"><span className=" mr-2" />Find Project</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-md">
                  <div className="ftco-footer-widget mb-4">
                    <h2 className="ftco-heading-2">Lainnya</h2>
                    <ul className="list-unstyled">
                      <li><a href="/syarat-dan-ketentuan"><span className=" mr-2" />Term And Conditions</a></li>
                      <li><a href="/kebijakan-privasi"><span className=" mr-2" />Privacy Policy</a></li>
                      <li><a href="/kebijakan-pengembalian"><span className=" mr-2" />Return Policy</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-md">
                  <div className="ftco-footer-widget mb-4">
                    <h2 className="ftco-heading-2">Contact Us</h2>
                    <div className="block-23 mb-3">
                      <ul>
                       
                        {/* <li><a href="#"><span className="icon icon-phone" /><span className="text">+2 392 3929 210</span></a></li> */}
                        <li><a href="#"><span className="icon icon-envelope" /><span className="text">info@diendorse.com</span></a></li>
                        <li><span className="icon icon-map-marker" /><span className="text">Jl. Trunojoyo no 11 Bandung</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 text-center">
                  <p>
                    Copyright ©2020 All rights reserved</p>
                </div>
              </div>
            </div>
          </footer>
        )
    }
}
export default Footer