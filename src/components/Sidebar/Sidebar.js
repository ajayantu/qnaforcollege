import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
    const handleSidebar = () => {
        const sidebar = document.querySelector(".sidebar");
        const visibility = sidebar.getAttribute('data-visible');
        if (visibility === "true") {
            sidebar.setAttribute("data-visible", false);
        }
    }
    return (
        <>
            <div className="sidebar" data-visible="false">
                <ul className="sidebar-content">
                    <Link to="/" onClick={handleSidebar} className="selected-sidemenu side-menu">
                        <li>
                            <p>Questions</p>
                        </li>
                    </Link>
                    <Link to="/yourqstn" onClick={handleSidebar} className="side-menu-link side-menu">
                        <li >
                            <p>Asked by you</p>
                        </li>
                    </Link>
                    <Link to="/yourans" onClick={handleSidebar} className="side-menu-link side-menu">
                        <li >
                            <p>Answered by you</p>
                        </li>
                    </Link>
                    <Link to="/" onClick={handleSidebar} className="side-menu-link side-menu">
                        <li >
                            <p>Users</p>
                        </li>
                    </Link>

                    <div className="sub-menu">
                        <Link to="/" onClick={handleSidebar} className="side-menu-link side-menu">
                            <li >
                                <p>Students</p>
                            </li>
                        </Link>
                        <Link to="/" onClick={handleSidebar} className="side-menu-link side-menu">
                            <li >
                                <p>Teachers</p>
                            </li>
                        </Link>
                    </div>
                </ul>
            </div>
        </>
    )
}
