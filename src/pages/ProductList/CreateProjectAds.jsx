import React, { Component } from 'react'
import { MDBContainer, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css"
import {koneksi} from "../../environment";
import Axios from 'axios';
import {connect} from 'react-redux';
import {getHeaderAuth} from '../../helper/service'
import Swal from 'sweetalert2';
import { localStorageKey } from '../../helper/constant';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import LoadingPage from '../../components/LoadingPage';

const apiUrl = 'https://x.rajaapi.com/MeP7c5ne'

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
        priceMax:1,
        fileUpload:[],
        loadUpload:false,
        provinsi : [],
        kabupaten : [],
        kecamatan : []
      }
    componentDidMount(){
      this.getCategoryAds()
      this.getDataProvinsi()
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
      var {upload_at,category,sex_ads,value} = this.state;
      var description = this.refs.description.value;
      var min = this.refs.min.value;
      var max = this.refs.max.value;
      var days = this.refs.days.value;
      var id_user = this.props.user.id;
      if(category == "x"){
        var ect_category=this.refs.ect_category.value;
      }else{
        var ect_category=category;
      }
      var file=JSON.stringify(this.state.fileUpload);
      var estimation_ads = JSON.stringify({min,max})
      var age_ads = JSON.stringify(value)
      var status;
      if(this.refs.prov.value != 0 || this.refs.kab.value != 0 || this.refs.kec.value !=0){
        var location_ads = {
            prov : this.state.provinsi.filter((val) => val.id == this.refs.prov.value)[0].name,
            kab : this.state.kabupaten.filter((val) => val.id == this.refs.kab.value)[0].name,
            kec : this.state.kecamatan.filter((val) => val.id == this.refs.kec.value)[0].name
        }
      }else{
        return alert('Location Harus Dipilih')
      }

      if(product_name == ""&&category==""&&ect_category==""&&file==""&&upload_at==""&&location_ads==""&&sex_ads==""&&age_ads==""&&description==""&&estimation_ads==""){  
         status = false
      }else{
        status = true
      }
      if(status){
      if(days>0){
        if(this.state.priceMin>=50000){
          if(Number(this.state.priceMax) > Number(this.state.priceMin)){
            
              Axios.post(`${koneksi}/project/create-ads`,{
                id_user,product_name,category,ect_category,file,upload_at,location_ads : JSON.stringify(location_ads),sex_ads,age_ads,description,estimation_ads,days
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
            this.setState({loading:false})
            alert("Price max must be higher than min price")
          }
    }else{

      console.log(this.state.priceMin,this.state.priceMax)
      this.setState({loading:false})
      alert("Price min must be more than or equal Rp 50.000")
    }
      }else{
        this.setState({loading:false})
        alert("Minimum days is 1")
      }
    }else{
      this.setState({loading:false})
        alert("All forms must be filled.")
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
    uploadFile=(event)=>{
      this.setState({loadUpload:true})
      var formData = new FormData()
      var auth = JSON.parse(localStorage.getItem(localStorageKey));

      var headers = {
          headers: 
          {'Content-Type': 'multipart/form-data',
          'Authorization' : `Bearer ${auth.token}`
          }   
      }
      if(event.target){
        formData.append('file', event.target.files[0])
      }
      Axios.post(`${koneksi}/project/upload-file`,formData,headers)
      .then((res)=>{
          this.setState({fileUpload:[...this.state.fileUpload,res.data[0]]})
          console.log(this.state.fileUpload) 
          this.setState({loadUpload:false})
      }).catch((err)=>{
        console.log(err) 
        this.setState({loadUpload:false})
      })
    }
    deleteUpload=(index)=>{
      var data = this.state.fileUpload;
      data.splice(index,1)
      this.setState({fileUpload:data})
    }
    getDataAfterUpload=()=>{
      if(this.state.fileUpload.length>0){
        var data = this.state.fileUpload.map((item,i)=>{
          return(
              <tr>
                <td>{i+1}</td>
                <td>{item.originalname}</td>
                <td>{item.size/1000} kb</td>
                <td>{item.mimetype}</td>
                <td><MDBIcon icon="trash-alt" onClick={()=>this.deleteUpload(i)}/></td>
              </tr>
              
              
          )
        })
        return data;
      }
    }
    buttonUpload=()=>{
      if(this.state.loadUpload){
          return(
            <label className="btn btn-success" htmlFor="loadingupload" aria-describedby="inputGroupFileAddon02"><div  style={{color:"white"}} className="spinner-border mx-4" role="status">
            <span className="sr-only"></span>
        </div></label>

            
          )

      }else{
return(
  <label className="btn btn-success" htmlFor="inputGroupFile" aria-describedby="inputGroupFileAddon02">Choose file</label>

)
       
      }
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
  renderOption = (state) => {
    var jsx =  state.map((val) => {
        return(
            <option key={val.id}  value={val.id} > {val.name} </option>
        )
    })
    return jsx
}

    render() {
      if(this.state.provinsi.length == 0){
        return(
          <LoadingPage/>
        )
      }
        return (
            <div className=" pt-5">
                    <MDBContainer>
                            <form>
                                <p className="h3 text-center mb-4">Create Ads</p>
                                <label htmlFor="productName" className="black-text">
                                    Product Name for your ads
                                </label>
                                <input type="text" id="productName" className="form-control" ref="product_name" placeholder="Your Product Name"/>
                                <br />
                                <label htmlFor="categoryAds" className="black-text">
                                Category ads
                                </label>
                                <br/>
                                <select className="form-control col-3" onChange={this.optionCategory} id="categoryAds">
                                    <option value="">Choose Category</option>
                                    {this.optionDataCategory()}
                                    <option value="x">Others</option>
                                </select>
                                <br />
                                {this.openEtcCategory()}
                                <label htmlFor="description" className="black-text">
                                Description ads <br></br><small style={{color:"grey"}}>Describe what you want to convey to influencers about your desire for your ad, such as conveying the contents of the Instagram post caption</small>
                                </label>
                                <textarea type="text" id="description" className="form-control" rows="9" ref="description" placeholder="Input your ads description" defaultValue="saya ingin influencer memposting foto untuk berada di feed mereka agar iklan saya bisa dilihat oleh followers mereka dan dengan caption seperti berikut..."/>
                                <br />
                                <label htmlFor="uploadFile" className="black-text">
                                Upload file for support your description<br/>
                                <small className="grey-text">(Opsional) Anda dapat mengupload file dalam bentuk gambar atau video untuk melengkapi deskripsi iklan</small>
                                </label><br/>
                                 <div className="input-group my-3">
                                  <div className="custom-file">
                                    {this.buttonUpload()}
                                    <input type="file" className="custom-file-input" id="inputGroupFile" onChange={this.uploadFile}/>
                                  </div>
                                </div>
                                <MDBTable>
                                    <MDBTableBody>
                                {this.getDataAfterUpload()}
                                    </MDBTableBody>
                                </MDBTable>
                                
                                <label htmlFor="publish_at" className="black-text mt-2">
                                Ads will publish at
                                </label>
                                 <div className="mb-3">
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
                                <label htmlFor="locationGoals" className="black-text">
                                Audience location goals
                                </label>
                                <br/>
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
                                {/* <select className="form-control col-3" onChange={this.locationAds}>
                                    <option value="">Pilih Lokasi</option>
                                    <option value="1">Se-Indonesia</option>
                                    <option value="2">Banten</option>
                                    <option value="x">Dki Jakarta</option>
                                </select> */}
                                <br />
                                <label htmlFor="gender" className="black-text">
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
                                <label htmlFor="agegoal" className="black-text">
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
                                <label htmlFor="days" className="black-text">
                                how long do you want your ad on feed? (Only post)
                                </label>
                                <input type="number" id="days" className="form-control col-2" ref="product_name" placeholder="How many days" defaultValue="1" ref="days"/>
                                <br />
                                <label htmlFor="estimated" className="black-text">
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