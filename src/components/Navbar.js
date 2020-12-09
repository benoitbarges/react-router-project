import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='container navbar'>
      <NavLink to="/">Home</NavLink>
      <nav className='nav-links'>
        <NavLink to="/players">Players</NavLink>
        <NavLink to="/teams">Teams</NavLink>
      </nav>
    </div>
  )
}
