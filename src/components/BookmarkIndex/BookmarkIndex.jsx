import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { authRequest } from '../../lib/auth'

function BookmarkIndex() {
    const[bookmarks,setBookmarks] = useState([])

    async function getAllBookmarks() {
        const response = await authRequest({method: 'get', url: 'http://127.0.0.1:8000/api/bookmarks/'})
        setBookmarks(response.data)
    }

    useEffect(() => {
        getAllBookmarks()
    }, [])

    async function handleBookmark(bookmarkId) {
        const response = await authRequest({method : 'delete', url :`http://127.0.0.1:8000/api/bookmarks/${bookmarkId}/`})
        setBookmarks((prevState) => {
            return prevState.filter(bookmark => bookmark.id !== bookmarkId)
        })
    }
return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 pt-30">
            {bookmarks.length > 0 ? 
                bookmarks.map((bookmark) => 
                <div key={bookmark.id} className="border rounded-lg p-4 shadow-md">
                    {bookmark.job ?
                    <>
                    <h2 className="text-lg font-bold mb-2">{bookmark.job_title}</h2> 
                    <p className="text-gray-600 mb-2">{bookmark.job_description}</p>
                    </>
                    :
                    bookmark.course ?
                    <>
                    <h2 className="text-lg font-bold mb-2">{bookmark.course_title}</h2> 
                    <p className="text-gray-600 mb-2">{bookmark.course_description}</p>
                    </>
                    :
                    bookmark.bootcamp ?
                    <>
                    <h2 className="text-lg font-bold mb-2">{bookmark.bootcamp_title}</h2> 
                    <p className="text-gray-600 mb-2">{bookmark.bootcamp_description}</p>
                    </>
                    : 
                    'Loading ...'
                    }
                    
                    <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleBookmark(bookmark.id)}>
                        Remove Bookmark
                    </button>
                    </div>
                ) 
                : 
                <p>Sorry,no bookmarks yet...</p>
            }
        </div>
    </div>
)
}

export default BookmarkIndex
