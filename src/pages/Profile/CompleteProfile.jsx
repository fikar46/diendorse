import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { koneksi } from '../../environment';
import { getHeaderAuth } from '../../helper/service';
import { localStorageKey } from '../../helper/constant';

function mapStateToProps(state) {
    return {
        user : state.user.user
    };
}
const apiUrl = 'https://x.rajaapi.com/MeP7c5ne'
class CompleteProfile extends Component {
    state={
        provinsi:[],
        kabupaten:[],
        kecamatan : [],
        interestOptions:[],
        interest:''
    }
    componentDidMount(){
        // this.getDataKabupaten()
        this.getDataProvinsi()
        this.getInterest()
    }
    renderOption = (state) => {
        var jsx =  state.map((val) => {
            return(
                <option key={val.id}  value={val.id} > {val.name} </option>
            )
        })
        return jsx
    }
    getDataProvinsi = () => {
        Axios.get('https://x.rajaapi.com/poe')
        .then((res) => {
            if(res.data.success){
                this.setState({token : res.data.token})
                Axios.get(`https://x.rajaapi.com/MeP7c5ne${res.data.token}/m/wilayah/provinsi`)
                .then((resData) => {
                    this.setState({provinsi : resData.data.data})
                })
                .catch((err) => {
                   console.log(err)
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
    onChangeProvHandler = (event) => {
        this.setState({loadingKabupaten : true , kabupaten : [] , kecamatan : []})
        this.refs.kab.value = 0
        Axios.get(`${apiUrl}${this.state.token}/m/wilayah/kabupaten?idpropinsi=${event.target.value}`)
        .then((res) => {
            if(res.data.success){
                this.setState({kabupaten : res.data.data , loadingKabupaten : false})
            }
        })
        .catch((err) => {
            this.setState({modalOpen : true, error : "Pastikan Perangkat Anda Terhubung dengan Internet"})
        })
    }
  
    onChangeKabHandler = (event) => {
        this.setState({loadingKecamatan : true ,kecamatan : []})
        this.refs.kec.value = 0
        Axios.get(`${apiUrl}${this.state.token}/m/wilayah/kecamatan?idkabupaten=${event.target.value}`)
        .then((res) => {
            if(res.data.success){
                this.setState({kecamatan : res.data.data , loadingKecamatan : false})
            }
        })
        .catch((err) => {
            this.setState({modalOpen : true, error : "Pastikan Perangkat Anda Terhubung dengan Internet"})
        })
    }
    onSaveClick = () => {
        this.setState({loading:true})
        var keys = 'tagline,description,birth,followers_ig,engagement_ig,username_ig'.split(',')
        var list_prices = ['feed','story','both']
        console.log(this.refs.prov.value)
        if(this.refs.prov.value != 0 || this.refs.kab.value != 0 || this.refs.kec.value !=0){
            var place = {
                prov : this.state.provinsi.filter((val) => val.id == this.refs.prov.value)[0].name,
                kab : this.state.kabupaten.filter((val) => val.id == this.refs.kab.value)[0].name,
                kec : this.state.kecamatan.filter((val) => val.id == this.refs.kec.value)[0].name
            }
        }else{
            var place = ''
        }
        // console.log(place)
        var prices_data = {}        
        var data = {}
        
        keys.forEach((val) => {
            console.log(val)
            var item = this.refs[val].value
            console.log(item)
            if(item){
                data[val] = item 
            }
        })
        data.fullname = this.props.user.fullname
        data.interest = this.state.interest
        if(place){
            data['place'] = JSON.stringify(place)
        }

        list_prices.forEach((val) => {
            prices_data[val] = Number(this.refs[val].value)
        })

        data['price'] = JSON.stringify(prices_data)
        console.log(data)
        Axios.post(koneksi + '/auth/completeprofile/' + this.props.user.id ,data,getHeaderAuth())
        .then((res) => {
            alert('Edit Data Success')
            window.location.href="/profile"
        })
        .catch((err) => {
            console.log(err)
        })
    }
    getInterest=()=>{
        Axios.get(`${koneksi}/project/account-interest`,getHeaderAuth())
        .then((res)=>{
          this.setState({interestOptions:res.data})
        }).catch((err)=>{
          console.log(err)
        })
      }
      optionDataInterest=()=>{
        var data = this.state.interestOptions.map((item)=>{
          return (
  <option value={item.id}>{item.name}</option>
                              
          )
        })
        return data;
      }
      optionInterest=(n)=>{
        this.setState({interest:n.target.value})
      }
    render() {
        return(
            <div className="container">

                        <div className="mt-5">
                        <h1>Complete your data to continue</h1>
                        </div>
                        <label htmlFor="place" className="grey-text mt-3">
                            Your Place
                        </label>
                        <div className='row mx-2 mx-md-0'>
                                  <select className='form-control col-4 col-md-3' ref='prov' defaultValue={0} onChange={this.onChangeProvHandler}>
                                      <option value={0} disabled> {this.state.provinsi.length > 0 ? 'Pilih Provinsi' : 'loading ...'} </option>
                                      {this.renderOption(this.state.provinsi)}
                                  </select>

                                  <select className='form-control col-4 col-md-3 mx-md-3' ref='kab' defaultValue={0} onChange={this.onChangeKabHandler} >
                                      <option value={0} disabled>{this.state.loadingKabupaten ? 'loading ...' : 'Pilih Kabupaten'}</option>
                                      {this.renderOption(this.state.kabupaten)}
                                  </select>

                                  <select className='form-control col-md-3 col-4' ref='kec'  defaultValue={0}>
                                      <option value={0}>{this.state.loadingKecamatan ? 'loading...' : 'Pilih Kecamatan'}</option>
                                      {this.renderOption(this.state.kecamatan)}
                                  </select>
                              </div>

                        <label htmlFor="birth" className="grey-text mt-3">
                            Your Birthday
                        </label>
                        <input type="date"  id="birth" ref='birth' className="form-control" />

                        <label htmlFor="username_ig" className="grey-text mt-3">
                            Your Instagram Username
                        </label>
                        <input type="text"  id="username_ig" ref='username_ig' placeholder='ex . fikrijamaludin' className="form-control" />

                        <label htmlFor="followers_ig" className="grey-text mt-3">
                            Your Instagram Followers Count
                        </label>
                        <input type="number"  id="followers_ig" ref='followers_ig' placeholder='ex . 15000' className="form-control" />

                        <label htmlFor="engagement_ig" className="grey-text mt-3">
                            Your Instagram <a href='https://phlanx.com/engagement-calculator' target='_blank' style={{fontStyle:'italic' ,textDecoration:'underline' , cursor:'pointer',color:'#AAA'}}> Engagement Rate </a>
                        </label>
                        <input type="number"  id="engagement_ig" ref='engagement_ig' placeholder='ex . 1.3' className="form-control" />

                        <label htmlFor="price" className="grey-text mt-3">
                            Your Price Expectation For Endorse
                        </label>
                        <div className='row px-3'>
                           <input type='number'  ref='feed' placeholder='feed' className='col-3 form-control'  />
                           <input type='number'  ref='story' placeholder='story' className='col-3 form-control mx-2'  />
                           <input type='number'  ref='both' placeholder='both' className='col-3 form-control'  />
                        </div>

                        <label htmlFor="tagline" className="grey-text mt-3">
                            Your Interest
                        </label>
                        
                        <select className="form-control col-3" onChange={this.optionInterest} id="categoryAds">
                                    <option value="">Choose Interest</option>
                                    {this.optionDataInterest()}
                                </select>

                                <label htmlFor="tagline" className="grey-text mt-3">
                            Your Tagline
                        </label>
                        <textarea  id="tagline" ref='tagline' placeholder='ex . im music influencer' className="form-control" />
                        <label htmlFor="description" className="grey-text mt-3">
                            Your Description
                        </label>
                        <textarea   id="description" ref='description' placeholder='ex . im work as a gitarist at one famous band in my province' className="form-control" />

                        <div className="mt-4">
                        {
                            this.state.loading ?
                            <button className="btn btn-primary disabled">
                            <div  style={{color:"white",fontSize:'10px'}} className="spinner-border mx-4" role="status">
                                <span className="sr-only"></span>
                            </div>
                            </button>
                            :
                            <button className="btn btn-primary" onClick={this.onSaveClick}>
                            Save
                            </button>
                        }
                            
                            
                        </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
)(CompleteProfile);