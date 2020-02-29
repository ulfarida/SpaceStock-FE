import React from 'react';
import { withRouter } from 'react-router-dom';
import Truncate from 'react-truncate';


const BuildingList = (props) => {
    return (
      <React.Fragment>
        <div className="col-md-6 col-12">
          <div className="card-box border shadow-sm mx-1 my-3">
            <div className="card-box__display-img">
              <img src={props.building.image} alt=""/>
            </div>
            <div className="px-3 mb-1">
              <div className="card-box__title py-3">
              <Truncate lines={2}>
                {props.building.name}
              </Truncate>
              </div>
              <div className="card-box__address">
                <Truncate lines={1}>
                  {props.building.street}
                </Truncate>
              </div>
            </div>
            <div className="card-box__location py-2 px-2">
              <i className="material-icons px-0">location_on</i>
              {props.building.city}
            </div>
            <div className="card-box__button px-4 text-right">
              <button type="button" className="btn" onClick={()=>props.getDetail(props.building.id)}>Detail</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
}

export default (withRouter(BuildingList));