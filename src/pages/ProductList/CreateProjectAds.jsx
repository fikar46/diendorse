import React, { Component } from 'react'
import { MDBContainer, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css"
import {koneksi} from "../../environment";
import Axios from 'axios';
import {connect} from 'react-redux';
import {getHeaderAuth} from '../../helper/service'
class CreateProjectAds extends Component {
    state = {
        radio: 2,
        value: { min: 15, max: 45 },
        category:"",
        upload_at:null,
        location_ads:"",
        sex_ads:""
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
      var product_name = this.refs.product_name.value;
      var {upload_at,category,location_ads,sex_ads,value} = this.state;
      var description = this.refs.description.value;
      var min = this.refs.min.value;
      var max = this.refs.max.value;
      var id_user = this.props.user.id
      console.log(id_user)
      var ect_category="";
      var file="";
      var estimation_ads = JSON.stringify({min,max})
      var age_ads = JSON.stringify(value)
      Axios.post(`${koneksi}/project/create-ads`,{
        id_user,product_name,category,ect_category,file,upload_at,location_ads,sex_ads,age_ads,description,estimation_ads
      },getHeaderAuth()).then((res)=>{
        console.log(res.data)
      }).catch((err)=>{
          console.log(err)
      })
    }
    render() {
        return (
            <div className=" pt-5">
                    <MDBContainer>
                            <form>
                                <p className="h3 text-center mb-4">Buat Iklan</p>
                                <label htmlFor="defaultFormContactNameEx" className="black-text">
                                Nama Produk
                                </label>
                                <input type="text" id="defaultFormContactNameEx" className="form-control" ref="product_name"/>
                                <br />
                                <label htmlFor="defaultFormContactEmailEx" className="black-text">
                                Kategori
                                </label>
                                <br/>
                                <select className="form-control col-3" onChange={this.optionCategory}>
                                    <option value="">Pilih Kategori</option>
                                    <option value="1">Makanan</option>
                                    <option value="2">Minuman</option>
                                    <option value="x">Lain lain</option>
                                </select>
                                <br />
                                <label htmlFor="defaultFormContactSubjectEx" className="black-text">
                                Deskripsi
                                </label>
                                <textarea type="text" id="defaultFormContactMessageEx" className="form-control" rows="9" ref="description"/>
                                <br />
                                <label htmlFor="defaultFormContactMessageEx" className="black-text">
                                Upload file<br/>
                                <small className="grey-text">(Opsional) Anda dapat mengupload file dalam bentuk gambar atau video untuk melengkapi deskripsi iklan</small>
                                </label><br/>
                                <div>
                                    <button className="btn btn-warning btn-sm" type="button">+</button><br/>
                                </div>
                                <label htmlFor="defaultFormContactMessageEx" className="black-text mt-2">
                                Iklan akan di terbitkan di
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
                                      Keduanya
                                    </label>
                                  </div>
                                </div>
                                <label htmlFor="defaultFormContactMessageEx" className="black-text">
                                Sasaran lokasi permirsa
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
                                Sasaran jenis kelamin pemirsa
                                </label>
                                <div className="my-3">
                                  <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" defaultValue="option1" onClick={()=>this.setState({sex_ads:1})}/>
                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                      Laki Laki
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" defaultValue="option2" onClick={()=>this.setState({sex_ads:2})}/>
                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                      Perempuan
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" defaultValue="option3" onClick={()=>this.setState({sex_ads:3})}/>
                                    <label className="form-check-label" htmlFor="exampleRadios3">
                                      Umum
                                    </label>
                                  </div>
                                </div>
                                <br/>
                                <label htmlFor="defaultFormContactMessageEx" className="black-text">
                                Sasaran umur pemirsa
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
                                Estimasi Harga iklan
                                </label>
                                <div className="row">
                                <div className="input-group mb-3 col-md-4">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">Rp</span>
                                  </div>
                                  <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" ref="min"/>
                                  <div className="input-group-append">
                                    <span className="input-group-text">Min</span>
                                  </div>
                                </div>
                                <div className="input-group mb-3 col-md-4">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">Rp</span>
                                  </div>
                                  <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" ref="max"/>
                                  <div className="input-group-append">
                                    <span className="input-group-text">Max</span>
                                  </div>
                                </div>
                                </div>
                                <div className="text-center mt-4">
                                        <MDBBtn color="primary"  type="button" onClick={this.buttonSubmit}>
                                            Submit
                                            {/* <MDBIcon far icon="paper-plane" className="ml-2" /> */}
                                        </MDBBtn>
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