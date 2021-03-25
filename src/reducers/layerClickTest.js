import  {visStateUpdaters} from 'kepler.gl/reducers';

const composedReducer = (state, action) => {
 switch (action.type) {
   case 'LAYER_CLICK':
     console.log('the layer was clickeddd', action)
     return {
       ...state,
       keplerGl: {
         ...state.keplerGl,
         nanette: {
            ...state.keplerGl.nanette,
            visState: visStateUpdaters.layerClickUpdaters(
              state.keplerGl.nanette.visState
            )
         }
       }
     };
 }
 return reducers(state, action);
};

export default composedReducer;
