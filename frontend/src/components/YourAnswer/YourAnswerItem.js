import React,{useContext} from 'react'
import "./YourAnswer.css"
import user from './user.png'
import { Link } from 'react-router-dom'
import questionContext from "../../context/Question"

export default function YourAnswerItem(props) {
  const { darkmode } = useContext(questionContext);

    const updatedAgoFinder = ()=>{
        const date_diff = new Date(new Date()-new Date(props.ansQstn.updatedAt));
        const min = Math.round(date_diff.getTime()/(1000*60))||0;
        const hrs = Math.round(date_diff.getTime()/(1000*60*60));
        const days = Math.round(date_diff.getTime()/(1000*60*60*24));
        const months = Math.round(date_diff.getTime()/(1000*60*60*24*31));
        if(months>0)
        {
            return {type:"mo",val:months};
        }
        else if(days>0)
        {
            return {type:"d",val:days};
        }
        else if(hrs>0)
        {
            return {type:"h",val:hrs};
        }
        else if(min>0)
        {
            return {type:"min",val:min};
        }
        else{
            return {type:"just now"}
        }
    }
    return (
        <>
            <div className={`user-question ${darkmode && 'bg-dark'}`}>
                <div className="user_details">
                    <img src={props.ansQstn.question.user.profile_pic || user} alt="" />
                    <div className="user_text">
                        <h2 className={`${darkmode && 'title-dark'}`}>{props.ansQstn.question.user.username}</h2>
                        <span className={`${darkmode && 'subtitle-dark'}`}>updated {updatedAgoFinder().val||""}{updatedAgoFinder().type}</span>
                    </div>
                </div>
                <div className="question_details">
                    <Link to={`/answers/${props.ansQstnId}`}><h2 className={`${darkmode && 'title-dark'}`}>{props.ansQstn.question.title}</h2></Link>
                    <p className={`${darkmode && 'desc-dark'}`}>{props.ansQstn.question.description}</p>
                </div>
            </div>
        </>
    )
}
