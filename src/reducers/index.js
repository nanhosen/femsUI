import { combineReducers } from 'redux'
import {handleActions} from 'redux-actions';
import latestDataReducer from './getLatestDataReducer'
import redshiftDataReducer from './getRedshiftDataReducer'
import {ActionTypes} from 'kepler.gl/actions';
// import randomReducer from './getRandomReducer'
import keplerGlReducer, {combinedUpdaters}  from 'kepler.gl/reducers'
// import 
// this is from this example: https://github.com/keplergl/kepler.gl/blob/master/examples/custom-reducer/src/store.js


// const appReducer = handleActions({
//   // listen on kepler.gl map update action to store a copy of viewport in app state
//   [ActionTypes.LAYER_CLICK]: function (state, action){
//     console.log('click action action',  action)
//     console.log('click action payload',  action.payload.info)
//     console.log('click action state',  state)
//     return {
//        ...state,
//        data: action.payload.info,
//        keplerGl: {
//          ...state.keplerGl,
//          nanette: {
//             ...state.keplerGl.nanette,
//             visState: visStateUpdaters.layerClickUpdaters(
//               state.keplerGl.nanette.visState
//             )
//          }
//        }
//      }
//   },
// }, []);

const appReducer = handleActions({
  // listen on kepler.gl map update action to store a copy of viewport in app state
  [ActionTypes.LAYER_CLICK]: function (state, action){
    console.log('click action action',  action)
    console.log('click action payload',  action.payload.info)
    return {
      ...state,
      data: action.payload.info
    }
  },
}, []);

const customizedKeplerGlReducer = keplerGlReducer
  .initialState({
  	mapStyle: {
  		styleType: 'nanbette',
  		// inputStyle:{
			 //    id: 'nanbette1',
			 //    label: 'nanette1',
			 //    // url: 'mapbox://styles/mapbox/navigation-guidance-day-v4',
			 //    url: 'mapbox://styles/nanhosen/ckcxziwe017vi1imsnzt1aucp',
			 //    // url: 'https://api.mapbox.com/styles/v1/nanhosen/ckcxziwe017vi1imsnzt1aucp.html?fresh=true&title=copy&access_token=pk.eyJ1IjoibmFuaG9zZW4iLCJhIjoiY2ppZGExdDZsMDloNzN3cGVoMjZ0NHR5YyJ9.RYsPZGmajXULk-WtqvBNpQ'
			 //    layerGroups: [] // DEFAULT_LAYER_GROUPS
			 //  }

  	},
    uiState: {
      // hide side panel to disallow user customize the map
      readOnly: false,
      currentModal: null,
      // customize which map control button to show
      mapControls: {
        visibleLayers: {
          show: true
        },
        mapLegend: {
          show: true,
          active: true
        },
        toggle3d: {
          show: false
        },
        splitMap: {
          show: false
        }
      }
    },
    visState: {
      loaders: [], // Add additional loaders.gl loaders here
      loadOptions: {}
      // interactionConfig: {tooltip:{enabled:true}} // Add additional loaders.gl loader options here
    }
  })

  .plugin({ //so i think this is actally an action which is interestingw
  	// THIS_IS_IN_ALL_CAPS: (state, action) => (
   //    { ...state }
   //  )
    THIS_IS_IN_ALL_CAPS: function(state, action){
      console.log('in this is in all caps', state, action)
      return {...state}
    }
    
  })


const reducer = combineReducers({
	keplerGl: customizedKeplerGlReducer,
  app: appReducer,
	latestData: latestDataReducer,
	redshiftData: redshiftDataReducer,
  // clickInfo: clickInfoReducer
})

export default reducer


