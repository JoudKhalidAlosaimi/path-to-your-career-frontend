import { useState,useEffect } from "react"
import axios from "axios"
import { authRequest, getUserFromToken, clearTokens } from "../../lib/auth"

function UserProfile() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        email: '',
        phone_number :'',
        gender : ''
    })


    async function getProfile() {
        const response = await authRequest({method:'get', url:`http://127.0.0.1:8000/api/profile/`})
        setFormData(response.data)
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
        const response = await authRequest({method: 'put', url: `http://127.0.0.1:8000/api/profile/`, data :formData})
        console.log(response.data)
    }

return (
    <div>
        <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='first_name'>First Name:</label>
                    <input value={formData.first_name} onChange={handleChange} id='first_name' name='first_name' />

                    <label htmlFor='last_name'>Last Name:</label>
                    <input value={formData.last_name} onChange={handleChange} id='last_name' name='last_name' />

                    <label htmlFor='username'>username:</label>
                    <input value={formData.username} onChange={handleChange} id='username' name='username' />

                    <label htmlFor='email'>email:</label>
                    <input value={formData.email} onChange={handleChange} id='email' name='email' />

                    <label htmlFor='phone_number'>Phone Number:</label>
                    <input value={formData.phone_number} onChange={handleChange} type='number' id='phone_number' name='phone_number'/>

                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>

                    <button type='submit'>Save Changes</button>
                </div>
            </form>
    </div>
)
}

export default UserProfile
