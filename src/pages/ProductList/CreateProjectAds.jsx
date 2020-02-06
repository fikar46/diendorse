import React, { Component } from 'react'
import { MDBContainer, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
export default class CreateProjectAds extends Component {
    state = {
        radio: 2
      }
    optionCategory=()=>{

    }
    onClickPlatform = (nr) => () => {
        this.setState({
          radio: nr
        });
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
                                <input type="text" id="defaultFormContactNameEx" className="form-control" />
                                <br />
                                <label htmlFor="defaultFormContactEmailEx" className="black-text">
                                Kategori
                                </label>
                                <br/>
                                <select className="form-control col-3" onChange={this.optionCategory}>
                                    <option value="1">Makanan</option>
                                    <option value="2">Minuman</option>
                                    <option value="x">Lain lain</option>
                                </select>
                                <br />
                                <label htmlFor="defaultFormContactSubjectEx" className="black-text">
                                Deskripsi
                                </label>
                                <textarea type="text" id="defaultFormContactMessageEx" className="form-control" rows="9" />
                                <br />
                                <label htmlFor="defaultFormContactMessageEx" className="black-text">
                                Upload file<br/>
                                <small className="grey-text">(Opsional) Anda dapat mengupload file dalam bentuk gambar atau video untuk melengkapi deskripsi iklan</small>
                                </label><br/>
                                <div>
                                    <button className="btn">+</button><br/>
                                </div>
                                <label htmlFor="defaultFormContactMessageEx" className="black-text mt-2">
                                Iklan akan di terbitkan di
                                </label>
                                 <div className="my-3">
        <div className="form-check">
          <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" defaultValue="option1" defaultChecked />
          <label className="form-check-label" htmlFor="exampleRadios1">
            Instagram Post
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" defaultValue="option2" />
          <label className="form-check-label" htmlFor="exampleRadios2">
            Instagram Story
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" defaultValue="option3" />
          <label className="form-check-label" htmlFor="exampleRadios3">
            Keduanya
          </label>
        </div>
      </div>
                                <label htmlFor="defaultFormContactMessageEx" className="black-text">
                                Sasaran lokasi permirsa
                                </label>
                                <textarea type="text" id="defaultFormContactMessageEx" className="form-control" rows="3" />
                                <label htmlFor="defaultFormContactMessageEx" className="black-text">
                                Sasaran jenis kelamin pemirsa
                                </label>
                                <textarea type="text" id="defaultFormContactMessageEx" className="form-control" rows="3" />
                                <label htmlFor="defaultFormContactMessageEx" className="black-text">
                                Sasaran umur pemirsa
                                </label>
                                <textarea type="text" id="defaultFormContactMessageEx" className="form-control" rows="3" />
                                <label htmlFor="defaultFormContactMessageEx" className="black-text">
                                Estimasi Harga iklan
                                </label>
                                <textarea type="text" id="defaultFormContactMessageEx" className="form-control" rows="3" />
                                <div className="text-center mt-4">
                                        <MDBBtn color="primary"  type="submit">
                                            Submit
                                            <MDBIcon far icon="paper-plane" className="ml-2" />
                                        </MDBBtn>
                                        </div>
                                    </form>                        
                    </MDBContainer>
            </div>
        )
    }
}
