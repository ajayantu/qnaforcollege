import React from 'react'
import './Sidebar.css'


export default function Sidebar() {
    
    return (
        <>
            <div className="sidebar" data-visible="false">
                <ul className="sidebar-content">
                    <li className="selected-sidemenu">
                        <a href="/">Questions</a>
                    </li>
                    <li>
                        <a href="/">Asked by you</a>
                    </li>
                    <li>
                        <a href="/">Answered by you</a>
                    </li>
                    <li>
                        <a href="/">Users</a>
                    </li>
                    <div className="sub-menu">
                        <li>
                            <a href="/">Students</a>
                        </li>
                        <li>
                            <a href="/">Teachers</a>
                        </li>
                    </div>    
                </ul>
            </div>
        </>
    )
}
