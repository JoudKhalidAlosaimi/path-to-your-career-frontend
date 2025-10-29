import { useEffect, useState } from 'react'
import axios from 'axios'

function JobIndex() {
    // TODO
    // make a axios call to our backend(using get)
    // save it in state
    // display all our jobs

    const [jobs,setJobs] = useState([])

    async function getAllJobs(){
        const response = await axios.get('http://127.0.0.1:8000/api/jobs/')
        setJobs(response.data)
    }

    useEffect(() => {
        getAllJobs()
    }, [])
    return (
        <div>
            {
                jobs.length ?
                jobs.map((job,idx) => {
                    return (
                        <div key={idx}>
                            <p>{job.title}</p>
                            <p>{job.company}</p>
                            <p>{job.description}</p>
                            <p>{job.status}</p>
                        </div>
                        )
                    })
                    :
                    <h1>Sorry, there are no jobs yet ...</h1>
            }
        </div>
    )
}

export default JobIndex
