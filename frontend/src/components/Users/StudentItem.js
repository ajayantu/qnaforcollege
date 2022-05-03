import React,{ useContext } from 'react'
import questionContext from "../../context/Question"

export default function StudentItem(props) {
    const { setUserId } = useContext(questionContext);
    const handleModal = ()=>{
        setUserId(props.stud._id);
        const modal = document.querySelector(".modal-background");
        const visibility = modal.getAttribute('data-visible');
        if (visibility === "true") {
            modal.setAttribute("data-visible", false);
        }
        else if(visibility === "false"){
            modal.setAttribute("data-visible", true);
        }  
    }
    return (
        <>
            <div className="student-item">
                <h3>{props.stud.username}</h3>
                <button onClick={handleModal}>Ask</button>
            </div>
        </>
    )
}
