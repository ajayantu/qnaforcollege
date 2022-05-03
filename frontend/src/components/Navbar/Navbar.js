import React, { useEffect, useContext } from 'react'
import './Navbar.css'
import questionContext from "../../context/Question"
import { useNavigate } from 'react-router-dom';
import icon from './user-icon.png';

export default function Navbar() {
    const { fetchNotify, notifyCount, editNotify, isLogin, setIsLogin } = useContext(questionContext);
    let navigate = useNavigate();

    const handleLogout = () => {
        setIsLogin(false)
        localStorage.clear("token");
    }
    const handleLogin = () => {
        navigate("/login");
    }
    const handleSignup = () => {
        navigate("/signup");
    }
    const handleSidebar = () => {
        const sidebar = document.querySelector(".sidebar");
        const visibility = sidebar.getAttribute('data-visible');
        if (visibility === "false") {
            sidebar.setAttribute("data-visible", true);
        }
        else if (visibility === "true") {
            sidebar.setAttribute("data-visible", false);
        }
    }

    const handleNotify = () => {
        editNotify();
        navigate("/notify");
    }
    const handleUserDropdown = () => {
        const dlist = document.querySelector(".dropdown-list");
        const visibility = dlist.getAttribute('data-visible');
        if (visibility === "true") {
            dlist.setAttribute("data-visible", false);
        }
        else if (visibility === "false") {
            dlist.setAttribute("data-visible", true);
        }
    }
    useEffect(() => {
        isLogin && fetchNotify();
        // eslint-disable-next-line
    }, [isLogin])
    return (
        <>
            <nav>
                <div className="nav-content">
                    <i className="fas fa-bars menu-bar" data-visible="false" onClick={handleSidebar}></i>
                    <h1 className="logo">QCollege</h1>
                    <div className="menu-items">
                        <a href="/">Home</a>
                        <a href="/">About</a>
                        <a href="/">Contact</a>
                    </div>
                    <div className="right-content">
                        {isLogin &&
                            <div className="profile-pic" onClick={handleUserDropdown}>
                                <img src={icon} alt="" />
                                <div className="dropdown-list" data-visible="false" >
                                    <i className="fas fa-caret-down"></i>
                                    <div className="dropdown-list-item"><a href="/">Profile</a></div>
                                    <div className="dropdown-list-item"><a href="/questions/1" onClick={handleLogout}>Logout</a></div>
                                </div>
                            </div>
                        }
                        {isLogin &&
                            <div className="bell-icon" onClick={handleNotify}>
                                <div className="badge">
                                    <span>{notifyCount}</span>
                                </div>
                                <i className="fas fa-bell"></i>
                            </div>
                        }

                        <div className="right-buttons">
                            {/* {isLogin && <button onClick={handleLogout}>Logout</button>} */}
                            {!isLogin &&
                                <>
                                    <button onClick={handleLogin} className='login-btn'>Login</button>
                                    <button onClick={handleSignup} className='signup-btn'>Signup</button>
                                </>
                            }
                        </div>

                    </div>
                </div>
            </nav>
        </>
    )
}