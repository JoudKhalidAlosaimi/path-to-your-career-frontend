import {useState} from 'react'
import axios from 'axios'

import { BrowserRouter as Router, Routes, Route } from 'react-router'

import NavBar from './components/NavBar/NavBar'
import JobIndex from './components/JobIndex/JobIndex'
import CourseIndex from './components/CourseIndex/CourseIndex'

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/jobs' element={<JobIndex/>}/>
        <Route path='/courses' element={<CourseIndex/>}/>
      </Routes>
    </Router>
  )
}

export default App
