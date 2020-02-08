import React, { Component } from 'react';
import {Link} from 'react-router-dom'
class PageNotFound extends Component {
    render() {
        return (
            <div className='container'>
                <div style={{height :'100vh'}} className='row justify-content-center align-items-center' >
                    <div>
                        <h1>404, Page Not Found</h1>
                        <Link to='/'>Back To Home</Link>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default PageNotFound;