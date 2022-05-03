import React, { useContext, useState } from 'react'
import './Signup.css'
import questionContext from "../../context/Question"
import { useNavigate } from 'react-router-dom'

export default function Signup() {
    const navigate = useNavigate()
    const { signup } = useContext(questionContext);
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }
    const handleSignup = (e) => {
        if (userInfo.email.length > 1 && userInfo.password.length >= 5 && userInfo.username.length >= 3) {
            e.preventDefault();
            signup(userInfo.username, userInfo.email, userInfo.password)
                .then((res) => {
                    console.log(res);
                    if (res === 0) {
                        navigate("/login");
                    }
                })
        }
    }
    return (
        <>
            <div className="signup-container">
                <div className="signup-elements">
                    <h1>Signup</h1>
                    <form action=''>
                        <div className="username-item signup-item">
                            <span>Username</span>
                            <input type="text" name='username' onChange={handleChange} required={true} minLength={3} />
                        </div>
                        <div className="email-item signup-item">
                            <span>Email</span>
                            <input type="email" name='email' onChange={handleChange} required={true} />
                        </div>
                        <div className="password-item signup-item">
                            <span>Password</span>
                            <input type="password" name='password' onChange={handleChange} required={true} minLength={5} />
                        </div>
                        <button onClick={handleSignup}>Signup</button>
                    </form>
                </div>
            </div>
        </>
    )
}
