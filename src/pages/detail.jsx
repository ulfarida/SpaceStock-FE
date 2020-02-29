import React, { Component } from 'react';
import { connect } from "react-redux";
import Slider from 'react-slick';

import '../styles/css/detail.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Header from '../components/header';
import Map from '../components/maps';
import { getBuildingData, deleteState } from "../store/detail";
import Loader from '../components/loader';

class Detail extends Component {

    componentDidMount = () => {
        const id = this.props.match.params.id
        this.props.getBuildingData(id)
    }

    componentWillUnmount = () => {
        this.props.deleteState()
    }

    render () {
        if(this.props.notFound){
            this.props.history.push('/notFound')
            return <div></div>
        } else if (this.props.loading){
            return <Loader/>
        } else {
        const buildingData = this.props.buildingData
        const facilities = this.props.facilities.split(",")
        const settings = {
            autoplay: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
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
                                    {this.props.loading === true ?
                                        null
                                        :
                                        <Map buildingData={[this.props.buildingData]} page="detail"/>
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
                                    {this.props.loading === true ? 
                                    null
                                    :
                                    buildingData.other_images.map(image => (
                                        <div><img src={image} alt=""/></div>
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
}
 
export default connect(
    state => ({
        buildingData: state.detail.buildingData,
        facilities: state.detail.facilities,
        loading: state.detail.loading,
        notFound: state.detail.notFound
    }),
    { getBuildingData, deleteState }
  )(Detail);