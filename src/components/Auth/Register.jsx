import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

export default function Register() {
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const navigate = useNavigate()

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
            // navigate('/login')
        } catch (err) {
            console.error(err)
            alert('Signup failed')
    }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create an account</h2>
            <input placeholder='firstName' value={firstName} onChange={e => setFirstName(e.target.value)} />
            <input placeholder='lastName' value={lastName} onChange={e => setLastName(e.target.value)} />
            <input placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
            <input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
            <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
            <button type='submit'>Sign Up</button>
        </form>
    )
}