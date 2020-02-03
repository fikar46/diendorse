import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
export default class RoleValdiation extends Component {
    render() {
        return (
            <div className='container'>
            <div className='row justify-content-center pt-5 mt-5'>
                <MDBCard className='col-md-4'>
              <MDBCardBody>
              <form>
                <p className="h4 text-center">Select account type</p>
                <p className="text-center">Don’t worry, this can be changed later.</p>
                <div className="text-center">
                  <MDBBtn className="btn btn-outline-blue" type="submit">
                    Influencer
                    <MDBIcon far icon="paper-plane" className="ml-2" />
                  </MDBBtn>
                  <MDBBtn className="btn btn-outline-blue" type="submit">
                    Business
                    <MDBIcon far icon="paper-plane" className="ml-2" />
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
          </div>
          </div>
        )
    }
}
