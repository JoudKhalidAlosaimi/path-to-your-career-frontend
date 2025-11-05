import React, { useState } from "react"
import axios from "axios"
import { saveTokens, getUserFromToken } from "../../lib/auth"
import { useNavigate} from "react-router"
import { Link } from "react-router"


export default function Login({ setUser }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/login/", { username, password })
            saveTokens(res.data.access, res.data.refresh)
            setUser(getUserFromToken())
            navigate("/home")
        } catch (err) {
            console.error(err)
        }
    }

return (
        <>
        <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="border bg-gray-800 p-10 rounded-2xl mt-20">
                    <h2 className="text-center text-2xl/9 font-bold tracking-tight text-white mb-10">Sign in to your account</h2>
                    <div>
                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-100 mb-2">
                            Username
                        </label>
                        <div className="mt-2">
                            <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} 
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white border border-gray-200 placeholder:text-gray-500 sm:text-sm/6 mb-8 hover:bg-gray-700"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100 mb-2">
                            Password
                        </label>
                        <div className="mt-2">
                            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} 
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white border border-gray-200 placeholder:text-gray-500 sm:text-sm/6 mb-8 hover:bg-gray-700"/>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400">
                            Sign in
                        </button>
                    </div>

                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                        Not a member?{' '}
                        <Link to='/register' className="font-semibold text-indigo-400 hover:text-indigo-300">
                            Create an account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    </>
    )
}