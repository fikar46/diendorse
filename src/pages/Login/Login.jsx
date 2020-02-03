import React, { Component } from 'react';
import {MDBInput,MDBBtn,MDBCard,MDBCardBody} from 'mdbreact'

class Login extends Component {
    render() {
        return (
            <div className='row justify-content-center pt-5 mt-5'>
                <MDBCard>
                    <MDBCardBody>
                        <form>
                        <p className="h5 text-center mb-4">Sign in</p>
                        <div className="grey-text">
                        <MDBInput
                            label="Your Username"
                            icon="user"
                            group
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
                        </div>
                        <div className="text-center">
                            <MDBBtn>Login</MDBBtn>
                        </div>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </div>
        );
    }
}

export default Login;