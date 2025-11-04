import React from 'react'
import { useState } from 'react'
import { CiSearch } from "react-icons/ci";

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
    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="relative w-150 mb-5">
            <input 
                type='search' 
                placeholder='Search' 
                value={searchInput} 
                onChange={handleChange}
                className="w-full p-4 rounded-full bg-slate-700"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-slate-900 rounded-full">
                <CiSearch />
            </button>
        </div>
        <div className="flex gap-3 justify-center mb-10">
            <p className="bg-gray-500 p-3 rounded-full">{lastSearch(prevSearchTerm)}</p>
            <p className="bg-gray-500 p-3 rounded-full">Number of results: {displayedCourses.length}</p>
            <button className="bg-gray-500 p-3 rounded-full" onClick={reset}>Show all courses</button>
        </div>
    </form>
)
}

export default CourseSearch
