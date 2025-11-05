import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

export default function Register() {
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://127.0.0.1:8000/api/register/', {
                first_name : firstName,
                last_name : lastName,
                username, 
                password, 
                email
            })
            navigate('/login')
        } catch (err) {
            console.error(err)
            alert('Signup failed')
    }
    }

    return (
        <>
        <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
                <form onSubmit={handleSubmit} className="border border-gray-700 p-10 rounded-2xl bg-linear-to-br from-gray-700 to-gray-900 mt-5">
                    <h2 className="text-center text-3xl font-bold tracking-tight text-white mb-2">Create an account</h2>
                    <div>
                        <label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-100 mb-2">
                            First Name
                        </label>
                        <div>
                            <input placeholder='firstName' value={firstName} onChange={e => setFirstName(e.target.value)} 
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white border border-gray-200 placeholder:text-gray-500 sm:text-sm/6 mb-3 hover:bg-gray-700"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-100 mb-2">
                            Last Name
                        </label>
                        <div>
                            <input placeholder='lastName' value={lastName} onChange={e => setLastName(e.target.value)} 
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white border border-gray-200 placeholder:text-gray-500 sm:text-sm/6 mb-3 hover:bg-gray-700"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-100 mb-2">
                            Username
                        </label>
                        <div>
                            <input placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} 
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white border border-gray-200 placeholder:text-gray-500 sm:text-sm/6 mb-3 hover:bg-gray-700"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100 mb-2">
                            Email
                        </label>
                        <div>
                            <input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} 
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white border border-gray-200 placeholder:text-gray-500 sm:text-sm/6 mb-3 hover:bg-gray-700"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100 mb-2">
                            Password
                        </label>
                        <div>
                            <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white border border-gray-200 placeholder:text-gray-500 sm:text-sm/6 mb-6 hover:bg-gray-700"/>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400">
                            Sign up
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </>
    )
}