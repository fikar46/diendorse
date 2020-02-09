import React, { Component } from 'react';
import { connect } from 'react-redux';
import {MDBCard,MDBCardBody,MDBCardHeader,MDBCardFooter, MDBCardTitle, MDBCardText,MDBTable,MDBTableHead,MDBTableBody, MDBBtn} from 'mdbreact'
import Axios from 'axios';
import { koneksi } from '../../environment';
import { getHeaderAuth } from '../../helper/service';
import LoadingPage from '../../components/LoadingPage';
import moment from 'moment'
import { formatRupiah } from '../../helper/functions';

function mapStateToProps(state) {
    return {
        user : state.user.user
    };
}



class JobDetail extends Component {
    state = {
        data : null
    }

    componentDidMount(){
        console.log('masuk')
        var param = this.props.match.params
        // console.log(param)
        this.getData(param.id)
    }

    getData = (id) => {
        Axios.get(koneksi + '/project/get-project-ads-by-id/' + id , getHeaderAuth() )
        .then((res) => {
            console.log(res.data)
            if(!res.data.error){
                this.setState({data : res.data.data})
                // console.log(res.data)
            }
        })
    }

    /*
ads_creator: "Petra Giles"
age_ads: "{"min":45,"max":60}"
category_name: "Food & Beverage"
created_ads: "2020-05-05T12:25:54.000Z"
days: 1
description: "cursus, diam at pretium aliquet, metus urna convallis erat, eget"
email_creator: "eget.nisi.dictum@Integer.net"
estimation_ads: "{"min":"500","max":"1000"}"
file: null
id: 12
id_user: 61
location_ads: "{"prov":"JAWA TENGAH","kab":"KABUPATEN BANYUMAS","kec":"KEDUNG BANTENG"}"
product_name: "metus. Vivamus euismod"
sex_ads: 3
status_ads: 3
upload_at: 2

    */
    render() {
        if(this.state.data === null){
            return(
                <LoadingPage />
            )
        }
        
        return (
            <div className='container my-5'>
                
                <div className='row'>
                    <div className='col-md-4'>
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle>
                                    {this.state.data.product_name}
                                </MDBCardTitle>
                                <MDBCardText>
                                    Posted By {this.state.data.ads_creator} 
                                    <br/>
                                    Posted {moment(this.state.data.created_ads.split('T')[0], "YYYY-MM-DD").fromNow()} Ago
                                    <br/>
                                    Category = {this.state.data.category_name}
                                    <br/>
                                    Age From {`${JSON.parse(this.state.data.age_ads).min} to ${JSON.parse(this.state.data.age_ads).max} `}
                                    <br/>
                                    Price From {`${formatRupiah(JSON.parse(this.state.data.estimation_ads).min,'Rp')} to ${formatRupiah(JSON.parse(this.state.data.estimation_ads).max,'Rp')} / Day`}
                                    <br/>
                                    Target Location {JSON.parse(this.state.data.location_ads).kab}
                                    <br/>
                                    Upload At : {' '}
                                    {
                                        
                                        this.state.data.upload_at == 1 
                                        ? 'Feed' 
                                        : this.state.data.upload_at == 2 ? 'Story'
                                        :
                                        'Both Story And Feed'
                                    }
                                    <br/>
                                    Post Length : {' '} {
                                        this.state.data.days
                                    }
                                    {' '}
                                    Days
                                </MDBCardText>
                                <MDBCardText>
                                    Deskripsi : {this.state.data.description}
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter>
                                {
                                    this.state.data.file == null ? 'No File' :
                                    JSON.parse(this.state.data.file).map((val,index) => {
                                        console.log(koneksi + val.path)
                                        return(
                                            <a href={koneksi + val.path} target='_blank'>File {index + 1}</a>
                                        )
                                    })
                                }
                            </MDBCardFooter>

                        </MDBCard>
                    </div>
                    <div className='col-md-8'>
                        <MDBCard>
                            <MDBCardBody>
                                <div className="my-4">
                                <h4>Bidders</h4>
                                    <MDBTable>
                                    <MDBTableHead>
                                        <tr>
                                        <th>#</th>
                                        <th>First</th>
                                        <th>Last</th>
                                        <th>Handle</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                        </tr>
                                        <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                        </tr>
                                        <tr>
                                        <td>3</td>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                        </tr>
                                    </MDBTableBody>
                                    </MDBTable>
                                </div>

                            </MDBCardBody>
                        </MDBCard>
                    </div>
                    
                </div>
                
            
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(JobDetail);