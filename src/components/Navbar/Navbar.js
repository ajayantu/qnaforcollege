import React, { useEffect,useContext } from 'react'
import './Navbar.css'
import questionContext from "../../context/Question"
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    const handleSidebar = ()=>{
        const sidebar = document.querySelector(".sidebar");
        const visibility = sidebar.getAttribute('data-visible');
        if(visibility === "false"){
            sidebar.setAttribute("data-visible",true);
        }
        else if(visibility === "true"){
            sidebar.setAttribute("data-visible",false);
        }
    }

    const { fetchNotify,notifyCount,editNotify } = useContext(questionContext);
    let navigate = useNavigate();
    const handleNotify = ()=>{
        editNotify();
        navigate("/notify");
    }
    useEffect(()=>{
        fetchNotify();
        // eslint-disable-next-line
    },[])
    return (
        <>
            <nav>
                <div className="nav-content">
                    <i className="fas fa-bars menu-bar" data-visible="false" onClick={handleSidebar}></i>
                    <h1 className="logo">Quora for College</h1>
                    <div className="menu-items">
                        <a href="/">Home</a>
                        <a href="/">About</a>
                        <a href="/">Contact</a>
                    </div>
                    <div className="right-content">
                        <div className="bell-icon" onClick={handleNotify}>
                            <div className="badge">
                                <span>{notifyCount}</span>
                            </div>
                            <i className="fas fa-bell"></i>
                        </div>
                        <div className="search-bar ml">
                            <input type="search" className="search-data search-field" placeholder="Search Here ..." required />
                            <button type="submit" className="fas fa-search search-icon"></button>
                        </div>
                        <div className="profile-pic ml">
                            U
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
