import { useEffect, useState } from 'react'
import axios from 'axios'

function BootcampIndex() {
    // TODO
    // make a axios call to our backend
    // save it in state
    // display all the bootcamps using map

    const [bootcamps,setBootcamps] = useState([])

    async function getAllBootcamps(){
        const response = await axios.get('http://127.0.0.1:8000/api/bootcamps/')
        setBootcamps(response.data)
    }

    useEffect(() => {
        getAllBootcamps()
    }, [])
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

