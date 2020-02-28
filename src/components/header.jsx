import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../styles/css/header.css'

const Header = (props) => {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row border header align-items-center">
            <div className="col-md-3 col-2 header__home-btn">
              <Link to='/'>
                <i className="material-icons">home</i>
              </Link>
            </div>
            {props.page === "home" ?
            <React.Fragment>
            <div className="col-md-5 col-7 input-icons">
              <i className="material-icons icon">search</i>
              <input className="form-control input-field align-items-center" placeholder="search..." name="search" type="text" onChange={props.doSearch}/>
            </div>
            <div className="col-md-2 col-3 pl-0 header__type">
            <select class="form-control">
              <option onClick={props.filterType} value="all">All</option>
              <option onClick={props.filterType} value="apartment">Apartment</option>
              <option onClick={props.filterType} value="office">Office</option>
            </select>
            </div>
            </React.Fragment>
            :
            null}
            </div>
        </div>
      </React.Fragment>
    )
}

export default (withRouter(Header));