import React, { useEffect, useContext } from 'react'
import questionContext from "../../context/Question"
import Spinner from '../Spinner/Spinner';
import YourAnswerItem from './YourAnswerItem';

export default function YourAnswer() {
    const { fetchUserAnsQstn,userAnsQstns,loading,setUserAnsQstns } = useContext(questionContext);
    useEffect(() => {
        fetchUserAnsQstn();
        // eslint-disable-next-line
        return ()=>{
            setUserAnsQstns([])
            // eslint-disable-next-line
        }
    }, [])
    return (
        <>
            <div className="user-questions-container">
            {loading && <Spinner /> }
                {
                    userAnsQstns.length>0?
                    userAnsQstns.map((ansQstn) => {
                        return <YourAnswerItem key={ansQstn._id} ansQstn={ansQstn} ansQstnId={ansQstn.question._id} />
                    }):!loading&&<div className='no_answered_qstn'>No Questions Answered</div>
                }
            </div>
        </>
    )
}
