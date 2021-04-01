function redshiftDataReducer(state = { }, action) {
  // console.log('action from reducer redshift data', action)
  switch (action.type) {
    case "GET_REDSHIFT_DATA_MONTHLY":
    // console.log('hi')
      return {
        ...state,
        monthly: action.data
      };
      case "GET_REDSHIFT_DATA_FIRE_SEASON":
    // console.log('hi')
      return {
        ...state,
        fire_season: action.data
      };
    default:
      return state;
  }
}

export default redshiftDataReducer;
// 