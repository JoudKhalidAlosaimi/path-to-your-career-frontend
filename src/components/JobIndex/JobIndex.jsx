import { useEffect, useState } from 'react'
import axios from 'axios'

function JobIndex() {
    // TODO
    // make a axios call to our backend(using get)
    // save it in state
    // display all our jobs

    const [jobs,setJobs] = useState([])
    const [application, setApplication] = useState({})


    async function getAllJobs(){
        const response = await axios.get('http://127.0.0.1:8000/api/jobs/')
        setJobs(response.data)
    }

    useEffect(() => {
            getAllJobs()
        }, [])

    async function handleApplication(jobId) {
        const ApplicationData = {
            job : jobId,
            status : "Applied"
        }
        const response = await axios.post('http://127.0.0.1:8000/api/applications/', ApplicationData)
        // https://stackoverflow.com/questions/55823296/reactjs-prevstate-in-the-new-usestate-react-hook
        setApplication(prevState => ({
            ...prevState,
            [jobId] : {
                status : response.data.status,
                id : response.data.id
            }
        }))
    }

    async function handleApplicationStatusChange(e,jobId,applicationId) {
        const ApplicationStatusUpdate = {
            status : e.target.value
        }
        const response = await axios.put(`http://127.0.0.1:8000/api/applications/${applicationId}/`,ApplicationStatusUpdate)
        setApplication(prevState => ({
            ...prevState,
            [jobId] : {
                ...prevState[jobId],
                status : response.data.status
            }
            
        }))
        console.log(response.data.id)
    }
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

                            {
                                application[job.id] 
                                ?
                                <>
                                <p>{application[job.id].status}</p>
                                <select onChange={(e) => {handleApplicationStatusChange(e,job.id,application[job.id].id)}} value={application[job.id].status}>
                                    <option value="Applied">Applied</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Interview">Interview</option>
                                </select>
                                </>
                                :
                                <button onClick={() => {handleApplication(job.id)}}>Mark As Applied</button>
                            }
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
