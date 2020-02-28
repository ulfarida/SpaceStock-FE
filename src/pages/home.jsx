import React, { Component } from 'react';
import axios from 'axios';
import BuildingList from '../components/buildingList'
import '../styles/css/home.css'
import Header from '../components/header'
import Map from '../components/maps'

class Home extends Component {

    state = {
        buildingDataAll : [],
        buildingData : [],
        page : 1,
        maxPage : 1,
        keyword : '',
        loading : true
    }

    componentDidMount = async () => {
        const building = {
			method: 'get',
			url: 'https://athazaky.site/building',
			headers: {
				'Content-Type': 'application/json',
			}
        };
        
        const buildingRes = await axios(building)
        this.setState({buildingDataAll : buildingRes.data})
        this.setState({buildingData : buildingRes.data.slice(0,4), loading : false})
        this.setState({maxPage : Math.ceil(buildingRes.data.length/4)})

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
        const buildingData = await this.state.buildingDataAll.slice(buildingIndex-4, buildingIndex)
        this.setState({buildingData : buildingData})
    }

    doSearch = async (event) => {
        const keyword = await event.target.value
        this.setState({keyword : keyword})
        
        const buildingData = await this.state.buildingDataAll.filter(item => item.name.toLowerCase().indexOf(this.state.keyword) > -1
        )
        this.setState({buildingData : buildingData.slice(0,4)})
    }

    getDetail = (id) => {
        this.props.history.push('/'+id)
    }

    render () {
        return (
            <React.Fragment>
                <Header doSearch={this.doSearch} page="home"/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 col-12 home__list">
                            <div className="row px-1">
                                {this.state.buildingData.map(item=>
                                    <BuildingList building={item} getDetail={this.getDetail}/>
                                )}
                            </div>
                            <div className="mt-5 mb-3 text-center">
                                <button type='button' className='btn btn-danger mr-3' name='prev' onClick={(e)=>this.pagination(e)}>Previous</button>
                                <button type='button' className='btn btn-danger' name='next' onClick={(e)=>this.pagination(e)}>Next</button>
                            </div>
                        </div>
                        <div className="col-md-6 col-12 home__maps">
                        {this.state.loading === true? 
                            null
                            :    
                            <Map buildingData={this.state.buildingData}/>
                        }
                        </div>
                    </div>
                </div>
            </React.Fragment>    
        );
    }
}

export default Home;