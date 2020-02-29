import axios from "axios";

const initialState = {
    buildingDataAll : [],
    buildingDataType : [],
    buildingData : [],
    page : 1,
    maxPage : 3,
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

export function filterData() {
  return { type : "FILTER_DATA" }
}

export default function homeReducer(state = initialState, action) {
    switch (action.type) {
      case "ALL_BUILDING":
        return {
          ...state,
          maxPage : Math.ceil(action.data.length/4),
          buildingDataAll: action.data,
          buildingDataType: action.data,
          buildingData: action.data.slice(0,4),
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

            return {
              ...state,
              page : pageNumber
            };
           
        }
        
        case "FILTER_DATA": 
          const buildingIndex = state.page*4
              let buildingData = state.buildingDataType.slice(buildingIndex-4, buildingIndex)
              return {
                ...state,
                buildingData : buildingData
              };
        
        case "PAGE_BUTTON": 
            let maxPage = state.maxPage
            const prevButton = document.getElementById("prev")
            const nextButton = document.getElementById("next")
            if (state.page === 1) {
              prevButton.className = 'btn btn-danger mr-3 disabled'
            }
            if (state.page === maxPage || maxPage === 1) {
              nextButton.className += 'btn btn-danger disabled'
            }
            if (state.page !== 1 && maxPage !== 1){
              prevButton.className = 'btn btn-danger mr-3'
            }
            if (state.page === 1 && maxPage !== 1){
              nextButton.className = 'btn btn-danger'
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