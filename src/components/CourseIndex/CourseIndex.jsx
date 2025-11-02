import { useEffect, useState } from 'react'
import axios from 'axios'
import { authRequest } from '../../lib/auth'

function CourseIndex({user}) {
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
            status : "Applied",
            owner : user.user_id
        }
        const response = await authRequest({method: 'post', url: 'http://127.0.0.1:8000/api/applications/', data:ApplicationData})
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
            status : e.target.value,
            owner : user.user_id
        }
        const response = await authRequest({method: 'put', url : `http://127.0.0.1:8000/api/applications/${applicationId}/`,data : ApplicationStatusUpdate})
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
        <div className="min-h-screen p-8 pt-30">
            <h1 className="text-3xl font-bold text-center mb-8">Available Courses</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    courses.length ?
                    courses.map((course,index) => {
                        return (
                            <div key={index} className="bg-white shadow-md rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h2>
                                <p className="text-gray-600 mb-1"><span className="font-medium">Company:</span> {course.provider}</p>
                                <p className="text-gray-500 text-sm mb-4">{course.description}</p>
                                <p className="text-gray-500 text-sm mb-4">{course.duration}</p>

                            {
                                application[course.id] ?
                                <div className="relative w-full mt-4 overflow-visible">
                                    <p className="text-sm font-medium text-gray-700 mb-2">
                                        Status: <span className="text-blue-600">{application[course.id].status}</span>
                                    </p>
                                    <select 
                                    onChange={(e) => {handleApplicationStatusChange(e,course.id,application[course.id].id)}} 
                                    value={application[course.id] ? application[course.id].status : "Applied"}
                                    className="w-full relative border border-gray-300 rounded-md p-2 text-sm z-50 bg-white">
                                        <option value="Applied">Applied</option>
                                        <option value="Rejected">Rejected</option>
                                        <option value="Interview">Interview</option>
                                    </select>
                                </div>
                                :
                                <button 
                                onClick={() => {handleApplication(course.id)}}
                                className="w-full bg-blue-600 text-white font-medium rounded-md p-2 mt-4 hover:bg-blue-700 transition">
                                    Mark As Applied
                                </button>
                                
                            }
                        </div>
                        )
                    })
                    :
                    <h1>Sorry, there are no courses yet ...</h1>
            }
        </div>
    </div>
            
    )
}

export default CourseIndex

