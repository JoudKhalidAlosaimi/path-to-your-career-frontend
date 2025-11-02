import React from 'react'
import { useState } from 'react'

function CourseSearch({searchCourses,displayedCourses,reset}) {

    const [searchInput, setSearchInput]= useState()
    const [prevSearchTerm,setPrevSearchTerm] = useState('')
    
    
    const handleSubmit = (e) => {
        e.preventDefault()
        searchCourses(searchInput)
        setPrevSearchTerm(searchInput)
        setSearchInput('')
    }
    
    const handleChange = (e) => {
        setSearchInput(e.target.value)
    }
    
    const lastSearch = (prevSearchTerm) => {
        if(prevSearchTerm == ''){
            return <p>Search for a course by title</p>
        } else {
            return <p>The last search was: {prevSearchTerm} </p>
        }
    }
return (
    <div>
        {lastSearch(prevSearchTerm)}
        <form onSubmit={handleSubmit}>
            <label>Search Term: </label>
            <input value={searchInput} onChange={handleChange} />
            <button>Search</button>
        </form>
        <p>Number of results: {displayedCourses.length}</p>
        <button onClick={reset}>Show all courses</button>
    </div>
)
}

export default CourseSearch
