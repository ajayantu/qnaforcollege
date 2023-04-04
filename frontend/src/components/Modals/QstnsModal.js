import React, { useEffect,useContext } from 'react'
import './QstnsModal.css'
import questionContext from "../../context/Question"
import QstnModalItem from './QstnModalItem';

export default function QstnsModal(props) {
    const { fetchUserQstns,userQstns,handleAsk,darkmode } = useContext(questionContext);
    const handleModalClose = ()=>{
        const modal = document.querySelector(".modal-background");
        const visibility = modal.getAttribute('data-visible');
        if (visibility === "true") {
            modal.setAttribute("data-visible", false);
        } 
    }
    useEffect(()=>{
        fetchUserQstns();
        // eslint-disable-next-line
    },[])
    return (
        <>
            <div className="modal-main">
                <div className={`modal-background ${darkmode && 'bg-dark'}`} data-visible="false">
                <div className="close-icon" onClick={handleModalClose}>
                    <svg className={``} fill={`${darkmode?'#dcdcdc':'#000000'}`} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/></svg>
                </div>
                    <div className="modal-container">
                        {userQstns &&
                                userQstns.map((qstn)=>{
                                    return <QstnModalItem key={qstn._id} qstn={qstn} />
                        })}
                    </div>
                    <button className='modal-qstn-submit' onClick={handleAsk}>Submit</button>
                </div>
            </div>
        </>
    )
}
