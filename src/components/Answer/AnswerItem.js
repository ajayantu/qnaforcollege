import React from 'react'
import ReactHtmlParser from 'react-html-parser';
import './Answers.css'
export default function AnswerItem(props) {
    return (
        <div className="answer dpm ans-item" >
            {ReactHtmlParser(props.ans.answer)}
        </div>
    )
}
