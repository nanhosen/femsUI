import axios from 'axios'
import { readString, readRemoteFile } from 'react-papaparse'
import {processCsvData} from 'kepler.gl/processors';

export default function getLatestData(){
	return async function(dispatch){
		const returnObj = {}
		// const formatInfo = {
		// 	sta_id: {fieldInfo: {format: '', type: 'real'}},
		// 	sta_nm: {fieldInfo: {format: '', type: 'real'}},
		// 	latitude: {processFn: inString => parseFloat(inString), fieldInfo: {format: '', type: 'real'}},
		// 	longitude: {processFn: inString => parseFloat(inString), fieldInfo: {format: '', type: 'real'}},
		// 	nfdr_dt: {fieldInfo: {format: '', type: 'real'}},
		// 	nfdr_tm: {processFn: inString => parseFloat(inString), fieldInfo: {format: '', type: 'real'}},
		// 	nfdr_type: {fieldInfo: {format: '', type: 'real'}},
		// 	msgc: {fieldInfo: {format: '', type: 'real'}},
		// 	ec: {processFn: inString => parseFloat(inString), fieldInfo: {format: '', type: 'real'}},
		// 	rank: {processFn: inString => parseFloat(inString), fieldInfo: {format: '', type: 'real'}},
		// 	percentile_100: {processFn: inString => parseFloat(inString), fieldInfo: {format: '', type: 'real'}},
		// 	percentile_97: {processFn: inString => parseFloat(inString), fieldInfo: {format: '', type: 'real'}},
		// 	percentile_90: {processFn: inString => parseFloat(inString), fieldInfo: {format: '', type: 'real'}},
		// 	percentile_80: {processFn: inString => parseFloat(inString), fieldInfo: {format: '', type: 'real'}},
		// 	percentile_70: {processFn: inString => parseFloat(inString), fieldInfo: {format: '', type: 'real'}},
		// 	percentile_60: {processFn: inString => parseFloat(inString), fieldInfo: {format: '', type: 'real'}},
		// 	percentile_50: {processFn: inString => parseFloat(inString), fieldInfo: {format: '', type: 'real'}},
		// 	week: {processFn: inString => parseFloat(inString), fieldInfo: {format: '', type: 'real'}}
		// }
		try{
			const fireSeasonData = await axios.get('https://redshift-unload-nanette.s3.us-east-2.amazonaws.com/fireSeasonMostRecent.csv')
			const monthlyData = await axios.get('https://redshift-unload-nanette.s3.us-east-2.amazonaws.com/oneMonthMostRecent.csv')
			// const streamTest = await readRemoteFile('https://redshift-unload-nanette.s3.us-east-2.amazonaws.com/oneMonthMostRecent.csv', {
			// 	step: (row) => {
			// 		console.log('Row', row.data)
			// 	},
			// 	complete: () => {
			// 		console.log('all done with stream tesst')
			// 	}
			// })
			const keplerData = { fields: [], rows: []}
			const dataObj = {fireSeason: null, monthly: null}
			if (fireSeasonData.data){
				dataObj.fireSeason =  processCsvData(fireSeasonData.data)
			}
			if(monthlyData.data){
				dataObj.monthly = processCsvData(monthlyData.data)
				// console.log('monthlyKeplerProcessed', monthlyKeplerProcessed)
				// const monthlyDataProcessed = readString(monthlyData.data)
				// monthlyDataProcessed.data[0].map((currIndice, i) => {
				// 	// console.log(formatInfo[currIndice], i, currIndice)
				// 	formatInfo[currIndice]['position'] = i
				// 	if(formatInfo[currIndice].fieldInfo){
				// 		keplerData.fields.push({name: currIndice, ...formatInfo[currIndice].fieldInfo})
				// 	}
				// })
				// monthlyDataProcessed.data.map((currRow, currInd) => {
				// 	const returnAr = []
				// 	currRow.map((currIndice, i) => {
				// 		const indiceType = monthlyDataProcessed.data[0][i] ? monthlyDataProcessed.data[0][i] : undefined
				// 		const indiceInfo = indiceType && formatInfo[indiceType] ? formatInfo[indiceType] : undefined
				// 		if (indiceInfo){
				// 			const pushData = indiceInfo.processFn ? indiceInfo.processFn(currIndice) : currIndice
				// 			returnAr.push(pushData)
				// 		}
				// 		// formatInfo[currIndice].processFn ? processFn()
				// 	})
				// 	if(returnAr.length > 0 && currInd !== 0 ){
				// 		keplerData.rows.push(returnAr)
				// 	}
				// 	// console.log('curr', curr)
				// })
			}
			// // monthlyData.data.map((curr, i) => {

			// })

			// console.log('dataObj', dataObj)
			dispatch({
        type: "GET_LATEST_DATA",
        data: {...dataObj}
      })
		}
		catch(e){
			console.log(e)
			returnObj.error = JSON.stringify(e)
		}
		finally{
			// console.log('returnObj', returnObj)
			
		}
	}
}
