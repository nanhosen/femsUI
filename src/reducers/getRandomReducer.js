function randomReducer(state = { duh: "" }, action) {
  console.log('action from reducer latest data', action)
  switch (action.type) {
    case "@@kepler.gl/MOUSE_MOVE":
    console.log('MOUSE MOUSE MOUSE')
      return {
        ...state,
        duh: 'i moved'
      };
    default:
      return state;
  }
}

export default randomReducer;
