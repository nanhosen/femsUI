import React, { useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import KeplerMap from './components/KeplerMap.js'
import KeplerMapHook from './components/KeplerMapHook.js'
import { useDispatch, useSelector } from "react-redux"

import getLatestData from './actions/index'


function App() {
  const dispatch = useDispatch()
  const dataState = useSelector ( state => state)
  useEffect(() => {
    console.log('app state changed', dataState)
  }, [dataState])
  useEffect(() => {
    console.log('using the effectt')
    dispatch(getLatestData())
  },[])
  return (
    <div className="App">
      <KeplerMapHook />
    </div>
  );
}

export default App;
