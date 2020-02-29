import axios from "axios";

const initialState = {
    buildingData : {},
    facilities : '',
    loading : true,
    notFound : false
};

export function getBuildingData(id) {
    return (dispatch) => {
      const building = {
        method: "get",
        url: 'https://athazaky.site/building/'+id,
        headers: { "Content-Type": "application/json" }
      };
      axios(building)
        .then(response =>  dispatch({ type: "BUILDING_DETAIL", data: response.data }))
        .catch(error => dispatch({ type: "ERROR_404", data: error }));
    };
  }


export default function detailReducer(state = initialState, action) {
    switch (action.type) {
      case "BUILDING_DETAIL":
          return {
            ...state,
            buildingData : action.data,
            facilities: action.data.facilities,
            loading : false
          };
      case "ERROR_404":
        return {
          ...state,
          notFound : true
        }
    default:
      return state;
  }
}