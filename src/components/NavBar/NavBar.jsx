import { Link } from "react-router"
import LogOutButton from "../Auth/LogOutButton"

function NavBar({ user, setUser }) {
    return (
        <nav>
            <div className="navbar-leftside">
                <h2>CareerPathify</h2>
            </div>

            <div className="navbar-center">
                <Link to={'/home'}>Home</Link>
                <Link to={'/jobs'}>Jobs</Link>
                <Link to={'/courses'}>Courses</Link>
                <Link to={'/bootcamps'}>Bootcamps</Link>
            </div>
            
            <div className="navbar-rightside">
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
        </nav>
    )
}

export default NavBar
