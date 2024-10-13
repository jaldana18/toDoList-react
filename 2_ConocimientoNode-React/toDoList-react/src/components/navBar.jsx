import React from 'react'

export default function NavBar({brand}) {
  return (
    <nav className = "navbar navbar-dark bg-dark">
        <div className='container'>
            <a href='#!' className='navbar-brand'>{brand}</a>            
        </div>
    </nav>
  )
}
