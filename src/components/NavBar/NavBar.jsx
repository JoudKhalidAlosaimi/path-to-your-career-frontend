import { Link } from "react-router"

function NavBar() {
    return (
        <nav>
            <Link to={'/home'}>Home</Link>
            <Link to={'/jobs'}>Jobs</Link>
            <Link to={'/courses'}>Courses</Link>
            <Link to={'/bootcamps'}>Bootcamps</Link>
        </nav>
    )
}

export default NavBar
