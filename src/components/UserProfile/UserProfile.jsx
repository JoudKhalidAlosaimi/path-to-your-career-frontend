import { useState,useEffect } from "react"
import axios from "axios"
import { authRequest,clearTokens} from "../../lib/auth"
import { useNavigate } from "react-router"
import Swal from "sweetalert2"

function UserProfile({user,setUser}) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number :'',
        gender : ''
    })
    const [errors,setErrors] = useState(null)


    async function getProfile() {
        try {
            const response = await authRequest({method:'get', url:`http://127.0.0.1:8000/api/profile/`})
            setFormData(response.data)
            console.log(response.data)
        } catch(error) {
            setErrors(error.response.data.error)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        console.log(formData)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await authRequest({method: 'put', url: 'http://127.0.0.1:8000/api/profile/', data :formData})
        } catch(error) {
            setErrors(error.response)
        }
    }

return (
    <>
        <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
                <form onSubmit={handleSubmit} className="border border-gray-700 p-10 rounded-2xl bg-linear-to-br from-gray-700 to-gray-900 mt-5">
                    <h2 className="text-center text-3xl font-bold tracking-tight text-white mb-2">Edit Profile</h2>
                    <div>
                        <label htmlFor="first_name" className="block text-sm/6 font-medium text-gray-100 mb-2">
                            First Name
                        </label>
                        <div>
                            <input value={formData.first_name} onChange={handleChange} id='first_name' name='first_name' 
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white border border-gray-200 placeholder:text-gray-500 sm:text-sm/6 mb-3 hover:bg-gray-700"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="last_name" className="block text-sm/6 font-medium text-gray-100 mb-2">
                            Last Name
                        </label>
                        <div>
                            <input value={formData.last_name} onChange={handleChange} id='last_name' name='last_name' 
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white border border-gray-200 placeholder:text-gray-500 sm:text-sm/6 mb-3 hover:bg-gray-700"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100 mb-2">
                            Email
                        </label>
                        <div>
                            <input value={formData.email} onChange={handleChange} id='email' name='email'
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white border border-gray-200 placeholder:text-gray-500 sm:text-sm/6 mb-3 hover:bg-gray-700"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="phone_number" className="block text-sm/6 font-medium text-gray-100 mb-2">
                            Phone Number
                        </label>
                        <div>
                            <input value={formData.phone_number} onChange={handleChange} id='phone_number' name='phone_number'
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white border border-gray-200 placeholder:text-gray-500 sm:text-sm/6 mb-3 hover:bg-gray-700"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="gender" className="block text-sm/6 font-medium text-gray-100 mb-2">
                            Gender
                        </label>
                        <div>
                            <select name="gender" value={formData.gender} onChange={handleChange} className="mb-6 border border-indigo-700 rounded-2xl px-2 py-1 text-center bg-indigo-900 ">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
)
}

export default UserProfile
