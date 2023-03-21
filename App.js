import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import FormPage from './FormPage';




import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/form" element ={<FormPage/>}/>
        <Route path="/" element={<HomePage/>}/> 
      </Routes>
    </Router>
  
  );
}

export default App;
