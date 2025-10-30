import { useEffect, useState } from 'react'
import axios from 'axios'

function CourseIndex() {
    // TODO
    // make a axios call to our backend(using get) to get all the courses
    // save it in state
    // display all the courses

    const [courses,setCourses] = useState([])
    const [application, setApplication] = useState({})

    async function getAllCourses(){
        const response = await axios.get('http://127.0.0.1:8000/api/courses/')
        setCourses(response.data)
    }

    useEffect(() => {
        getAllCourses()
    }, [])

    async function handleApplication(courseId) {
        const ApplicationData = {
            course : courseId,
            status : "Applied"
        }
        const response = await axios.post('http://127.0.0.1:8000/api/applications/', ApplicationData)
        console.log(response.data)
        setApplication( prevStatus => ({
            ...prevStatus,
            [courseId] : {
                id : response.data.id,
                status : response.data.status
            }
        }))
    }

    async function handleApplicationStatusChange(e,courseId,applicationId) {
        const ApplicationStatusUpdate = {
            status : e.target.value
        }
        const response = await axios.put(`http://127.0.0.1:8000/api/applications/${applicationId}/`, ApplicationStatusUpdate)
        console.log(response.data)
        setApplication(prevStatus => ({
            ...prevStatus,
            [courseId] : {
                ...courseId,
                status : response.data.status
            }
        }))
    }
    return (
        <div>
            {
                courses.length ?
                courses.map((course,index) => {
                    return (
                        <div key={index}>
                            <p>{course.title}</p>
                            <p>{course.provider}</p>
                            <p>{course.description}</p>
                            <p>{course.duration}</p>

                            {
                                application[course.id] ?
                                <>
                                <p>{application[course.id].status}</p>
                                <select onChange={(e) => {handleApplicationStatusChange(e,course.id,application[course.id].id)}} value={application[course.id].status}>
                                    <option value="Applied">Applied</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Interview">Interview</option>
                                </select>
                                </>
                                :
                                <button onClick={() => {handleApplication(course.id)}}>Mark As Applied</button>
                                
                            }
                        </div>
                        )
                    })
                    :
                    <h1>Sorry, there are no courses yet ...</h1>
            }
        </div>
    )
}

export default CourseIndex

