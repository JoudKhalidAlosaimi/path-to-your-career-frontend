import { useEffect, useState } from 'react'
import axios from 'axios'

function CourseIndex() {
    // TODO
    // make a axios call to our backend(using get) to get all the courses
    // save it in state
    // display all the courses

    const [courses,setCourses] = useState([])

    async function getAllCourses(){
        const response = await axios.get('http://127.0.0.1:8000/api/courses/')
        setCourses(response.data)
    }

    useEffect(() => {
        getAllCourses()
    }, [])
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

