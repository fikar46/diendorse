import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from '../../../../backend/node_modules/axios'
import { koneksi } from '../../environment'
import queryString from 'query-string';
class PaymentPage extends Component {
    state={
        payment:{}
    }
    componentDidMount(){
        var params = queryString.parse(this.props.location.search)
        var id_project = params.ads
        Axios.post(`${koneksi}/payment/get-status-briva`,{
            user:this.props.user,id_project
        })
        .then((res)=>{
            this.setState({payment:res.data})

            console.log(this.state.payment)
        }).catch((err)=>{
            console.log(err.response)
        })
    }

    render() {
        if(this.state.payment.statusBayar == "Y"){
            return (
                <div className="container mt-5 text-center">
                    <h1>Selamat pembayaranmu berhasil</h1>
                    <div className="text-center">
                        <a href="/dashboard" className="btn btn-success">Kembali</a>
                    </div>

                </div>
            )
        }else{
            return (
                <div className="container mt-5 text-center">
                    <h1>Hamalan pembayaran</h1>
                    <h3>Harap melakukan pembayaran ke Virtual Account BRI dibawah ini</h3>
                    <h4>{this.state.payment.BrivaNo}{this.state.payment.CustCode}</h4>
                </div>
            )
        }
    }
}
const mapStateToProps = (state) => {
    return{
        user : state.user.user
    }
  }
  
  export default connect(mapStateToProps) (PaymentPage);