import { useEffect, useState } from 'react'
import axios from 'axios'
import { authRequest } from '../../lib/auth'
import CourseSearch from './CourseSearch'

function CourseIndex({user}) {
    // TODO
    // make a axios call to our backend(using get) to get all the courses
    // save it in state
    // display all the courses

    const [courses,setCourses] = useState([])
    const [displayedCourses,setDisplayedCourses] = useState([])
    const [application, setApplication] = useState({})
    const [bookmarked,setBookmarked] = useState({})
    const [errors, setErrors] = useState(null)
    const [applied,setApplied] = useState({})

    async function getAllCourses(){
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/courses/')
            setCourses(response.data)
            setDisplayedCourses(response.data)
        } catch (error) {
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
                appliedObject[applied.course] = { id: applied.id, status: applied.status }})
            setApplied(appliedObject)
        } catch(error) {
            setErrors(error.response.data.error)
        }
    }

    useEffect(() => {
        getAllCourses(),
        getAllApplications()
    }, [])

    const searchCourses = (searchInput) => {
    const filteredCourses = courses.filter(course => 
        (course.title || '').toLowerCase().includes((searchInput || '').toLowerCase())
    )
    setDisplayedCourses(filteredCourses);
    }

    const reset = () => {
        setDisplayedCourses(courses)
    }

    async function handleApplication(courseId) {
        const ApplicationData = {
            course : courseId,
            status : "Applied",
            owner : user.user_id
        }
        try {
            const response = await authRequest({method: 'post', url: 'http://127.0.0.1:8000/api/applications/', data:ApplicationData})
            setApplication( prevStatus => ({
                ...prevStatus,
                [courseId] : {
                    id : response.data.id,
                    status : response.data.status
                }
            }))
            setApplied( prevStatus => ({
                ...prevStatus,
                [courseId] : {
                    id : response.data.id,
                    status : response.data.status
                }
            }))
        } catch (error) {
            setErrors(error.response.data.error)
        }
    }

    async function handleApplicationStatusChange(e,courseId,applicationId) {
        const ApplicationStatusUpdate = {
            status : e.target.value,
            owner : user.user_id
        }
        try {
            const response = await authRequest({method: 'put', url : `http://127.0.0.1:8000/api/applications/${applicationId}/`,data : ApplicationStatusUpdate})
            console.log(response.data)
            setApplication(prevStatus => ({
                ...prevStatus,
                [courseId] : {
                    ...courseId,
                    status : response.data.status
                }
            }))
            setApplied(prevStatus => ({
                ...prevStatus,
                [courseId] : {
                    ...courseId,
                    status : response.data.status
                }
            }))
        } catch (error) {
            setErrors(error.response.data.error)
        }
    }

    async function handleBookmark(bookmarkedId, courseId) {
        console.log(bookmarked)
        const current = bookmarked[courseId]?.value || false;
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
                        course: courseId,
                        owner : user.user_id
                    }
                })
            }
            setBookmarked(prev => ({
                ...prev,
                [courseId]: {
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
            <h1 className="text-3xl font-bold text-center mb-8">Available Courses</h1>
            <CourseSearch searchCourses={searchCourses} displayedCourses={displayedCourses} reset={reset}/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {
                    displayedCourses ?
                    displayedCourses.map((course,index) => {
                        return (
                            <div key={index} className="relative bg-white rounded-2xl p-6 shadow-lg hover:-translate-y-3">
                                <button
                                onClick={() => handleBookmark(bookmarked[course.id]?.id, course.id)}
                                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-gray-100 text-blue-600 rounded-xl">
                                    {bookmarked[course.id]?.value ? 
                                        <i className="fa-solid fa-bookmark"></i>
                                        : 
                                        <i className="fa-regular fa-bookmark"></i>
                                    }
                                </button>
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h2>
                                <p className="text-gray-600 mb-1"><span className="font-semibold">Company:</span> {course.provider}</p>
                                <p className="text-gray-500 text-sm mb-4">{course.description}</p>
                                <p className="text-gray-500 text-sm mb-4">{course.duration}</p>

                            {
                                applied[course.id] ?
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-700 mb-2">
                                        Status: <span className="text-blue-500 font-semibold">{applied[course.id].status}</span>
                                    </p>
                                    <select 
                                    onChange={(e) => {handleApplicationStatusChange(e,course.id,applied[course.id].id)}} 
                                    value={applied[course.id]}
                                    className="w-full border border-gray-800 rounded-md p-2 text-sm text-gray-800 bg-blue-200">
                                        <option value="Applied">Applied</option>
                                        <option value="Rejected">Rejected</option>
                                        <option value="Interview">Interview</option>
                                    </select>
                                </div>
                                :
                                <button 
                                onClick={() => {handleApplication(course.id)}}
                                className="w-full bg-blue-700 text-white font-medium rounded-md p-2 mt-4 hover:bg-blue-700">
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

