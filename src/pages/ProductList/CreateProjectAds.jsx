import React, { Component } from 'react'
import { MDBContainer, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css"
import {koneksi} from "../../environment";
import Axios from 'axios';
import {connect} from 'react-redux';
import {getHeaderAuth} from '../../helper/service'
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';
class CreateProjectAds extends Component {
    state = {
        radio: 2,
        value: { min: 15, max: 45 },
        category:"",
        upload_at:"",
        location_ads:"",
        sex_ads:"",
        loading:false,
        categoryOptions:[],
        priceMin:0,
        priceMax:1
      }
    componentDidMount(){
      this.getCategoryAds()
    }
    getCategoryAds=()=>{
      Axios.get(`${koneksi}/project/category-ads`,getHeaderAuth())
      .then((res)=>{
        this.setState({categoryOptions:res.data})
      }).catch((err)=>{
        console.log(err)
      })
    }
    optionCategory=(n)=>{
      this.setState({category:n.target.value})
    }
    locationAds=(n)=>{
      this.setState({location_ads:n.target.value})
    }
    onClickPlatform = (nr) => () => {
        this.setState({
          radio: nr
        });
      }
    buttonSubmit=()=>{
      this.setState({loading:true})
      var product_name = this.refs.product_name.value;
      var {upload_at,category,location_ads,sex_ads,value} = this.state;
      var description = this.refs.description.value;
      var min = this.refs.min.value;
      var max = this.refs.max.value;
      var id_user = this.props.user.id;
      if(category == "x"){
        var ect_category=this.refs.ect_category.value;
      }else{
        var ect_category=category;
      }
      var file="test.jpg";
      var estimation_ads = JSON.stringify({min,max})
      var age_ads = JSON.stringify(value)
      var status;
      
      if(product_name == ""&&category==""&&ect_category==""&&file==""&&upload_at==""&&location_ads==""&&sex_ads==""&&age_ads==""&&description==""&&estimation_ads==""){  
         status = false
      }else{
        status = true
      }
      if(this.state.priceMin>=50000){
          if(this.state.priceMax > this.state.priceMin){
            if(status){
              Axios.post(`${koneksi}/project/create-ads`,{
                id_user,product_name,category,ect_category,file,upload_at,location_ads,sex_ads,age_ads,description,estimation_ads
              },getHeaderAuth()).then((res)=>{
                  Swal.fire(
                    'Project disimpan',
                    'Project iklan telah berhasil di publish!',
                    'success'
                  ).then((result)=>{
                    this.setState({loading:false})
                    if(result.value){
                      window.location="/dashboard"
                    }
                  })         
              }).catch((err)=>{
                  console.log(err)
                  this.setState({loading:false})
              })
          }else{
              alert("Form wajib diisi semua.")
          }
          }else{
            alert("Price must be higher than min price")
          }
    }else{
      alert("Price must be more than or equal Rp 50.000")
    }
      
    }
    renderButton=()=>{
      if(this.state.loading){
        return(
          <MDBBtn color="primary"  type="button">
                                            <div  style={{color:"white"}} className="spinner-border mx-4" role="status">
                                            <span className="sr-only"></span>
                                        </div>
          </MDBBtn>
        )
      }else{
        return(
          <MDBBtn color="primary"  type="button" onClick={this.buttonSubmit}>
                                            Submit
          </MDBBtn>
        )
      }
    }
    optionDataCategory=()=>{
      var data = this.state.categoryOptions.map((item)=>{
        return (
<option value={item.id}>{item.name}</option>
                            
        )
      })
      return data;
    }
    openEtcCategory=()=>{
      if(this.state.category == "x"){
        return(
          <div>
            <label htmlFor="defaultFormContactNameEx" className="black-text">
            Other Categories Name
            </label>
            <input type="text" id="defaultFormContactNameEx" className="form-control" ref="ect_category"/>
            <br />
          </div>
        )
      }
    }
    render() {
        return (
            <div className=" pt-5">
                    <MDBContainer>
                            <form>
                                <p className="h3 text-center mb-4">Create Ads</p>
                                <label htmlFor="defaultFormContactNameEx" className="black-text">
                                    Product Name for your ads
                                </label>
                                <input type="text" id="defaultFormContactNameEx" className="form-control" ref="product_name" placeholder="Your Product Name"/>
                                <br />
                                <label htmlFor="defaultFormContactEmailEx" className="black-text">
                                Category ads
                                </label>
                                <br/>
                                <select className="form-control col-3" onChange={this.optionCategory}>
                                    <option value="">Choose Category</option>
                                    {this.optionDataCategory()}
                                    <option value="x">Others</option>
                                </select>
                                <br />
                                {this.openEtcCategory()}
                                <label htmlFor="defaultFormContactSubjectEx" className="black-text">
                                Description ads
                                </label>
                                <textarea type="text" id="defaultFormContactMessageEx" className="form-control" rows="9" ref="description" placeholder="Input your ads description"/>
                                <br />
                                <label htmlFor="defaultFormContactMessageEx" className="black-text">
                                Upload file for support your description<br/>
                                <small className="grey-text">(Opsional) Anda dapat mengupload file dalam bentuk gambar atau video untuk melengkapi deskripsi iklan</small>
                                </label><br/>
                                <div>
                                    <button className="btn btn-warning btn-sm" type="button">+</button><br/>
                                </div>
                                <label htmlFor="defaultFormContactMessageEx" className="black-text mt-2">
                                Ads will publish at
                                </label>
                                 <div className="my-3">
                                  <div className="form-check">
                                    <input className="form-check-input" type="radio" name="PlatformRadios" id="PlatformRadios1" defaultValue="platform1" onClick={()=>this.setState({upload_at:1})}/>
                                    <label className="form-check-label" htmlFor="PlatformRadios1">
                                      Instagram Post
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input className="form-check-input" type="radio" name="PlatformRadios" id="PlatformRadios2" defaultValue="platform2" onClick={()=>this.setState({upload_at:2})}/>
                                    <label className="form-check-label" htmlFor="PlatformRadios2">
                                      Instagram Story
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input className="form-check-input" type="radio" name="PlatformRadios" id="PlatformRadios3" defaultValue="platform3" onClick={()=>this.setState({upload_at:3})}/>
                                    <label className="form-check-label" htmlFor="PlatformRadios3">
                                      Both
                                    </label>
                                  </div>
                                </div>
                                <label htmlFor="defaultFormContactMessageEx" className="black-text">
                                Audience location goals
                                </label>
                                <br/>
                                <select className="form-control col-3" onChange={this.locationAds}>
                                    <option value="">Pilih Lokasi</option>
                                    <option value="1">Se-Indonesia</option>
                                    <option value="2">Banten</option>
                                    <option value="x">Dki Jakarta</option>
                                </select>
                                <br />
                                <label htmlFor="defaultFormContactMessageEx" className="black-text">
                                Audience gender goal
                                </label>
                                <div className="my-3">
                                  <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" defaultValue="option1" onClick={()=>this.setState({sex_ads:1})}/>
                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                      Men
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" defaultValue="option2" onClick={()=>this.setState({sex_ads:2})}/>
                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                      Woman
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" defaultValue="option3" onClick={()=>this.setState({sex_ads:3})}/>
                                    <label className="form-check-label" htmlFor="exampleRadios3">
                                      General
                                    </label>
                                  </div>
                                </div>
                                <br/>
                                <label htmlFor="defaultFormContactMessageEx" className="black-text">
                                 Audience age goal
                                </label>
                                <br/>
                                <br/>
                                <div className="col-6">

                                <InputRange
                                maxValue={65}
                                minValue={8}
                                formatLabel={value => `${value} Tahun`}
                                value={this.state.value}
                                onChange={value => this.setState({ value: value })}
                                onChangeComplete={value => console.log(value)} />
                                </div>
                                <br/>
                                <br/>
                                <label htmlFor="defaultFormContactMessageEx" className="black-text">
                                Estimated price of advertising
                                </label>
                                <div className="row">
                                <div className="input-group mb-3 col-md-4">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">Rp</span>
                                  </div>
                                  <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" ref="min" onChange={(val)=>this.setState({priceMin:val.target.value})}/>
                                  <div className="input-group-append">
                                    <span className="input-group-text">Min</span>
                                  </div>
                                </div>
                                <div className="input-group mb-3 col-md-4">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">Rp</span>
                                  </div>
                                  <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" ref="max" onChange={(val)=>this.setState({priceMax:val.target.value})}/>
                                  <div className="input-group-append">
                                    <span className="input-group-text">Max</span>
                                  </div>
                                </div>
                                </div>
                                <div className="text-center mt-4">
                                        {this.renderButton()}
                                        </div>
                                    </form>                        
                    </MDBContainer>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
  return{
      user: state.user.user
  }
}


export default connect(mapStateToProps)(CreateProjectAds);