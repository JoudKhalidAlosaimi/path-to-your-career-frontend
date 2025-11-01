import { Link } from "react-router"
import LogOutButton from "../Auth/LogOutButton"

function NavBar({ user, setUser }) {
    return (
        <nav>
            <div className="bg-gray-800 text-white fixed w-full z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex flex-row w-full justify-between">
                            <div className="text-xl font-bold">
                                <h2>CareerPathify</h2>
                            </div>
                            <div className="hidden md:block">
                                <div className="flex ml-10 items-baseline space-x-2">
                                    <Link to={'/home'}>Home</Link>
                                    <Link to={'/jobs'}>Jobs</Link>
                                    <Link to={'/courses'}>Courses</Link>
                                    <Link to={'/bootcamps'}>Bootcamps</Link>
                                </div>
                            </div>
                            <div className="flex ml-10 items-baseline space-x-2">
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
