import React from 'react';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const Maps = (props) => {
    const buildingData = props.buildingData
    return (
        <React.Fragment>
            <Map 
                center={buildingData[0] !== undefined ? [buildingData[0].latitude*1, buildingData[0].longitude*1] : [-6.177507, 106.827445]} 
                zoom={12} 
                maxzoom={100}
                className="map">
                <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {buildingData.map(building => (
                    <Marker 
                        position={[building.latitude*1, building.longitude*1]} 
                        onMouseOver={(e) => {e.target.openPopup();}}
                        onMouseOut={(e) => {e.target.closePopup();}}
                        onClick={props.page==='home'? ()=>props.getDetail(building.id) : null}
                    >
                        {props.page === "home" ? 
                        <Popup>
                            <h6>{building.name}</h6>
                            {building.description}
                        </Popup>
                        :
                        null}
                    </Marker>  
                ))}
            </Map>
        </React.Fragment>    
    );
}

export default Maps;