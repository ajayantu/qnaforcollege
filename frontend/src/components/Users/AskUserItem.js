import React,{ useContext } from 'react'
import questionContext from "../../context/Question"
import user from './user.png'
import { useNavigate } from 'react-router-dom'

export default function AskUserItem(props) {
    let navigate = useNavigate();
    const { setUserId,findBadge,isLogin } = useContext(questionContext);
    const fullBadge = findBadge(props.askuser.badge);
    const badgeStyle = {
        backgroundColor: fullBadge.color,
        color: "#fff",
    }
    const handleModal = (e)=>{
        const token = localStorage.getItem('token');
        if (!token) {
            e.preventDefault();
            navigate("/login");
        }
        else
        {
            setUserId(props.askuser._id);
            const modal = document.querySelector(".modal-background");
            const visibility = modal.getAttribute('data-visible');
            if (visibility === "true") {
                modal.setAttribute("data-visible", false);
            }
            else if(visibility === "false"){
                modal.setAttribute("data-visible", true);
            }  
        }
    }
    return (
        <>
            <div className="student_item">
                <div className="stud_info">
                    <img src={props.askuser.profile_pic || user} alt="" />
                    <div className="name_badge">
                        <h3 className="stud_name">{props.askuser.username}</h3>
                        <span className="author_badge" style={badgeStyle}>{fullBadge.badge}</span>
                    </div>
                </div>
                <button onClick={handleModal}>Ask</button>
            </div>
        </>
    )
}
