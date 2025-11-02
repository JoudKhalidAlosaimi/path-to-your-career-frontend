import {useState} from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router'

import NavBar from './components/NavBar/NavBar'
import JobIndex from './components/JobIndex/JobIndex'
import CourseIndex from './components/CourseIndex/CourseIndex'
import BootcampIndex from './components/BootcampIndex/BootcampIndex'
import HomePage from './components/HomePage/HomePage'

import Register from './components/Auth/Register'
import Login from './components/Auth/Login'


import { getUserFromToken } from './lib/auth'
import UserProfile from './components/UserProfile/UserProfile'


function App() {

  const [user, setUser] = useState(getUserFromToken());

  const [isDarkMode, setIsDarkMode] = useState(true)

  function handleMode(){
    if(isDarkMode){
      setIsDarkMode(false)
    } else {
      setIsDarkMode(true)
    }
  }

  return (
  <Router>
    <div className={isDarkMode ? "dark" : ""}>
      <div className="bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white">

      <NavBar user={user} setUser={setUser} handleMode={handleMode} isDarkMode={isDarkMode}/>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login setUser={setUser}/>}/>
        <Route path='/profile' element={<UserProfile user={user}/>} />

        <Route path='/home' element={<HomePage/>}/>
        <Route path='/jobs' element={<JobIndex user={user}/>}/>
        <Route path='/courses' element={<CourseIndex user={user}/>}/>
        <Route path='/bootcamps' element={<BootcampIndex user={user}/>}/>
      </Routes>
    </div>
    </div>
    </Router>
  )
}

export default App
