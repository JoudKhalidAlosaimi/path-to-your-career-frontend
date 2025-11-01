import './HomePage.css'
import { Link } from 'react-router'

function HomePage() {
    return (
        <>
            <section className='relative z-0 flex flex-col justify-center items-center dark:text-white overflow-hidden h-screen'>
                <h1 className="text-center text-6xl font-bold tracking-wider">A Path to Your Career</h1>
                <h2 className="text-center text-xl mt-4 opacity-80">Explore jobs, courses and bootcamps that shape your future </h2>

                <Link to={'/register'}>
                    <button className="dark:text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-10 py-3.5 text-center me-2 mb-2 mt-10 ">
                        Get Started
                    </button>
                </Link>
            </section>

            <section className="flex justifu-center flex-col py-20 px-6 text-center max-w-4xl mx-auto"> 
                <h2 className="text-3xl font-bold mb-6 dark:text-white">Why CareerPath was born</h2>
            
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-lg">
                        <h5 className="text-2xl font-bold mb-2">Discover</h5>
                        <p className="dark:text-gray-100 mt-4">To help students discover their ideal career path through guidance.</p>
                    </div>

                    <div className="flex-1 bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-lg">
                        <h5 className="text-2xl font-bold mb-2">Connect</h5>
                        <p className="dark:text-gray-100 mt-4">To connect learning with real opportunities like jobs, courses, and bootcamps.</p>
                    </div>

                    <div className="flex-1 bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-lg">
                        <h5 className="text-2xl font-bold mb-2">Inspire</h5>
                        <p className="dark:text-gray-100 mt-4">To help inspire those who need inspiration.</p>
                    </div>
            </div>
            </section> 
        </>
        
    )
}

export default HomePage
