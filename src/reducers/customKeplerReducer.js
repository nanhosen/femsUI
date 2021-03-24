import {combineReducers} from 'redux';
import keplerGlReducer from 'kepler.gl/reducers';

export default const customizedKeplerGlReducer = keplerGlReducer
  .initialState({
    uiState: {
      // hide side panel to disallow user customize the map
      readOnly: true,

      // customize which map control button to show
      mapControls: {
        visibleLayers: {
          show: false
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
      interactionConfig: {
        tooltip: {
          fieldsToShow: {
            fire_season_rank: ['ec'],
          },
        enabled: true,
        },
        brush: {
          size: 0.5,
          enabled: false
        },
        geocoder: {
          enabled: false
        }
      }
    }
  });

