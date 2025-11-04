import './HomePage.css'
import { Link } from 'react-router'

function HomePage() {
    return (
        <>
            <section className='flex flex-col justify-center items-center dark:text-white h-screen'>
                <h1 className="text-center text-6xl font-bold tracking-wider">Your Future Starts Here.</h1>
                <p className="text-gray-400 mb-6 text-l mt-9">Discover your ideal career through comprehensive job Iistings, expert-led <br />
                    courses, and intensive bootcamps. Your professional future starts here.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
                    <Link to={'/jobs'}>
                        <button className="dark:text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm w-48 py-3.5 text-center">
                            <i className="fa-solid fa-magnifying-glass mr-2" style={{color: "#ffffff"}}></i>
                            Explore Opportunities
                        </button>
                    </Link>

                    <Link to={'/register'}>
                        <button className="dark:text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm w-48 py-3.5 text-center">
                            <i className="fa-regular fa-user mr-2"></i>
                            Create Profile
                        </button>
                    </Link>
                    </div>
            </section>

            <section className="py-3 -mt-4 mb-20">
                <div className="max-w-7xl mx-auto text-center px-6">
                    <h2 className="text-3xl mb-4 font-bold">Everything You Need to Succeed</h2>
                    <p className="text-gray-600 mb-12">
                        From entry-level positions to advanced career transitions, we provide the <br />
                        tools and opportunities to help you achieve your professional goals.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-800 p-8 rounded-2xl">
                            <div className="w-15 h-15 mx-auto mb-4 bg-blue-100 flex items-center justify-center rounded-full">
                                <i className="fa-solid fa-briefcase" style={{color: "#1b3d79"}}></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Browse Jobs</h3>
                            <p className="text-gray-400 mb-6">
                                Discover thousands of job opportunities from top companies worldwide.
                            </p>
                            <Link to='/jobs/' className="inline-block border border-blue-600 text-blue-400 font-medium px-6 py-2 rounded-xl hover:bg-blue-900 hover:text-white">
                                Get Started →
                            </Link>
                        </div>

                        <div className="bg-gray-800 p-8 rounded-2xl">
                            <div className="w-15 h-15 mx-auto mb-4 bg-blue-100 flex items-center justify-center rounded-full">
                                <i className="fa-solid fa-book" style={{color: "#1b3d79"}}></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Find Courses</h3>
                            <p className="text-gray-400 mb-6">
                                Learn new skills with courses from industry experts and leading institutions.
                            </p>
                            <Link to='/courses' className="inline-block border border-blue-600 text-blue-400 font-medium px-6 py-2 rounded-xl hover:bg-blue-900 hover:text-white">
                                Get Started →
                            </Link>
                        </div>

                        <div className="bg-gray-800 p-8 rounded-xl">
                            <div className="w-15 h-15 mx-auto mb-4 bg-blue-100 flex items-center justify-center rounded-full">
                                <i className="fa-solid fa-graduation-cap" style={{color: "#1b3d79"}}></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Join Bootcamps</h3>
                            <p className="text-gray-400 mb-6">
                                Accelerate your career with intensive, hands-on training programs.
                            </p>
                            <Link to='/bootcamps' className="inline-block border border-blue-600 text-blue-400 font-medium px-6 py-2 rounded-xl hover:bg-blue-900 hover:text-white">
                            Get Started →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-white py-16 px-6 text-center">
                <h2 className="text-3xl font-bold mb-6">How It Works</h2>
                <p className="text-gray-400 mb-10">Get started in just a few simple steps.</p>
                <div className="space-y-6 max-w-xl mx-auto text-left">
                    <div>
                        <h3 className="text-lg font-semibold">1. Create Your Profile</h3>
                        <p className="text-gray-400 text-sm">
                            Build your standout profile and start exploring everything we offer.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">2. Discover Opportunities</h3>
                        <p className="text-gray-400 text-sm">
                            Explore jobs, courses, and bootcamps that match your career goals.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">3. Apply with Confidence</h3>
                        <p className="text-gray-400 text-sm">
                            Access helpful resources and apply to opportunities that align with your interests.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">4. Track your progress</h3>
                        <p className="text-gray-400 text-sm">
                            Keep track of your applications easily, everything you’ve applied for will be listed in your Applications.
                        </p>
                    </div>
                </div>
                </section>
        </>
        
    )
}

export default HomePage
