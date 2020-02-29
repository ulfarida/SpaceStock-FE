import React, { Component } from 'react';
import Header from '../components/header'
import BuildingList from '../components/buildingList'
import Map from '../components/maps'
import '../styles/css/home.css'
import { connect } from "react-redux";
import { 
    getAllBuilding, 
    doSearch, 
    pagination, 
    disablePageButton, 
    filterType,
    handleResize
 } from "../store/home";

class Home extends Component {

    componentDidMount = () => {
        window.addEventListener('resize', this.props.handleResize())
        this.props.getAllBuilding()
        this.props.disablePageButton()
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.props.handleResize())
    }

    pagination = async (event) => {
        this.props.pagination(event)
        this.props.disablePageButton()
    }

    getDetail = (id) => {
        this.props.history.push('/'+id*1)
    }

    render () {
        return (
            <React.Fragment>
                <Header doSearch={this.props.doSearch} page="home" filterType={this.props.filterType}/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 col-12 home__list">
                            <div className="row px-1">
                                {this.props.buildingData.map(item=>
                                    <BuildingList building={item} getDetail={this.getDetail}/>
                                )}
                            </div>
                            <div className="mt-5 mb-3 text-center">
                                <button id="prev" type='button' className='btn btn-danger mr-3' name='prev' onClick={(e)=>this.pagination(e)}>Previous</button>
                                <button id="next" type='button' className='btn btn-danger' name='next' onClick={(e)=>this.pagination(e)}>Next</button>
                            </div>
                        </div>
                        <div className="col-md-6 col-12 home__maps">
                        {this.props.loading === true? 
                            null
                            :    
                            <Map 
                                buildingData={this.props.buildingData} 
                                getDetail={this.getDetail}
                                windowSize={this.props.windowSize}
                                page="home" />
                        }
                        </div>
                    </div>
                </div>
            </React.Fragment>    
        );
    }
}

export default connect(
    state => ({
        buildingDataAll: state.home.buildingDataAll,
        buildingDataType: state.home.buildingDataType,
        buildingData: state.home.buildingData,
        maxPage: state.home.maxPage,
        loading: state.home.loading,
        windowSize: state.home.windowSize
    }),
    {
        getAllBuilding,
        doSearch,
        pagination,
        disablePageButton,
        filterType,
        handleResize
    }
  )(Home);