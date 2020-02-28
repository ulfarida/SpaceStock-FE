import React, { Component } from 'react';
import axios from 'axios';
import Header from '../components/header'
import BuildingList from '../components/buildingList'
import Map from '../components/maps'
import '../styles/css/home.css'

class Home extends Component {

    state = {
        buildingDataAll : [],
        buildingDataType : [],
        buildingData : [],
        page : 1,
        maxPage : 1,
        keyword : '',
        loading : true,
        type : ''
    }

    componentDidMount = async () => {
        const building = {
			method: 'get',
			url: 'https://athazaky.site/building',
			headers: {
				'Content-Type': 'application/json',
            }
        };

        if (this.state.type === 'apartment' || this.state.type === 'office') {
            building['params'] = {
                type : this.state.type
            }
        }
        
        const buildingRes = await axios(building)
        this.setState({
            buildingDataAll : buildingRes.data,
            buildingDataType : buildingRes.data,
            buildingData : buildingRes.data.slice(0,4), 
            maxPage : Math.ceil(buildingRes.data.length/4),
            loading : false
            })
        this.disablePageButton()
    }

    pagination = async (event) => {
        const action = await event.target.name
        const pageNumber = await this.state.page

        if (action === 'prev' && pageNumber !== 1) {
            this.setState({page : pageNumber-1})
        } else if (action === 'next' && pageNumber !== this.state.maxPage) {
            this.setState({page : pageNumber+1})
        }

        const buildingIndex = await this.state.page*4
        const buildingData = await this.state.buildingDataType.slice(buildingIndex-4, buildingIndex)
        this.setState({buildingData : buildingData})
        this.disablePageButton()
    }

    doSearch = async (event) => {
        const keyword = await event.target.value
        this.setState({keyword : keyword})
        
        const buildingData = await this.state.buildingDataType.filter(item => item.name.toLowerCase().indexOf(this.state.keyword) > -1
        )
        this.setState({buildingData : buildingData.slice(0,4)})
    }

    getDetail = (id) => {
        this.props.history.push('/'+id*1)
    }

    disablePageButton = () => {
        const prevButton = document.getElementById("prev")
        const nextButton = document.getElementById("next")
        if (this.state.page === 1) {
            prevButton.className += ' disabled'
        }
        if (this.state.page === this.state.maxPage || this.state.maxPage === 1) {
            nextButton.className += ' disabled'
        }
    }

    filterType = async (event) => {
        const type = await event.target.value
        let buildingDataType;
        if(type === "apartment" || type === "office"){
            buildingDataType = this.state.buildingDataAll.filter(building => building.building_type===type)
        } else {
            buildingDataType = this.state.buildingDataAll
        }
        this.setState({
            buildingDataType : buildingDataType,
            buildingData : buildingDataType.slice(0,4)
        })
    }

    render () {
        return (
            <React.Fragment>
                <Header doSearch={this.doSearch} page="home" filterType={this.filterType}/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 col-12 home__list">
                            <div className="row px-1">
                                {this.state.buildingData.map(item=>
                                    <BuildingList building={item} getDetail={this.getDetail}/>
                                )}
                            </div>
                            <div className="mt-5 mb-3 text-center">
                                <button id="prev" type='button' className='btn btn-danger mr-3' name='prev' onClick={(e)=>this.pagination(e)}>Previous</button>
                                <button id="next" type='button' className='btn btn-danger' name='next' onClick={(e)=>this.pagination(e)}>Next</button>
                            </div>
                        </div>
                        <div className="col-md-6 col-12 home__maps">
                        {this.state.loading === true? 
                            null
                            :    
                            <Map 
                                buildingData={this.state.buildingData} 
                                getDetail={this.getDetail}
                                page="home"/>
                        }
                        </div>
                    </div>
                </div>
            </React.Fragment>    
        );
    }
}

export default Home;