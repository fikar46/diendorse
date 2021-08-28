import React from 'react'
import adsData from './adsData.json'
import influencerData from './InfluencerData.json'
import Countdown from '../../components/CountDown'

export default function detail() {
  return (
    <div style={{minHeight: '80vh'}} className="container pt-5">
      <h5>Quick Ads Status  <span class="badge bg-info"> On Broadcasting </span></h5>
      <div className="row mt-5">
        <div className="col-md-6">
          <div className="border p-5">
            <div style={{color:'grey'}} className="font-weight-bold">{adsData.name}</div>
            <img className="my-3" src={adsData.file} width="100%" alt="ads"/>
            <div style={{color:'grey', fontSize:"12px"}}>{adsData.desc}<span style={{color:'black'}} className="font-weight-bold">More</span></div>
            <div style={{color:'grey'}} className="mt-3">
              <table >
                <tr>
                  <td>Age : </td>
                  <td>{adsData.age}</td>
                </tr>
                <tr>
                  <td>Category : </td>
                  <td>{adsData.category}</td>
                </tr>
                <tr>
                  <td>Interest : </td>
                  <td>{adsData.interest}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="border p-5">
            <div style={{color:'grey'}} className="font-weight-bold">Potential Influencer</div>
            <div style={{color:'grey', fontSize:"12px"}}>Request Has been sent to :</div>
            <div className="mt-4">
              {
                influencerData.data.map((val) => {
                  return (
                    <div className="row pb-3 border-bottom mb-3">
                      <div className="col-2">
                        <div style={{height:'40px', width:'40px'}}>
                          <img src={val.file}  className="rounded-circle" width="100%" height="100%" alt="profile"/>
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{color:'grey', fontSize:"12px"}}>{val.username}</div>
                        <div style={{fontSize:"12px"}}>{val.follower} <span style={{color:'grey'}}>  Followers </span></div>
                      </div>
                      <div className="col-4">
                        <div style={{color:'grey', fontSize:"12px"}}>Time Left</div>
                        <Countdown expiredTime={val['end-time']} />
                      </div>
                    </div>
                  )
                })
              }
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
