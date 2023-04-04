import React,{ useContext } from 'react'
import questionContext from "../../context/Question"


export default function QstnModalItem(props) {
    const { setQstnId,darkmode } = useContext(questionContext);
    const handleQstnSelect = (e)=>{
        const qstn = document.querySelectorAll(".qstn-select");
        for (let i = 0; i < qstn.length; i++) {
            qstn[i].classList.remove('modal-qstn-selected');
        }
        e.target.classList.add("modal-qstn-selected")
        setQstnId(props.qstn._id);
    }
    
    return (
        <div className={`qstn-select`} onClick={handleQstnSelect}>
            <p className={`${darkmode && 'help-modal-title-dark'}`} style={{pointerEvents:"none"}}>{props.qstn.title}</p>
        </div>
    )
}
