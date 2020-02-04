import React, { Component } from 'react';
import {MDBInput,MDBBtn,MDBCard,MDBCardBody} from 'mdbreact'
import Axios from "axios";
import {koneksi} from "../../environment"
class SignUp extends Component {
    state={
        fullname:"",
        email:"",
        password:"",
        confirm:"",
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
        var {fullname,email,password,confirm,fullnameError,emailError,passwordError} = this.state;
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
           if(fullname != "" && email !="" && password != "" && confirm !=  ""){
                if(!email.match(regexEmail)){
                    this.setState({
                        loading : false,
                        error:true,
                        errorMsg:"Format Email Harus Benar"
                                })
                }else{
                    if(password!= confirm){
                        this.setState({
                            loading : false,
                            error:true,
                            errorMsg:"Password tidak sama"
                                    })
                    }else{
                        Axios.post(`${koneksi}/auth/register`,{
                            fullname, email, password,role:"user"
                        }).then((res)=>{
                            localStorage.setItem('user', JSON.stringify(res.data));

                            this.setState({
                                loading: false,
                                error:false
                                        })
                            window.location="/role"
                        }).catch((err)=>{
                            console.log(err)
                        })
                    }
                }
           }else{
            this.setState({
                loading:false,
                error:true,
                errorMsg:"Form wajib diisi"
                        })
           }
    
      };
      errorForm=()=>{
          if(this.state.error){
              return(
              <p className="text-danger">{this.state.errorMsg}</p>
              )
          }
      }
    render() {
        return (
            <div className='container'>
                <div className='row justify-content-center py-5'>
                    <MDBCard className='col-md-4'>
                        <MDBCardBody>
                            <form
                             onSubmit={this.submitHandler}
                             noValidate>
                                <p className="h5 text-center mb-4 font-weight-bold">Sign up</p>
                                <div className="grey-text">
                                <MDBInput
                                    value={this.state.fullname}
                                    className="form-control"
                                    name="fullname"
                                    label="Your Full Name"
                                    id="fullname"
                                    type="text"
                                    required
                                    onChange={this.changeHandler}
                                    >
                                       
                                    </MDBInput>
                                    
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
                                <MDBInput
                                    value={this.state.confirm}
                                    className="form-control"
                                    name="confirm"
                                    label="Confirm your password"
                                    id="new-password"
                                    type="password"
                                    autoComplete="confirm-password"
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
                                        "Register"
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

export default SignUp;