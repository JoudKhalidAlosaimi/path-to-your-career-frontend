import { use, useEffect, useState } from 'react'
import axios from 'axios'
import { authRequest } from "../../lib/auth"
import JobSearch from './JobSearch'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router'

function JobIndex({user}) {
    // TODO
    // make a axios call to our backend(using get)
    // save it in state
    // display all our jobs

    const [jobs,setJobs] = useState([])
    const [displayedJobs,setDisplayedJobs] = useState([])
    const [application, setApplication] = useState({})
    const [bookmarked,setBookmarked] = useState({})
    const [errors, setErrors] = useState(null)

    const navigate = useNavigate()

    async function getAllJobs(){
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/jobs/')
            setJobs(response.data)
            setDisplayedJobs(response.data)
        } catch(error) {
            setErrors(error.response.data.error)
        }
    }

    async function getAllApplications(){
        const ApplicantData = {
            owner : user.user_id
        }
        try {
            const response = await authRequest({method: 'get', url: 'http://127.0.0.1:8000/api/applications/', data: ApplicantData})
            // https://community.latenode.com/t/convert-array-to-object-in-react-js/491/4
            const application = {}
            response.data.forEach(applied => {
                application[applied.job] = { id: applied.id, status: applied.status }})
            setApplication(application)
        } catch(error) {
            setErrors(error.response.data.error)
        }
    }

    async function getAllBookmarks() {
        try {
            const response = await authRequest({method: 'get', url: 'http://127.0.0.1:8000/api/bookmarks/'})
            const bookmarkes = {}
            response.data.forEach(bookmark => {
                bookmarkes[bookmark.job] = { id: bookmark.id, value : true }})
            setBookmarked(bookmarkes)
        } catch(error) {
            setErrors(error.response.data.error)
        }
    }

    useEffect(() => {
        getAllJobs(),
        getAllApplications(),
        getAllBookmarks()
    }, [])

    const searchJobs = (searchInput) => {
    const filteredJobs = jobs.filter(job => 
        (job.title || '').toLowerCase().includes((searchInput || '').toLowerCase())
    )
    setDisplayedJobs(filteredJobs);
    }

    const reset = () => {
        setDisplayedJobs(jobs)
    }

    async function handleApplication(jobId) {
        if (!user) {
            Swal.fire({
                title: "Login required",
                text: "You need to log in to mark applied.",
                icon: "info",
                showCancelButton: true,
                cancelButtonText:"keep scrolling",
                confirmButtonText: "Login"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login')
                    }
                })
        }
        const ApplicationData = {
            job : jobId,
            status : "Applied",
            owner : user.user_id,
        }
        try {
            const response = await authRequest({method: 'post', url: 'http://127.0.0.1:8000/api/applications/', data: ApplicationData})
            // https://stackoverflow.com/questions/55823296/reactjs-prevstate-in-the-new-usestate-react-hook
            setApplication(prevState => ({
                ...prevState,
                [jobId] : {
                    status : response.data.status,
                    id : response.data.id,
                }
            }))
        } catch(error) {
            setErrors(error.response.data.error)
        }
    }

    async function handleApplicationStatusChange(e,jobId,applicationId) {
        const ApplicationStatusUpdate = {
            status : e.target.value,
            owner : user.user_id,
        }
        try {
            const response = await authRequest({method: 'put', url :`http://127.0.0.1:8000/api/applications/${applicationId}/`, data :ApplicationStatusUpdate})
            setApplication(prevState => ({
                ...prevState,
                [jobId] : {
                    ...prevState[jobId],
                    status : response.data.status,
                }
            }))
        } catch(error) {
            setErrors(error.response.data.error)
        }
    }

    async function handleBookmark(bookmarkedId, jobId) {
        if (!user) {
            Swal.fire({
                title: "Login required",
                text: "You need to log in to save bookmarks.",
                icon: "info",
                showCancelButton: true,
                cancelButtonText:"keep scrolling",
                confirmButtonText: "Login"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login')
                    }
                })
            }
        const current = bookmarked[jobId]?.value || false
        let response = {}
        try {
            if (bookmarkedId) {
            response = await authRequest({method : 'delete', url :`http://127.0.0.1:8000/api/bookmarks/${bookmarkedId}/`,
            data : {
                is_bookmarked: !current, 
                owner : user.user_id
            }})
            } else {
                response = await authRequest({method : 'post', url:' http://127.0.0.1:8000/api/bookmarks/', 
                    data : {
                        job: jobId,
                        owner : user.user_id
                    }
                })
            }
            setBookmarked(prev => ({
                ...prev,
                [jobId]: {
                    id: response.data.id,
                    value: response.data.is_bookmarked
                }
            }))
        } catch(error) {
            setErrors(error.response.data.error)
        }
    }
    
    return (
        <div className="min-h-screen p-8 pt-30 mb-60">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 ">Available Jobs</h1>
                <JobSearch searchJobs={searchJobs} displayedJobs={displayedJobs} reset={reset}/>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {
                        displayedJobs ?
                        displayedJobs.map((job) => {
                            return (
                                <div key={job.id} className="relative bg-white rounded-2xl p-6 shadow-lg hover:-translate-y-3">
                                    <button
                                    onClick={() => handleBookmark(bookmarked[job.id]?.id, job.id)}
                                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-gray-100 text-blue-600 rounded-xl">
                                        {bookmarked[job.id]?.value ? 
                                            <i className="fa-solid fa-bookmark"></i>
                                            : 
                                            <i className="fa-regular fa-bookmark"></i>
                                        }
                                    </button>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h2>
                                    <p className="text-gray-600 mb-1"><span className="font-semibold">Company:</span> {job.company}</p>
                                    <p className="text-gray-500 text-sm mb-4">{job.description}</p>
                                    <p className={job.status === 'Open' ? "text-green-800 font-semibold" : "text-red-800 font-semibold"}>{job.status}</p>
                                    <a href={job.link} target='_blank' className="text-purple-600 mb-1 text-sm cursor-pointer" >Visit the company's website to apply</a>
                                    {
                                        application[job.id]
                                        ?
                                        <div className="mt-4">
                                            <p className="text-medium font-medium text-gray-700 mb-2">
                                                Status: <span className="text-blue-500 font-semibold">{application[job.id].status}</span>
                                            </p>
                                            <select 
                                            onChange={(e) => {handleApplicationStatusChange(e,job.id,application[job.id].id)}} 
                                            value={application[job.id].status}
                                            className="w-full border border-gray-800 rounded-md p-2 text-sm text-gray-800 bg-blue-200">
                                                <option value="Applied">Applied</option>
                                                <option value="Rejected">Rejected</option>
                                                <option value="Interview">Interview</option>
                                            </select>
                                        </div>
                                        :
                                        <button 
                                        onClick={() => {handleApplication(job.id)}}
                                        className="w-full bg-blue-700 text-white font-medium rounded-md p-2 mt-4 hover:bg-blue-700">
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
        </div>
    )
}


export default JobIndex
