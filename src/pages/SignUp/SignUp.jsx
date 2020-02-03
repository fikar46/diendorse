import React, { Component } from 'react';
import {MDBInput,MDBBtn,MDBCard,MDBCardBody} from 'mdbreact'

class SignUp extends Component {
    render() {
        return (
            <div className='container'>
                <div className='row justify-content-center py-5'>
                    <MDBCard className='col-md-4'>
                        <MDBCardBody>
                            <form>
                                <p className="h5 text-center mb-4">Sign up</p>
                                <div className="grey-text">
                                <MDBInput
                                    label="Your Full Name"
                                    icon="user"
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"
                                />
                                <MDBInput
                                    label="Your email"
                                    icon="envelope"
                                    group
                                    type="email"
                                    validate
                                    error="wrong"
                                    success="right"
                                />
                                <MDBInput
                                    label="Your password"
                                    icon="lock"
                                    group
                                    type="password"
                                    validate
                                />
                                <MDBInput
                                    label="Confirm your password"
                                    icon="exclamation-triangle"
                                    group
                                    type="password"
                                    validate
                                />
                                </div>
                                <div className="text-center">
                                <MDBBtn color="primary">Register</MDBBtn>
                                </div>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </div>
            </div>
        );
    }
}

export default SignUp;