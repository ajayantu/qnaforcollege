import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import QuestionContext from '../../context/Question'
import './DisplayUser.css'

export default function DisplayUser() {

    const { fetchUser,user,role } = useContext(QuestionContext);
    const { userId } = useParams();
    

    useEffect(()=>{
        fetchUser(userId);
        // eslint-disable-next-line
    },[])

    return (
        <>
            <div className="user_container">
                <div className="user_details">
                <div className="user_icon"><i className="fas fa-user"></i></div>
                    <pre>
                    <span>Username                     :    {user?user.username:""}</span>
                    <span>Role                                :    {user?role:""}</span>
                    <span>Questions Asked         :    {user?user.qstn:""}</span>
                    <span>Questions Answered  :    {user?user.ans:""}</span>
                    <span>Total Points Earned     :    {user?user.points:""}</span>
                    </pre>
                </div>
                
            </div>
        </>
    )
}
