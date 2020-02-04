import React, { Component } from 'react';
import {MDBInput,MDBBtn,MDBCard,MDBCardBody} from 'mdbreact'
import Axios from "axios";
import {koneksi} from "../../environment"
import {connect} from 'react-redux'
import { onRegisterSuccess } from './../../redux/actions'
import { Redirect } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends Component {
    state={
        email:"",
        password:"",
        error:false,
        errorMsg:"",
        loading : false
    }

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    submitHandler = event => {
        this.setState({loading : true})
        event.preventDefault();
        event.target.className += " was-validated";
        var {email,password} = this.state;
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if(email !="" && password != ""){
                if(!email.match(regexEmail)){
                    this.setState({
                        loading : false,
                        error:true,
                        errorMsg:"Format Email Harus Benar"
                                })
                }else{
                    Axios.post(`${koneksi}/auth/login`,{
                        email, password
                    }).then((res)=>{
                        if(res.data.error){
                            return this.setState({error : true , errorMsg: res.data.message, loading: false})
                        }
                        localStorage.setItem('user', JSON.stringify(res.data.data));
                        this.props.onRegisterSuccess(res.data.data)
                        this.setState({
                            loading: false,
                            error:false
                                    })

                    }).catch((err)=>{
                        // console.log('oke')
                        return this.setState({error : true , errorMsg: err.message, loading: false})
                    })
                }
            }else{
            this.setState({
                loading:false,
                error:true,
                errorMsg:"Form wajib diisi"
                        })
            }
    };

    notifySuccessLogin = (nama,role) => {
        toast.info('Welcome ' + nama + " , you're Logged in As " + role + ' Account')
    }

    errorForm=()=>{
        if(this.state.error){
            return(
            <p className="text-danger">{this.state.errorMsg}</p>
            )
        }
    }
    
    render() {
        if(this.props.user != null){
            if(this.props.user.role == 'business'){
                return <Redirect to='/find-influencers' />
            }else if(this.props.user.role == 'influencer'){
                return <Redirect to='/find-business' />
            }else{
                return <Redirect to='/admin'/>
            }
        }
        return (
            <div className='container'>
                <div className='row justify-content-center pt-5 mt-5'>
                    <MDBCard className='col-md-4'>
                        <MDBCardBody>
                            <form
                                onSubmit={this.submitHandler}
                                noValidate>
                                <p className="h5 text-center mb-4 font-weight-bold">Log In</p>
                                <div className="grey-text">
                                    
                                <MDBInput
                                    value={this.state.email}
                                    className="form-control"
                                    name="email"
                                    label="Your email"
                                    id="email"
                                    type="email"
                                    required
                                    onChange={this.changeHandler}
                                >
                                    
                                </MDBInput>
                                <MDBInput
                                    value={this.state.password}
                                    className="form-control"
                                    name="password"
                                    label="Your password"
                                    id="password"
                                    type="password"
                                    autoComplete="password"
                                    required
                                    onChange={this.changeHandler}
                                    >
                                    
                                    </MDBInput>
                            
                                </div>
                                <div className="text-center">
                                    {this.errorForm()}
                                <MDBBtn color="primary" type="submit">
                                {
                                    this.state.loading ? 
                                        <div  style={{color:"white"}} className="spinner-border mx-4" role="status">
                                            <span className="sr-only"></span>
                                        </div>
                                        :
                                        "Submit"
                                }
                                </MDBBtn>
                                </div>
                                
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        user : state.user.user
    }
}

export default connect(mapStateToProps,{onRegisterSuccess}) (Login);