import React,{useEffect,useContext} from 'react'
import questionContext from "../../context/Question"
import user from './user.png'

export default function QuestionShow(props) {
    const { getQstnFromId,setQstn,qstn,findBadge } = useContext(questionContext);
    const fullBadge = findBadge(qstn.user.badge);
    const badgeStyle = {
        backgroundColor: fullBadge.color,
        color: "#fff",
    }
    useEffect(() => {
        getQstnFromId(props.qstnId)
        return () => {
            setQstn(null);
        }
        // eslint-disable-next-line
    }, []);
  return (
    <>
        <div className="answer_question_details">
            <div className="author_details">
                <img src={qstn.user.profile_pic || user} alt="" />
                <div className="author_details_nb">
                    <span className='author_username'>{qstn.user.username}</span>
                    <span className="author_badge" style={badgeStyle}>{fullBadge.badge}</span>
                </div>
            </div>
            <h2 className='qstn_title'>{qstn.title}</h2>
            <p className='qstn_description'>{qstn.description}</p>
        </div>
        <div className="answers_bar">
            <div className="bar_details">
                <i className="fas fa-comment-alt"></i>
                <span>{qstn.ansnumber} Answers</span>
            </div>
        </div>
    </>
  )
}
