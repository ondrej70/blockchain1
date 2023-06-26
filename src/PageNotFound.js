import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <main className="block-chain">
        <p>Page not found.</p>
        <button className="back-home-button"><Link to="/">↩ Go back home</Link></button>
    </main>
  )
}

export default PageNotFound