import axios from 'axios'
import { readString, readRemoteFile } from 'react-papaparse'
import { processCsvData, getFieldsFromData } from 'kepler.gl/processors';
import { RedshiftDataClient, ExecuteStatementCommand, DescribeTableCommand, ListTablesCommand, ListStatementsCommand, GetStatementResultCommand } from "@aws-sdk/client-redshift-data"
import { jsonToCSV } from 'react-papaparse'


// redshift-cluster-1.crowqc8szjr0.us-east-2.redshift.amazonaws.com:5439/nfdrs

const requestRedshift = async(dbName) =>{
	try{
			const date1 = '2021-01-01'
	    const date2 = '2021-03-29'
	    
			const fireSeasonSql = `SELECT fire_season_rank_percentiles.wims_id,  to_timestamp(fire_season_rank_percentiles.nfdr_dt, 'YYYY/MM/DD HH24:MI:SS') as date, fire_season_rank_percentiles.nfdr_type,  fire_season_rank_percentiles.msgc,   fire_season_rank_percentiles.ec,  fire_season_rank_percentiles.percentile_rank, fire_season_rank_percentiles.percentile_rank * 100 as scaled_rank, stn_metadata.latitude as latitude, stn_metadata.longitude as longitude, stn_metadata.sta_nm as sta_nm FROM fire_season_rank_percentiles INNER JOIN stn_metadata on fire_season_rank_percentiles.wims_id = stn_metadata.wims_id where nfdr_dt between '${date1}' and '${date2}'`
			const monthlySql = `select sta_id, sta_nm, latitude, longitude, to_timestamp(nfdr_dt, 'YYYY/MM/DD HH24:MI:SS') as date, nfdr_dt, nfdr_type, msgc, ec, rank, rank * 100 as scaled_rank from public.${dbName} where nfdr_dt between '${date1}' and '${date2}' order by sta_id asc, msgc asc, nfdr_dt desc`
			
			const dbParams = {
				onemonth_erc_percentiles: {
					idName: 'sta_id',
					query: monthlySql
				},
				fire_season_rank_percentiles: {
					idName: 'wims_id',
					query: fireSeasonSql
				}
			}
			console.log('i am going to get redshift data someday')
			const client = new RedshiftDataClient({
        user: 'nanhosen',
        host: 'redshift-cluster-1.crowqc8szjr0.us-east-2.redshift.amazonaws.com',
        database: 'nfdrs',
        password: 'Pray4sno.',
        port: 5439,
        region: 'us-east-2',
        credentials: {
        	accessKeyId: 'AKIAXFQIKJQDPH5INW25',
        	secretAccessKey: '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'
        }
      })
	    // console.log('client', client)

	    const statementName = `that is dumb ${new Date().getTime()}${new Date().getMilliseconds()}`
	    
			const paramsExecute = {
			   "ClusterIdentifier": "redshift-cluster-1",
			   "Database": "nfdrs",
			   "DbUser": "nanhosen", 
			   // "Sql": `select sta_id, sta_nm, latitude, longitude, to_timestamp(nfdr_dt, 'YYYY/MM/DD HH24:MI:SS') as date, nfdr_dt, nfdr_type, msgc, ec, rank, rank * 100 as scaled_rank from public.onemonth_erc_percentiles where nfdr_dt between '${date1}' and '${date2}' order by sta_id asc, msgc asc, nfdr_dt desc`,
			   // "Sql": `select ${dbParams["fire_season_rank_percentiles"]["idName"]}, sta_nm, latitude, longitude, to_timestamp(nfdr_dt, 'YYYY/MM/DD HH24:MI:SS') as date, nfdr_dt, nfdr_type, msgc, ec, rank, rank * 100 as scaled_rank from public.${dbName} where nfdr_dt between '${date1}' and '${date2}' order by sta_id asc, msgc asc, nfdr_dt desc`,
			   "Sql": dbParams[dbName]['query'],
			   "StatementName": statementName
			}
			const commandExecute = new ExecuteStatementCommand(paramsExecute);
			console.log('going to send command')
			const respExecute = await client.send(commandExecute)
			const listStatementsCommand = new ListStatementsCommand({})
			const sendListCommand = await client.send(listStatementsCommand)
			const resultMetadata = sendListCommand && sendListCommand.Statements && sendListCommand.Statements.filter && sendListCommand.Statements.filter.length> 0 ? sendListCommand.Statements.filter(currStatement => 
				currStatement.StatementName = statementName
			) : null
			const oneIWantId = resultMetadata && resultMetadata.length > 0 ? resultMetadata[0].Id : null
			const getResultCommand = new GetStatementResultCommand({Id: oneIWantId})
			const sendResultCommand = await client.send(getResultCommand)
			const fieldOrder = sendResultCommand && sendResultCommand.ColumnMetadata && sendResultCommand.ColumnMetadata.length > 0 ?
				sendResultCommand.ColumnMetadata.map(curr => curr.label) : null
			const data = sendResultCommand.Records
			const newAr = []
			data.map(currRow=>{
				const pushObj = {}
				currRow.map((curr,i) => {
					const currKey = Object.keys(curr)[0]
					const fieldName = fieldOrder[i]
					pushObj[fieldName] = curr[currKey]
				})

				newAr.push(pushObj)

			})
			const toCSV = jsonToCSV(newAr)
			const formattedData = processCsvData(toCSV)
			return formattedData
		}
		catch(e){
			console.log('get redshift data error', dbName, e)
			return e
		}
}

export function getRedshiftDataMonthly(){
	return async function(dispatch){
		try{
			console.log('i am going to get redshift data someday')
			const data = await requestRedshift('onemonth_erc_percentiles')
	
			dispatch({
        type: "GET_REDSHIFT_DATA_MONTHLY",
        data: data
      })
		}
		catch(e){
			console.log('get redshift data error', e)
		}

	}
}

export function getRedshiftDataFireSeason(){
	return async function(dispatch){
		try{
			console.log('i am going to get redshift data someday')
			const data = await requestRedshift('fire_season_rank_percentiles')
	
			dispatch({
        type: "GET_REDSHIFT_DATA_FIRE_SEASON",
        data: data
      })
		}
		catch(e){
			console.log('get redshift data error', e)
		}

	}
}

export function getLatestData(){
	return async function(dispatch){
		const returnObj = {}
		console.log('this is the get latest data action hiiiiiiiiiiiii')
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
