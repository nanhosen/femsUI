// import { connect, useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from "react";
// import { RedshiftDataClient, ExecuteStatementCommand, DescribeTableCommand, ListTablesCommand, ListStatementsCommand, GetStatementResultCommand } from "@aws-sdk/client-redshift-data"
import CanvasJSReact from '../assets/canvasjs.stock.react'
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;


const ChartComponent = (data) => {
	// const [chartData, setChartData] = useState(data)
	const [dtps, setDtps] = useState()
	const [containerProps, setContainerProps] = useState({
	      width: "100%",
	      height: "450px",
	      margin: "auto"
	    })
	const [chartOptions, setChartOptions] = useState()
	const [rankValArray, setRankValArray] = useState()
	const [dateValArray, setDateValArray] = useState()
	const [chartRankData, setChartRankData] = useState()
	const [chartEcData, setChartEcData] = useState()
	const [firstDate, setFirstDate] = useState()
	const [lastDate, setLastDate] = useState()
	// const [selectedStn, setSelectedStn] = useState(data)
	// console.log('input data', data)

	useEffect(() =>{
		const stnData = data.data
		console.log('chartDataaaaaaaa stnData', stnData)
		// console.log('this is ChartRankData shold be empty', ChartRankData)
		if(stnData){
			console.log('bojf keys', Object.keys(stnData))
			if(stnData.data && stnData.fieldOrder){
				console.log('both are here', stnData)
				const dates = []
				const ranks = []
				const chartRankData = []
				const chartEcData = []
				const ecPos = stnData.fieldOrder.indexOf('ec')
				const rankPos = stnData.fieldOrder.indexOf('scaled_rank')
				const datePos = stnData.fieldOrder.indexOf('date')
				const stnPos = stnData.fieldOrder.indexOf('wims_id')
				// const ecPos = 7

				stnData.data.map((currObArray, i) => {
					// if(i<10){
						const ecKey = Object.keys(currObArray[ecPos])[0]
						const rankKey = Object.keys(currObArray[rankPos])[0]
						const dateKey = Object.keys(currObArray[datePos])[0]
						const stnKey = Object.keys(currObArray[stnPos])[0]
						const ecObj = currObArray[ecPos] 
						const rankObj = currObArray[rankPos] 
						const dateObj = currObArray[datePos] 
						const rankVal = rankObj[rankKey]
						const dateVal = dateObj[dateKey]
						const ecVal = ecObj[ecKey]
						// console.log('curr', currObArray)
						// console.log('curr rank', currObArray[ecPos])
						// console.log('curr date', currObArray[datePos])
						// console.log('curr rankVal', rankVal)
						// console.log('curr dateVal', dateVal)
						if(dates.indexOf(dateVal) < 0){
							if(i == 0){
								setFirstDate(dateVal)
							}
							if(i == stnData.data.length){
								setLastDate(dateVal)
							}
							dates.push(dateVal)
							// ranks.push(parseFloat(rankVal))
							chartRankData.push({x: new Date(dateVal), y: parseFloat(rankVal)})
							chartEcData.push({x: new Date(dateVal), y: parseFloat(ecVal)})
						}
					// }
				})
				// console.log('dates array', dates)
				// console.log('chartRankData chartRankData', chartRankData)
				// const dateNoDups =[...new Set(dates)]
				setRankValArray(ranks)
				setChartRankData(chartRankData)
				setChartEcData(chartEcData)
				// console.log('lengths compare set second', dates.length, dateNoDups.length)
				// setDateValArray(dates)
			}

		}
	},[data.data])

	useEffect(() => {
		var xVal = 1, yVal = 100;
    var dps = [];
    for(var i = 0; i < 200; i++) {
      yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
      dps.push({x: xVal,y: yVal});  
      xVal++;
    }
    setDtps(dps)
	},[])

	useEffect(() =>{
		if(chartRankData && chartEcData){
			const chOptions = {
      theme: "light2",
      title:{
        text: `ERC and Fire Season Percentile Rank ${data.stn}`
      },
      subtitles: [{
        text: ""
      }],
      charts: [{
        axisX: {
          lineThickness: 5,
          tickLength: 0,
          labelFormatter: function(e) {
            return "";
          },
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            labelFormatter: function(e) {
              return "";
            }
          }
        },
        axisY: {
          title: "EC",
          prefix: "",
          tickLength: 0
        },
        toolTip: {
          shared: true
        },
        data: [{
          name: "EC",
          yValueFormatString: "###.##",
          type: "line",
          dataPoints : chartEcData
        }]
      },{
        height: 100,
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true
          }
        },
        axisY: {
          title: "Rank",
          prefix: "",
          tickLength: 0
        },
        toolTip: {
          shared: true
        },
        data: [{
          name: "Rank",
          yValueFormatString: "###.#",
          type: "stepLine",
          dataPoints : chartRankData
        }]
      }],
      navigator: {
        data: [{
          dataPoints: chartEcData
        }],
        slider: {
          minimum: new Date(firstDate),
          maximum: new Date(lastDate)
        }
      }
    };;
	    setChartOptions(chOptions)}

	},[chartRankData, chartEcData])
	// const appState = useSelector ( state => state)
	// const [selected, setSelectedStn] = useState('not set yet')
	// const [stnFireSeasonHistoryData, setStnFireSeasonHistoryData] = useState()
	// useEffect(()=>{
	// 	console.log('chart state is changed', appState)
	// 	if(appState.app && appState.app.data && appState.app.data.object && appState.app.data.object.data){
	// 		console.log('stuff is here',  appState.app.data.object.data[0])
	// 		const stn = appState.app.data.object.data[0]
	// 		setSelectedStn({stnId:stn})
	// 		console.log('changed the station', selected)
	// 	}
	// },[appState.app])

	// useEffect(() => {
	// 	async function fetchStnHistory(stnId){
	// 		const client = new RedshiftDataClient({
 //        user: 'nanhosen',
 //        host: 'redshift-cluster-1.crowqc8szjr0.us-east-2.redshift.amazonaws.com',
 //        database: 'nfdrs',
 //        password: 'Pray4sno.',
 //        port: 5439,
 //        region: 'us-east-2',
 //        credentials: {
 //        	accessKeyId: 'AKIAXFQIKJQDPH5INW25',
 //        	secretAccessKey: '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'
 //        }
 //      })
	// 		const date1 = '2021-01-01'
	//     const date2 = '2021-03-29'
	// 		const fireSeasonSql = `SELECT fire_season_rank_percentiles.wims_id,  to_timestamp(fire_season_rank_percentiles.nfdr_dt, 'YYYY/MM/DD HH24:MI:SS') as date, fire_season_rank_percentiles.nfdr_type,  fire_season_rank_percentiles.msgc,   fire_season_rank_percentiles.ec,  fire_season_rank_percentiles.percentile_rank, fire_season_rank_percentiles.percentile_rank * 100 as scaled_rank, stn_metadata.latitude as latitude, stn_metadata.longitude as longitude, stn_metadata.sta_nm as sta_nm FROM fire_season_rank_percentiles INNER JOIN stn_metadata on fire_season_rank_percentiles.wims_id = stn_metadata.wims_id where nfdr_dt between '${date1}' and '${date2}' and fire_season_rank_percentiles.wims_id = ${stnId}`
 //      const statementName = `that is dumb ${new Date().getTime()}${new Date().getMilliseconds()}`

 //      const paramsExecute = {
	// 		   "ClusterIdentifier": "redshift-cluster-1",
	// 		   "Database": "nfdrs",
	// 		   "DbUser": "nanhosen", 
	// 		   // "Sql": `select sta_id, sta_nm, latitude, longitude, to_timestamp(nfdr_dt, 'YYYY/MM/DD HH24:MI:SS') as date, nfdr_dt, nfdr_type, msgc, ec, rank, rank * 100 as scaled_rank from public.onemonth_erc_percentiles where nfdr_dt between '${date1}' and '${date2}' order by sta_id asc, msgc asc, nfdr_dt desc`,
	// 		   // "Sql": `select ${dbParams["fire_season_rank_percentiles"]["idName"]}, sta_nm, latitude, longitude, to_timestamp(nfdr_dt, 'YYYY/MM/DD HH24:MI:SS') as date, nfdr_dt, nfdr_type, msgc, ec, rank, rank * 100 as scaled_rank from public.${dbName} where nfdr_dt between '${date1}' and '${date2}' order by sta_id asc, msgc asc, nfdr_dt desc`,
	// 		   "Sql": fireSeasonSql,
	// 		   // "Sql": dbParams[dbName]['query'],
	// 		   "StatementName": statementName
	// 		}
	// 		const commandExecute = new ExecuteStatementCommand(paramsExecute);
	// 		console.log('going to send command')
	// 		const respExecute = await client.send(commandExecute)
	// 		const listStatementsCommand = new ListStatementsCommand({})
	// 		const sendListCommand = await client.send(listStatementsCommand)
	// 		const resultMetadata = sendListCommand && sendListCommand.Statements && sendListCommand.Statements.filter && sendListCommand.Statements.filter.length> 0 ? sendListCommand.Statements.filter(currStatement => 
	// 			currStatement.StatementName = statementName
	// 		) : null
	// 		const oneIWantId = resultMetadata && resultMetadata.length > 0 ? resultMetadata[0].Id : null
	// 		const getResultCommand = new GetStatementResultCommand({Id: oneIWantId})
	// 		const sendResultCommand = await client.send(getResultCommand)
	// 		const fieldOrder = sendResultCommand && sendResultCommand.ColumnMetadata && sendResultCommand.ColumnMetadata.length > 0 ?
	// 			sendResultCommand.ColumnMetadata.map(curr => curr.label) : null
	// 		const data = sendResultCommand.Records
	// 		console.log('data', data)
	// 	}
	// 	if(selected.stnId){
	// 		fetchStnHistory(selected.stnId)
	// 	}
	// },[selected])
	// console.log('props', props)
	if(rankValArray && chartOptions){
		return(
			<CanvasJSStockChart containerProps={containerProps} options = {chartOptions} />
		)
	}
	else{
		return(
			<div>I am the chart component</div>
	 	)
	}
}

export default ChartComponent