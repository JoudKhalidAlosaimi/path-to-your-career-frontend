import { useEffect, useState } from 'react'
import axios from 'axios'

function BootcampIndex() {
    // TODO
    // make a axios call to our backend
    // save it in state
    // display all the bootcamps using map

    const [bootcamps,setBootcamps] = useState([])
    const [application, setApplication] = useState({})

    async function getAllBootcamps(){
        const response = await axios.get('http://127.0.0.1:8000/api/bootcamps/')
        setBootcamps(response.data)
    }

    useEffect(() => {
        getAllBootcamps()
    }, [])

    async function handleApplication(bootcampId) {
        const ApplicationData = {
            bootcamp : bootcampId,
            status : "Applied"
        }
        const response = await axios.post('http://127.0.0.1:8000/api/applications/', ApplicationData)
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
            status : e.target.value
        }
        const response = await axios.put(`http://127.0.0.1:8000/api/applications/${applicationId}/`,ApplicationStatusUpdate)
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
        <div>
            {
                bootcamps.length ?
                bootcamps.map((bootcamp,index) => {
                    return (
                        <div key={index}>
                            <p>{bootcamp.title}</p>
                            <p>{bootcamp.provider}</p>
                            <p>{bootcamp.description}</p>
                            <p>{bootcamp.start_date}</p>
                            <p>{bootcamp.end_date}</p>

                            {
                                application[bootcamp.id] 
                                ?
                                <>
                                <p>{application[bootcamp.id].status}</p>
                                <select onChange={(e) => {handleApplicationStatusChange(e,bootcamp.id,application[bootcamp.id].id)}} value={application[bootcamp.id].status}>
                                    <option value="Applied">Applied</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Interview">Interview</option>
                                </select>
                                </>
                                :
                                <button onClick={() => {handleApplication(bootcamp.id)}}>Mark As Applied</button>
                            }
                        </div>
                        )
                    })
                    :
                    <h1>Sorry, there are no bootcamps yet ...</h1>
            }
        </div>
    )
}

export default BootcampIndex

