import './HomePage.css'
import { Link } from 'react-router'

function HomePage() {
    return (
        <>
            <section className='hero-section'>
                <h1 className="hero-title">Your Future Starts Here.</h1>
                <p className="hero-subtitle">Discover your ideal career through comprehensive job Iistings, expert-led <br />
                    courses, and intensive bootcamps. Your professional future starts here.
                </p>
                <div className="hero-buttons">
                    <Link to={'/jobs'}>
                        <button className="hero-button">
                            <i className="fa-solid fa-magnifying-glass mr-2 text-white"></i>
                            Explore Opportunities
                        </button>
                    </Link>

                    <Link to={'/register'}>
                        <button className="hero-button">
                            <i className="fa-regular fa-user mr-2 text-white"></i>
                            Create Profile
                        </button>
                    </Link>
                    </div>
            </section>

            <section className="success-section">
                <div className="success-container">
                    <h2 className="success-title">Everything You Need to Succeed</h2>
                    <p className="success-subtitle">
                        From entry-level positions to advanced career transitions, we provide the <br />
                        tools and opportunities to help you achieve your professional goals.
                    </p>

                    <div className="success-grid">
                        <div className="success-card">
                            <div className="success-card-icon">
                                <i className="fa-solid fa-briefcase text-blue-900"></i>
                            </div>
                            <h3 className="success-card-title">Browse Jobs</h3>
                            <p className="success-card-text">
                                Discover thousands of job opportunities from top companies worldwide.
                            </p>
                            <Link to='/jobs/' className="success-card-button">
                                Get Started →
                            </Link>
                        </div>

                        <div className="success-card">
                            <div className="success-card-icon">
                                <i className="fa-solid fa-book text-blue-900"></i>
                            </div>
                            <h3 className="success-card-title">Find Courses</h3>
                            <p className="success-card-text">
                                Learn new skills with courses from industry experts and leading institutions.
                            </p>
                            <Link to='/courses' className="success-card-button">
                                Get Started →
                            </Link>
                        </div>

                        <div className="success-card">
                            <div className="success-card-icon">
                                <i className="fa-solid fa-graduation-cap text-blue-900"></i>
                            </div>
                            <h3 className="success-card-title">Join Bootcamps</h3>
                            <p className="success-card-text">
                                Accelerate your career with intensive, hands-on training programs.
                            </p>
                            <Link to='/bootcamps' className="success-card-button">
                            Get Started →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="timeline-section">
                <div className="timeline-container">
                    <h2 className="timeline-title">How It Works</h2>
                    <p className="timeline-subtitle">Get started in just a few simple steps.</p>
                    <ul className="space-y-2">
                        <li className="timeline-li">
                            <div >
                                <div className="timeline-num">
                                    1
                                </div>
                            </div>
                                
                            <div className="timeline-points sm-text">
                                <p>Create Your Profile</p>
                                <p className="mt-2">Build your standout profile and start exploring everything we offer.</p>
                            </div>
                        </li>
                        <li className="timeline-li">
                            <div >
                                <div className="timeline-num">
                                    2
                                </div>
                            </div>
                                
                            <div className="timeline-points sm-text">
                                <p>Discover Opportunities</p>
                                <p className="mt-2">Explore jobs, courses, and bootcamps that match your career goals.</p>
                            </div>
                        </li>
                        <li className="timeline-li">
                            <div>
                                <div className="timeline-num">
                                    3
                                </div>
                            </div>
                                
                            <div className="timeline-points sm-text">
                                <p>Apply with Confidence</p>
                                <p className="mt-2"> Access helpful resources and apply to opportunities that align with your interests.</p>
                            </div>
                        </li>
                        <li className="timeline-li">
                            <div >
                                <div className="timeline-num">
                                    4
                                </div>
                            </div>
                                
                            <div className="timeline-points sm-text">
                                <p>Track your progress</p>
                                <p className="mt-2">Keep track of your applications easily, everything you’ve applied for will be listed in your Applications.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </>
        
    )
}

export default HomePage
