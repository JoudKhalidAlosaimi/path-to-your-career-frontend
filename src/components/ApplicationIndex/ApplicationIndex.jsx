import { useEffect, useState } from 'react'
import { authRequest} from "../../lib/auth"
import './ApplicationIndex.css'
import Swal from 'sweetalert2'

function ApplicationIndex({user}) {

    const [applications,setApplications] = useState([])
    const [errors, setErrors] = useState(null)

    async function getAllApplications(){
        try {
            const response = await authRequest({method:'get', url:'http://127.0.0.1:8000/api/applications/'})
            setApplications(response.data)
        } catch (error) {
            setErrors(error.response.data.error)
        }
    }

    useEffect(() => {
        getAllApplications()
    }, [])

        async function handleApplicationStatusChange(e,applicationId) {
        const ApplicationStatusUpdate = {
            status : e.target.value,
            owner : user.user_id,
        }
        try {
            const response = await authRequest({method: 'put', url :`http://127.0.0.1:8000/api/applications/${applicationId}/`, data :ApplicationStatusUpdate})
            // https://harmash.com/tutorials/react/usestate
            setApplications((prev) =>
                prev.map((application) =>
                    application.id === applicationId ? { ...application, status: response.data.status }
                    :
                    application
            ))
        } catch(error) {
            setErrors(error.response.data.error)
        }
    }


    async function handleApplicationDelete(applicationId){
        try {
            Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then((result) => {
            if (result.isConfirmed) {
                const response = authRequest({method: 'delete', url:`http://127.0.0.1:8000/api/applications/${applicationId}/`})
                setApplications((prevState) => {
                    return prevState.filter((application) => application.id !== applicationId)
                })
                Swal.fire({
                title: "Deleted!",
                text: "Your application has been deleted.",
                icon: "success"
                });
            }
            });
            
        } catch (error) {
            setErrors(error.response.data.error)
        }
        }

    
    return (
        <div className="applications-container">
            <h1>My Applications</h1>

            <table className="applications-table relative bg-linear-to-br from-gray-700 to-gray-900 p-8 rounded-3xl border border-black-600">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Change status</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    applications ? 
                        applications.map((application, index) => (
                            <tr key={application.id}>
                                <td>{index + 1}</td>
                                <td>{application.job_title || application.course_title || application.bootcamp_title}</td>
                                <td>
                                    {
                                    application.job_title ? 
                                    <span className="bg-blue-600/20 text-blue-500 text-sm px-5 py-3 rounded-full">
                                        Job
                                    </span>
                                    : 
                                    application.course_title ?
                                    <span className="bg-green-600/20 text-green-500 text-sm px-5 py-3 rounded-full">
                                        Course
                                    </span>
                                    : 
                                    application.bootcamp_title ?
                                    <span className="bg-purple-600/20 text-purple-500 text-sm px-5 py-3 rounded-full">
                                        Bootcamp
                                    </span>
                                    :
                                    ""
                                    }
                                </td>
                                <td
                                className={
                                    application.status === "Applied" ? "Applied"
                                    : 
                                    application.status === "Rejected" ? "Rejected"
                                    : 
                                    "Interview"
                                    }>
                                        {application.status}
                                </td>
                                <td>
                                    { application.job_title  || application.bootcamp_title ?
                                    <select 
                                    onChange={(e) => {handleApplicationStatusChange(e,application.id)}} 
                                    value={application.status}
                                    className="w-full border border-gray-800 rounded-md p-2 text-sm text-gray-800 bg-blue-200">
                                        <option value="Applied">Applied</option>
                                        <option value="Rejected">Rejected</option>
                                        <option value="Interview">Interview</option>
                                    </select>
                                    :
                                    <select 
                                    onChange={(e) => {handleApplicationStatusChange(e,application.id)}} 
                                    value={application.status}
                                    className="w-full border border-gray-800 rounded-md p-2 text-sm text-gray-800 bg-blue-200">
                                        <option value="Ongoing">Ongoing</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                    }
                                </td>
                                <td>
                                    <button 
                                    onClick={() => handleApplicationDelete(application.id)}
                                    className="text-red-500 hover:text-red-800 font-medium">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    : 
                        <tr>
                            <td colSpan="3" className="empty">
                                No applications yet
                            </td>
                        </tr>
                    }
            </tbody>
        </table>
    </div>
    )
}

export default ApplicationIndex
