import { connect, useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from "react";

const ChartSpot = () => {
	const dataState = useSelector ( state => state)
	useEffect(()=>{
		console.log('chart state is changed', dataState)
	},[dataState])
	return(
		<div>I am going to havve the most amazing chart in the world right here someday</div>
 	)
}

export default ChartSpot