import { Link } from "react-router"
import LogOutButton from "../Auth/LogOutButton"
import './NavBar.css'
import { useState } from "react"
import { authRequest,clearTokens } from "../../lib/auth"
import Swal from "sweetalert2"

function NavBar({user,setUser,handleMode,isDarkMode }) {

    const [errors,setErrors] = useState(null)


    async function handleAccountDelete(userId) {
            console.log(user)
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            })
            if (result.isConfirmed) {
                const response = await authRequest({
                    method: 'delete',
                    url: `http://127.0.0.1:8000/api/profile/delete/${userId}/`
                })
                clearTokens()
                setUser(null)
                navigate('/register')
            }
            } catch (error) {
            setErrors(error.response)
            }}

    return (
        <nav>
            <div className="bg-white dark:bg-gray-800 text-black dark:text-white fixed w-full z-50 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex flex-row w-full justify-between">
                            <div className="flex justify-center font-bold">
                                <button
                                    onClick={handleMode}
                                    className="cursor-pointer">
                                    {isDarkMode ? "☀️ CareerPathify" : "🌙 CareerPathify"}
                                </button>
                            </div>
                            
                            <div className="flex items-center justify-center space-x-8">
                                <Link to={'/home'}>Home</Link>
                                <Link to={'/jobs'}>Jobs</Link>
                                <Link to={'/courses'}>Courses</Link>
                                <Link to={'/bootcamps'}>Bootcamps</Link>
                            </div>

                            <div className="flex items-center justify-center ml-10 items-baseline space-x-2">
                            {
                                user && user != null
                                ?
                                <div className="dropdown">
                                    <button className="dropbtn"> Account
                                        <i className="fa fa-caret-down"></i>
                                    </button>
                                        <div className="dropdown-content">
                                            <Link to='/profile'>Account</Link>
                                            <Link to='/applications'>Applications</Link>
                                            <Link to='/bookmarks'>Bookmarks</Link>
                                            <button className="cursor-pointer" onClick={() => handleAccountDelete(user.user_id)}>Delete Account</button>
                                            <LogOutButton setUser={setUser} />
                                        </div>
                                </div>
                                :
                                <>
                                    <Link to={'/login'}>Login</Link>
                                    <Link to={'/register'}>Create an account</Link>
                                </>
                            }
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
