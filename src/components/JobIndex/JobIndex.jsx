import { useEffect, useState } from 'react'
import axios from 'axios'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"

function JobIndex({user}) {
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
            status : "Applied",
            owner : user.user_id
        }
        const response = await authRequest({method: 'post', url: 'http://127.0.0.1:8000/api/applications/', data: ApplicationData})
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
            status : e.target.value,
            owner : user.user_id
        }
        const response = await authRequest({method: 'put', url :`http://127.0.0.1:8000/api/applications/${applicationId}/`, data :ApplicationStatusUpdate})
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
        <div className="min-h-screen p-8 pt-30">
            <h1 className="text-3xl font-bold text-center mb-8">Available Jobs</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    jobs.length ?
                    jobs.map((job,idx) => {
                        return (
                            <div key={idx} className="bg-white shadow-md rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h2>
                                <p className="text-gray-600 mb-1"><span className="font-medium">Company:</span> {job.company}</p>
                                <p className="text-gray-500 text-sm mb-4">{job.description}</p>
                                <p className={job.status === 'Open' ? "text-green-800" : "text-red-800"}>{job.status}</p>

                                {
                                    application[job.id] 
                                    ?
                                    <div className="mt-4">
                                        <p className="text-sm font-medium text-gray-700 mb-2">
                                            Status: <span className="text-blue-600">{application[job.id].status}</span>
                                        </p>
                                        <select 
                                        onChange={(e) => {handleApplicationStatusChange(e,job.id,application[job.id].id)}} 
                                        value={application[job.id].status}
                                        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option value="Applied">Applied</option>
                                            <option value="Rejected">Rejected</option>
                                            <option value="Interview">Interview</option>
                                        </select>
                                    </div>
                                    :
                                    <button 
                                    onClick={() => {handleApplication(job.id)}}
                                    className="w-full bg-blue-600 text-white font-medium rounded-md p-2 mt-4 hover:bg-blue-700 transition">
                                        Mark As Applied
                                    </button>
                                }
                            </div>
                            )
                        })
                        :
                        <h1>Sorry, there are no jobs yet ...</h1>
                }
                </div>
            </div>
    )
}

export default JobIndex
