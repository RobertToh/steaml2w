import logo from './logo.svg';
import React from 'react';
import './App.css';
import ProfileChart from "./ProfileChart";
import ProfileLookupChart from "./ProfileLookupChart"



function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        {/* <ProfileURLForm /> */}
        <ProfileLookupChart />
        {/* <ProfileChart /> */}
      </header>
    </div>
  );
}

export default App;
