import { Link } from "react-router"
import LogOutButton from "../Auth/LogOutButton"


function NavBar({ user, setUser, handleMode,isDarkMode }) {

    return (
        <nav>
            <div className="bg-white dark:bg-gray-800 text-black dark:text-white fixed w-full z-50 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex flex-row w-full justify-between">
                            <div className="font-bold">
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
                                user
                                ?
                                <>
                                    <Link to={'/profile'}>Account</Link>
                                    <LogOutButton setUser={setUser} />
                                </>
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
