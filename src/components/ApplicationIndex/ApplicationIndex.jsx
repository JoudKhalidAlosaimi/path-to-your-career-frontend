import { useEffect, useState } from 'react'
import axios from 'axios'
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"
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
                text: "Your file has been deleted.",
                icon: "success"
                });
            }
            });
            
        } catch (error) {
            setErrors(error.response.data.error)
        }
    }

    async function handleApplicationStatusChange(e,applicationId) {
        const ApplicationStatusUpdate = {
            status : e.target.value,
            owner : user.user_id,
        }
        try {
            const response = await authRequest({method: 'put', url :`http://127.0.0.1:8000/api/applications/${applicationId}/`, data :ApplicationStatusUpdate})
            // https://harmash.com/tutorials/react/usestate?utm_source=chatgpt.com
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

    
    return (
        <div className="applications-container">
            <h1>My Applications</h1>

            <table className="applications-table">
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
                                    application.job_title ? "Job"
                                    : 
                                    application.course_title ? "Course"
                                    : 
                                    application.bootcamp_title ? "Bootcamp"
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
                                    <select 
                                    onChange={(e) => {handleApplicationStatusChange(e,application.id)}} 
                                    value={application.status}
                                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="Applied">Applied</option>
                                        <option value="Rejected">Rejected</option>
                                        <option value="Interview">Interview</option>
                                    </select>
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
