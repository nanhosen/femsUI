import { connect, useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from "react";
import { RedshiftDataClient, ExecuteStatementCommand, DescribeStatementCommand, DescribeTableCommand, ListTablesCommand, ListStatementsCommand, GetStatementResultCommand } from "@aws-sdk/client-redshift-data"
import CanvasJSReact from '../assets/canvasjs.stock.react'
import ChartComponent from './ChartComponent'
import ChartComponentReact from './ChartComponentReact'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { fetchRetry } from '../utils/fetchRetry.js'

const { REACT_APP_ACCESSKEYID, REACT_APP_SECRETACCESSKEY } = process.env

const ChartSpot = () => {
	const appState = useSelector ( state => state)
	const [selected, setSelectedStn] = useState('not set yet')
	const [stnFireSeasonHistoryData, setStnFireSeasonHistoryData] = useState()
	useEffect(()=>{
		console.log('chart state is changed', appState)
		if(appState.app && appState.app.data && appState.app.data.object && appState.app.data.object.data){
			console.log('stuff is here',  appState.app.data.object.data[0])
			const stn = appState.app.data.object.data[0]
			setSelectedStn({stnId:stn})
			console.log('changed the station', selected)
		}
	},[appState.app])

	useEffect(() => {
		async function fetchStnHistory(stnId){
			const client = new RedshiftDataClient({
        user: 'nanhosen',
        host: 'redshift-cluster-1.crowqc8szjr0.us-east-2.redshift.amazonaws.com',
        database: 'nfdrs',
        password: 'Pray4sno.',
        port: 5439,
        region: 'us-east-2',
        credentials: {
        	accessKeyId: REACT_APP_ACCESSKEYID,
        	secretAccessKey: REACT_APP_SECRETACCESSKEY
        }
      })
			const date1 = '2018-01-01'
	    const date2 = '2021-04-11'
			const fireSeasonSql = `SELECT fire_season_rank_percentiles.wims_id,  to_timestamp(fire_season_rank_percentiles.nfdr_dt, 'YYYY/MM/DD HH24:MI:SS') as date, fire_season_rank_percentiles.nfdr_type,  fire_season_rank_percentiles.msgc,   fire_season_rank_percentiles.ec,  fire_season_rank_percentiles.percentile_rank, fire_season_rank_percentiles.percentile_rank * 100 as scaled_rank, stn_metadata.latitude as latitude, stn_metadata.longitude as longitude, stn_metadata.sta_nm as sta_nm FROM fire_season_rank_percentiles INNER JOIN stn_metadata on fire_season_rank_percentiles.wims_id = stn_metadata.wims_id where nfdr_dt between '${date1}' and '${date2}' and fire_season_rank_percentiles.wims_id = ${stnId} order by fire_season_rank_percentiles.nfdr_dt`
      const statementName = `that is dumb ${new Date().getTime()}${new Date().getMilliseconds()}`

      const paramsExecute = {
			   "ClusterIdentifier": "redshift-cluster-1",
			   "Database": "nfdrs",
			   "DbUser": "nanhosen", 
			   // "Sql": `select sta_id, sta_nm, latitude, longitude, to_timestamp(nfdr_dt, 'YYYY/MM/DD HH24:MI:SS') as date, nfdr_dt, nfdr_type, msgc, ec, rank, rank * 100 as scaled_rank from public.onemonth_erc_percentiles where nfdr_dt between '${date1}' and '${date2}' order by sta_id asc, msgc asc, nfdr_dt desc`,
			   // "Sql": `select ${dbParams["fire_season_rank_percentiles"]["idName"]}, sta_nm, latitude, longitude, to_timestamp(nfdr_dt, 'YYYY/MM/DD HH24:MI:SS') as date, nfdr_dt, nfdr_type, msgc, ec, rank, rank * 100 as scaled_rank from public.${dbName} where nfdr_dt between '${date1}' and '${date2}' order by sta_id asc, msgc asc, nfdr_dt desc`,
			   "Sql": fireSeasonSql,
			   // "Sql": dbParams[dbName]['query'],
			   "StatementName": statementName
			}
			const commandExecute = new ExecuteStatementCommand(paramsExecute);
			console.log('going to send command', paramsExecute.Sql)
			const respExecute = await client.send(commandExecute)
			console.log('respExecute', respExecute, respExecute.Id)
			// const queryId  = respExecute.Id
			// const queryId  = "8e211f66-1dec-412b-bc3e-c7cdfc4b17b6"
			// fetchRetry(client, )
			// (client, command, options = {}, retries = 3, backoff = 300
			const queryId  = '90b52749-d0d5-4b9b-a8cb-5875613f24ff'
			const actualQueryId   = respExecute.Id
			const listStatementsCommand = new ListStatementsCommand({})
			// console.log('listStatementsCommand', listStatementsCommand)
			const sendListCommand = await client.send(listStatementsCommand)
			console.log('sendListCommand', sendListCommand)
			const resultMetadata = sendListCommand && sendListCommand.Statements && sendListCommand.Statements.filter && sendListCommand.Statements.filter.length> 0 ? sendListCommand.Statements.filter(currStatement => 
				currStatement.StatementName = statementName
			) : null
			console.log('resultMetadata', resultMetadata)
			const oneIWantId = queryId
			const describeStatementResult = await client.send(new DescribeStatementCommand({Id: respExecute.Id}))
			console.log('about to retry')
			const fetchRetryResult = await fetchRetry(client, DescribeStatementCommand, {Id: respExecute.Id}, 5, 300, 'Chart spot')
			console.log('fetchRetry result from chart spot', fetchRetryResult)

			// const oneIWantId = resultMetadata && resultMetadata.length > 0 ? resultMetadata[0].Id : null
			const getResultCommand = new GetStatementResultCommand({Id: actualQueryId})
			const sendResultCommand = await client.send(getResultCommand)
			console.log('sendResultCommand', sendResultCommand)
			const fieldOrder = sendResultCommand && sendResultCommand.ColumnMetadata && sendResultCommand.ColumnMetadata.length > 0 ?
				sendResultCommand.ColumnMetadata.map(curr => curr.label) : null
			const data = sendResultCommand.Records
			setStnFireSeasonHistoryData({data, fieldOrder})
			// console.log('data', data, 'fieldOrder', fieldOrder)
		}
		if(selected.stnId){
			console.log('selected stn id ', selected.stnId)
			fetchStnHistory(selected.stnId)
		}
	},[selected.stnId])
	return(
		<Accordion defaultActiveKey="0">
		  <Card>
		    <Accordion.Toggle as={Card.Header} eventKey="0">
		      Click me!
		    </Accordion.Toggle>
		    <Accordion.Collapse eventKey="0">
		      <Card.Body><ChartComponent data = {stnFireSeasonHistoryData} stn = { selected.stnId } /></Card.Body>
		    </Accordion.Collapse>
		  </Card>
		</Accordion>
 	)
}

export default ChartSpot