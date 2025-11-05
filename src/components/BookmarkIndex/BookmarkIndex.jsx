import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { authRequest } from '../../lib/auth'

function BookmarkIndex({user}) {
    const[bookmarks,setBookmarks] = useState([])
    const [errors, setErrors] = useState(null)

    async function getAllBookmarks() {
        try {
            const response = await authRequest({method: 'get', url: 'http://127.0.0.1:8000/api/bookmarks/'})
            setBookmarks(response.data)
        } catch(error) {
            setErrors(error.response.data.error)
        }
    }

    useEffect(() => {
        getAllBookmarks()
    }, [])

    async function handleBookmark(bookmarkId) {
        try {
            const response = await authRequest({method : 'delete', url :`http://127.0.0.1:8000/api/bookmarks/${bookmarkId}/`})
            setBookmarks((prevState) => {
                return prevState.filter(bookmark => bookmark.id !== bookmarkId)
            })
        } catch(error) {
            setErrors(error.response.data.error)
        }
    }

    async function handleFavoriteChange(bookmarkId) {
        const target = bookmarks.find((bookmark) => bookmark.id === bookmarkId)
        const updatedFav = !target.is_favorite
        try {
            const response = await authRequest({method: 'put', url :`http://127.0.0.1:8000/api/bookmarks/${bookmarkId}/`,
            data : {
                is_favorite : updatedFav ,
                owner : user.user_id
            }})
            setBookmarks((prev) =>
                prev.map((bookmark) =>
                    bookmark.id === bookmarkId
                    ? { ...bookmark, is_favorite: updatedFav }
                    : 
                    bookmark
                ))
        } catch(error) {
            setErrors(error.response.data.error)
        }
    }
    

return (
    <div className="min-h-screen text-white p-10 pt-28 mb-60">
        <h1 className="text-3xl font-bold mb-10 text-center">My Bookmarks</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookmarks.length > 0 ?
                bookmarks.map((bookmark) =>
                    <div key={bookmark.id} className="relative bg-linear-to-br from-gray-700 to-gray-900 p-8 rounded-3xl hover:scale-[1.03] transition-all duration-400 border border-gray-600">
                        {bookmark.job ?
                        <>
                        <span className="absolute top-5 left-6 bg-blue-600/20 text-blue-500 text-sm px-3 py-1 rounded-full">
                            Job
                        </span>
                        <h2 className="text-xl font-semibold mb-2 mt-10 text-white">{bookmark.job_title}</h2> 
                        <p className="text-gray-400 mb-12">{bookmark.job_description}</p>
                        </>
                        :
                        bookmark.course ?
                        <>
                        <span className="absolute top-5 left-6 bg-green-600/20 text-green-400 text-sm px-3 py-1 rounded-full">
                            Course
                        </span>
                        <h2 className="text-lg font-bold mb-2 mt-10 text-white">{bookmark.course_title}</h2> 
                        <p className="text-gray-400 mb-2">{bookmark.course_description}</p>
                        </>
                        :
                        bookmark.bootcamp ?
                        <>
                        <span className="absolute top-5 left-6 bg-purple-600/20 text-purple-400 text-sm px-3 py-1 rounded-full">
                            Bootcamp
                        </span>
                        <h2 className="text-lg font-bold mb-2 mt-10 text-white">{bookmark.bootcamp_title}</h2> 
                        <p className="text-gray-400 mb-2">{bookmark.bootcamp_description}</p>
                        </>
                        : 
                        'Loading ...'
                        }
                        <button
                        className="border border-red-600 text-red-400 font-medium px-6 py-2 rounded-xl hover:bg-red-900 hover:text-white"
                        onClick={() => handleBookmark(bookmark.id)}>
                            Remove Bookmark
                        </button>
                        <button
                            onClick={() => handleFavoriteChange(bookmark.id)}
                            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-gray-100 text-pink-600 rounded-xl">
                                {bookmark.is_favorite?
                                    <i className="fa-solid fa-heart"></i>
                                    : 
                                    <i className="fa-regular fa-heart"></i>
                                }
                            </button>

                    </div>
                ) 
                : 
                <p>you don't have bookmarks yet...</p>
            }
        </div>
    </div>
)
}

export default BookmarkIndex
