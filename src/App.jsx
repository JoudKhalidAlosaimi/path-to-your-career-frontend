import {useState} from 'react'
import axios from 'axios'

import { BrowserRouter as Router, Routes, Route } from 'react-router'

import NavBar from './components/NavBar/NavBar'
import JobIndex from './components/JobIndex/JobIndex'

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/jobs' element={<JobIndex/>}/>
      </Routes>
    </Router>
  )
}

export default App
