import React, { Component } from 'react';

class LoadingPage extends Component {
    render() {
        return (
            <div style={{height:"100vh"}} className='contaiener row justify-content-center align-items-center'>
                <div className="spinner-grow text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}

export default LoadingPage;