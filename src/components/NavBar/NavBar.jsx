import { Link } from "react-router"

function NavBar() {
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
                <button className="login-btn">Login</button>
                <button className="register-btn">Create account</button>
            </div>
        </nav>
    )
}

export default NavBar
