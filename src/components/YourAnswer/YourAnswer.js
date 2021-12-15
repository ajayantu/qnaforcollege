import React, { useEffect, useContext } from 'react'
import questionContext from "../../context/Question"
import YourAnswerItem from './YourAnswerItem';

export default function YourAnswer() {
    const { fetchUserAnsQstn, userAnsQstns } = useContext(questionContext);
    useEffect(() => {
        fetchUserAnsQstn();
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className="user-questions-container">
                {userAnsQstns &&
                    userAnsQstns.map((ansQstn) => {
                        return <YourAnswerItem key={ansQstn._id} ansQstn={ansQstn} ansQstnId={ansQstn._id} />
                    })}
            </div>
        </>
    )
}
