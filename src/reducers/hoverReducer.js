import keplerGlReducer, {visStateUpdaters} from 'kepler.gl/reducers';
// Root Reducer
const reducers = combineReducers({
 keplerGl: keplerGlReducer,
 app: appReducer
});

const composedReducer = (state, action) => {
 switch (action.type) {
   case 'CLICK_BUTTON':
     return {
       ...state,
       keplerGl: {
         ...state.keplerGl,
         nanette: {
            ...state.keplerGl.nanette,
            visState: visStateUpdaters.mapClickUpdater(
              state.keplerGl.nanette.visState
            )
         }
       }
     };
 }
 return reducers(state, action);
};

export default composedReducer;
