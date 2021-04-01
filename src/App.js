  
import React, { useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import ChartSpot from './components/ChartSpot.js'
import KeplerMapHook from './components/KeplerMapHook.js'
import { useDispatch, useSelector } from "react-redux"

import { getLatestData, getRedshiftDataMonthly, getRedshiftDataFireSeason } from './actions' 


function App() {
  const dispatch = useDispatch()
  const dataState = useSelector ( state => state)
  useEffect(() => {
    console.log(' state changed', dataState)
  }, [dataState])
  useEffect(() => {
    // console.log('using the effectt')
    dispatch(getLatestData())
  },[])
  useEffect(() => {
    // console.log('getting historical data effect')
    dispatch(getRedshiftDataMonthly())
  },[])
  useEffect(() => {
    // console.log('getting historical data effect')
    dispatch(getRedshiftDataFireSeason())
  },[])
  return (
    <div className="App">
      <KeplerMapHook />
      <ChartSpot />
    </div>
  );
}

export default App;
