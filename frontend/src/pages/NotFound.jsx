import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="h-screen flex items-center justify-center flex-col bg-gray-100">
            <svg className="w-48 h-48 mb-8 text-gray-700 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
            <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg transition-transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Go Home
            </Link>
        </div>
    )
}
export default NotFound;