import axios from "axios";

const initialState = {
    buildingDataAll : [],
    buildingDataType : [],
    buildingData : [],
    page : 1,
    maxPage : 1,
    loading : true,
    type : '',
    windowSize : window.innerWidth
};

export function getAllBuilding() {
    return (dispatch) => {
      const building = {
        method: "get",
        url: 'https://athazaky.site/building',
        headers: { "Content-Type": "application/json" }
      };
      axios(building)
        .then(response => dispatch({ type: "ALL_BUILDING", data: response.data })
      );
    };
  }

export function doSearch(keyword) {
    return { type: "DO_SEARCH", data: keyword };
  }

export function pagination(event) {
    return { type: "PAGINATION", data: event };
  }

export function disablePageButton() {
    return { type: "PAGE_BUTTON" };
  }

export function filterType(type) {
    return { type: "FILTER_TYPE", data: type };
  }

export function handleResize() {
    return { type: "HANDLE_RESIZE" };
  }


export default function homeReducer(state = initialState, action) {
    switch (action.type) {
      case "ALL_BUILDING":
        return {
          ...state,
          buildingDataAll: action.data,
          buildingDataType: action.data,
          buildingData: action.data.slice(0,4),
          maxPage : Math.ceil(action.data.length/4),
          loading : false
        }
        
      case "DO_SEARCH": 
          {
            const buildingData = state.buildingDataType.filter(item => item.name.toLowerCase().indexOf(action.data) > -1)
            return {
                ...state,
                buildingData: buildingData.slice(0,4),
            };
        }
        
        case "PAGINATION": 
          {
            const act = action.data.target.name
            let pageNumber = state.page
            
            if (act === 'prev' && pageNumber !== 1) {
                pageNumber -= 1
            } else if (act === 'next' && pageNumber !== state.maxPage) {
                pageNumber += 1
            }
            
            const buildingIndex = state.page*4
            const buildingData = state.buildingDataType.slice(buildingIndex-4, buildingIndex)
            return {
                ...state,
                page : pageNumber,
                buildingData : buildingData
            };
        }
        
        case "PAGE_BUTTON": 
            const prevButton = document.getElementById("prev")
            const nextButton = document.getElementById("next")
            if (state.page === 1) {
                prevButton.className += ' disabled'
            }
            if (state.page === state.maxPage || state.maxPage === 1) {
                nextButton.className += ' disabled'
            }
        
        case "FILTER_TYPE": 
          {
          const type = action.data
          let buildingDataType;
          if(type === "apartment" || type === "office"){
            buildingDataType = state.buildingDataAll.filter(building => building.building_type===type)
          } else {
            buildingDataType = state.buildingDataAll
          }
          return {
            ...state,
            buildingDataType : buildingDataType,
            buildingData : buildingDataType.slice(0,4)
          }
        }
        
        case "HANDLE_RESIZE": 
          return {
            ...state,
            windowSize : window.innerWidth
          };
    default:
      return state;
  }
}