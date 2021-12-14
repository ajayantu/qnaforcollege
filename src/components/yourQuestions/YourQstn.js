import React, { useEffect,useContext } from 'react'
import questionContext from "../../context/Question"
import YourQstnItem from './YourQstnItem';

export default function YourQstn() {
    const { fetchUserQstns,userQstns } = useContext(questionContext);
    useEffect(()=>{
        fetchUserQstns();
        // eslint-disable-next-line
    },[])
    return (
        <>
            <div className="user-questions-container">
                {userQstns &&
                    userQstns.map((qstn)=>{
                        return <YourQstnItem key={qstn._id} qstn={qstn} qstnId={qstn._id} />
                })}
            </div>
        </>
    )
}
