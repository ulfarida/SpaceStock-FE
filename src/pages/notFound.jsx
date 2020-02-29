import React, { Component } from 'react';
import notFound from '../images/404.png'

class Home extends Component {
    render () {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-md-2 col-0"></div>
                        <div className="col-md-8 col-12 text-center">
                            <img src={notFound} alt="" width="100%"/>
                            <h2>Oops! Page Not Found</h2>
                            <button className="btn btn-info" onClick={()=>this.props.history.push('/')}>Back to home</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>    
        );
    }
}

export default Home;