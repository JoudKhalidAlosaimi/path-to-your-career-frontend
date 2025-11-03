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

    async function getAllBootcamps(){
        const response = await axios.get('http://127.0.0.1:8000/api/bootcamps/')
        setBootcamps(response.data)
        setDisplayedBootcamps(response.data)
    }

    useEffect(() => {
        getAllBootcamps()
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
        const response = await authRequest({method:'post',url:'http://127.0.0.1:8000/api/applications/', data: ApplicationData})
        setApplication(prevState => ({
            ...prevState,
            [bootcampId] : {
                status : response.data.status,
                id : response.data.id
            }
        }))
    }

    async function handleApplicationStatusChange(e,bootcampId,applicationId) {
        const ApplicationStatusUpdate = {
            status : e.target.value,
            owner : user.user_id
        }
        const response = await authRequest({method:'put', url:`http://127.0.0.1:8000/api/applications/${applicationId}/`, data :ApplicationStatusUpdate})
        setApplication(prevState => ({
            ...prevState,
            [bootcampId] : {
                ...prevState[bootcampId],
                status : response.data.status
            }
            
        }))
        console.log(response.data.id)
    }
    return (
        <div className="min-h-screen p-8 pt-30">
            <h1 className="text-3xl font-bold text-center mb-8">Available Bootcamps</h1>
            <h2 className="text-3xl font-bold text-center mb-8">Search</h2>
            <BootcampSearch searchBootcamps={searchBootcamps} displayedBootcamps={displayedBootcamps} reset={reset}/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    displayedBootcamps.length ?
                    displayedBootcamps.map((bootcamp,index) => {
                        return (
                            <div key={index} className="bg-white shadow-md rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{bootcamp.title}</h2>
                                <p className="text-gray-600 mb-1"><span className="font-medium">Company:</span> {bootcamp.provider}</p>
                                <p className="text-gray-500 text-sm mb-4">{bootcamp.description}</p>
                                <p className="text-gray-500 text-sm mb-4">Starts at : {bootcamp.start_date}, ends at :{bootcamp.end_date}</p>

                                {
                                    application[bootcamp.id] 
                                    ?
                                    <div className="mt-4">
                                        <p className="text-sm font-medium text-gray-700 mb-2">
                                            Status: <span className="text-blue-600">{application[bootcamp.id].status}</span>
                                        </p>
                                        <select 
                                        onChange={(e) => {handleApplicationStatusChange(e,bootcamp.id,application[bootcamp.id].id)}} 
                                        value={application[bootcamp.id].status}
                                        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option value="Applied">Applied</option>
                                            <option value="Rejected">Rejected</option>
                                            <option value="Interview">Interview</option>
                                        </select>
                                    </div>
                                    :
                                    <button 
                                    onClick={() => {handleApplication(bootcamp.id)}}
                                    className="w-full bg-blue-600 text-white font-medium rounded-md p-2 mt-4 hover:bg-blue-700 transition">
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
    )
}

export default BootcampIndex

