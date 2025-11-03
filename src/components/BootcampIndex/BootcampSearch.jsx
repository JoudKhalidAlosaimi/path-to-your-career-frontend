import React from 'react'
import { useState } from 'react'

function BootcampSearch({searchBootcamps, displayedBootcamps, reset}) {

    const [searchInput, setSearchInput]= useState()
    const [prevSearchTerm,setPrevSearchTerm] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        searchBootcamps(searchInput)
        setPrevSearchTerm(searchInput)
        setSearchInput('')
    }
    
    const handleChange = (e) => {
        setSearchInput(e.target.value)
    }
    
    const lastSearch = (prevSearchTerm) => {
        if(prevSearchTerm == ''){
            return <p>Search for a bootcamp by title</p>
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
        <p>Number of results: {displayedBootcamps.length}</p>
        <button onClick={reset}>Show all bootcamps</button>
    </div>
)
}

export default BootcampSearch
