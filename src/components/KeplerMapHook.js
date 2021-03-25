// import KeplerGl from 'kepler.gl';
import { connect, useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from "react";
import {addDataToMap, inputMapStyle} from 'kepler.gl/actions';
import {injectComponents, PanelHeaderFactory, LayerHoverInfoFactory} from 'kepler.gl/components';
import CustomHeader from './TestHeader'
import LayerHoverInfo from './LayerHoverInfo'
// import {replacePanelHeader} from '../factories/panel-header';


const myCustomHeaderFactory = () => CustomHeader;
const myCustomInfoFactory = () => LayerHoverInfo;

// Inject custom header into Kepler.gl,
const KeplerGl = injectComponents([
	  [PanelHeaderFactory, myCustomHeaderFactory],
	  // [LayerHoverInfoFactory, myCustomInfoFactory]
	]);
 const KeplerMapHook = () => {
	const dataState = useSelector ( state => state.latestData.data)
	const dispatch = useDispatch()

	

	useEffect(() => {
		console.log('dataState updated fire season', dataState)
		if(dataState.fireSeason ){

			dispatch(
			  addDataToMap({
			    datasets: {
			      info: {
			        label: 'ERC Fire Season Percentile Rank',
			        id: 'fire_season_rank'
			      },
			      data: dataState.fireSeason
			    },
			    option: {
			      centerMap: true,
			      readOnly: false,
			      keepExistingConfig: false
			    },
			    info: {
			      title: 'Fire Season Percentile Rank',
			      description: 'fire season ranked percentile'
			    },
			    config: {
			    	mapStyle: {styleType: 'nanbette'},
			    	visState: {
			    		// layers: [pointLayerConfig]
			    		layers: [constructedConfig, constructedConfig1],
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
			    		// layers: [shortWorksConfig]
			    	}
			    }
			  })
			)
		}

	},[dataState.fireSeason])
	useEffect(() => {
		console.log('dataState updated', dataState)
		if(dataState.monthly ){

			dispatch(
			  addDataToMap({
			    datasets: {
			      info: {
			        label: 'ERC Monthly Percentile Rank',
			        id: 'monthly_percentile_data'
			      },
			      data: dataState.monthly
			    },
			    option: {
			      centerMap: true,
			      readOnly: false,
			      keepExistingConfig: false
			    },
			    info: {
			      title: 'Taro and Blue',
			      description: 'This is my map'
			    },
			    config: {
			    	// mapStyle: {styleType: 'nanbette'}
			    	// visState: {
			    	// 	// layers: [pointLayerConfig]
			    	// 	layers: [constructedConfig, constructedConfig1],
			    		
			    	// 	// layers: [shortWorksConfig]
			    	// },
			    	// interactionConfig: {
				    //     tooltip: {
				    //       fieldsToShow: {
				    //         monthly_percentile_data: ['ec'],
				    //       },
				    //     enabled: true,
				    //     }
				    //   }
			    }
			  })
			)
		}

	},[dataState.monthly])
	
	const mapStylesz = [
    {
      id: 'nanbette',
      label: 'nanette',
      // url: 'mapbox://styles/mapbox/navigation-guidance-day-v4',
      url: 'mapbox://styles/nanhosen/ckcxziwe017vi1imsnzt1aucp',
      // url: 'https://api.mapbox.com/styles/v1/nanhosen/ckcxziwe017vi1imsnzt1aucp.html?fresh=true&title=copy&access_token=pk.eyJ1IjoibmFuaG9zZW4iLCJhIjoiY2ppZGExdDZsMDloNzN3cGVoMjZ0NHR5YyJ9.RYsPZGmajXULk-WtqvBNpQ'
      // layerGroups: [] // DEFAULT_LAYER_GROUPS
    }
  ]; 
  // const boo = true  
  
 return ( <KeplerGl
 	  id="nanette"
 	  mapboxApiAccessToken={'pk.eyJ1IjoibmFuaG9zZW4iLCJhIjoiY2ppZGExdDZsMDloNzN3cGVoMjZ0NHR5YyJ9.RYsPZGmajXULk-WtqvBNpQ'}
 	  width={window.innerWidth}
 	  height={window.innerHeight}
 	  theme="light"
 	  mapStyles = {mapStylesz}
   />)

};

export default KeplerMapHook

// const KeplerMap = props => (
//   <KeplerGl
//       id="foo"
//       mapboxApiAccessToken={token}
//       width={width}
//       height={height}/>
// );

// const mapStateToProps = state => {
// 	const { latestData } = state
// 	return { latestData }
// 	// console.log('state', state)
// 	// return {state}
// }

// export default connect(mapStateToProps, null)(KeplerMap)
const tooltipConfig = {
	tooltip:{
    fieldsToShow: {
        monthly_percentile_data: ["sta_id","sta_nm","nfdr_tm", "ec"]
    },
    enabled: true,
    "compareMode": false,
    "compareType": "absolute"
	}
}
const shortWorksConfigMonth = {
  type: "point",
  config: {
    dataId: 'monthly_percentile_data',
    hidden: false,
    isConfigActive: true,
    isVisible: true,
    colorScale: 'quantize', 
    label: "Monthly ERC points updted",
    color: [248, 149, 112],
    colorDomain: [0, 100],
    columns: {
        lat: "latitude",
        lng: "longitude",
        altitude: ""
    },
    }
  }

  const shortWorksConfigFireSeason = {
  type: "point",
  config: {
    dataId: 'fire_season_rank',
    hidden: false,
    isConfigActive: true,
    isVisible: true,
    colorScale: 'quantize', 
    label: "Monthly ERC points updted",
    color: [248, 149, 112],
    colorDomain: [0, 100],
    columns: {
        lat: "latitude",
        lng: "longitude",
        altitude: ""
    },
    }
  }


const pointLayerConfig = {
  type: "point",
  config: {
    dataId: 'monthly_percentile_data',
    hidden: false,
    isConfigActive: true,
    isVisible: true,
    colorScale: 'quantize', 
    label: "Monthly ERC points updted",
    color: [248, 149, 112],
    colorDomain: [0, 100],
    columns: {
        lat: "latitude",
        lng: "longitude",
        altitude: ""
    },
    colorField: {
    	analyzerType: "FLOAT",
			fieldIdx: 7,
			format: "",
			name: "scaled_rank",
			type: "real"
		},
		colorUI: {
	    color: {
        customPalette: {
          name: "color.customPalette",
          type: "custom",
          category: "Custom",
          colors: []
        },
        showSketcher: false,
        showDropdown: false,
        colorRangeConfig: {
          type: "all",
          steps: 6,
          reversed: false,
          custom: false
        }
	    },
	    colorRange: {
        customPalette: {
          name: "Custom Palette",
          type: "custom",
          category: "Custom",
          colors: [
            "#009c1f",
            "#009C1F",
            "#009C1F",
            "#009C1F",
            "#009C1F",
            "#FFFF00",
            "#FFFF00",
            "#FFA700",
            "#FA0606",
            "#A706F8"
          ]
        },
        showSketcher: false,
        showDropdown: false,
        colorRangeConfig: {
          type: "all",
          steps: 10,
          reversed: false,
          custom: false
        }
	    },
	    strokeColor: {
        customPalette: {
          name: "color.customPalette",
          type: "custom",
          category: "Custom",
          colors: []
        },
        showSketcher: false,
        showDropdown: false,
        colorRangeConfig: {
          type: "all",
          steps: 6,
          reversed: false,
          custom: false
        }
	    }
		}
	}
}

const constructedConfig = {
	type: 'point',
	config: {
			dataId: 'monthly_percentile_data',
	    label: "Monthly Percentiles",
	    color: [
	        221,
	        178,
	        124
	    ],
	    columns: {
	        lat: "latitude",
	        lng: "longitude",
	        altitude:  ""
	    },
	    isVisible: true,
	    isConfigActive: true,
	    highlightColor: [
	        252,
	        242,
	        26,
	        255
	    ],
	    hidden: false,
	    colorField: {
	        name: "scaled_rank",
	        format: "",
	        fieldIdx: 9,
	        type: "real",
	        analyzerType: "FLOAT"
	    },
	    colorDomain: [
	        0,
	        100
	    ],
	    colorScale: "quantize",
	    sizeDomain: [
	        0,
	        1
	    ],
	    sizeScale: "linear",
	    sizeField: null,
	    visConfig: {
	        radius: 20.8,
	        fixedRadius: false,
	        opacity: 0.8,
	        outline: true,
	        thickness: 1,
	        strokeColor: [25, 20, 16],
	        colorRange: {
	            name: "Uber Viz Diverging 3.5",
	            type: "diverging",
	            category: "Uber",
	            colors: [
	                "#009c1f",
                  "#009C1F",
                  "#009C1F",
                  "#009C1F",
                  "#009C1F",
                  "#FFFF00",
                  "#FFFF00",
                  "#FFA700",
                  "#FA0606",
                  "#A706F8"
	            ]
	        },
	        strokeColorRange: {
	            name: "Global Warming",
	            type: "sequential",
	            category: "Uber",
	            colors: [
	                "#009c1f",
                  "#009C1F",
                  "#009C1F",
                  "#009C1F",
                  "#009C1F",
                  "#FFFF00",
                  "#FFFF00",
                  "#FFA700",
                  "#FA0606",
                  "#A706F8"
	            ]
	        },
	        radiusRange: [
	            0,
	            50
	        ],
	        filled: true
	    },
	    textLabel: [
	        {
	            field: null,
	            color: [
	                255,
	                255,
	                255
	            ],
	            size: 18,
	            offset: [
	                0,
	                0
	            ],
	            anchor: "start",
	            alignment: "center"
	        }
	    ],
	    colorUI: {
	        color: {
	            customPalette: {
	                name: "color.customPalette",
	                type: "custom",
	                category: "Custom",
	                colors: []
	            },
	            showSketcher: false,
	            showDropdown: false,
	            colorRangeConfig: {
	                type: "all",
	                steps: 6,
	                reversed: false,
	                custom: false
	            }
	        },
	        colorRange: {
	            customPalette: {
	                name: "Custom Palette",
	                type: "custom",
	                category: "Custom",
	                colors: [
	                    "#009c1f",
                      "#009C1F",
                      "#009C1F",
                      "#009C1F",
                      "#009C1F",
                      "#FFFF00",
                      "#FFFF00",
                      "#FFA700",
                      "#FA0606",
                      "#A706F8"
	                ]
	            },
	            showSketcher: false,
	            showDropdown: false,
	            colorRangeConfig: {
	                type: "all",
	                steps: 10,
	                reversed: false,
	                custom: false
	            }
	        }
	    },
	    animation: {
	        enabled: false
	    },
	    strokeColorField: null,
	    strokeColorDomain: [
	        0,
	        1
	    ],
	    strokeColorScale: "quantile"
	},
	visConfigSettings: {
    radius: {
	        type: "number",
	        defaultValue: 10,
	        label: "layerVisConfigs.radius",
	        isRanged: false,
	        range: [
	            0,
	            100
	        ],
	        step: 0.1,
	        group: "radius",
	        property: "radius"
	    },
	    fixedRadius: {
	        defaultValue: false,
	        type: "boolean",
	        label: "layerVisConfigs.fixedRadius",
	        description: "layerVisConfigs.fixedRadiusDescription",
	        group: "radius",
	        property: "fixedRadius"
	    },
	    opacity: {
	        type: "number",
	        defaultValue: 0.8,
	        label: "layerVisConfigs.opacity",
	        isRanged: false,
	        range: [
	            0,
	            1
	        ],
	        step: 0.01,
	        group: "color",
	        property: "opacity"
	    },
	    outline: {
	        type: "boolean",
	        defaultValue: false,
	        label: "layer.outline",
	        property: "outline"
	    },
	    thickness: {
	        type: "number",
	        defaultValue: 2,
	        label: "layerVisConfigs.strokeWidth",
	        isRanged: false,
	        range: [
	            0,
	            100
	        ],
	        step: 0.1,
	        group: "stroke",
	        property: "thickness"
	    },
	    strokeColor: {
	        type: "color-select",
	        label: "layerVisConfigs.strokeColor",
	        defaultValue: null,
	        group: "color",
	        property: "strokeColor"
	    },
	    colorRange: {
	        type: "color-range-select",
	        defaultValue: {
	            name: "Global Warming",
	            type: "sequential",
	            category: "Uber",
	            colors: [
	                "#5A1846",
	                "#900C3F",
	                "#C70039",
	                "#E3611C",
	                "#F1920E",
	                "#FFC300"
	            ]
	        },
	        label: "layerVisConfigs.colorRange",
	        group: "color",
	        property: "colorRange"
	    },
	    strokeColorRange: {
	        type: "color-range-select",
	        defaultValue: {
	            name: "Global Warming",
	            type: "sequential",
	            category: "Uber",
	            colors: [
	                "#5A1846",
	                "#900C3F",
	                "#C70039",
	                "#E3611C",
	                "#F1920E",
	                "#FFC300"
	            ]
	        },
	        label: "layerVisConfigs.strokeColorRange",
	        group: "color",
	        property: "strokeColorRange"
	    },
	    radiusRange: {
	        type: "number",
	        defaultValue: [
	            0,
	            50
	        ],
	        isRanged: true,
	        range: [
	            0,
	            500
	        ],
	        step: 0.1,
	        label: "layerVisConfigs.radiusRange",
	        group: "radius",
	        property: "radiusRange"
	    },
	    filled: {
	        type: "boolean",
	        label: "layer.fillColor",
	        defaultValue: true,
	        property: "filled"
	    }
	}
}

const constructedConfig1 = {
	type: 'point',
	config: {
			dataId: 'fire_season_rank',
	    label: "Fire Season Percentiles",
	    color: [
	        221,
	        178,
	        124
	    ],
	    columns: {
	        lat: "latitude",
	        lng: "longitude",
	        altitude:  ""
	    },
	    isVisible: false,
	    isConfigActive: true,
	    highlightColor: [
	        252,
	        242,
	        26,
	        255
	    ],
	    hidden: false,
	    colorField: {
	        name: "scaled_rank",
	        format: "",
	        fieldIdx: 9,
	        type: "real",
	        analyzerType: "FLOAT"
	    },
	    colorDomain: [
	        0,
	        100
	    ],
	    colorScale: "quantize",
	    sizeDomain: [
	        0,
	        1
	    ],
	    sizeScale: "linear",
	    sizeField: null,
	    visConfig: {
	        radius: 20.8,
	        fixedRadius: false,
	        opacity: 0.8,
	        outline: true,
	        thickness: 1,
	        strokeColor: [25, 20, 16],
	        colorRange: {
	            name: "Uber Viz Diverging 3.5",
	            type: "diverging",
	            category: "Uber",
	            colors: [
	                "#009c1f",
                  "#009C1F",
                  "#009C1F",
                  "#009C1F",
                  "#009C1F",
                  "#FFFF00",
                  "#FFFF00",
                  "#FFA700",
                  "#FA0606",
                  "#A706F8"
	            ]
	        },
	        strokeColorRange: {
	            name: "Global Warming",
	            type: "sequential",
	            category: "Uber",
	            colors: [
	                "#009c1f",
                  "#009C1F",
                  "#009C1F",
                  "#009C1F",
                  "#009C1F",
                  "#FFFF00",
                  "#FFFF00",
                  "#FFA700",
                  "#FA0606",
                  "#A706F8"
	            ]
	        },
	        radiusRange: [
	            0,
	            50
	        ],
	        filled: true
	    },
	    textLabel: [
	        {
	            field: null,
	            color: [
	                255,
	                255,
	                255
	            ],
	            size: 18,
	            offset: [
	                0,
	                0
	            ],
	            anchor: "start",
	            alignment: "center"
	        }
	    ],
	    colorUI: {
	        color: {
	            customPalette: {
	                name: "color.customPalette",
	                type: "custom",
	                category: "Custom",
	                colors: []
	            },
	            showSketcher: false,
	            showDropdown: false,
	            colorRangeConfig: {
	                type: "all",
	                steps: 6,
	                reversed: false,
	                custom: false
	            }
	        },
	        colorRange: {
	            customPalette: {
	                name: "Custom Palette",
	                type: "custom",
	                category: "Custom",
	                colors: [
	                    "#009c1f",
                      "#009C1F",
                      "#009C1F",
                      "#009C1F",
                      "#009C1F",
                      "#FFFF00",
                      "#FFFF00",
                      "#FFA700",
                      "#FA0606",
                      "#A706F8"
	                ]
	            },
	            showSketcher: false,
	            showDropdown: false,
	            colorRangeConfig: {
	                type: "all",
	                steps: 10,
	                reversed: false,
	                custom: false
	            }
	        }
	    },
	    animation: {
	        enabled: false
	    },
	    strokeColorField: null,
	    strokeColorDomain: [
	        0,
	        1
	    ],
	    strokeColorScale: "quantile"
	},
	visConfigSettings: {
    radius: {
	        type: "number",
	        defaultValue: 10,
	        label: "layerVisConfigs.radius",
	        isRanged: false,
	        range: [
	            0,
	            100
	        ],
	        step: 0.1,
	        group: "radius",
	        property: "radius"
	    },
	    fixedRadius: {
	        defaultValue: false,
	        type: "boolean",
	        label: "layerVisConfigs.fixedRadius",
	        description: "layerVisConfigs.fixedRadiusDescription",
	        group: "radius",
	        property: "fixedRadius"
	    },
	    opacity: {
	        type: "number",
	        defaultValue: 0.8,
	        label: "layerVisConfigs.opacity",
	        isRanged: false,
	        range: [
	            0,
	            1
	        ],
	        step: 0.01,
	        group: "color",
	        property: "opacity"
	    },
	    outline: {
	        type: "boolean",
	        defaultValue: false,
	        label: "layer.outline",
	        property: "outline"
	    },
	    thickness: {
	        type: "number",
	        defaultValue: 2,
	        label: "layerVisConfigs.strokeWidth",
	        isRanged: false,
	        range: [
	            0,
	            100
	        ],
	        step: 0.1,
	        group: "stroke",
	        property: "thickness"
	    },
	    strokeColor: {
	        type: "color-select",
	        label: "layerVisConfigs.strokeColor",
	        defaultValue: null,
	        group: "color",
	        property: "strokeColor"
	    },
	    colorRange: {
	        type: "color-range-select",
	        defaultValue: {
	            name: "Global Warming",
	            type: "sequential",
	            category: "Uber",
	            colors: [
	                "#5A1846",
	                "#900C3F",
	                "#C70039",
	                "#E3611C",
	                "#F1920E",
	                "#FFC300"
	            ]
	        },
	        label: "layerVisConfigs.colorRange",
	        group: "color",
	        property: "colorRange"
	    },
	    strokeColorRange: {
	        type: "color-range-select",
	        defaultValue: {
	            name: "Global Warming",
	            type: "sequential",
	            category: "Uber",
	            colors: [
	                "#5A1846",
	                "#900C3F",
	                "#C70039",
	                "#E3611C",
	                "#F1920E",
	                "#FFC300"
	            ]
	        },
	        label: "layerVisConfigs.strokeColorRange",
	        group: "color",
	        property: "strokeColorRange"
	    },
	    radiusRange: {
	        type: "number",
	        defaultValue: [
	            0,
	            50
	        ],
	        isRanged: true,
	        range: [
	            0,
	            500
	        ],
	        step: 0.1,
	        label: "layerVisConfigs.radiusRange",
	        group: "radius",
	        property: "radiusRange"
	    },
	    filled: {
	        type: "boolean",
	        label: "layer.fillColor",
	        defaultValue: true,
	        property: "filled"
	    }
	}
}