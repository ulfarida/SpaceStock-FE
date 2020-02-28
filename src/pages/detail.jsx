import React, { Component } from 'react';
import axios from 'axios';
import '../styles/css/detail.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Header from '../components/header';
import Map from '../components/maps';

class Detail extends Component {

    state = {
        buildingData : {},
        facilities : '',
        loading : true
    }

    componentDidMount = async () => {
        const id = this.props.match.params.id
        const building = {
			method: 'get',
			url: 'https://athazaky.site/building/'+id,
			headers: {
				'Content-Type': 'application/json',
			}
        };
        
        const buildingRes = await axios(building)
        this.setState({buildingData : buildingRes.data, facilities : buildingRes.data.facilities, loading : false})
    }

    render () {
        const buildingData = this.state.buildingData
        const facilities = this.state.facilities.split(",")
        const settings = {
            autoplay: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1
          };
        return (
            <React.Fragment>
                <Header page="detail"/>
                <div className="detail__image">
                    <img src={buildingData.image} alt=""/>
                </div>
                <div className="detail__content">
                    <div className="container">
                        <div className="detail__content--title">
                            {buildingData.name}
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-sm-7 col-12 px-3">
                                <div className="detail__content--desc">
                                    <h5 className="my-3">Description</h5>
                                    <p>
                                        {buildingData.description}
                                    </p>
                                </div>
                                <div className="detail__content--facilities">
                                    <h5 className="my-3">Facilities</h5>
                                    <div className="row">
                                    {facilities.map(facility => (
                                        <div className="detail__content--facilities---list border mb-2 py-2 px-3 ml-3">{facility}</div>
                                    ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-5 col-12">
                                <div className="detail__content--desc">
                                    <h5 className="my-3">Location</h5>
                                    <p>
                                        {buildingData.street}
                                        <span>, {buildingData.city}<span>, </span> {buildingData.country}</span>
                                    </p>
                                </div>
                                <div className="detail__content--loc">
                                    {this.state.loading === true ?
                                        null
                                        :
                                        <Map buildingData={[this.state.buildingData]} page="detail"/>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12 col-12 px-3">
                                <div className="detail__content--images">
                                    <h5 className="my-3">Images</h5>
                                </div>
                                <div className="detail__content--images-list">
                              
                                <Slider {...settings}>
                                    {this.state.loading === true ? 
                                    null
                                    :
                                    buildingData.other_images.map(image => (
                                        <div><img src={image}/></div>
                                    ))
                                    }
                                </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>    
        );
    }
}

export default Detail;