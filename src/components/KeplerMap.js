import KeplerGl from 'kepler.gl';
import { connect } from 'react-redux'
import {addDataToMap} from 'kepler.gl/actions';

const KeplerMap = props => {
	if(props.latestData && props.latestData.data ){
		if(props.latestData.data.fireSeasonData){
			console.log('fireSeasonData is here' , props.latestData.data.fireSeasonData)
		}
		else{
			console.log('no fire season data here', Object.keys(props.latestData), props.latestData)
		}

	}
	console.log('props', props)
 return ( <KeplerGl
 	  id="foo"
 	  mapboxApiAccessToken={'pk.eyJ1IjoibmFuaG9zZW4iLCJhIjoiY2ppZGExdDZsMDloNzN3cGVoMjZ0NHR5YyJ9.RYsPZGmajXULk-WtqvBNpQ'}
 	  width={5000}
 	  height={1000}
   />)

};

// export default KeplerMap

// const KeplerMap = props => (
//   <KeplerGl
//       id="foo"
//       mapboxApiAccessToken={token}
//       width={width}
//       height={height}/>
// );

const mapStateToProps = state => {
	const { latestData } = state
	return { latestData }
	// console.log('state', state)
	// return {state}
}

export default connect(mapStateToProps, null)(KeplerMap)
