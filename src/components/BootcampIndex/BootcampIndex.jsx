import { useEffect, useState } from 'react'
import axios from 'axios'
import BootcampSearch from './BootcampSearch'
import { authRequest } from '../../lib/auth'

function BootcampIndex({user}) {
    // TODO
    // make a axios call to our backend
    // save it in state
    // display all the bootcamps using map

    const [bootcamps,setBootcamps] = useState([])
    const [displayedBootcamps,setDisplayedBootcamps] = useState([])
    const [application, setApplication] = useState({})
    const [bookmarked,setBookmarked] = useState({})
    const [errors,setErrors] = useState(null)
    const [applied,setApplied] = useState({})

    async function getAllBootcamps(){
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/bootcamps/')
            setBootcamps(response.data)
            setDisplayedBootcamps(response.data)
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
            const appliedObject = {};
            response.data.forEach(applied => {
                    appliedObject[applied.bootcamp] = { id: applied.id, status: applied.status }})
            setApplied(appliedObject)
        } catch(error) {
            setErrors(error.response.data.error)
        }
    }

    async function getAllBookmarks() {
        try {
            const response = await authRequest({method: 'get', url: 'http://127.0.0.1:8000/api/bookmarks/'})
            const bookmarkes = {};
            response.data.forEach(bookmark => {
                bookmarkes[bookmark.bootcamp] = { id: bookmark.id, value : true }})
            setBookmarked(bookmarkes)
        } catch(error) {
            setErrors(error.response.data.error)
        }
    }

    useEffect(() => {
        getAllBootcamps(),
        getAllApplications(),
        getAllBookmarks()
    }, [])

    const searchBootcamps = (searchInput) => {
        const filteredBootcamps = bootcamps.filter(bootcamp => 
            (bootcamp.title || '').toLowerCase().includes((searchInput || '').toLowerCase())
        )
        setDisplayedBootcamps(filteredBootcamps);
    }

    const reset = () => {
        setDisplayedBootcamps(bootcamps)
    }

    async function handleApplication(bootcampId) {
        const ApplicationData = {
            bootcamp : bootcampId,
            status : "Applied",
            owner : user.user_id
        }
        try {
            const response = await authRequest({method:'post',url:'http://127.0.0.1:8000/api/applications/', data: ApplicationData})
            setApplication(prevState => ({
                ...prevState,
                [bootcampId] : {
                    status : response.data.status,
                    id : response.data.id
                }
            }))
            setApplied(prevState => ({
                ...prevState,
                [bootcampId] : {
                    status : response.data.status,
                    id : response.data.id
                }
            }))
        } catch(error) {
            setErrors(error.response.data.error)
        }
    }

    async function handleApplicationStatusChange(e,bootcampId,applicationId) {
        const ApplicationStatusUpdate = {
            status : e.target.value,
            owner : user.user_id
        }
        try {
            const response = await authRequest({method:'put', url:`http://127.0.0.1:8000/api/applications/${applicationId}/`, data :ApplicationStatusUpdate})
            setApplication(prevState => ({
                ...prevState,
                [bootcampId] : {
                    ...prevState[bootcampId],
                    status : response.data.status
                }
            }))
            setApplied(prevState => ({
                ...prevState,
                [bootcampId] : {
                    ...prevState[bootcampId],
                    status : response.data.status
                }
            }))
        } catch(error) {
            setErrors(error.response.data.error)
        }
    }

    async function handleBookmark(bookmarkedId, bootcampId) {
        const current = bookmarked[bootcampId]?.value || false;
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
                        bootcamp: bootcampId,
                        owner : user.user_id
                    }
                })
            }
            setBookmarked(prev => ({
                ...prev,
                [bootcampId]: {
                    id: response.data.id,
                    value: response.data.is_bookmarked
                }
            }))
            } catch (error) {
                setErrors(error.response.data.error)
            }
    }
return (
    <div className="min-h-screen p-8 pt-30 mb-60">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Available Bootcamps</h1>
            <BootcampSearch searchBootcamps={searchBootcamps} displayedBootcamps={displayedBootcamps} reset={reset}/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {
                    displayedBootcamps ?
                    displayedBootcamps.map((bootcamp,index) => {
                        return (
                            <div key={index} className="relative bg-white rounded-2xl p-6 shadow-lg hover:-translate-y-3">
                                <button
                                onClick={() => handleBookmark(bookmarked[bootcamp.id]?.id, bootcamp.id)}
                                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-gray-100 text-blue-600 rounded-xl">
                                    {bookmarked[bootcamp.id]?.value ? 
                                        <i className="fa-solid fa-bookmark"></i>
                                        : 
                                        <i className="fa-regular fa-bookmark"></i>
                                    }
                                </button>
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{bootcamp.title}</h2>
                                <p className="text-gray-600 mb-1"><span className="font-medium">Company:</span> {bootcamp.provider}</p>
                                <p className="text-gray-500 text-sm mb-4">{bootcamp.description}</p>
                                <p className="text-gray-500 text-sm mb-4">Starts at : {bootcamp.start_date}, ends at :{bootcamp.end_date}</p>
                                {
                                    applied[bootcamp.id] 
                                    ?
                                    <div className="mt-4">
                                        <p className="text-sm font-medium text-gray-700 mb-2">
                                            Status: <span className="text-blue-500 font-semibold">{applied[bootcamp.id].status}</span>
                                        </p>
                                        <select 
                                        onChange={(e) => {handleApplicationStatusChange(e,bootcamp.id,applied[bootcamp.id].id)}} 
                                        value={applied[bootcamp.id].status}
                                        className="w-full border border-gray-800 rounded-md p-2 text-sm text-gray-800 bg-blue-200">
                                            <option value="Applied">Applied</option>
                                            <option value="Rejected">Rejected</option>
                                            <option value="Interview">Interview</option>
                                        </select>
                                        </div>
                                        :
                                        <button 
                                        onClick={() => {handleApplication(bootcamp.id)}}
                                        className="w-full bg-blue-700 text-white font-medium rounded-md p-2 mt-4 hover:bg-blue-700">
                                            Mark As Applied
                                        </button>
                                    }
                            </div>
                            )
                        })
                        :
                        <h1>Sorry, there are no bootcamps yet ...</h1>
                }
            </div>
        </div>
    </div>
)
}

export default BootcampIndex

