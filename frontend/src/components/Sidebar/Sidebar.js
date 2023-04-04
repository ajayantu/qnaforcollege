import { React,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Sidebar.css'
import moon from "./moon-icon.png"
import sun from "./sun-icon.png"
import questionContext from "../../context/Question"
export default function Sidebar() {
    const navigate = useNavigate();
    const { setPage,isLogin,darkmode,setDarkmode } = useContext(questionContext);
    const handleSidebarQstn = ()=>{
        navigate(`/questions/${1}`)
        setPage(1);
        const sidebar = document.querySelector(".sidebar");
        const visibility = sidebar.getAttribute('data-visible');
        if (visibility === "true") {
            sidebar.setAttribute("data-visible", false);
            const overlay = document.querySelector("#overlay");
            overlay.classList.remove("active");
        }
    }
    const handleSidebar = () => {
        const sidebar = document.querySelector(".sidebar");
        const visibility = sidebar.getAttribute('data-visible');
        if (visibility === "true") {
            sidebar.setAttribute("data-visible", false);
            const overlay = document.querySelector("#overlay");
            overlay.classList.remove("active");
        }
    }
    const handleDarkMode = ()=>{
        if(darkmode){
            setDarkmode(false)
            document.querySelector("body").style.backgroundColor="#E9E9E9"
            const ele=document.querySelector("blockquote")
            if(ele){
                ele.style.color="#353535"
            }
        }
        else{
            setDarkmode(true)
            const ele = document.querySelector("blockquote")
            if(ele){
                ele.style.color="#fff"
            }
            document.querySelector("body").style.backgroundColor="#1a1c22"
        }
    }
    return (
        <>
            <div className={`sidebar ${darkmode && 'dark'}`} data-visible="false">
                <div className="dark-mode" onClick={handleDarkMode}>
                    {!darkmode && <img src={moon} alt="" />}
                    {darkmode && <img src={sun} alt="" />}
                </div>
                <div className="sidebar-content">
                    <Link to={`/questions/${1}`} id={window.location.pathname.includes("/questions/")?"selected-sidemenu":""} onClick={handleSidebarQstn} className={`side-menu ${darkmode && 'sidebar-title-dark'}`}>
                        <div className="side-menu-item">
                            <i className="fas fa-globe-asia"></i>
                            <p>Questions</p>
                        </div>
                    </Link>
                    {isLogin && <div className="sub-menu">
                        <Link to="/yourqstn" id={window.location.pathname === "/yourqstn"?"selected-sidemenu":""} onClick={handleSidebar} className={`side-menu ${darkmode && 'sidebar-subtitle-dark'}`}>
                            <p>Asked</p>
                        </Link>
                        <Link to="/yourans" id={window.location.pathname === "/yourans"?"selected-sidemenu":""} onClick={handleSidebar} className={`side-menu ${darkmode && 'sidebar-subtitle-dark'}`}>
                            <p>Answered</p>
                        </Link>
                    </div>}
                    <Link to="/" onClick={handleSidebar} className={`side-menu user-sidebar ${darkmode && 'title-dark'}`}>
                        <div className="side-menu-item">
                            <i className="fas fa-users"></i>
                            <p>Users</p>
                        </div>
                    </Link>

                    <div className="sub-menu">
                        <Link to="/getstudents" id={window.location.pathname === "/getstudents"?"selected-sidemenu":""} onClick={handleSidebar} className={`side-menu ${darkmode && 'sidebar-subtitle-dark'}`}>
                                <p>Students</p>
                        </Link>
                        <Link to="/teachers" id={window.location.pathname === "/teachers"?"selected-sidemenu":""} onClick={handleSidebar} className={`side-menu ${darkmode && 'sidebar-subtitle-dark'}`}>
                                <p>Teachers</p>
                        </Link>
                    </div>

                </div>
                
            </div>
        </>
    )
}
