import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const SideNavbar = () => {
  return (
    <div>
        <div className='bg-black shadow-lg'>
            <h2>Dashboard-Panel</h2>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="dashpanel/overview">Overview</Link>
                        </li>
                        <li>
                            <Link to="dashpanel/admin">Admin</Link>
                        </li>
                        <li>
                            <Link to="dashpanel/blog">Overview</Link>
                        </li>
                        <li>
                            <Link to="dashpanel/events&dates">events&dates</Link>
                        </li>
                        <li>
                            <Link to="dashpanel/images">images</Link>
                        </li>
                        <li>
                            <Link to="dashpanel/videos">videos</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
          {/* Main Content */}
          <div className="flex-1 p-6">
                <Outlet/> {/* This will render the nested routes */}
            </div>
    </div>
  )
}

export default SideNavbar
