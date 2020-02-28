import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../styles/css/header.css'

const Header = (props) => {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row border header align-items-center">
            <div className="col-md-3 col-2 header__home-btn ml-1">
              <Link to='/'>
                <i className="material-icons">home</i>
              </Link>
            </div>
            {props.page === "home" ?
            <div className="col-md-5 col-8 input-icons">
              <i className="material-icons icon">search</i>
              <input className="form-control input-field align-items-center" placeholder="search..." name="search" type="text" onChange={props.doSearch}/>
            </div>
            :
            null}
            <div className="col-md-2 col-1">
            </div>
          </div>
        </div>
      </React.Fragment>
    )
}

export default (withRouter(Header));