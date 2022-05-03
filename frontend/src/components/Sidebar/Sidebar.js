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
                <div className="sidebar-content">
                    <Link to="/home" id={window.location.pathname === "/home"?"selected-sidemenu":""} onClick={handleSidebar} className="side-menu">
                        <div className="side-menu-item">
                            <i className="fas fa-home"></i>
                            <p>Home</p>
                        </div>
                    </Link>
                    <Link to="/questions" id={window.location.pathname === "/questions"?"selected-sidemenu":""} onClick={handleSidebar} className="side-menu">
                        <div className="side-menu-item">
                            <i className="fas fa-globe-asia"></i>
                            <p>Questions</p>
                        </div>
                    </Link>
                    <div className="sub-menu">
                        <Link to="/yourqstn" id={window.location.pathname === "/yourqstn"?"selected-sidemenu":""} onClick={handleSidebar} className="side-menu">
                            <p>Featured</p>
                        </Link>
                        <Link to="/yourans" id={window.location.pathname === "/yourans"?"selected-sidemenu":""} onClick={handleSidebar} className="side-menu">
                            <p>Popular</p>
                        </Link>
                    </div>
                    <Link to="" onClick={handleSidebar} className="side-menu">
                        <div className="side-menu-item">
                            <i className="fas fa-users"></i>
                            <p>Users</p>
                        </div>
                    </Link>

                    <div className="sub-menu">
                        <Link to="/getstudents" id={window.location.pathname === "/getstudents"?"selected-sidemenu":""} onClick={handleSidebar} className="side-menu">
                                <p>Students</p>
                        </Link>
                        <Link to="/" onClick={handleSidebar} className="side-menu">
                                <p>Teachers</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
