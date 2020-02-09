import React, { Component } from 'react'
import Axios from 'axios'
import { koneksi } from '../../../environment'
import { getHeaderAuth } from '../../../helper/service'
import { connect } from 'react-redux'
import OnBiddingComponent from './component/OnBiddingComponent'

class OnGoingDetail extends Component {
    state={
        detail:{}
    }
    componentDidMount(){
        this.getDataOngoingDetail()
    }
    getDataOngoingDetail=()=>{
        Axios.post(`${koneksi}/project/get-ongoing-ads-detail`,{
            id_project:this.props.id_project,id_user:this.props.user.id
        },getHeaderAuth()).then((res)=>{
            this.setState({detail:res.data[0]})
            console.log(this.state.detail)
        }).catch((err)=>{
            console.log(err)
        })
    }
    render() {
        var {product_name,name,ect_category,status_ads} = this.state.detail
        var category = ()=>{
            if(name == null){
                return <p>{ect_category}</p>
           }else{
               return <p className="text-gray">{name}</p>
           }
        }
        var page =()=>{
            if(status_ads == 0){
                return <OnBiddingComponent/>
            }
        }
        return (
            <div className="container mt-5">
                <h1>{product_name}</h1>
                {category()}
                <p></p>
                {page()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user : state.user.user
    }
  }
export default connect(mapStateToProps) (OnGoingDetail);
