import React from 'react'
import { useState } from 'react'

function JobSearch({searchJobs,displayedJobs,reset}) {

    const [searchInput, setSearchInput]= useState()
    const [prevSearchTerm,setPrevSearchTerm] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        searchJobs(searchInput)
        setPrevSearchTerm(searchInput)
        setSearchInput('')
    }

    const handleChange = (e) => {
        setSearchInput(e.target.value)
    }

    const lastSearch = (prevSearchTerm) => {
        if(prevSearchTerm == ''){
            return <p>Search for a job by title</p>
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
            <p>Number of results: {displayedJobs.length}</p>
            <button onClick={reset}>Show all jobs</button>
        </div>
    )
}

export default JobSearch
