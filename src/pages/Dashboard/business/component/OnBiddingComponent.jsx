import React, { Component } from 'react'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { connect } from 'react-redux';
import Axios from 'axios';
import { koneksi } from '../../../../environment';
import { getHeaderAuth } from '../../../../helper/service';



class OnBiddingComponent extends Component {
    state={
        onbidding:[]
    }
    componentDidMount(){
        this.getDataUserOnbidding()
    }
    getDataUserOnbidding=()=>{
        Axios.get(`${koneksi}/project/get-data-user-onbidding/${this.props.id_project}`,getHeaderAuth())
        .then((res)=>{
            console.log(res.data)
            this.setState({onbidding:res.data})
        }).catch((err)=>{

            console.log(err)
        })
    }
    mapOnBidding=()=>{
        var data = this.state.onbidding.map((item,i)=>{
            var place = JSON.parse(item.place)
            return(
                <tr>
                        <td>{i+1}</td>
                        <td>{item.fullname}</td>
                        <td>{item.username_ig}</td>
                        <td>{item.followers_ig}</td>
                        <td>{item.engagement_ig}</td>
        <td>{place.kec},{place.kab},{place.prov}</td>
                        <td><button className="btn btn-danger">reject</button></td>
                        <td><button className="btn btn-success">Accept</button></td>
                    </tr>
            )
        })
        return data;
    }
    render() {
        return (
            <div className=" mt-5">
               <div className="my-4">
               <h4>Bidders</h4>
                <MDBTable className="text-center">
                <MDBTableHead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Instagram</th>
                        <th>Followers</th>
                        <th>Engagment Instagram</th>
                        <th>Location</th>
                        <th></th>
                        <th></th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {this.mapOnBidding()}
                    
                </MDBTableBody>
                </MDBTable>
               </div>
               <div className="my-4">
               <h4>Your Influencer</h4>
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
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        user : state.user.user
    }
  }
  
  export default connect(mapStateToProps) (OnBiddingComponent);
